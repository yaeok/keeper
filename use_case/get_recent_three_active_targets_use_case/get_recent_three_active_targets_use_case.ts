import { Target } from '@/domain/entity/target_entity'
import { ITargetRepository } from '@/feature/infrastructure/repository/target_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface GetRecentThreeActiveTargetsUseCaseInput extends UseCaseInput {}

interface GetRecentThreeActiveTargetsUseCaseOutput extends UseCaseOutput {
  result: Target[]
}

/**
 * TargetとTaskを登録するユースケースクラス
 */
export class GetRecentThreeActiveTargetsUseCase
  implements
    UseCase<
      GetRecentThreeActiveTargetsUseCaseInput,
      Promise<GetRecentThreeActiveTargetsUseCaseOutput>
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
    input: GetRecentThreeActiveTargetsUseCaseInput
  ): Promise<GetRecentThreeActiveTargetsUseCaseOutput> {
    try {
      const uid = '1'
      const targets = await this.targetRepository.getRecentThreeActiveTargets({
        uid,
      })
      return { result: targets }
    } catch (error) {
      console.error('Failed to register target and tasks:', error)
      throw new Error('Failed to register target and tasks')
    }
  }
}
