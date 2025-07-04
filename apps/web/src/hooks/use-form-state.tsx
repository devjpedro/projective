import { type FormEvent, useState, useTransition } from 'react'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

const defaultFormState: FormState = {
  success: false,
  message: null,
  errors: null,
}

export default function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState,
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState<FormState>(
    initialState ?? defaultFormState,
  )

  const handleAction = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      if (state.success) {
        form.reset()

        if (onSuccess) await onSuccess()
      }

      setFormState(state)
    })
  }

  return {
    formState,
    handleAction,
    isPending,
  }
}
