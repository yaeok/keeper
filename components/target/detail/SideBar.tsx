import React from 'react'

const Sidebar: React.FC = () => {
  return (
    <div className='w-1/5 h-screen z-25 sticky bg-gray-200 block left-0 top-0'>
      <div className='px-5 pt-24'>
        <h3 className='font-bold text-lg'>メニュー</h3>
        <ul className='mt-4'>
          <li
            className='mb-2 cursor-pointer'
            onClick={() => console.log('onClick')}
          >
            <p className='block text-gray-900 hover:text-blue-500'>ホーム</p>
          </li>
          <li
            className='mb-2 cursor-pointer'
            onClick={() => console.log('onClick')}
          >
            <p className='block text-gray-900 hover:text-blue-500'>
              プロファイル
            </p>
          </li>
          <li
            className='mb-2 cursor-pointer'
            onClick={() => console.log('onClick')}
          >
            <p className='block text-gray-900 hover:text-blue-500'>設定</p>
          </li>
          <li
            className='mb-2 cursor-pointer'
            onClick={() => console.log('onClick')}
          >
            <p className='block text-gray-900 hover:text-blue-500'>
              ログアウト
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
