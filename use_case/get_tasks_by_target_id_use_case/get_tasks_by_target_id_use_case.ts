import { Task } from '@/domain/entity/task_entity'
import { ITaskRepository } from '@/feature/infrastructure/repository/task_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface GetTaskByTargetIdUseCaseInput extends UseCaseInput {
  targetId: string
}

interface GetTaskByTargetIdUseCaseOutput extends UseCaseOutput {
  tasks: Task[]
}

/**
 * 指定された目標IDのタスクを取得するユースケースクラス
 */
export class GetTaskByTargetIdUseCase
  implements
    UseCase<
      GetTaskByTargetIdUseCaseInput,
      Promise<GetTaskByTargetIdUseCaseOutput>
    >
{
  private taskRepository: ITaskRepository

  constructor(args: { taskRepository: ITaskRepository }) {
    this.taskRepository = args.taskRepository
  }

  /**
   * 指定された目標IDのタスクを取得するメソッド
   * @param input - 目標IDを含むオブジェクト
   * @returns 取得したタスク
   */
  async execute(
    input: GetTaskByTargetIdUseCaseInput
  ): Promise<GetTaskByTargetIdUseCaseOutput> {
    try {
      // 指定された目標IDのタスクをリポジトリから取得
      const tasks = await this.taskRepository.getTasksByTargetId({
        targetId: input.targetId,
      })
      return { tasks }
    } catch (error) {
      // エラーが発生した場合、エラーメッセージをコンソールに出力し、再度エラーをスロー
      console.error('Failed to get task by target id:', error)
      throw new Error('Failed to get task by target id')
    }
  }
}
