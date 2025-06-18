'use server'

import { acceptInvite } from '@/http/accept-invite'
import { rejectInvite } from '@/http/reject-invite'

export const acceptInviteAction = async (inviteId: string) => {
  await acceptInvite(inviteId)
}

export const rejectInviteAction = async (inviteId: string) => {
  await rejectInvite(inviteId)
}
