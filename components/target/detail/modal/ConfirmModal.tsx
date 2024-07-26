import React from 'react'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='fixed inset-0 bg-black bg-opacity-50'></div>
      <div className='bg-white w-1/4 h-1/5 p-6 flex flex-col items-center justify-center rounded shadow-lg z-10 space-y-8'>
        <h2 className='text-xl font-semibold'>
          本当にこの目標を完了にしますか？
        </h2>
        <div className='flex space-x-12'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors'
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
          >
            完了にする
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
