import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth'

import { AuthRepository } from '@/domain/repository/auth_repository'
import { auth } from '@/feature/infrastructure/firestore/config'

/** firebaseのエラー */
type FirebaseError = {
  code: string
  message: string
  name: string
}

const isFirebaseError = (e: Error): e is FirebaseError => {
  return 'code' in e && 'message' in e
}

export class IAuthRepository implements AuthRepository {
  async signInWithEmail(args: {
    email: string
    password: string
  }): Promise<UserCredential> {
    const { email, password } = args
    try {
      return await signInWithEmailAndPassword(auth, email, password)
    } catch (e: any) {
      if (isFirebaseError(e)) {
        throw new Error(e.message)
      }
      throw new Error('ログインに失敗しました')
    }
  }

  async signUpWithEmail(args: {
    email: string
    password: string
  }): Promise<UserCredential> {
    const { email, password } = args
    const userCredential: UserCredential = await new Promise<UserCredential>(
      (resolve) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((response: UserCredential) => {
            resolve(response)
          })
          .catch((error) => {
            console.log(error)
            if (isFirebaseError(error)) {
              switch (error.code) {
                case 'auth/user-not-found':
                  return 'ユーザーが見つかりません'
                case 'auth/wrong-password':
                  return 'パスワードが間違っています'
                default:
                  return 'エラーが発生しました'
              }
            } else {
              return 'エラーが発生しました'
            }
          })
      }
    )
    return userCredential
  }

  async signOut(): Promise<void> {
    try {
      await signOut(auth)
    } catch (e: any) {
      if (isFirebaseError(e)) {
        throw new Error(e.message)
      }
      throw new Error('ログアウトに失敗しました')
    }
  }

  async sendEmailVerification(): Promise<void> {
    const currentUser = auth.currentUser
    try {
      if (!currentUser) {
        throw new Error('ユーザが存在しません')
      }
      await sendEmailVerification(currentUser)
    } catch (e: any) {
      if (isFirebaseError(e)) {
        throw new Error(e.message)
      }
      throw new Error('メールの送信に失敗しました')
    }
  }

  // メール確認（修正要）
  async emailVerification(): Promise<void> {
    const currentUser = await auth.currentUser?.reload()
    try {
      if (!currentUser) {
        throw new Error('ユーザが存在しません')
      }
      if (!currentUser) {
        throw new Error('メールが認証されていません')
      }
    } catch (e: any) {
      if (isFirebaseError(e)) {
        throw new Error(e.message)
      }
      throw new Error('メールの送信に失敗しました')
    }
  }
}
