import React, { useState } from 'react'

import EditModal from '@/components/target/detail/modal/EditModal'
import { Target } from '@/domain/entity/target_entity'
import { Task } from '@/domain/entity/task_entity'

interface EditModalButtonProps {
  tasks: Task[]
  target: Target
}

const EditModalButton: React.FC<EditModalButtonProps> = ({ tasks, target }) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => setModalOpen(true)
  const handleCloseModal = () => setModalOpen(false)

  const handleUpdate = (updatedTarget: Target, updatedTasks: Task[]) => {
    console.log('Update Target and Tasks:', updatedTarget, updatedTasks)
    setModalOpen(false)
  }

  return (
    <>
      <button
        onClick={handleOpenModal}
        className='px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700'
      >
        編集
      </button>
      {isModalOpen && (
        <EditModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
          tasks={tasks}
          target={target}
        />
      )}
    </>
  )
}

export default EditModalButton
