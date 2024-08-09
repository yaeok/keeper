export const TargetStatus = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  GIVEUP: 'giveup',
} as const

export type TargetStatusType = (typeof TargetStatus)[keyof typeof TargetStatus]
