import { Actual } from '@/domain/entity/actual_entity'

export interface ActualRepository {
  getActualByTaskId: (args: { taskId: string }) => Promise<Actual>
}