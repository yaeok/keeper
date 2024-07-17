import { IAuthRepository } from '@/infrastructure/repository/auth_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'
import { UserCredential } from '@firebase/auth'

interface SignInWithEmailUseCaseInput extends UseCaseInput {
  email: string
  password: string
}

interface SignInWithEmailCaseOutput extends UseCaseOutput {
  result: UserCredential
}

export class SignInWithEmailUseCase
  implements
    UseCase<SignInWithEmailUseCaseInput, Promise<SignInWithEmailCaseOutput>>
{
  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository
  }

  private authRepository: IAuthRepository

  async execute(
    input: SignInWithEmailUseCaseInput
  ): Promise<SignInWithEmailCaseOutput> {
    const result = await this.authRepository.signInWithEmail({
      email: input.email,
      password: input.password,
    })
    return { result }
  }
}
