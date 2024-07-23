export class Task {
  /** タスクId */
  taskId: string
  /** タスク名 */
  task: string
  /** 内容 */
  content: string
  /** 優先順位 */
  priority: number
  /** 予定時間 */
  taskStudyHours: number
  /** 目標Id */
  targetId: string
  /** 作成日 */
  createdAt: Date
  /** 更新日 */
  updatedAt: Date
  /** 削除日 */
  deletedAt: Date | null
  constructor(args: {
    taskId: string
    task: string
    content: string
    priority: number
    taskStudyHours: number
    targetId: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
  }) {
    this.taskId = args.taskId
    this.task = args.task
    this.content = args.content
    this.priority = args.priority
    this.taskStudyHours = args.taskStudyHours
    this.targetId = args.targetId
    this.createdAt = args.createdAt
    this.updatedAt = args.updatedAt
    this.deletedAt = args.deletedAt
  }
}
