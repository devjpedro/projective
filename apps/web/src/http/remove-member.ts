import { api } from './api-client'

interface RemoveMemberRequest {
  org: string
  memberId: string
}

export async function removeMember({ org, memberId }: RemoveMemberRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate delay

  await api.delete(`organizations/${org}/members/${memberId}`)
}
