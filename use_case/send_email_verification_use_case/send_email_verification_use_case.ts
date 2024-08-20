import { IAuthRepository } from '@/feature/infrastructure/repository/auth_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface SendEmailVerificationUseCaseInput extends UseCaseInput {}

interface SendEmailVerificationUseCaseOutput extends UseCaseOutput {
  result: boolean
}

export class SendEmailVerificationUseCase
  implements
    UseCase<
      SendEmailVerificationUseCaseInput,
      Promise<SendEmailVerificationUseCaseOutput>
    >
{
  constructor(args: { authRepository: IAuthRepository }) {
    const { authRepository } = args
    this.authRepository = authRepository
  }

  private authRepository: IAuthRepository

  async execute(): Promise<SendEmailVerificationUseCaseOutput> {
    try {
      const result = await this.authRepository.sendEmailVerification()
      return { result }
    } catch (error) {
      console.log(error)
      throw new Error('メールの送信に失敗しました')
    }
  }
}
