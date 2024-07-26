import React, { useState } from 'react'

import ActualsModal from '@/components/target/detail/modal/ActualsModal'
import { Task } from '@/domain/entity/task_entity'

interface ActualsButtonProps {
  tasks: Task[]
  targetId: string
}

const ActualsButton: React.FC<ActualsButtonProps> = ({ tasks, targetId }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleAddActual = (actualData: any) => {
    console.log('Submitted Data:', actualData)
    setModalOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
      >
        実績追加
      </button>
      <ActualsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddActual}
        tasks={tasks}
        targeId={targetId}
      />
    </>
  )
}

export default ActualsButton
