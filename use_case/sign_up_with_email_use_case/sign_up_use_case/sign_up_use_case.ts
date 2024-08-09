import { IAuthRepository } from '@/feature/infrastructure/repository/auth_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'
import { UserCredential } from '@firebase/auth'

interface SignUpUseCaseInput extends UseCaseInput {
  username: string
  email: string
  password: string
}

interface SignUpUseCaseOutput extends UseCaseOutput {
  result: UserCredential | null
}

export class SignUpUseCase
  implements UseCase<SignUpUseCaseInput, Promise<SignUpUseCaseOutput>>
{
  constructor(args: { authRepository: IAuthRepository }) {
    const { authRepository } = args
    this.authRepository = authRepository
  }

  private authRepository: IAuthRepository

  async execute(input: SignUpUseCaseInput): Promise<SignUpUseCaseOutput> {
    const result = await this.authRepository.signUpWithEmail({
      email: input.email,
      password: input.password,
    })
    return { result }
  }
}
