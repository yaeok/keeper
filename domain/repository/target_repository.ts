import { Target } from '@/domain/entity/target_entity'

export interface TargetRepository {
  createTarget: (args: { target: Target }) => Promise<Target>
}
