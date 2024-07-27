import { Target } from '@/domain/entity/target_entity'
import { ITargetRepository } from '@/feature/infrastructure/repository/target_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface GetTargetByIdUseCaseInput extends UseCaseInput {
  id: string
}

interface GetTargetByIdUseCaseOutput extends UseCaseOutput {
  target: Target
}

/**
 * 指定されたIDの目標を取得するユースケースクラス
 */
export class GetTargetByIdUseCase
  implements
    UseCase<GetTargetByIdUseCaseInput, Promise<GetTargetByIdUseCaseOutput>>
{
  private targetRepository: ITargetRepository

  constructor(args: { targetRepository: ITargetRepository }) {
    this.targetRepository = args.targetRepository
  }

  /**
   * 指定されたIDの目標を取得するメソッド
   * @param input - 目標IDを含むオブジェクト
   * @returns 取得した目標
   */
  async execute(
    input: GetTargetByIdUseCaseInput
  ): Promise<GetTargetByIdUseCaseOutput> {
    try {
      // 指定されたIDの目標をリポジトリから取得
      const target = await this.targetRepository.getTargetById({
        targetId: input.id,
      })
      return { target }
    } catch (error) {
      // エラーが発生した場合、エラーメッセージをコンソールに出力し、再度エラーをスロー
      console.error('Failed to get target by id:', error)
      throw new Error('Failed to get target by id')
    }
  }
}
