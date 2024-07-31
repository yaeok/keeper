import React, { useState } from 'react'

import EditModal from '@/components/target/detail/modal/EditModal'
import { Target } from '@/domain/entity/target_entity'
import { Task } from '@/domain/entity/task_entity'

interface CombinedEditFormValues {
  target: Target
  tasks: Task[]
}

interface EditModalButtonProps {
  tasks: Task[]
  target: Target
  onUpdate: (updateData: CombinedEditFormValues) => void
}

const EditModalButton: React.FC<EditModalButtonProps> = (
  props: EditModalButtonProps
) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => setModalOpen(true)
  const handleCloseModal = () => setModalOpen(false)

  const handleUpdate = (updateData: CombinedEditFormValues) => {
    props.onUpdate(updateData)
    setModalOpen(false)
  }

  return (
    <>
      <button
        onClick={handleOpenModal}
        className='px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700'
      >
        編集
      </button>
      {isModalOpen && (
        <EditModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
          tasks={props.tasks}
          target={props.target}
        />
      )}
    </>
  )
}

export default EditModalButton
