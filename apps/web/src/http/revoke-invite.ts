import { api } from './api-client'

interface RevokeInviteRequest {
  org: string
  inviteId: string
}

export async function revokeInvite({ org, inviteId }: RevokeInviteRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate delay

  await api.delete(`organizations/${org}/invites/${inviteId}`)
}
