'use client'

import { useMediaQuery } from '@uidotdev/usehooks'
import React from 'react'

import ProjectForm from '@/app/(app)/org/[slug]/create-project/project-form'
import InterceptedSheetContent from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

export default function CreateProject() {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 640px)')

  return (
    <Sheet defaultOpen>
      {/* Sheet for Desktop */}
      <InterceptedSheetContent side={isSmallDevice ? 'bottom' : 'right'}>
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
