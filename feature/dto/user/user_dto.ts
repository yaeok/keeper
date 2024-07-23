import { DocumentData } from 'firebase/firestore'

import { User } from '@/domain/entity/user_entity'
import { DataTransferObject } from '@/feature/dto/dto'

export class UserDTO implements DataTransferObject {
  constructor(args: {
    uid: string
    username: string
    email: string
    imageUrl: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
  }) {
    this.uid = args.uid
    this.username = args.username
    this.email = args.email
    this.imageUrl = args.imageUrl
    this.createdAt = args.createdAt
    this.updatedAt = args.updatedAt
    this.deletedAt = args.deletedAt
  }

  /** ユーザId */
  uid: string
  /** ユーザ名 */
  username: string
  /** メールアドレス */
  email: string
  /** イメージURL */
  imageUrl: string
  /** 作成日 */
  createdAt: Date
  /** 更新日 */
  updatedAt: Date
  /** 削除日 */
  deletedAt: Date | null

  static fromDoc(doc: DocumentData): UserDTO {
    return new UserDTO({
      uid: doc.uid,
      username: doc.username,
      email: doc.email,
      imageUrl: doc.imageUrl,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      deletedAt: doc.deletedAt,
    })
  }

  static fromEntity(entity: User): UserDTO {
    return new UserDTO({
      uid: entity.uid,
      username: entity.username,
      email: entity.email,
      imageUrl: entity.imageUrl,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    })
  }

  toData(): { [name: string]: any } {
    return {
      uid: this.uid,
      username: this.username,
      email: this.email,
      imageUrl: this.imageUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    }
  }
}
