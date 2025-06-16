import type { Role } from '@saas/auth'

export const formatRole = (role: Role) => {
  switch (role) {
    case 'ADMIN':
      return 'Administrator'

    case 'BILLING':
      return 'Billing Manager'

    default:
      return 'Member'
  }
}
