import { Task } from '@/domain/entity/task_entity'
import { ITaskRepository } from '@/feature/infrastructure/repository/task_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface UpdateTaskUseCaseInput extends UseCaseInput {
  tasks: Task[]
  targetId: string
}

interface UpdateTaskUseCaseOutput extends UseCaseOutput {
  result: Task[]
}

/**
 * Taskを更新する総合的なユースケースクラス
 */
export class UpdateTaskUseCase
  implements UseCase<UpdateTaskUseCaseInput, Promise<UpdateTaskUseCaseOutput>>
{
  private taskRepository: ITaskRepository

  constructor(args: { taskRepository: ITaskRepository }) {
    this.taskRepository = args.taskRepository
  }
  /**
   * Taskを更新するメソッド
   * @param input - Taskの情報を含むオブジェクト
   * @returns 更新結果
   */
  async execute(
    input: UpdateTaskUseCaseInput
  ): Promise<UpdateTaskUseCaseOutput> {
    try {
      const tasks = await this.taskRepository.updateTasks({
        tasks: input.tasks,
        targetId: input.targetId,
      })

      return { result: tasks }
    } catch (error) {
      console.error('Failed to register target and tasks:', error)
      throw new Error('Failed to register target and tasks')
    }
  }
}
