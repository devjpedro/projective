import { ChevronDown, LogOut } from 'lucide-react'
import React from 'react'

import { auth } from '@/auth/auth'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

function getInitials(name: string | null): string {
  if (!name) return ''

  const words = name.trim().split(/\s+/)
  const initials = words.slice(0, 2).map((word) => word.charAt(0).toUpperCase())

  return initials.join('')
}

export async function ProfileButton() {
  const { user } = await auth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-muted-foreground text-xs">{user.email}</span>
        </div>
        <Avatar>
          {user.avatarUrl && (
            <AvatarImage src="https://github.com/devjpedro.png" />
          )}
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <ChevronDown className="text-muted-foreground size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={10} alignOffset={12}>
        <DropdownMenuItem asChild>
          <a href="/api/auth/sign-out">
            Sign Out
            <LogOut className="mr-2 size-4" />
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
