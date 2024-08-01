export class Actual {
  /** 実績Id */
  actualId: string
  /** 学習日 */
  studyDate: Date
  /** 学習時間 */
  studyHours: number
  /** 目標Id */
  targetId: string
  /** タスクId */
  taskId: string
  /** 所有者Id */
  ownerId: string
  /** メモ */
  memo: string
  /** 作成日 */
  createdAt: Date
  /** 更新日 */
  updatedAt: Date
  /** 削除日 */
  deletedAt: Date | null
  constructor(args: {
    actualId: string
    studyDate: Date
    studyHours: number
    targetId: string
    taskId: string
    ownerId: string
    memo: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
  }) {
    this.actualId = args.actualId
    this.studyDate = args.studyDate
    this.studyHours = args.studyHours
    this.targetId = args.targetId
    this.taskId = args.taskId
    this.ownerId = args.ownerId
    this.memo = args.memo
    this.createdAt = args.createdAt
    this.updatedAt = args.updatedAt
    this.deletedAt = args.deletedAt
  }
}
