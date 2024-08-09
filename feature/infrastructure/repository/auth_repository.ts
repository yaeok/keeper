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

/**
 * Firestoreを利用したAuthRepositoryの実装クラス
 */
export class IAuthRepository implements AuthRepository {
  /**
   * Emailとパスワードでサインインするメソッド
   * @param args - emailとpasswordを含むオブジェクト
   * @returns UserCredential
   */
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

  /**
   * Emailとパスワードでサインアップするメソッド
   * @param args - emailとpasswordを含むオブジェクト
   * @returns UserCredential
   */
  async signUpWithEmail(args: {
    email: string
    password: string
  }): Promise<UserCredential> {
    const { email, password } = args
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      return userCredential
    } catch (error: any) {
      if (isFirebaseError(error)) {
        switch (error.code) {
          case 'auth/user-not-found':
            throw new Error('ユーザーが見つかりません')
          case 'auth/wrong-password':
            throw new Error('パスワードが間違っています')
          case 'auth/email-already-in-use':
            throw new Error('このメールアドレスは既に使用されています')
          default:
            throw new Error('エラーが発生しました')
        }
      } else {
        throw new Error('エラーが発生しました')
      }
    }
  }

  /**
   * サインアウトするメソッド
   * @returns void
   */
  async signOut(): Promise<boolean> {
    try {
      await signOut(auth)
      return true
    } catch (e: any) {
      if (isFirebaseError(e)) {
        throw new Error(e.message)
      }
      throw new Error('ログアウトに失敗しました')
    }
  }

  /**
   * メール認証を送信するメソッド
   * @returns void
   */
  async sendEmailVerification(): Promise<void> {
    const currentUser = auth.currentUser
    try {
      if (!currentUser) {
        throw new Error('ユーザーが存在しません')
      }
      await sendEmailVerification(currentUser)
    } catch (e: any) {
      if (isFirebaseError(e)) {
        throw new Error(e.message)
      }
      throw new Error('メールの送信に失敗しました')
    }
  }

  /**
   * メール確認を行うメソッド
   * @returns void
   */
  async emailVerification(): Promise<void> {
    try {
      const currentUser = auth.currentUser
      if (!currentUser) {
        throw new Error('ユーザーが存在しません')
      }
      await currentUser.reload()
      if (!currentUser.emailVerified) {
        throw new Error('メールが認証されていません')
      }
    } catch (e: any) {
      if (isFirebaseError(e)) {
        throw new Error(e.message)
      }
      throw new Error('メールの確認に失敗しました')
    }
  }
}
