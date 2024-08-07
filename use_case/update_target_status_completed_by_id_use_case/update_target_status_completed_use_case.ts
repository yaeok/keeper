import { ITargetRepository } from '@/feature/infrastructure/repository/target_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface UpdateTargetStatusCompletedByIdUseCaseInput extends UseCaseInput {
  targetId: string
}

interface UpdateTargetStatusCompletedByIdUseCaseOutput extends UseCaseOutput {
  result: boolean
}

/**
 * Targetを更新する総合的なユースケースクラス
 */
export class UpdateTargetStatusCompletedByIdUseCase
  implements
    UseCase<
      UpdateTargetStatusCompletedByIdUseCaseInput,
      Promise<UpdateTargetStatusCompletedByIdUseCaseOutput>
    >
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
  ): Promise<UpdateTargetStatusCompletedByIdUseCaseOutput> {
    try {
      const result =
        await this.targetRepository.updateTargetStatusCompletedById({
          targetId: input.targetId,
        })
      return { result }
    } catch (error) {
      console.error('Failed to register target and tasks:', error)
      throw new Error('Failed to register target and tasks')
    }
  }
}
