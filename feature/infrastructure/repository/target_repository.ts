import { Target } from '@/domain/entity/target_entity'
import { TargetRepository } from '@/domain/repository/target_repository'
import { TargetDTO } from '@/feature/dto/target/target_dto'
import { db, master } from '@/feature/infrastructure/firestore/config'
import { TargetMapper } from '@/feature/mapper/target_mapper'
import { TargetStatus, TargetStatusType } from '@/utils/target_status'
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from '@firebase/firestore'

const COLLECTION_TARGET = 'targets'
const COLUMN_OWNERID = 'ownerId'
const WHERE_EQUAL = '=='
const COLUMN_CREATEDAT = 'createdAt'
const COLUMN_STATUS = 'status'
const ORDERBY_DESC = 'desc'
const RECENT_TARGETS_LIMIT = 3

/**
 * Firestoreを利用したTargetRepositoryの実装クラス
 */
export class ITargetRepository implements TargetRepository {
  /**
   * 新しいTargetを作成し、そのIDを返します
   * @param args - 新しいTargetを含むオブジェクト
   * @returns 作成されたTargetのID
   */
  async createTarget(args: { target: Target }): Promise<string> {
    try {
      const { target } = args
      const colRef = collection(db, master, COLLECTION_TARGET)
      const regInfo = TargetDTO.fromEntity(target).toData()

      const docRef = await addDoc(colRef, regInfo)
      await updateDoc(docRef, { targetId: docRef.id })

      return docRef.id
    } catch (error) {
      console.error('Failed to create target:', error)
      throw new Error('Failed to create target')
    }
  }
  /**
   * 指定されたユーザーの直近3件のアクティブな目標を取得するメソッド
   * @param args - ユーザーIDを含むオブジェクト
   * @returns 目標の配列
   */
  async getRecentThreeActiveTargets(args: { uid: string }): Promise<Target[]> {
    return this.getRecentThreeTargetsByStatus(args.uid, TargetStatus.ACTIVE)
  }

  /**
   * 指定されたユーザーの直近3件の完了した目標を取得するメソッド
   * @param args - ユーザーIDを含むオブジェクト
   * @returns 目標の配列
   */
  async getRecentThreeCompletedTargets(args: {
    uid: string
  }): Promise<Target[]> {
    return this.getRecentThreeTargetsByStatus(args.uid, TargetStatus.COMPLETED)
  }

  /**
   * 指定されたユーザーの直近3件の特定のステータスの目標を取得するメソッド
   * @param uid - ユーザーID
   * @param status - 目標のステータス
   * @returns 目標の配列
   */
  private async getRecentThreeTargetsByStatus(
    uid: string,
    status: TargetStatusType
  ): Promise<Target[]> {
    try {
      const colRef = collection(db, master, COLLECTION_TARGET)
      const q = query(
        colRef,
        where(COLUMN_OWNERID, WHERE_EQUAL, uid),
        where(COLUMN_STATUS, WHERE_EQUAL, status),
        orderBy(COLUMN_CREATEDAT, ORDERBY_DESC),
        limit(RECENT_TARGETS_LIMIT)
      )

      const querySnapshot = await getDocs(q)
      const targets: Target[] = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return TargetMapper.toDomain(TargetDTO.fromDoc(data))
      })

      return targets
    } catch (error) {
      console.error(
        `Failed to get recent three ${status.toLowerCase()} targets:`,
        error
      )
      throw new Error(
        `Failed to get recent three ${status.toLowerCase()} targets`
      )
    }
  }
}
