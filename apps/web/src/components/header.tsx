import { Slash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import logoIcon from '@/assets/logo-icon.svg'
import { ability } from '@/auth/auth'

import OrganizationSwitcher from './organization-switcher'
import { PendingInvites } from './pending-invites'
import { ProfileButton } from './profile-button'
import ProjectSwitcher from './project-switcher'
import ThemeSwitcher from './theme/theme-switcher'
import { Separator } from './ui/separator'

interface HeaderProps {
  isHome?: boolean
}

export async function Header({ isHome = false }: HeaderProps) {
  const permissions = await ability()

  const canGetProject = permissions?.can('get', 'Project')

  return (
    <>
      <Link
        href="/"
        className="xs:hidden mx-auto mb-3  flex w-fit items-center justify-center text-center"
      >
        <Image src={logoIcon} alt="" className="size-6 dark:invert" />
      </Link>

      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <div className="xs:gap-3 flex items-center gap-1">
          <Link href="/" className="xs:block hidden">
            <Image src={logoIcon} alt="" className="size-6 dark:invert" />
          </Link>

          <Slash className="text-border hidden size-3 -rotate-[24deg] sm:block" />

          <OrganizationSwitcher isHome={isHome} />

          {canGetProject && (
            <>
              <Slash className="text-border size-3 -rotate-[24deg]" />

              <ProjectSwitcher />
            </>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <PendingInvites />
          <ThemeSwitcher />

          <Separator orientation="vertical" className="hidden !h-7 sm:block" />

          <ProfileButton />
        </div>
      </div>
    </>
  )
}
