import { Target } from '@/domain/entity/target_entity'
import { TargetRepository } from '@/domain/repository/target_repository'
import { TargetDTO } from '@/feature/dto/target/target_dto'
import { db, master } from '@/feature/infrastructure/firestore/config'
import { TargetMapper } from '@/feature/mapper/target_mapper'
import { Constants } from '@/utils/constants'
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

/**
 * Firestoreを利用したTargetRepositoryの実装クラス
 */
export class ITargetRepository implements TargetRepository {
  /**
   * 新しいTargetを作成し、そのIDを返します
   * @param args - 新しいTargetを含むオブジェクト
   * @returns 作成されたTargetのID
   */
  async registerTarget(args: { target: Target }): Promise<string> {
    try {
      const { target } = args
      const colRef = collection(db, master, Constants.COLLECTION_TARGET)
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
      const colRef = collection(db, master, Constants.COLLECTION_TARGET)
      const q = query(
        colRef,
        where(Constants.COLUMN_OWNER_ID, Constants.WHERE_EQUAL, uid),
        where(Constants.COLUMN_STATUS, Constants.WHERE_EQUAL, status),
        orderBy(Constants.COLUMN_CREATED_AT, Constants.ORDERBY_DESC),
        limit(Constants.RECENT_TARGETS_LIMIT)
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

  /**
   * 指定されたIDの目標を取得するメソッド
   * @param args - 目標IDを含むオブジェクト
   * @returns 目標
   */
  async getTargetById(args: { targetId: string }): Promise<Target> {
    try {
      const { targetId } = args
      const colRef = collection(db, master, Constants.COLLECTION_TARGET)
      const q = query(
        colRef,
        where(Constants.COLUMN_TARGET_ID, Constants.WHERE_EQUAL, targetId)
      )

      const querySnapshot = await getDocs(q)
      const targets = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return TargetMapper.toDomain(TargetDTO.fromDoc(data))
      })

      // 最初の目標を返す
      return targets[0]
    } catch (error) {
      console.error('Failed to get target by id:', error)
      throw new Error('Failed to get target by id')
    }
  }
}
