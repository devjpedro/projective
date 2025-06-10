import { api } from './api-client'

interface ShutdownRequest {
  org: string
}

export async function shutdownOrganization({ org }: ShutdownRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate delay

  await api.delete(`organizations/${org}`)
}
