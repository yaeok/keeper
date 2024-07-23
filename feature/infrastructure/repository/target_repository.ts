import { Target } from '@/domain/entity/target_entity'
import { TargetRepository } from '@/domain/repository/target_repository'

export class ITargetRepository implements TargetRepository {
  async createTarget(args: { target: Target }): Promise<Target> {}
}
