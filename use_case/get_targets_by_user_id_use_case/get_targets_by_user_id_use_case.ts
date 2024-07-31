import { Target } from '@/domain/entity/target_entity'
import { auth } from '@/feature/infrastructure/firestore/config'
import { ITargetRepository } from '@/feature/infrastructure/repository/target_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface GetTargetsByUserIdUseCaseInput extends UseCaseInput {}

interface GetTargetsByUserIdUseCaseOutput extends UseCaseOutput {
  targets: Target[]
}

/**
 * 指定された目標IDのタスクを取得するユースケースクラス
 */
export class GetTargetsByUserIdUseCase
  implements
    UseCase<
      GetTargetsByUserIdUseCaseInput,
      Promise<GetTargetsByUserIdUseCaseOutput>
    >
{
  private targetRepository: ITargetRepository

  constructor(args: { targetRepository: ITargetRepository }) {
    this.targetRepository = args.targetRepository
  }

  /**
   * 指定された目標IDのタスクを取得するメソッド
   * @param input - 目標IDを含むオブジェクト
   * @returns 取得したタスク
   */
  async execute(): Promise<GetTargetsByUserIdUseCaseOutput> {
    try {
      const uid = auth.currentUser?.uid ?? ''
      console.log('uid_usecase:', uid)
      // 指定された目標IDのタスクをリポジトリから取得
      const targets = await this.targetRepository.getTargetsByUserId({
        uid: uid,
      })
      return { targets }
    } catch (error) {
      // エラーが発生した場合、エラーメッセージをコンソールに出力し、再度エラーをスロー
      console.error('Failed to get task by target id:', error)
      throw new Error('Failed to get task by target id')
    }
  }
}
