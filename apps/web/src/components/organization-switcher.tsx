import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { getCurrentOrg } from '@/auth/auth'
import { getOrganizations } from '@/http/get-organizations'
import { cn } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export default async function OrganizationSwitcher({
  isHome = false,
}: {
  isHome?: boolean
}) {
  const currentOrg = await getCurrentOrg()
  const { organizations } = await getOrganizations()

  const currentOrganization = organizations.find(
    (org) => org.slug === currentOrg,
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'focus-visible:ring-primary flex cursor-pointer items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2',
          'xs:!w-[120px] !w-[100px] sm:!w-[168px]',
          isHome && '!w-auto',
        )}
      >
        {currentOrganization ? (
          <>
            <Avatar className="size-4">
              {currentOrganization.avatarUrl && (
                <AvatarImage src={currentOrganization.avatarUrl} />
              )}
              <AvatarFallback>
                {currentOrganization.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="truncate text-left">
              {currentOrganization.name}
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">Select organization</span>
        )}
        <ChevronsUpDown className="text-muted-foreground ml-auto size-4 shrink-0" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-[200px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          {organizations.map((organization) => (
            <DropdownMenuItem key={organization.id} asChild>
              <Link href={`/org/${organization.slug}`}>
                <Avatar className="mr-2 size-4">
                  {organization.avatarUrl && (
                    <AvatarImage src={organization.avatarUrl} />
                  )}
                  <AvatarFallback>{organization.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="line-clamp-1">{organization.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/create-organization">
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
