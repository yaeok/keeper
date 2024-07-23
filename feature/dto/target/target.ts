import { DocumentData } from 'firebase/firestore'

import { DataTransferObject } from '@/feature/dto/dto'
import { Target } from '@/domain/entity/target_entity'

export class TargetDTO implements DataTransferObject {
  constructor(args: {
    targetId: string
    target: string
    studyDays: number[]
    studyHoursPerDay: number
    status: string
    startDate: string
    endDate: string
    ownerId: string
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
    this.ownerId = args.ownerId
    this.createdAt = args.createdAt
    this.updatedAt = args.updatedAt
    this.deletedAt = args.deletedAt
  }

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
  /** 所有者Id */
  ownerId: string
  /** 作成日 */
  createdAt: Date
  /** 更新日 */
  updatedAt: Date
  /** 削除日 */
  deletedAt: Date | null

  static fromDoc(doc: DocumentData): TargetDTO {
    return new TargetDTO({
    })
  }

  static fromEntity(entity: Target): TargetDTO {
    return new TargetDTO({})
  }

  toData(): { [name: string]: any } {
    return {}
  }
}
