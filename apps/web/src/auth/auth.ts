import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/get-profile'

export const isAuthenticated = async () => {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  return !!token
}

export async function auth() {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  if (!token) redirect('/auth/sign-in')

  try {
    const { user } = await getProfile()

    return { user }
  } catch {}

  redirect('/api/auth/sign-out')
}
