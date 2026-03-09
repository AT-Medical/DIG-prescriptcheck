# deploy/terraform/main.tf
# Infrastructure as Code for PrescriptCheck
# Provisions cloud resources (example: AWS/Hetzner Cloud)

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.44"
    }
  }
  backend "s3" {
    # Configure your remote state backend
    # bucket = "atmedical-terraform-state"
    # key    = "prescriptcheck/terraform.tfstate"
    # region = "eu-central-1"
  }
}

# Hetzner Cloud provider (AT Medical uses Hetzner)
provider "hcloud" {
  token = var.hcloud_token
}

# SSH Key for server access
resource "hcloud_ssh_key" "prescriptcheck" {
  name       = "prescriptcheck-${var.environment}"
  public_key = var.ssh_public_key
}

# Application server
resource "hcloud_server" "prescriptcheck" {
  name        = "prescriptcheck-${var.environment}"
  image       = "ubuntu-22.04"
  server_type = var.server_type
  datacenter  = var.datacenter
  ssh_keys    = [hcloud_ssh_key.prescriptcheck.id]

  labels = {
    environment = var.environment
    application = "prescriptcheck"
    managed-by  = "terraform"
  }

  user_data = templatefile("${path.module}/templates/cloud-init.yaml", {
    environment = var.environment
  })
}

# Firewall
resource "hcloud_firewall" "prescriptcheck" {
  name = "prescriptcheck-${var.environment}"

  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "22"
    source_ips = var.admin_ips
  }

  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "80"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "443"
    source_ips = ["0.0.0.0/0", "::/0"]
  }
}

resource "hcloud_firewall_attachment" "prescriptcheck" {
  firewall_id = hcloud_firewall.prescriptcheck.id
  server_ids  = [hcloud_server.prescriptcheck.id]
}
