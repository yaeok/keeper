import { ITargetRepository } from '@/feature/infrastructure/repository/target_repository'
import { UseCase, UseCaseInput } from '@/use_case/use_case'

interface UpdateTargetStatusCompletedByIdUseCaseInput extends UseCaseInput {
  targetId: string
}

/**
 * Targetを更新する総合的なユースケースクラス
 */
export class UpdateTargetStatusCompletedByIdUseCase
  implements UseCase<UpdateTargetStatusCompletedByIdUseCaseInput, void>
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
    input: UpdateTargetStatusCompletedByIdUseCaseInput
  ): Promise<void> {
    try {
      await this.targetRepository.updateTargetStatusCompletedById({
        targetId: input.targetId,
      })
    } catch (error) {
      console.error('Failed to register target and tasks:', error)
      throw new Error('Failed to register target and tasks')
    }
  }
}
