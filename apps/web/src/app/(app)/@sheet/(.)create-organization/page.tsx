import React from 'react'

import InterceptedSheetContent from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import OrganizationForm from '../../org/organization-form'

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent className="hidden sm:block">
        <SheetHeader>
          <SheetTitle className="text-xl">Create organization</SheetTitle>
        </SheetHeader>

        <div className="px-4">
          <OrganizationForm />
        </div>
      </InterceptedSheetContent>

      <InterceptedSheetContent
        className="block h-[50vh] sm:hidden"
        side="bottom"
      >
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
