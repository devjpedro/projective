'use client'

import { useMediaQuery } from '@uidotdev/usehooks'
import React from 'react'

import InterceptedSheetContent from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import OrganizationForm from '../../org/organization-form'

export default function CreateOrganization() {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 640px)')

  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent side={isSmallDevice ? 'bottom' : 'right'}>
        <SheetHeader>
          <SheetTitle className="text-xl">Create organization</SheetTitle>
        </SheetHeader>

        <div className="px-4">
          <OrganizationForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
