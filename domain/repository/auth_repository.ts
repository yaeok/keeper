import { UserCredential } from '@firebase/auth'

export interface AuthRepository {
  signInWithEmail: (args: {
    email: string
    password: string
  }) => Promise<UserCredential>
  signUpWithEmail: (args: {
    email: string
    password: string
  }) => Promise<UserCredential>
  signOut: () => Promise<void>
  sendEmailVerification: () => Promise<void>
  emailVerification: () => Promise<void>
}
