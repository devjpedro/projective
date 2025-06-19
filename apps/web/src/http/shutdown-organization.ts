import { api } from './api-client'

interface ShutdownRequest {
  org: string
}

export async function shutdownOrganization({ org }: ShutdownRequest) {
  await api.delete(`organizations/${org}`)
}
