import { User } from '@/domain/entity/user_entity'

export interface UserRepository {
  createUser: (args: {
    uid: string
    username: string
    email: string
  }) => Promise<User>

  getUserById: (args: { uid: string }) => Promise<User>
}
