export class User {
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
}
