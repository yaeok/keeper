export class Actual {
  /** 実績Id */
  actualId: string
  /** 学習日 */
  date: string
  /** 学習時間 */
  studyHours: number
  /** 目標Id */
  targetId: string
  /** タスクId */
  taskId: string
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
    date: string
    studyHours: number
    targetId: string
    taskId: string
    memo: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
  }) {
    this.actualId = args.actualId
    this.date = args.date
    this.studyHours = args.studyHours
    this.targetId = args.targetId
    this.taskId = args.taskId
    this.memo = args.memo
    this.createdAt = args.createdAt
    this.updatedAt = args.updatedAt
    this.deletedAt = args.deletedAt
  }
}
