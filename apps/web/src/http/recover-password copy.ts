import { api } from './api-client'

interface ResetPasswordRequest {
  password: string
  code: string
}

type ResetPasswordResponse = void

export async function resetPassword({
  password,
  code,
}: ResetPasswordRequest): Promise<ResetPasswordResponse> {
  await api.post('password/reset', {
    json: {
      password,
      code,
    },
  })
}
