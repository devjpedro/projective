import { XOctagon } from 'lucide-react'

import { ConfirmationActionButton } from '@/components/confirm-button-actions'

import { revokeInviteAction } from './actions'

interface RevokeInviteButtonProps {
  inviteId: string
}

export default function RevokeInviteButton({
  inviteId,
}: RevokeInviteButtonProps) {
  return (
    <ConfirmationActionButton
      action={revokeInviteAction.bind(null, inviteId)}
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
  )
}
