import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className='fixed top-0 left-0 z-50 w-screen h-screen bg-gray-900 bg-opacity-50'>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <div className='w-20 h-20 border-8 border-t-8 border-gray-200 rounded-full animate-spin' />
      </div>
    </div>
  )
}

export default Loading
