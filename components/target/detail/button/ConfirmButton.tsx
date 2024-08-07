import React, { useState } from 'react'

import ConfirmModal from '@/components/target/detail/modal/ConfirmModal'

interface ConfirmButtonProps {
  onConfirm: () => void
}

const ConfirmButton: React.FC<ConfirmButtonProps> = (
  props: ConfirmButtonProps
) => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleConfirm = async () => {
    props.onConfirm()
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
