import { Actual } from '@/domain/entity/actual_entity'
import { ActualDTO } from '@/feature/dto/actual/actual_dto'

export class ActualMapper {
  static toDomain(actual: ActualDTO): Actual {
    return new Actual({
      actualId: actual.actualId,
      date: actual.date,
      studyHours: actual.studyHours,
      targetId: actual.targetId,
      taskId: actual.taskId,
      ownerId: actual.ownerId,
      memo: actual.memo,
      createdAt: actual.createdAt,
      updatedAt: actual.updatedAt,
      deletedAt: actual.deletedAt,
    })
  }
}
