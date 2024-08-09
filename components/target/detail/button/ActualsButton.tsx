import React, { useState } from 'react'

import ActualsModal from '@/components/target/detail/modal/ActualsModal'
import { Task } from '@/domain/entity/task_entity'

interface ActualFormValues {
  studyDate: Date
  studyHours: number
  description: string
  taskId: string
}

interface ActualsButtonProps {
  tasks: Task[]
  onSubmit: (data: ActualFormValues) => void
}

const ActualsButton: React.FC<ActualsButtonProps> = ({
  tasks,
  onSubmit,
}: ActualsButtonProps) => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleAddActual = (actualData: ActualFormValues) => {
    onSubmit(actualData)
    setModalOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700'
      >
        実績追加
      </button>
      <ActualsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddActual}
        tasks={tasks}
      />
    </>
  )
}

export default ActualsButton
