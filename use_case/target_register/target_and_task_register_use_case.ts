import { Target } from '@/domain/entity/target_entity'
import { Task } from '@/domain/entity/task_entity'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'
import { TargetRegisterUseCase } from '@/use_case/target_register/target_register_use_case/target_register_use_case'
import { TaskRegisterUseCase } from '@/use_case/target_register/task_register_use_case/task_register_use_case'

interface TargetAndTaskRegisterUseCaseInput extends UseCaseInput {
  target: Target
  tasks: Task[]
}

interface TargetAndTaskRegisterUseCaseOutput extends UseCaseOutput {
  result: boolean
}

/**
 * TargetとTaskを登録する総合的なユースケースクラス
 */
export class TargetAndTaskRegisterUseCase
  implements
    UseCase<
      TargetAndTaskRegisterUseCaseInput,
      Promise<TargetAndTaskRegisterUseCaseOutput>
    >
{
  private targetRegisterUseCase: TargetRegisterUseCase
  private taskRegisterUseCase: TaskRegisterUseCase

  constructor(args: {
    targetRegisterUseCase: TargetRegisterUseCase
    taskRegisterUseCase: TaskRegisterUseCase
  }) {
    this.targetRegisterUseCase = args.targetRegisterUseCase
    this.taskRegisterUseCase = args.taskRegisterUseCase
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
      const targetResult = await this.targetRegisterUseCase.execute({
        target: input.target,
      })

      const taskResult = await this.taskRegisterUseCase.execute({
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
