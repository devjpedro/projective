import { organizationSchema } from '@saas/auth'
import { ArrowLeftRight, Crown, UserMinus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import { ability, getCurrentOrg } from '@/auth/auth'
import { ConfirmationActionButton } from '@/components/confirm-button-actions'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getMembers } from '@/http/get-members'
import { getMembership } from '@/http/get-membership'
import { getOrganization } from '@/http/get-organization'

import { removeMemberAction } from './actions'
import UpdateMemberRoleSelect from './update-member-role-select'

export default async function MemberList() {
  const currentOrg = await getCurrentOrg()
  const permissions = await ability()

  const [{ membership }, { members }, { organization }] = await Promise.all([
    getMembership(currentOrg!),
    getMembers(currentOrg!),
    getOrganization(currentOrg!),
  ])

  const authOrganization = organizationSchema.parse(organization)

  const canTransferOwnership = permissions?.can(
    'transfer_ownership',
    authOrganization,
  )

  const canDeleteMember = permissions?.can('delete', 'User')

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Members</h2>

      <div className="rounded border">
        <Table>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="py-2.5" style={{ width: 48 }}>
                  <Avatar>
                    <AvatarFallback />
                    {member.avatarUrl && (
                      <Image
                        src={member.avatarUrl}
                        width={40}
                        height={40}
                        alt=""
                        className="aspect-square"
                      />
                    )}
                  </Avatar>
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="flex flex-col">
                    <span className="inline-flex items-center gap-2 font-medium">
                      {member.name}
                      {member.userId === membership?.userId && ' (me)'}
                      {organization.ownerId === member?.userId && (
                        <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                          <Crown className="size-3" />
                          Owner
                        </span>
                      )}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {member.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="flex items-center justify-end gap-2">
                    {canTransferOwnership && (
                      <Tooltip delayDuration={1000}>
                        <TooltipTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <ArrowLeftRight className="size-4" />
                            <span className="sr-only">Transfer ownership</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Transfer Ownership</TooltipContent>
                      </Tooltip>
                    )}

                    <UpdateMemberRoleSelect
                      memberId={member.id}
                      value={member.role}
                      disabled={
                        member.userId === membership.userId ||
                        member.userId === organization.ownerId ||
                        permissions?.cannot('update', 'User')
                      }
                    />

                    {canDeleteMember && (
                      <ConfirmationActionButton
                        action={removeMemberAction.bind(null, member.id)}
                        variant="destructive"
                        size="icon"
                        tooltipText="Remove member"
                        loadingText="Removing..."
                        title="Remove Member"
                        description="Are you sure you want to remove this member? This action will be processed on the server."
                        confirmText="Remove"
                        disabled={
                          member.userId === membership.userId ||
                          member.userId === organization.ownerId
                        }
                        icon
                      >
                        <UserMinus className="size-4" />
                      </ConfirmationActionButton>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
