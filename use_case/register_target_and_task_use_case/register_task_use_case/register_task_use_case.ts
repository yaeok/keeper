import { Task } from '@/domain/entity/task_entity'
import { ITaskRepository } from '@/feature/infrastructure/repository/task_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface RegisterTaskUseCaseInput extends UseCaseInput {
  targetId: string
  tasks: Task[]
}

interface RegisterTaskUseCaseOutput extends UseCaseOutput {
  result: boolean
}

/**
 * Taskを登録するユースケースクラス
 */
export class RegisterTaskUseCase
  implements
    UseCase<RegisterTaskUseCaseInput, Promise<RegisterTaskUseCaseOutput>>
{
  private taskRepository: ITaskRepository

  constructor(args: { taskRepository: ITaskRepository }) {
    this.taskRepository = args.taskRepository
  }

  /**
   * Taskを登録するメソッド
   * @param input - TargetとTaskの情報を含むオブジェクト
   * @returns 登録結果
   */
  async execute(
    input: RegisterTaskUseCaseInput
  ): Promise<RegisterTaskUseCaseOutput> {
    try {
      const taskResult: string[] = await this.taskRepository.createTasks({
        tasks: input.tasks,
        targetId: input.targetId,
      })

      const result = taskResult && taskResult.length > 0

      return { result }
    } catch (error) {
      console.error('Failed to register tasks:', error)
      throw new Error('Failed to register tasks')
    }
  }
}
