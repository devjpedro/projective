import { XCircle } from 'lucide-react'

import { ability, getCurrentOrg } from '@/auth/auth'
import { ConfirmationActionButton } from '@/components/confirm-button-actions'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getOrganization } from '@/http/get-organization'

import OrganizationForm from '../../organization-form'
import { shutdownOrganizationAction } from './actions'
import { Billing } from './billing'

export default async function Settings() {
  const currentOrg = await getCurrentOrg()
  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  const canShutdownOrganization = permissions?.can('delete', 'Organization')

  const {
    organization: { domain, name, shouldAttachUsersByDomain },
  } = await getOrganization(currentOrg!)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="space-y-4">
        {canUpdateOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Organization settings</CardTitle>
              <CardDescription>
                Update your organization details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrganizationForm
                isUpdating
                initialData={{
                  domain,
                  name,
                  shouldAttachUsersByDomain,
                }}
              />
            </CardContent>
          </Card>
        )}

        {canGetBilling && <Billing />}

        {canShutdownOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Shutdown organization</CardTitle>
              <CardDescription>
                This will delete all organization data including all projects.
                You cannot undo this action.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ConfirmationActionButton
                action={shutdownOrganizationAction}
                variant="destructive"
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently shutdown your
            organization and remove all associated data from our servers."
                confirmText="Yes, shutdown organization"
                cancelText="Cancel"
                loadingText="Shutting down..."
              >
                <XCircle className="mr-2 size-4" />
                Shutdown Organization
              </ConfirmationActionButton>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
