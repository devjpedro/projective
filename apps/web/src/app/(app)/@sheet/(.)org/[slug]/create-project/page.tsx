import React from 'react'

import ProjectForm from '@/app/(app)/org/[slug]/create-project/project-form'
import InterceptedSheetContent from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

export default function CreateProject() {
  return (
    <Sheet defaultOpen>
      {/* Sheet for Desktop */}
      <InterceptedSheetContent className="hidden sm:block">
        <SheetHeader>
          <SheetTitle className="text-xl">Create project</SheetTitle>
        </SheetHeader>

        <div className="px-4">
          <ProjectForm />
        </div>
      </InterceptedSheetContent>

      {/* Sheet for Mobile */}
      <InterceptedSheetContent
        className="block h-[50vh] sm:hidden"
        side="bottom"
      >
        <SheetHeader>
          <SheetTitle className="text-xl">Create project</SheetTitle>
        </SheetHeader>

        <div className="px-4">
          <ProjectForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
