import { Target } from '@/domain/entity/target_entity'
import { ITargetRepository } from '@/feature/infrastructure/repository/target_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface UpdateTargetUseCaseInput extends UseCaseInput {
  target: Target
}

interface UpdateTargetUseCaseOutput extends UseCaseOutput {
  result: Target
}

/**
 * Targetを更新する総合的なユースケースクラス
 */
export class UpdateTargetUseCase
  implements
    UseCase<UpdateTargetUseCaseInput, Promise<UpdateTargetUseCaseOutput>>
{
  private targetRepository: ITargetRepository

  constructor(args: { targetRepository: ITargetRepository }) {
    this.targetRepository = args.targetRepository
  }
  /**
   * Targetを更新するメソッド
   * @param input - Targetの情報を含むオブジェクト
   * @returns 更新結果
   */
  async execute(
    input: UpdateTargetUseCaseInput
  ): Promise<UpdateTargetUseCaseOutput> {
    try {
      const tasks = await this.targetRepository.updateTarget({
        target: input.target,
      })

      return { result: tasks }
    } catch (error) {
      console.error('Failed to register target and tasks:', error)
      throw new Error('Failed to register target and tasks')
    }
  }
}
