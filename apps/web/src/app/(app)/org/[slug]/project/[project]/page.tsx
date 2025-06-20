import { getCurrentOrg } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getProject } from '@/http/get-project'

import type { PageProps } from '.next/types/app/(app)/page'

export default async function Project({ params }: PageProps) {
  const { project: projectSlug } = await params
  const currentOrg = await getCurrentOrg()

  const { project } = await getProject(currentOrg!, projectSlug)

  console.log({ project })

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{project.name}</h1>
      {project.description ? (
        <p className="text-muted-foreground w-full max-w-3xl text-sm">
          {project.description}
        </p>
      ) : (
        <span>This project does not have a description yet.</span>
      )}

      <div className="flex items-center gap-3">
        <Avatar className="size-9">
          {project.owner?.avatarUrl && (
            <AvatarImage src={project.owner.avatarUrl} />
          )}
          <AvatarFallback />
        </Avatar>

        <div className="flex flex-col">
          <span className="text-foreground text-sm font-medium">
            {project.owner.name}
          </span>

          <span className="text-muted-foreground text-xs">
            {project.owner.email}
          </span>
        </div>
      </div>
    </div>
  )
}
