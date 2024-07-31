import React, { useState } from 'react'

import ConfirmModal from '@/components/target/detail/modal/ConfirmModal'
import { ITargetRepository } from '@/feature/infrastructure/repository/target_repository'
import { UpdateTargetStatusCompletedByIdUseCase } from '@/use_case/update_target_status_completed_by_id_use_case/update_target_status_completed_use_case'

interface ConfirmButtonProps {
  targetId: string
}

const ConfirmButton: React.FC<ConfirmButtonProps> = (
  props: ConfirmButtonProps
) => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleConfirm = async () => {
    try {
      const targetRepository = new ITargetRepository()
      new UpdateTargetStatusCompletedByIdUseCase({
        targetRepository: targetRepository,
      }).execute({ targetId: props.targetId })
    } catch (error) {
      console.error('Failed to confirm target:', error)
      alert('完了に失敗しました')
    }
    setModalOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className='px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700'
      >
        完了
      </button>
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  )
}

export default ConfirmButton
