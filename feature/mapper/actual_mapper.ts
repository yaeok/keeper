import { Actual } from '@/domain/entity/actual_entity'
import { ActualDTO } from '@/feature/dto/actual/actual_dto'

export class ActualMapper {
  static toDomain(task: ActualDTO): Actual {
    return new Actual({
      actualId: task.actualId,
      date: task.date,
      studyHours: task.studyHours,
      taskId: task.taskId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      deletedAt: task.deletedAt,
    })
  }
}
