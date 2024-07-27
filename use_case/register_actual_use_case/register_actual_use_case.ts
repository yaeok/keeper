import { Actual } from '@/domain/entity/actual_entity'
import { auth } from '@/feature/infrastructure/firestore/config'
import { IActualRepository } from '@/feature/infrastructure/repository/actual_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface RegisterActualUseCaseInput extends UseCaseInput {
  actual: Actual
}

interface RegisterActualUseCaseOutput extends UseCaseOutput {
  actual: Actual
}

export class RegisterActualUseCase
  implements
    UseCase<RegisterActualUseCaseInput, Promise<RegisterActualUseCaseOutput>>
{
  constructor(args: { actualRepository: IActualRepository }) {
    const { actualRepository } = args
    this.actualRepository = actualRepository
  }

  private actualRepository: IActualRepository

  async execute(
    input: RegisterActualUseCaseInput
  ): Promise<RegisterActualUseCaseOutput> {
    const { actual } = input
    const uid = auth.currentUser?.uid ?? ''
    try {
      const regActual = new Actual({
        ...actual,
        ownerId: uid,
      })
      const actualId = await this.actualRepository.registerActual({
        actual: regActual,
      })

      const response: Actual = {
        ...actual,
        actualId: actualId,
      }

      return { actual: response }
    } catch (error) {
      console.error('Failed to register actual:', error)
      throw new Error('Failed to register actual')
    }
  }
}
