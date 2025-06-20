import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { getCurrentOrg } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getProjects } from '@/http/get-projects'

dayjs.extend(relativeTime)

export async function ProjectList() {
  const currentOrg = await getCurrentOrg()
  const { projects } = await getProjects(currentOrg!)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {projects.map((project) => {
        return (
          <Card key={project.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription className="line-clamp-3">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center gap-1.5">
              <Avatar className="size-4">
                {project.owner.avatarUrl && (
                  <AvatarImage src={project.owner.avatarUrl} />
                )}
                <AvatarFallback />
              </Avatar>

              <span className="text-muted-foreground text-xs">
                <span className="text-foreground font-medium">
                  {project.owner.name}
                </span>{' '}
                {dayjs(project.createdAt).fromNow()}
              </span>

              <Button size="xs" variant="outline" className="ml-auto" asChild>
                <Link href={`/org/${currentOrg}/project/${project.slug}`}>
                  View <ArrowRight className="ml-2 size-3" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
