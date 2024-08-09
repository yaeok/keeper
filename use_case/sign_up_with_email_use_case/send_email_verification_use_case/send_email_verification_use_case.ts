import { IAuthRepository } from '@/feature/infrastructure/repository/auth_repository'
import { UseCase, UseCaseInput } from '@/use_case/use_case'

interface SendEmailVerificationUseCaseInput extends UseCaseInput {}

export class SendEmailVerificationUseCase
  implements UseCase<SendEmailVerificationUseCaseInput, Promise<void>>
{
  constructor(args: { authRepository: IAuthRepository }) {
    const { authRepository } = args
    this.authRepository = authRepository
  }

  private authRepository: IAuthRepository

  async execute(input: SendEmailVerificationUseCaseInput): Promise<void> {
    await this.authRepository.sendEmailVerification()
  }
}
