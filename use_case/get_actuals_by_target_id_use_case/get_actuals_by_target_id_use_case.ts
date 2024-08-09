import { Actual } from '@/domain/entity/actual_entity'
import { IActualRepository } from '@/feature/infrastructure/repository/actual_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface GetActualsByTargetIdUseCaseInput extends UseCaseInput {
  id: string
}

interface GetActualsByTargetIdUseCaseOutput extends UseCaseOutput {
  actuals: Actual[]
}

/**
 * 指定されたIDの目標に関連するActualのリストを取得するユースケースクラス
 */
export class GetActualsByTargetIdUseCase
  implements
    UseCase<
      GetActualsByTargetIdUseCaseInput,
      Promise<GetActualsByTargetIdUseCaseOutput>
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
  async execute(
    input: GetActualsByTargetIdUseCaseInput
  ): Promise<GetActualsByTargetIdUseCaseOutput> {
    try {
      // 指定されたIDの目標に関連するActualをリポジトリから取得
      const actuals = await this.actualRepository.getActualsByTargetId({
        targetId: input.id,
      })
      return { actuals }
    } catch (error) {
      // エラーが発生した場合、エラーメッセージをコンソールに出力し、再度エラーをスロー
      console.error('Failed to get actuals by target ID:', error)
      throw new Error('Failed to get actuals by target ID')
    }
  }
}
