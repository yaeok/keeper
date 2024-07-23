import { Task } from '@/domain/entity/task_entity'
import { TaskDTO } from '@/feature/dto/task/task_dto'

export class TaskMapper {
  static toDomain(task: TaskDTO): Task {
    return new Task({
      taskId: task.taskId,
      task: task.task,
      content: task.content,
      priority: task.priority,
      taskStudyHours: task.taskStudyHours,
      targetId: task.targetId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      deletedAt: task.deletedAt,
    })
  }
}
