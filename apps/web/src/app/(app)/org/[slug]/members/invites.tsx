import { XOctagon } from 'lucide-react'
import React from 'react'

import { ability, getCurrentOrg } from '@/auth/auth'
import { ConfirmationActionButton } from '@/components/confirm-button-actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getInvites } from '@/http/get-invites'
import { formatRole } from '@/util/format-role'

import { revokeInviteAction } from './actions'
import CreateInviteForm from './create-invite-form'

export async function Invites() {
  const currentOrg = await getCurrentOrg()
  const permissions = await ability()
  const { invites } = await getInvites(currentOrg!)

  const canCreateInvite = permissions?.can('create', 'Invite')
  const canRevokeInvite = permissions?.can('delete', 'Invite')

  return (
    <div className="space-y-4">
      {canCreateInvite && (
        <Card>
          <CardHeader>
            <CardTitle>Invite member</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateInviteForm />
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Invites</h2>

        <div className="rounded border">
          <Table>
            <TableBody>
              {invites.map((invite) => (
                <TableRow key={invite.id}>
                  <TableCell className="py-2.5">
                    <span className="text-muted-foreground">
                      {invite.email}
                    </span>
                  </TableCell>
                  <TableCell className="py-2.5 font-medium">
                    {formatRole(invite.role)}
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex justify-end">
                      {canRevokeInvite && (
                        <ConfirmationActionButton
                          action={revokeInviteAction.bind(null, invite.id)}
                          variant="destructive"
                          size="icon"
                          tooltipText="Revoke invite"
                          loadingText="Revoking..."
                          title="Revoke Invite"
                          description="Are you sure you want to revoke this invite? This action will be processed on the server."
                          confirmText="Revoke"
                          icon
                        >
                          <XOctagon className="size-4" />
                        </ConfirmationActionButton>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {invites.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-muted-foreground py-4 text-center"
                  >
                    No invites found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
