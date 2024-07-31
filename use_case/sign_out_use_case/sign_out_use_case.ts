import { IAuthRepository } from '@/feature/infrastructure/repository/auth_repository'
import { UseCase, UseCaseInput } from '@/use_case/use_case'

interface SignOutUseCaseInput extends UseCaseInput {}

export class SignOutUseCase
  implements UseCase<SignOutUseCaseInput, Promise<void>>
{
  constructor(args: { authRepository: IAuthRepository }) {
    const { authRepository } = args
    this.authRepository = authRepository
  }

  private authRepository: IAuthRepository

  async execute(): Promise<void> {
    await this.authRepository.signOut()
  }
}
