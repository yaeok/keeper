import { Actual } from '@/domain/entity/actual_entity'
import { ActualRepository } from '@/domain/repository/actual_repository'
import { ActualDTO } from '@/feature/dto/actual/actual_dto'
import { db, master } from '@/feature/infrastructure/firestore/config'
import { ActualMapper } from '@/feature/mapper/actual_mapper'
import { Constants } from '@/utils/constants'
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from '@firebase/firestore'

/**
 * Firestoreを利用したActualRepositoryの実装クラス
 */
export class IActualRepository implements ActualRepository {
  /**
   * 指定されたTaskIDに関連するActualを取得するメソッド
   * @param args - タスクIDを含むオブジェクト
   * @returns Actualオブジェクト
   */
  async getActualByTaskId(args: { taskId: string }): Promise<Actual> {
    try {
      const { taskId } = args
      const colRef = collection(db, master, Constants.COLLECTION_ACTUALS)
      const q = query(
        colRef,
        where(Constants.COLUMN_TASK_ID, Constants.WHERE_EQUAL, taskId)
      )
      const querySnapshot = await getDocs(q)

      const actual = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return ActualMapper.toDomain(ActualDTO.fromDoc(data))
      })[0]

      return actual
    } catch (error) {
      console.error('Failed to get actual by task ID:', error)
      throw new Error('Failed to get actual by task ID')
    }
  }

  /**
   * 新しいActualを登録するメソッド
   * @param args - Actualオブジェクトを含むオブジェクト
   * @returns 登録されたActualのID
   */
  async registerActual(args: { actual: Actual }): Promise<string> {
    try {
      const { actual } = args
      const colRef = collection(db, master, Constants.COLLECTION_ACTUALS)
      const refInfo = ActualDTO.fromEntity(actual).toData()

      const docRef = await addDoc(colRef, refInfo)
      await updateDoc(docRef, { actualId: docRef.id })

      return docRef.id
    } catch (error) {
      console.error('Failed to register actual:', error)
      throw new Error('Failed to register actual')
    }
  }

  /**
   * 指定されたターゲットIDに関連するActualのリストを取得するメソッド
   * @param args - ターゲットIDを含むオブジェクト
   * @returns Actualオブジェクトの配列
   * @throws Actualの取得に失敗した場合にエラーをスローします
   */
  async getActualsByTargetId(args: { targetId: string }): Promise<Actual[]> {
    try {
      const { targetId } = args
      const colRef = collection(db, master, Constants.COLLECTION_ACTUALS)
      const q = query(
        colRef,
        where(Constants.COLUMN_TARGET_ID, Constants.WHERE_EQUAL, targetId)
      )

      const querySnapshot = await getDocs(q)
      const actuals = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return ActualMapper.toDomain(ActualDTO.fromDoc(data))
      })

      return actuals
    } catch (error) {
      console.error('Failed to get actuals by target ID:', error)
      throw new Error('Failed to get actuals by target ID')
    }
  }

  /**
   * 指定されたユーザーIDの今月のActualのリストを取得するメソッド
   * @param args - ユーザーIDを含むオブジェクト
   * @returns 今月のActualオブジェクトの配列
   * @throws Actualの取得に失敗した場合にエラーをスローします
   */
  async getActualsByUserIdForMonthly(args: {
    userId: string
  }): Promise<Actual[]> {
    try {
      const { userId } = args
      const colRef = collection(db, master, Constants.COLLECTION_ACTUALS)

      // 現在の年月の開始と終了を取得
      const startOfMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      )
      const endOfMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      )

      const q = query(
        colRef,
        where(Constants.COLUMN_OWNER_ID, Constants.WHERE_EQUAL, userId),
        where(
          Constants.COLUMN_CREATED_AT,
          Constants.WHERE_GREATER_EQUAL,
          startOfMonth
        ),
        where(
          Constants.COLUMN_CREATED_AT,
          Constants.WHERE_LESS_EQUAL,
          endOfMonth
        )
      )

      const querySnapshot = await getDocs(q)
      const actuals = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return ActualMapper.toDomain(ActualDTO.fromDoc(data))
      })

      return actuals
    } catch (error) {
      console.error('Failed to get actuals by user ID for monthly:', error)
      throw new Error('Failed to get actuals by user ID for monthly')
    }
  }
}
