import { Target } from '@/domain/entity/target_entity'

export interface TargetRepository {
  registerTarget: (args: { target: Target }) => Promise<string>

  getRecentThreeActiveTargets: (args: { uid: string }) => Promise<Target[]>
  getRecentThreeCompletedTargets: (args: { uid: string }) => Promise<Target[]>

  getTargetById: (args: { targetId: string }) => Promise<Target>

  getCompletedTargetCountByUserId: (args: { uid: string }) => Promise<number>
}
