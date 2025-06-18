'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { acceptInvite } from '@/http/accept-invite'

export const signInFromInviteAction = async (
  inviteId: string,
  inviteEmail: string,
) => {
  const cookiesStore = await cookies()

  cookiesStore.set('inviteId', inviteId)

  redirect(`/auth/sign-in/?email=${inviteEmail}`)
}

export const acceptInviteAction = async (inviteId: string) => {
  const cookiesStore = await cookies()

  try {
    await acceptInvite(inviteId)

    cookiesStore.delete('inviteId')
  } finally {
    redirect('/')
  }
}
