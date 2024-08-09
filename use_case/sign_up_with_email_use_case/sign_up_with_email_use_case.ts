import { User } from '@/domain/entity/user_entity'
import { RegisterUserUseCase } from '@/use_case/sign_up_with_email_use_case/register_user_use_case/register_user_use_case'
import { SendEmailVerificationUseCase } from '@/use_case/sign_up_with_email_use_case/send_email_verification_use_case/send_email_verification_use_case'
import { SignUpUseCase } from '@/use_case/sign_up_with_email_use_case/sign_up_use_case/sign_up_use_case'
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
    registerUserUseCase: RegisterUserUseCase
    sendEmailVerificationUseCase: SendEmailVerificationUseCase
    signUpUseCase: SignUpUseCase
  }) {
    const { registerUserUseCase, sendEmailVerificationUseCase, signUpUseCase } =
      args
    this.registerUserUseCase = registerUserUseCase
    this.sendEmailVerificationUseCase = sendEmailVerificationUseCase
    this.signUpUseCase = signUpUseCase
  }

  private registerUserUseCase: RegisterUserUseCase
  private sendEmailVerificationUseCase: SendEmailVerificationUseCase
  private signUpUseCase: SignUpUseCase

  async execute(
    input: SignUpWithEmailUseCaseInput
  ): Promise<SignUpWithEmailUseCaseOutput> {
    const signUpResult = await this.signUpUseCase.execute({
      email: input.email,
      password: input.password,
      username: input.username,
    })
    if (signUpResult.result) {
      const registerUserResult = await this.registerUserUseCase.execute({
        user: signUpResult.result,
        username: input.username,
      })
      if (registerUserResult.result) {
        await this.sendEmailVerificationUseCase.execute({})
      }
      return { result: registerUserResult.result }
    } else {
      return { result: null }
    }
  }
}
