'use client'

import type { Role } from '@saas/auth'
import type { ComponentProps } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { updateMemberAction } from './actions'

interface UpdateMemberRoleSelectProps extends ComponentProps<typeof Select> {
  memberId: string
}

export default function UpdateMemberRoleSelect({
  memberId,
  ...props
}: UpdateMemberRoleSelectProps) {
  const updateMemberRole = async (role: Role) => {
    await updateMemberAction(memberId, role)
  }

  return (
    <Select onValueChange={updateMemberRole} {...props}>
      <SelectTrigger className="!h-8 w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ADMIN">Admin</SelectItem>
        <SelectItem value="MEMBER">Member</SelectItem>
        <SelectItem value="BILLING">Billing</SelectItem>
      </SelectContent>
    </Select>
  )
}
