import React from 'react'

const Sidebar: React.FC = () => {
  return (
    <aside className='w-1/5 h-screen z-25 sticky bg-gray-200 block left-0 top-0'>
      <div className='px-5 py-24'>
        <h3 className='font-bold text-lg'>メニュー</h3>
        <ul className='mt-4'>
          <li className='mb-2'>
            <a href='#' className='block text-gray-900 hover:text-blue-500'>
              ホーム
            </a>
          </li>
          <li className='mb-2'>
            <a href='#' className='block text-gray-900 hover:text-blue-500'>
              プロファイル
            </a>
          </li>
          <li className='mb-2'>
            <a href='#' className='block text-gray-900 hover:text-blue-500'>
              設定
            </a>
          </li>
          <li className='mb-2'>
            <a href='#' className='block text-gray-900 hover:text-blue-500'>
              ログアウト
            </a>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
