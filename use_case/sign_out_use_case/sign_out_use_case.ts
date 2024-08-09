import { IAuthRepository } from '@/feature/infrastructure/repository/auth_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface SignOutUseCaseInput extends UseCaseInput {}

interface SignOutUseCaseOutput extends UseCaseOutput {
  result: boolean
}

export class SignOutUseCase
  implements UseCase<SignOutUseCaseInput, Promise<SignOutUseCaseOutput>>
{
  constructor(args: { authRepository: IAuthRepository }) {
    const { authRepository } = args
    this.authRepository = authRepository
  }

  private authRepository: IAuthRepository

  async execute(): Promise<SignOutUseCaseOutput> {
    try {
      const result = await this.authRepository.signOut()
      return { result }
    } catch (error) {
      console.log(error)
      throw new Error('ログアウトに失敗しました')
    }
  }
}
