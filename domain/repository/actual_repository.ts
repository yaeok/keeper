import { Actual } from '@/domain/entity/actual_entity'

export interface ActualRepository {
  getActualByTaskId: (args: { taskId: string }) => Promise<Actual>
  registerActual: (args: { actual: Actual }) => Promise<string>
  getActualsByTargetId: (args: { targetId: string }) => Promise<Actual[]>
  getActualsByUserIdForMonthly: (args: { userId: string }) => Promise<Actual[]>
}
