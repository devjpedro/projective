'use client'

import { AlertTriangle, Eye, EyeOff, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

import githubIcon from '@/assets/github-icon.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import useFormState from '@/hooks/use-form-state'

import { signInWithGithub } from '../actions'
import { signInWithEmailAndPassword } from './actions'

export default function SignInForm() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)

  const searchParams = useSearchParams()

  const {
    formState: { errors, message, success },
    handleAction,
    isPending,
  } = useFormState(signInWithEmailAndPassword)

  const togglePasswordVisibility = () => {
    setIsVisiblePassword((prev) => !prev)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleAction} className="space-y-4 ">
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

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>

          <div className="relative">
            <Input
              name="password"
              type={isVisiblePassword ? 'text' : 'password'}
              id="password"
            />

            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-0"
            >
              {isVisiblePassword ? (
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

          <Link
            href="/auth/forgot-password"
            className="text-foreground text-xs font-medium hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Sign in with e-mail'
          )}
        </Button>

        <Button className="w-full" variant="link" size="sm" asChild>
          <Link href="/auth/sign-up">Create new account</Link>
        </Button>
      </form>

      <Separator />

      <form action={signInWithGithub}>
        <Button className="w-full" variant="outline" type="submit">
          <Image src={githubIcon} className="mr-2 size-4 dark:invert" alt="" />
          Sign with GitHub
        </Button>
      </form>
    </div>
  )
}
