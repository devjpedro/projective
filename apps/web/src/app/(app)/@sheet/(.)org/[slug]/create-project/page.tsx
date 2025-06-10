import React from 'react'

import ProjectForm from '@/app/(app)/org/[slug]/create-project/project-form'
import InterceptedSheetContent from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

export default function CreateProject() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
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
