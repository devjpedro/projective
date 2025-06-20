import { api } from './api-client'

interface GetProjectResponse {
  project: {
    description: string
    id: string
    name: string
    slug: string
    avatarUrl: string | null
    organizationId: string
    ownerId: string
    owner: {
      id: string
      name: string | null
      avatarUrl: string | null
      email: string
    }
  }
}

export async function getProject(org: string, project: string) {
  const result = await api
    .get(`organizations/${org}/projects/${project}`)
    .json<GetProjectResponse>()

  return result
}
