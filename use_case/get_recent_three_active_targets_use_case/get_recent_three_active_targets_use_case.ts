import { Target } from '@/domain/entity/target_entity'
import { auth } from '@/feature/infrastructure/firestore/config'
import { ITargetRepository } from '@/feature/infrastructure/repository/target_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface GetRecentThreeActiveTargetsUseCaseInput extends UseCaseInput {}

interface GetRecentThreeActiveTargetsUseCaseOutput extends UseCaseOutput {
  targets: Target[]
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
  async execute(): Promise<GetRecentThreeActiveTargetsUseCaseOutput> {
    try {
      const uid = auth.currentUser?.uid ?? ''
      const targets = await this.targetRepository.getRecentThreeActiveTargets({
        uid,
      })
      return { targets }
    } catch (error) {
      console.error('Failed to register target and tasks:', error)
      throw new Error('Failed to register target and tasks')
    }
  }
}
