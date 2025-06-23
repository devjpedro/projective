'use client'

import { AlertTriangle, Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useFormState from '@/hooks/use-form-state'

import { resetPasswordAction } from '../actions'

export function ResetPasswordForm() {
  const [isVisiblePassword, setIsVisiblePassword] = useState({
    password: false,
    passwordConfirmation: false,
  })

  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const handleResetPassword = (data: FormData) =>
    resetPasswordAction(data, token)

  const {
    formState: { errors, message, success },
    handleAction,
    isPending,
  } = useFormState(handleResetPassword)

  const togglePasswordVisibility = (
    field: 'password' | 'passwordConfirmation',
  ) => {
    setIsVisiblePassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleAction} action="" className="space-y-4 ">
        {!success && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Reset password failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="password">New Password</Label>

          <div className="relative">
            <Input
              name="password"
              type={isVisiblePassword.password ? 'text' : 'password'}
              id="password"
            />

            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => togglePasswordVisibility('password')}
              className="absolute right-2 top-0"
            >
              {isVisiblePassword.password ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
              <span className="sr-only">Toggle new password visibility</span>
            </Button>
          </div>

          {errors?.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.password[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password_confirmation">
            Confirm your new password
          </Label>
          <div className="relative">
            <Input
              name="password_confirmation"
              type={
                isVisiblePassword.passwordConfirmation ? 'text' : 'password'
              }
              id="password_confirmation"
            />

            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => togglePasswordVisibility('passwordConfirmation')}
              className="absolute right-2 top-0"
            >
              {isVisiblePassword.passwordConfirmation ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
              <span className="sr-only">
                Toggle confirm new password visibility
              </span>
            </Button>
          </div>

          {errors?.password_confirmation && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.password_confirmation[0]}
            </p>
          )}
        </div>

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Reset password'
          )}
        </Button>

        <Button className="w-full" variant="link" size="sm" asChild>
          <Link href="/auth/sign-in">Sign in instead</Link>
        </Button>
      </form>
    </div>
  )
}
