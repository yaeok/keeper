import { auth } from '@/feature/infrastructure/firestore/config'
import { ITargetRepository } from '@/feature/infrastructure/repository/target_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface GetCompletedTargetCountByUserIdUseCaseInput extends UseCaseInput {}

interface GetCompletedTargetCountByUserIdUseCaseOutput extends UseCaseOutput {
  count: number
}

/**
 * TargetとTaskを登録するユースケースクラス
 */
export class GetCompletedTargetCountByUserIdUseCase
  implements
    UseCase<
      GetCompletedTargetCountByUserIdUseCaseInput,
      Promise<GetCompletedTargetCountByUserIdUseCaseOutput>
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
  async execute(): Promise<GetCompletedTargetCountByUserIdUseCaseOutput> {
    try {
      const uid = auth.currentUser?.uid ?? ''
      const count = await this.targetRepository.getCompletedTargetCountByUserId(
        {
          uid,
        }
      )
      return { count }
    } catch (error) {
      console.error('Failed to register target and tasks:', error)
      throw new Error('Failed to register target and tasks')
    }
  }
}
