# deploy/terraform/variables.tf
# Input variables for PrescriptCheck infrastructure

variable "hcloud_token" {
  description = "Hetzner Cloud API token"
  type        = string
  sensitive   = true
}

variable "environment" {
  description = "Deployment environment (staging or production)"
  type        = string
  validation {
    condition     = contains(["staging", "production"], var.environment)
    error_message = "environment must be 'staging' or 'production'"
  }
}

variable "server_type" {
  description = "Hetzner server type"
  type        = string
  default     = "cx21"
}

variable "datacenter" {
  description = "Hetzner datacenter"
  type        = string
  default     = "nbg1-dc3"
}

variable "ssh_public_key" {
  description = "SSH public key for server access"
  type        = string
  sensitive   = true
}

variable "admin_ips" {
  description = "IP addresses allowed to SSH into the server"
  type        = list(string)
  default     = []
}
