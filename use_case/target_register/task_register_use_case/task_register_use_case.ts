import { Task } from '@/domain/entity/task_entity'
import { ITaskRepository } from '@/feature/infrastructure/repository/task_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface TaskRegisterUseCaseInput extends UseCaseInput {
  targetId: string
  tasks: Task[]
}

interface TaskRegisterUseCaseOutput extends UseCaseOutput {
  result: boolean
}

/**
 * Taskを登録するユースケースクラス
 */
export class TaskRegisterUseCase
  implements
    UseCase<TaskRegisterUseCaseInput, Promise<TaskRegisterUseCaseOutput>>
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
    input: TaskRegisterUseCaseInput
  ): Promise<TaskRegisterUseCaseOutput> {
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
