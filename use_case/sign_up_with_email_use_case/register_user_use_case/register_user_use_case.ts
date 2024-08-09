import { User } from '@/domain/entity/user_entity'
import { IUserRepository } from '@/feature/infrastructure/repository/user_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'
import { UserCredential } from '@firebase/auth'

interface RegisterUserUseCaseInput extends UseCaseInput {
  user: UserCredential
  username: string
}

interface RegisterUserUseCaseOutput extends UseCaseOutput {
  result: User | null
}

export class RegisterUserUseCase
  implements
    UseCase<RegisterUserUseCaseInput, Promise<RegisterUserUseCaseOutput>>
{
  constructor(args: { userRepository: IUserRepository }) {
    const { userRepository } = args
    this.userRepository = userRepository
  }

  private userRepository: IUserRepository

  async execute(
    input: RegisterUserUseCaseInput
  ): Promise<RegisterUserUseCaseOutput> {
    let result = await this.userRepository.createUser({
      uid: input.user.user.uid,
      username: input.username,
      email: input.user.user.email!,
    })
    return { result }
  }
}
