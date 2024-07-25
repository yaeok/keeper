import { DocumentData } from 'firebase/firestore'

import { Actual } from '@/domain/entity/actual_entity'
import { DataTransferObject } from '@/feature/dto/dto'

export class ActualDTO implements DataTransferObject {
  constructor(args: {
    actualId: string
    date: string
    studyHours: number
    taskId: string
    memo: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
  }) {
    this.actualId = args.actualId
    this.date = args.date
    this.studyHours = args.studyHours
    this.taskId = args.taskId
    this.memo = args.memo
    this.createdAt = args.createdAt
    this.updatedAt = args.updatedAt
    this.deletedAt = args.deletedAt
  }

  /** 実績Id */
  actualId: string
  /** 学習日 */
  date: string
  /** 学習時間 */
  studyHours: number
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

  static fromDoc(doc: DocumentData): ActualDTO {
    return new ActualDTO({
      actualId: doc.actualId,
      date: doc.date,
      studyHours: doc.studyHours,
      taskId: doc.taskId,
      memo: doc.memo,
      createdAt: doc.createdAt.toDate(),
      updatedAt: doc.updatedAt.toDate(),
      deletedAt: doc.deletedAt ? doc.deletedAt.toDate() : null,
    })
  }

  static fromEntity(entity: Actual): ActualDTO {
    return new ActualDTO({
      actualId: entity.actualId,
      date: entity.date,
      studyHours: entity.studyHours,
      taskId: entity.taskId,
      memo: entity.memo,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    })
  }

  toData(): { [name: string]: any } {
    return {
      actualId: this.actualId,
      date: this.date,
      studyHours: this.studyHours,
      taskId: this.taskId,
      memo: this.memo,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    }
  }
}
