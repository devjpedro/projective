'use server'

import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { recoverPassword } from '@/http/recover-password'
import { resetPassword } from '@/http/recover-password copy'

const recoverPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address.' }),
})

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password should have at least 6 characters.' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords confirmation does not match.',
    path: ['password_confirmation'],
  })

export async function recoverPasswordAction(data: FormData) {
  const result = recoverPasswordSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email } = result.data

  try {
    await recoverPassword({
      email: String(email),
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return {
        success: false,
        message,
        errors: null,
      }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  redirect('/auth/sign-in')
}

export async function resetPasswordAction(data: FormData, code: string) {
  const result = resetPasswordSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { password } = result.data

  try {
    await resetPassword({
      password: String(password),
      code,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return {
        success: false,
        message,
        errors: null,
      }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  redirect('/auth/sign-in')
}
