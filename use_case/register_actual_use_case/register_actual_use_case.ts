import { Actual } from '@/domain/entity/actual_entity'
import { IActualRepository } from '@/feature/infrastructure/repository/actual_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface RegisterActualUseCaseInput extends UseCaseInput {
  actual: Actual
}

interface RegisterActualUseCaseOutput extends UseCaseOutput {
  result: boolean
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
    try {
      const actualId = await this.actualRepository.registerActual({ actual })
      if (!actualId) {
        return { result: false }
      }
      return { result: true }
    } catch (error) {
      console.error('Failed to register actual:', error)
      return { result: false }
    }
  }
}
