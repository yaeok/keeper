import { Target } from '@/domain/entity/target_entity'
import { auth } from '@/feature/infrastructure/firestore/config'
import { ITargetRepository } from '@/feature/infrastructure/repository/target_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface TargetRegisterUseCaseInput extends UseCaseInput {
  target: Target
}

interface TargetRegisterUseCaseOutput extends UseCaseOutput {
  result: string
}

/**
 * Targetを登録するユースケースクラス
 */
export class TargetRegisterUseCase
  implements
    UseCase<TargetRegisterUseCaseInput, Promise<TargetRegisterUseCaseOutput>>
{
  private targetRepository: ITargetRepository

  constructor(args: { targetRepository: ITargetRepository }) {
    this.targetRepository = args.targetRepository
  }

  /**
   * Targetを登録するメソッド
   * @param input - Targetの情報を含むオブジェクト
   * @returns 登録結果
   */
  async execute(
    input: TargetRegisterUseCaseInput
  ): Promise<TargetRegisterUseCaseOutput> {
    try {
      const uid = auth.currentUser?.uid ?? ''
      const regTarget = new Target({
        ...input.target,
        ownerId: uid,
      })

      const targetId = await this.targetRepository.createTarget({
        target: regTarget,
      })

      return { result: targetId }
    } catch (error) {
      console.error('Failed to register target:', error)
      throw new Error('Failed to register target')
    }
  }
}

