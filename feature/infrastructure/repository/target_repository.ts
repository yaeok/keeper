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
  doc,
  getCountFromServer,
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

      return targets[0]
    } catch (error) {
      console.error('Failed to get target by id:', error)
      throw new Error('Failed to get target by id')
    }
  }

  /**
   * 指定されたユーザーIDの完了したターゲットの数を取得するメソッド
   * @param args - ユーザーIDを含むオブジェクト
   * @returns 完了したターゲットの数
   * @throws 完了したターゲットの数の取得に失敗した場合にエラーをスローします
   */
  async getCompletedTargetCountByUserId(args: {
    uid: string
  }): Promise<number> {
    try {
      const { uid } = args
      const colRef = collection(db, master, Constants.COLLECTION_TARGET)
      const q = query(
        colRef,
        where(Constants.COLUMN_OWNER_ID, Constants.WHERE_EQUAL, uid),
        where(
          Constants.COLUMN_STATUS,
          Constants.WHERE_EQUAL,
          TargetStatus.COMPLETED
        )
      )

      const querySnapshot = await getCountFromServer(q)
      const count = querySnapshot.data().count

      return count
    } catch (error) {
      console.error('Failed to get completed target count by user id:', error)
      throw new Error('Failed to get completed target count by user id')
    }
  }

  /**
   * 指定されたターゲットを更新するメソッド
   * @param args - ターゲットを含むオブジェクト
   * @returns 更新されたターゲット
   * @throws ターゲットの更新に失敗した場合にエラーをスローします
   */
  async updateTarget(args: { target: Target }): Promise<Target> {
    try {
      const { target } = args
      const targetData = TargetDTO.fromEntity(target).toData()
      const now = new Date()

      const docRef = doc(
        db,
        master,
        Constants.COLLECTION_TARGET,
        targetData.targetId
      )
      await updateDoc(docRef, {
        ...targetData,
        updatedAt: now,
      })

      return {
        ...target,
        updatedAt: now,
      }
    } catch (error) {
      console.error('Failed to update target:', error)
      throw new Error('Failed to update target')
    }
  }

  /**
   * 指定されたユーザーIDのターゲットを取得するメソッド
   * @param args - ユーザーIDを含むオブジェクト
   * @returns ターゲットの配列
   * @throws ターゲットの取得に失敗した場合にエラーをスローします
   */
  async getTargetsByUserId(args: { uid: string }): Promise<Target[]> {
    try {
      const { uid } = args
      console.log('uid:', uid)
      const colRef = collection(db, master, Constants.COLLECTION_TARGET)
      const q = query(
        colRef,
        where(Constants.COLUMN_OWNER_ID, Constants.WHERE_EQUAL, uid)
      )

      const querySnapshot = await getDocs(q)
      const targets: Target[] = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return TargetMapper.toDomain(TargetDTO.fromDoc(data))
      })
      console.log('targets:', targets)

      return targets
    } catch (error) {
      console.error('Failed to get targets by user id:', error)
      throw new Error('Failed to get targets by user id')
    }
  }

  /**
   * 指定されたIDの目標のステータスを完了に更新するメソッド
   * @param args - 目標IDを含むオブジェクト
   * @throws 目標のステータスの更新に失敗した場合にエラーをスローします
   * @returns なし
   */
  async updateTargetStatusCompletedById(args: {
    targetId: string
  }): Promise<boolean> {
    try {
      const { targetId } = args
      const docRef = doc(db, master, Constants.COLLECTION_TARGET, targetId)
      await updateDoc(docRef, {
        status: TargetStatus.COMPLETED,
      })
      return true
    } catch (error) {
      console.error('Failed to update target status completed by id:', error)
      throw new Error('Failed to update target status completed by id')
    }
  }
}
