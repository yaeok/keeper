import { Actual } from '@/domain/entity/actual_entity'
import { auth } from '@/feature/infrastructure/firestore/config'
import { IActualRepository } from '@/feature/infrastructure/repository/actual_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface GetActualsByUserIdForMonthlyUseCaseInput extends UseCaseInput {}

interface GetActualsByUserIdForMonthlyUseCaseOutput extends UseCaseOutput {
  actuals: Actual[]
}

/**
 * 指定されたIDの目標に関連するActualのリストを取得するユースケースクラス
 */
export class GetActualsByUserIdForMonthlyUseCase
  implements
    UseCase<
      GetActualsByUserIdForMonthlyUseCaseInput,
      Promise<GetActualsByUserIdForMonthlyUseCaseOutput>
    >
{
  private actualRepository: IActualRepository

  constructor(args: { actualRepository: IActualRepository }) {
    this.actualRepository = args.actualRepository
  }

  /**
   * 指定されたIDの目標に関連するActualのリストを取得するメソッド
   * @param input - ターゲットIDを含むオブジェクト
   * @returns 取得したActualの配列
   * @throws Actualの取得に失敗した場合にエラーをスローします
   */
  async execute(): Promise<GetActualsByUserIdForMonthlyUseCaseOutput> {
    const uid = auth.currentUser?.uid ?? ''
    try {
      // 指定されたIDの目標に関連するActualをリポジトリから取得
      const actuals = await this.actualRepository.getActualsByUserIdForMonthly({
        userId: uid,
      })
      return { actuals }
    } catch (error) {
      // エラーが発生した場合、エラーメッセージをコンソールに出力し、再度エラーをスロー
      console.error('Failed to get actuals by target ID:', error)
      throw new Error('Failed to get actuals by target ID')
    }
  }
}
