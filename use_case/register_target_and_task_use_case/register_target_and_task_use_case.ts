import { Target } from '@/domain/entity/target_entity'
import { Task } from '@/domain/entity/task_entity'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

import { RegisterTargetUseCase } from './register_target_use_case/register_target_use_case'
import { RegisterTaskUseCase } from './register_task_use_case/register_task_use_case'

interface RegisterTargetAndTaskUseCaseInput extends UseCaseInput {
  target: Target
  tasks: Task[]
}

interface RegisterTargetAndTaskUseCaseOutput extends UseCaseOutput {
  result: boolean
}

/**
 * TargetとTaskを登録する総合的なユースケースクラス
 */
export class RegisterTargetAndTaskUseCase
  implements
    UseCase<
      RegisterTargetAndTaskUseCaseInput,
      Promise<RegisterTargetAndTaskUseCaseOutput>
    >
{
  private registerTargetUseCase: RegisterTargetUseCase
  private registerTaskUseCase: RegisterTaskUseCase

  constructor(args: {
    registerTargetUseCase: RegisterTargetUseCase
    registerTaskUseCase: RegisterTaskUseCase
  }) {
    this.registerTargetUseCase = args.registerTargetUseCase
    this.registerTaskUseCase = args.registerTaskUseCase
  }
  /**
   * TargetとTaskを登録するメソッド
   * @param input - TargetとTaskの情報を含むオブジェクト
   * @returns 登録結果
   */
  async execute(
    input: RegisterTargetAndTaskUseCaseInput
  ): Promise<RegisterTargetAndTaskUseCaseOutput> {
    try {
      const targetResult = await this.registerTargetUseCase.execute({
        target: input.target,
      })

      const taskResult = await this.registerTaskUseCase.execute({
        tasks: input.tasks,
        targetId: targetResult.result,
      })

      return { result: taskResult.result }
    } catch (error) {
      console.error('Failed to register target and tasks:', error)
      throw new Error('Failed to register target and tasks')
    }
  }
}
