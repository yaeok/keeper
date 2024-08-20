import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  User,
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
    } catch (error: any) {
      if (isFirebaseError(error)) {
        switch (error.code) {
          case 'auth/invalid-credential':
            throw new Error('認証情報が正しくありません')
          case 'auth/too-many-requests':
            throw new Error(
              'リクエストが多すぎます。後でもう一度お試しください'
            )
          default:
            throw new Error('エラーが発生しました')
        }
      }
      throw new Error('エラーが発生しました')
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
          case 'auth/invalid-email':
            throw new Error('メールアドレスの形式が正しくありません')
          case 'auth/invalid-password':
            throw new Error('パスワードの形式が正しくありません')
          case 'auth/email-already-in-use':
            throw new Error('このメールアドレスは既に使用されています')
          case 'auth/too-many-requests':
            throw new Error(
              'リクエストが多すぎます。後でもう一度お試しください'
            )
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
  async sendEmailVerification(): Promise<boolean> {
    const currentUser = auth.currentUser
    try {
      if (!currentUser) {
        throw new Error('ユーザーが存在しません')
      }
      await sendEmailVerification(currentUser)
      return true
    } catch (e: any) {
      if (isFirebaseError(e)) {
        switch (e.code) {
          case 'auth/too-many-requests':
            throw new Error(
              'リクエストが多すぎます。後でもう一度お試しください'
            )
          default:
            throw new Error('メールの送信に失敗しました')
        }
      } else {
        throw new Error('メールの送信に失敗しました')
      }
    }
  }

  /**
   * メール確認を行うメソッド
   * @returns void
   */
  async emailVerification(): Promise<User> {
    try {
      const currentUser = auth.currentUser
      if (!currentUser) {
        throw new Error('ユーザーが存在しません')
      }
      await currentUser.reload()
      return currentUser
    } catch (e: any) {
      console.log(e)
      if (isFirebaseError(e)) {
        throw new Error(e.message)
      }
      throw new Error('メールの確認に失敗しました')
    }
  }
}
