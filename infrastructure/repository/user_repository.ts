import { User } from '@/domain/entity/user_entity'
import { UserRepository } from '@/domain/repository/user_repository'
import { db, master } from '@/infrastructure/firestore/config'
import { addDoc, collection } from '@firebase/firestore'

import { UserDTO } from '../dto/user/user_dto'

export class IUserRepository implements UserRepository {
  async createUser(args: {
    uid: string
    username: string
    email: string
  }): Promise<User> {
    const { uid, username, email } = args

    const colRef = collection(db, master, 'users', uid)

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
    console.log(userInfo)
    const regUserInfo = userInfo.toData()
    console.log(regUserInfo)

    await addDoc(colRef, { regUserInfo })
    return userInfo
  }
}
