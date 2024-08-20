import { User, UserCredential } from '@firebase/auth'

export interface AuthRepository {
  signInWithEmail: (args: {
    email: string
    password: string
  }) => Promise<UserCredential>
  signUpWithEmail: (args: {
    email: string
    password: string
  }) => Promise<UserCredential>
  signOut: () => Promise<boolean>
  sendEmailVerification: () => Promise<boolean>
  emailVerification: () => Promise<User>
}
