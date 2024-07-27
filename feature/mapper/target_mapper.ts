import { Target } from '@/domain/entity/target_entity'
import { TargetDTO } from '@/feature/dto/target/target_dto'

export class TargetMapper {
  static toDomain(task: TargetDTO): Target {
    return new Target({
      targetId: task.targetId,
      target: task.target,
      studyDays: task.studyDays,
      studyHoursPerDay: task.studyHoursPerDay,
      status: task.status,
      startDate: task.startDate,
      endDate: task.endDate,
      ownerId: task.ownerId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      deletedAt: task.deletedAt,
    })
  }
}
