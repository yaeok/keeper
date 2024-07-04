interface AlertDialogProps {
  open: boolean
  handleClose: () => void
  message: string
}

const TargetDialog: React.FC<AlertDialogProps> = ({
  open,
  handleClose,
  message,
}) => {
  if (!open) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-4 rounded-lg max-w-sm w-full'>
        <h2 className='text-lg font-semibold'>注意</h2>
        <p className='mt-2'>{message}</p>
        <div className='mt-4 text-right'>
          <button
            onClick={handleClose}
            className='px-4 py-2 bg-blue-500 text-white rounded'
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  )
}

export default TargetDialog
