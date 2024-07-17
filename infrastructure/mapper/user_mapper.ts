import { User } from '@/domain/entity/user_entity'
import { UserDTO } from '@/infrastructure/dto/user/user_dto'

export class UserMapper {
  static toDomain(user: UserDTO): User {
    return new User({
      uid: user.uid,
      username: user.username,
      email: user.email,
      imageUrl: user.imageUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    })
  }
}
