export class Target {
  /** ターゲットId */
  targetId: string
  /** ターゲット名 */
  target: string
  /** 学習日 */
  studyDays: number[]
  /** 1日の学習時間 */
  studyHoursPerDay: number
  /** ステータス */
  status: string
  /** 開始日 */
  startDate: string
  /** 終了日 */
  endDate: string
  /** 作成日 */
  createdAt: Date
  /** 更新日 */
  updatedAt: Date
  /** 削除日 */
  deletedAt: Date | null
  constructor(args: {
    targetId: string
    target: string
    studyDays: number[]
    studyHoursPerDay: number
    status: string
    startDate: string
    endDate: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
  }) {
    this.targetId = args.targetId
    this.target = args.target
    this.studyDays = args.studyDays
    this.studyHoursPerDay = args.studyHoursPerDay
    this.status = args.status
    this.startDate = args.startDate
    this.endDate = args.endDate
    this.createdAt = args.createdAt
    this.updatedAt = args.updatedAt
    this.deletedAt = args.deletedAt
  }
}
