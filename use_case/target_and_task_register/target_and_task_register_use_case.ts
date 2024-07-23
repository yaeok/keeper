import { Target } from '@/domain/entity/target_entity'
import { Task } from '@/domain/entity/task_entity'
import { ITargetRepository } from '@/feature/infrastructure/repository/target_repository'
import { ITaskRepository } from '@/feature/infrastructure/repository/task_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface TargetAndTaskRegisterUseCaseInput extends UseCaseInput {
  target: Target
  tasks: Task[]
}

interface TargetAndTaskRegisterUseCaseOutput extends UseCaseOutput {
  result: boolean
}

/**
 * TargetとTaskを登録するユースケースクラス
 */
export class TargetAndTaskRegisterUseCase
  implements
    UseCase<
      TargetAndTaskRegisterUseCaseInput,
      Promise<TargetAndTaskRegisterUseCaseOutput>
    >
{
  private targetRepository: ITargetRepository
  private taskRepository: ITaskRepository

  constructor(args: {
    targetRepository: ITargetRepository
    taskRepository: ITaskRepository
  }) {
    this.targetRepository = args.targetRepository
    this.taskRepository = args.taskRepository
  }

  /**
   * TargetとTaskを登録するメソッド
   * @param input - TargetとTaskの情報を含むオブジェクト
   * @returns 登録結果
   */
  async execute(
    input: TargetAndTaskRegisterUseCaseInput
  ): Promise<TargetAndTaskRegisterUseCaseOutput> {
    try {
      const targetId = await this.targetRepository.createTarget({
        target: input.target,
      })
      console.log(targetId)
      if (targetId) {
        const taskResult: string[] = await this.taskRepository.createTasks({
          tasks: input.tasks,
          targetId: targetId,
        })

        if (taskResult && taskResult.length > 0) {
          return { result: true }
        }
      }

      return { result: false }
    } catch (error) {
      console.error('Failed to register target and tasks:', error)
      return { result: false }
    }
  }
}
