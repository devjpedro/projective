'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useFormState from '@/hooks/use-form-state'

import { recoverPasswordAction } from '../actions'

export default function RecoverPasswordForm() {
  const searchParams = useSearchParams()

  const {
    formState: { errors, message, success },
    handleAction,
    isPending,
  } = useFormState(recoverPasswordAction)

  return (
    <div className="space-y-4">
      <form onSubmit={handleAction} className="space-y-4 ">
        {!success && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Recover password failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input
            name="email"
            type="email"
            id="email"
            defaultValue={searchParams.get('email') ?? ''}
          />

          {errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Recover password'
          )}
        </Button>

        <Button className="w-full" variant="link" size="sm" asChild>
          <Link href="/auth/sign-in">Sign in instead</Link>
        </Button>
      </form>
    </div>
  )
}
