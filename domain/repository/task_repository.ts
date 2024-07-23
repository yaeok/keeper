import { Task } from '@/domain/entity/task_entity'

export interface TaskRepository {
  createTasks: (args: { tasks: Task[]; targetId: string }) => Promise<string[]>
}