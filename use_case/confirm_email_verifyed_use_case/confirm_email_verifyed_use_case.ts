import { IAuthRepository } from '@/feature/infrastructure/repository/auth_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'
import { User } from '@firebase/auth'

interface ConfirmEmailVerifyedUseCaseInput extends UseCaseInput {}

interface ConfirmEmailVerifyedUseCaseOutput extends UseCaseOutput {
  user: User
}

export class ConfirmEmailVerifyedUseCase
  implements
    UseCase<
      ConfirmEmailVerifyedUseCaseInput,
      Promise<ConfirmEmailVerifyedUseCaseOutput>
    >
{
  private authRepository: IAuthRepository

  constructor(args: { authRepository: IAuthRepository }) {
    this.authRepository = args.authRepository
  }

  async execute(): Promise<ConfirmEmailVerifyedUseCaseOutput> {
    const user = await this.authRepository.emailVerification()
    return { user }
  }
}
