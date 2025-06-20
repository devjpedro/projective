'use client'

import { AlertTriangle, Loader2, UserPlus } from 'lucide-react'
import React from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useFormState from '@/hooks/use-form-state'

import { createInviteAction } from './actions'

export default function CreateInviteForm() {
  const {
    formState: { errors, message, success },
    handleAction,
    isPending,
  } = useFormState(createInviteAction)

  return (
    <form onSubmit={handleAction} className="space-y-4 ">
      {!success && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Invite failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className={`flex sm:flex-row flex-col items-center gap-2 ${errors ? 'pb-2' : ''}`}>
        <div className="relative flex-1 space-y-1 w-full">
          <Input name="email" id="email" placeholder="john@example.com" />

          {errors?.email && (
            <p className="absolute left-1.5 text-xs font-medium text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>

        <Select name="role" defaultValue="MEMBER">
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="MEMBER">Member</SelectItem>
            <SelectItem value="BILLING">Billing</SelectItem>
          </SelectContent>
        </Select>

        <Button className='w-full sm:w-auto' type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <UserPlus className="mr-1 size-4" />
              Invite user
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
