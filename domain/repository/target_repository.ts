import { Target } from '@/domain/entity/target_entity'

export interface TargetRepository {
  createTarget: (args: { target: Target }) => Promise<string>

  getRecentThreeActiveTargets: (args: { uid: string }) => Promise<Target[]>
  getRecentThreeCompletedTargets: (args: { uid: string }) => Promise<Target[]>

  getTargetById: (args: { targetId: string }) => Promise<Target>
}
