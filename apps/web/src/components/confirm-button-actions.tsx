'use client'

import { Loader2 } from 'lucide-react'
import { type ReactNode, useState, useTransition } from 'react'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ConfirmationActionButtonProps {
  action?: () => Promise<void>

  // Button configuration
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  className?: string

  // Icon mode (with tooltip)
  icon?: boolean
  tooltipText?: string
  tooltipDelayDuration?: number

  // Button text mode
  children?: ReactNode
  loadingText?: string

  // Confirmation dialog
  title: string
  description: string
  confirmText?: string
  cancelText?: string
}

export function ConfirmationActionButton({
  action,
  variant = 'default',
  size = 'default',
  disabled = false,
  className,
  icon = false,
  tooltipText,
  tooltipDelayDuration = 1000,
  children,
  loadingText,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: ConfirmationActionButtonProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleConfirm = () => {
    if (action) {
      startTransition(async () => {
        await action()
        setOpen(false)
      })
    }
  }

  const buttonContent = isPending && loadingText ? loadingText : children

  if (icon && tooltipText) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={tooltipDelayDuration}>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <Button
                  variant={variant}
                  size={size}
                  disabled={disabled || isPending}
                  className={className}
                  type="button"
                >
                  {isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    children
                  )}
                  {tooltipText && (
                    <span className="sr-only">{tooltipText}</span>
                  )}
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent>{tooltipText}</TooltipContent>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isPending}>
                  {cancelText}
                </AlertDialogCancel>
                <Button
                  onClick={handleConfirm}
                  disabled={isPending}
                  variant={
                    variant === 'destructive' ? 'destructive' : 'default'
                  }
                >
                  {isPending && loadingText ? loadingText : confirmText}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Tooltip>
      </TooltipProvider>
    )
  }

  // Para botões normais (sem tooltip)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          disabled={disabled || isPending}
          className={className}
          type="button"
        >
          {isPending && loadingText ? loadingText : buttonContent}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {cancelText}
          </AlertDialogCancel>
          <Button
            onClick={handleConfirm}
            disabled={isPending}
            variant={variant === 'destructive' ? 'destructive' : 'default'}
          >
            {isPending && loadingText ? loadingText : confirmText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
