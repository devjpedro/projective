import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_errors/unauthorized-error'

const PRICE_PER_MEMBER = 10
const PRICE_PER_PROJECT = 20

export function getOrganizationBilling(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/billing',
      {
        schema: {
          tags: ['billing'],
          summary: 'Get billing information from organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              billing: z.object({
                seats: z.object({
                  amount: z.number(),
                  unit: z.number(),
                  price: z.number(),
                }),
                projects: z.object({
                  amount: z.number(),
                  unit: z.number(),
                  price: z.number(),
                }),
                total: z.number(),
              }),
            }),
          },
        },
      },
      async (request) => {
        const { slug } = request.params
        const { organization, membership } =
          await request.getUserMembership(slug)
        const userId = await request.getCurrentUserId()

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('get', 'Billing'))
          throw new UnauthorizedError(
            `You're not allowed to get billing details from this organization.`,
          )

        const [ammountOfMembers, ammountOfProjects] = await Promise.all([
          prisma.member.count({
            where: {
              organizationId: organization.id,
              role: { not: 'MEMBER' },
            },
          }),

          prisma.project.count({
            where: {
              organizationId: organization.id,
            },
          }),
        ])

        return {
          billing: {
            seats: {
              amount: ammountOfMembers,
              unit: PRICE_PER_MEMBER,
              price: ammountOfMembers * PRICE_PER_MEMBER,
            },
            projects: {
              amount: ammountOfProjects,
              unit: PRICE_PER_PROJECT,
              price: ammountOfProjects * PRICE_PER_PROJECT,
            },
            total:
              ammountOfMembers * PRICE_PER_MEMBER +
              ammountOfProjects * PRICE_PER_PROJECT,
          },
        }
      },
    )
}
