import { DocumentData } from 'firebase/firestore'

import { Actual } from '@/domain/entity/actual_entity'
import { DataTransferObject } from '@/feature/dto/dto'

export class ActualDTO implements DataTransferObject {
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

  static fromDoc(doc: DocumentData): ActualDTO {
    return new ActualDTO({
      actualId: doc.actualId,
      studyDate: doc.studyDate.toDate(),
      studyHours: doc.studyHours,
      targetId: doc.targetId,
      taskId: doc.taskId,
      ownerId: doc.ownerId,
      memo: doc.memo,
      createdAt: doc.createdAt.toDate(),
      updatedAt: doc.updatedAt.toDate(),
      deletedAt: doc.deletedAt ? doc.deletedAt.toDate() : null,
    })
  }

  static fromEntity(entity: Actual): ActualDTO {
    return new ActualDTO({
      actualId: entity.actualId,
      studyDate: entity.studyDate,
      studyHours: entity.studyHours,
      targetId: entity.targetId,
      taskId: entity.taskId,
      ownerId: entity.ownerId,
      memo: entity.memo,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    })
  }

  toData(): { [name: string]: any } {
    return {
      actualId: this.actualId,
      studyDate: this.studyDate,
      studyHours: this.studyHours,
      targetId: this.targetId,
      taskId: this.taskId,
      ownerId: this.ownerId,
      memo: this.memo,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    }
  }
}
