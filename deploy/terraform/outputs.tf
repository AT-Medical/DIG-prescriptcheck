# deploy/terraform/outputs.tf
# Output values after infrastructure provisioning

output "server_ipv4" {
  description = "Public IPv4 address of the PrescriptCheck server"
  value       = hcloud_server.prescriptcheck.ipv4_address
}

output "server_ipv6" {
  description = "Public IPv6 address of the PrescriptCheck server"
  value       = hcloud_server.prescriptcheck.ipv6_address
}

output "server_id" {
  description = "Hetzner server ID"
  value       = hcloud_server.prescriptcheck.id
}

output "firewall_id" {
  description = "Hetzner firewall ID"
  value       = hcloud_firewall.prescriptcheck.id
}
