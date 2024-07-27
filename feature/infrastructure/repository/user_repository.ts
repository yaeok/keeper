import { User } from '@/domain/entity/user_entity'
import { UserRepository } from '@/domain/repository/user_repository'
import { UserDTO } from '@/feature/dto/user/user_dto'
import { db, master } from '@/feature/infrastructure/firestore/config'
import { Constants } from '@/utils/constants'
import { doc, setDoc } from '@firebase/firestore'

/**
 * Firestoreを利用したUserRepositoryの実装クラス
 */
export class IUserRepository implements UserRepository {
  /**
   * ユーザーを作成するメソッド
   * @param args - ユーザーの情報を含むオブジェクト
   * @returns 作成されたユーザー
   */
  async createUser(args: {
    uid: string
    username: string
    email: string
  }): Promise<User> {
    try {
      const { uid, username, email } = args

      const docRef = doc(db, master, Constants.COLLECTION_USER, uid)

      const userInfo = UserDTO.fromEntity(
        new User({
          uid: uid,
          username: username,
          email: email,
          imageUrl: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        })
      )

      const regUserInfo = userInfo.toData()
      await setDoc(docRef, regUserInfo)

      return userInfo
    } catch (error) {
      console.error('Failed to create user:', error)
      throw new Error('Failed to create user')
    }
  }
}
