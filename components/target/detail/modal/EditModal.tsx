// EditModal.tsx
import React from 'react'

import CombinedEditForm from '@/components/target/detail/CombinedEditForm'
import { Target } from '@/domain/entity/target_entity'
import { Task } from '@/domain/entity/task_entity'

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  target: Target
  tasks: Task[]
  onUpdate: (updatedTarget: Target, updatedTasks: Task[]) => void
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  target,
  tasks,
  onUpdate,
}) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='fixed inset-0 bg-black bg-opacity-50'></div>
      <div className='relative bg-white p-6 rounded-lg shadow-lg z-10 overflow-auto h-4/5 w-3/4 md:w-1/2'>
        <section className='flex justify-between items-center'>
          <h2 className='text-lg font-semibold'>目標とタスクの編集</h2>
          <button
            onClick={onClose}
            className='px-6 py-2 bg-red-500 text-white rounded hover:bg-red-700'
          >
            閉じる
          </button>
        </section>
        <CombinedEditForm
          target={target}
          tasks={tasks}
          onUpdate={(updatedTarget, updatedTasks) => {
            onUpdate(updatedTarget, updatedTasks)
            onClose() // 更新後にモーダルを閉じる
          }}
        />
      </div>
    </div>
  )
}

export default EditModal
