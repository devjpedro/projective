'use client'

import { AlertTriangle, Eye, EyeOff, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import githubIcon from '@/assets/github-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import useFormState from '@/hooks/use-form-state'

import { signInWithGithub } from '../actions'
import { signUpAction } from './actions'

export function SignUpForm() {
  const [isVisiblePassword, setIsVisiblePassword] = useState({
    password: false,
    passwordConfirmation: false,
  })

  const {
    formState: { errors, message, success },
    handleAction,
    isPending,
  } = useFormState(signUpAction)

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
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input name="name" id="name" />

          {errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input name="email" type="email" id="email" />

          {errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>

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
              <span className="sr-only">Toggle password visibility</span>
            </Button>
          </div>

          {errors?.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.password[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password_confirmation">Confirm your password</Label>
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
              <span className="sr-only">Toggle password visibility</span>
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
            'Create account'
          )}
        </Button>

        <Button className="w-full" variant="link" size="sm" asChild>
          <Link href="/auth/sign-in">Already registered? Sign in</Link>
        </Button>
      </form>
      <Separator />

      <form action={signInWithGithub}>
        <Button className="w-full" variant="outline" type="submit">
          <Image src={githubIcon} className="mr-2 size-4 dark:invert" alt="" />
          Sign up with GitHub
        </Button>
      </form>
    </div>
  )
}
