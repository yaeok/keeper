import { Target } from '@/domain/entity/target_entity'
import { ITargetRepository } from '@/feature/infrastructure/repository/target_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface GetRecentThreeCompletedTargetsUseCaseInput extends UseCaseInput {}

interface GetRecentThreeCompletedTargetsUseCaseOutput extends UseCaseOutput {
  result: Target[]
}

/**
 * TargetとTaskを登録するユースケースクラス
 */
export class GetRecentThreeCompletedTargetsUseCase
  implements
    UseCase<
      GetRecentThreeCompletedTargetsUseCaseInput,
      Promise<GetRecentThreeCompletedTargetsUseCaseOutput>
    >
{
  private targetRepository: ITargetRepository

  constructor(args: { targetRepository: ITargetRepository }) {
    this.targetRepository = args.targetRepository
  }

  /**
   * TargetとTaskを登録するメソッド
   * @param input - TargetとTaskの情報を含むオブジェクト
   * @returns 登録結果
   */
  async execute(
    input: GetRecentThreeCompletedTargetsUseCaseInput
  ): Promise<GetRecentThreeCompletedTargetsUseCaseOutput> {
    try {
      const uid = '1'
      const targets =
        await this.targetRepository.getRecentThreeCompletedTargets({ uid })
      return { result: targets }
    } catch (error) {
      console.error('Failed to register target and tasks:', error)
      throw new Error('Failed to register target and tasks')
    }
  }
}
