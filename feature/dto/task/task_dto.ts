import { DocumentData } from 'firebase/firestore'

import { Task } from '@/domain/entity/task_entity'
import { DataTransferObject } from '@/feature/dto/dto'

export class TaskDTO implements DataTransferObject {
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

  static fromDoc(doc: DocumentData): TaskDTO {
    return new TaskDTO({
      taskId: doc.taskId,
      task: doc.task,
      content: doc.content,
      priority: doc.priority,
      taskStudyHours: doc.taskStudyHours,
      targetId: doc.targetId,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      deletedAt: doc.deletedAt,
    })
  }

  static fromEntity(entity: Task): TaskDTO {
    return new TaskDTO({
      taskId: entity.taskId,
      task: entity.task,
      content: entity.content,
      priority: entity.priority,
      taskStudyHours: entity.taskStudyHours,
      targetId: entity.targetId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    })
  }

  toData(): { [name: string]: any } {
    return {
      taskId: this.taskId,
      task: this.task,
      content: this.content,
      priority: this.priority,
      taskStudyHours: this.taskStudyHours,
      targetId: this.targetId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    }
  }
}
