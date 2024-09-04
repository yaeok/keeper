import React from 'react'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = (
  props: ConfirmModalProps
) => {
  if (!props.isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div
        className='fixed inset-0 bg-black bg-opacity-50'
        onClick={props.onClose}
      ></div>
      <div className='bg-white h-1/5 p-12 flex flex-col items-center justify-center rounded shadow-lg z-10 space-y-8'>
        <h2 className='text-xl'>本当にこの目標を完了にしますか？</h2>
        <div className='flex space-x-12'>
          <button
            onClick={props.onConfirm}
            className='px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors'
          >
            完了にする
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
