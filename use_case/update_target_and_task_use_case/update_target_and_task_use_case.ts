import { Target } from '@/domain/entity/target_entity'
import { Task } from '@/domain/entity/task_entity'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'
import { UpdateTargetUseCase } from '@/use_case/update_target_and_task_use_case/update_target_use_case/update_target_use_case'
import { UpdateTaskUseCase } from '@/use_case/update_target_and_task_use_case/update_task_use_case/update_task_use_case'

interface UpdateTargetAndTaskUseCaseInput extends UseCaseInput {
  target: Target
  tasks: Task[]
}

interface UpdateTargetAndTaskUseCaseOutput extends UseCaseOutput {
  target: Target
  tasks: Task[]
}

/**
 * TargetとTaskを更新する総合的なユースケースクラス
 */
export class UpdateTargetAndTaskUseCase
  implements
    UseCase<
      UpdateTargetAndTaskUseCaseInput,
      Promise<UpdateTargetAndTaskUseCaseOutput>
    >
{
  private updateTargetUseCase: UpdateTargetUseCase
  private updateTaskUseCase: UpdateTaskUseCase

  constructor(args: {
    updateTargetUseCase: UpdateTargetUseCase
    updateTaskUseCase: UpdateTaskUseCase
  }) {
    this.updateTargetUseCase = args.updateTargetUseCase
    this.updateTaskUseCase = args.updateTaskUseCase
  }

  /**
   * TargetとTaskを更新するメソッド
   * @param input - TargetとTaskの情報を含むオブジェクト
   * @returns 登録結果
   */
  async execute(
    input: UpdateTargetAndTaskUseCaseInput
  ): Promise<UpdateTargetAndTaskUseCaseOutput> {
    try {
      const targetResult = await this.updateTargetUseCase.execute({
        target: input.target,
      })

      const taskResult = await this.updateTaskUseCase.execute({
        tasks: input.tasks,
        targetId: input.target.targetId,
      })

      return { target: targetResult.result, tasks: taskResult.result }
    } catch (error) {
      console.error('Failed to register target and tasks:', error)
      throw new Error('Failed to register target and tasks')
    }
  }
}
