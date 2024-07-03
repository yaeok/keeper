import React from 'react'

const UserInfo = () => {
  const user = {
    avatarUrl: 'https://via.placeholder.com/150', // ユーザのアイコンURL
    name: 'ユーザ名',
    achievedGoals: 5, // 達成した目標数
  }

  return (
    <section className='p-6 bg-white shadow rounded-sm flex items-center justify-center'>
      <div className='mx-8 flex items-center'>
        <img
          src={user.avatarUrl}
          alt='User Avatar'
          className='w-20 h-20 rounded-full mr-4'
        />
        <h2 className='text-md'>{user.name}</h2>
      </div>
      <div className='border-r border-gray-300 h-28'></div>
      <div className='mx-8'>
        <h2 className='text-3xl'>{user.achievedGoals}</h2>
        <p className='text-sm'>達成した目標数</p>
      </div>
    </section>
  )
}

export default UserInfo
