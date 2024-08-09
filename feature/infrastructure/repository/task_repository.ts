import { Task } from '@/domain/entity/task_entity'
import { TaskRepository } from '@/domain/repository/task_repository'
import { TaskDTO } from '@/feature/dto/task/task_dto'
import { db, master } from '@/feature/infrastructure/firestore/config'
import { TaskMapper } from '@/feature/mapper/task_mapper'
import { Constants } from '@/utils/constants'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@firebase/firestore'

/**
 * Firestoreを利用したTaskRepositoryの実装クラス
 */
export class ITaskRepository implements TaskRepository {
  /**
   * 複数のTaskを作成し、それらのIDを返します
   * @param args - 複数のTaskと対象のIDを含むオブジェクト
   * @returns 作成されたTaskのIDの配列
   */
  async registerTasks(args: {
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
            collection(db, master, Constants.TASK_COLLECTION),
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
      const colRef = collection(db, master, Constants.TASK_COLLECTION)
      const q = query(
        colRef,
        where(Constants.COLUMN_TARGET_ID, Constants.WHERE_EQUAL, targetId)
      )
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

  /**
   * 指定されたタスクを更新するメソッド
   * @param args - タスクの配列を含むオブジェクト
   * @returns 更新されたタスクの配列
   * @throws タスクの更新に失敗した場合にエラーをスローします
   */
  async updateTasks(args: {
    tasks: Task[]
    targetId: string
  }): Promise<Task[]> {
    try {
      const { tasks } = args
      const updatedTasks = await Promise.all(
        tasks.map(async (task) => {
          const regTask = new Task({ ...task, targetId: args.targetId })
          const taskData = TaskDTO.fromEntity(regTask).toData()
          const now = new Date()

          if (!taskData.taskId) {
            const colRef = collection(db, master, Constants.TASK_COLLECTION)
            const docRef = await addDoc(colRef, taskData)
            await updateDoc(docRef, { taskId: docRef.id })
            return { ...task, taskId: docRef.id }
          } else {
            const docRef = doc(
              db,
              master,
              Constants.TASK_COLLECTION,
              taskData.taskId
            )
            await updateDoc(docRef, {
              ...taskData,
              updatedAt: now,
            })
            return { ...task, updatedAt: now }
          }
        })
      )
      return updatedTasks
    } catch (error) {
      console.error('Failed to update tasks:', error)
      throw new Error('Failed to update tasks')
    }
  }
}
