import { Task } from '@/domain/entity/task_entity'

export interface TaskRepository {
  registerTasks: (args: {
    tasks: Task[]
    targetId: string
  }) => Promise<string[]>

  getTasksByTargetId: (args: { targetId: string }) => Promise<Task[]>
}
