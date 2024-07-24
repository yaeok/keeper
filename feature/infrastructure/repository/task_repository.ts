import { Task } from '@/domain/entity/task_entity'
import { TaskRepository } from '@/domain/repository/task_repository'
import { TaskDTO } from '@/feature/dto/task/task_dto'
import { db, master } from '@/feature/infrastructure/firestore/config'
import { TaskMapper } from '@/feature/mapper/task_mapper'
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from '@firebase/firestore'

const TASK_COLLECTION = 'tasks'
const WHERE_EQUAL = '=='
const COLUMN_TARGET_ID = 'targetId'

/**
 * Firestoreを利用したTaskRepositoryの実装クラス
 */
export class ITaskRepository implements TaskRepository {
  /**
   * 複数のTaskを作成し、それらのIDを返します
   * @param args - 複数のTaskと対象のIDを含むオブジェクト
   * @returns 作成されたTaskのIDの配列
   */
  async createTasks(args: {
    tasks: Task[]
    targetId: string
  }): Promise<string[]> {
    try {
      const { tasks, targetId } = args
      console.log(tasks)
      const covTasks = tasks.map((task) => ({
        ...task,
        targetId,
      }))
      const regTasks = covTasks.map((task) => TaskDTO.fromEntity(task).toData())

      const taskIds: string[] = await Promise.all(
        regTasks.map(async (regTask) => {
          const docRef = await addDoc(
            collection(db, master, TASK_COLLECTION),
            regTask
          )
          await updateDoc(docRef, { taskId: docRef.id })
          return docRef.id
        })
      )

      return taskIds
    } catch (error) {
      console.error('Failed to create tasks:', error)
      throw new Error('Failed to create tasks')
    }
  }
  /**
   * 特定のターゲットIDに関連するタスクを取得するメソッド
   * @param args - ターゲットIDを含むオブジェクト
   * @returns タスクの配列
   */
  async getTasksByTargetId(args: { targetId: string }): Promise<Task[]> {
    try {
      const { targetId } = args
      const colRef = collection(db, master, TASK_COLLECTION)
      const q = query(colRef, where(COLUMN_TARGET_ID, WHERE_EQUAL, targetId))
      const querySnapshot = await getDocs(q)
      const tasks: Task[] = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return TaskMapper.toDomain(TaskDTO.fromDoc(data))
      })

      return tasks
    } catch (error) {
      console.error('Failed to get tasks:', error)
      throw new Error('Failed to get tasks')
    }
  }
}
