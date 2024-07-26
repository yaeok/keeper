import React, { useState } from 'react'

import ConfirmModal from '@/components/target/detail/modal/ConfirmModal'

const ConfirmButton: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleConfirm = () => {
    console.log('目標を完了としてマーク')
    setModalOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className='px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700'
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
