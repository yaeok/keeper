import { User } from '@/domain/entity/user_entity'
import { IAuthRepository } from '@/feature/infrastructure/repository/auth_repository'
import { IUserRepository } from '@/feature/infrastructure/repository/user_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface SignUpWithEmailUseCaseInput extends UseCaseInput {
  username: string
  email: string
  password: string
}

interface SignUpWithEmailUseCaseOutput extends UseCaseOutput {
  result: User | null
}

export class SignUpWithEmailUseCase
  implements
    UseCase<SignUpWithEmailUseCaseInput, Promise<SignUpWithEmailUseCaseOutput>>
{
  constructor(args: {
    authRepository: IAuthRepository
    userRepository: IUserRepository
  }) {
    const { authRepository, userRepository } = args
    this.authRepository = authRepository
    this.userRepository = userRepository
  }

  private authRepository: IAuthRepository
  private userRepository: IUserRepository

  async execute(
    input: SignUpWithEmailUseCaseInput
  ): Promise<SignUpWithEmailUseCaseOutput> {
    let result = null
    const response = await this.authRepository.signUpWithEmail({
      email: input.email,
      password: input.password,
    })
    if (response != null) {
      console.log(response)
      result = await this.userRepository.createUser({
        uid: response.user.uid,
        username: input.username,
        email: input.email!,
      })
    }
    return { result }
  }
}
