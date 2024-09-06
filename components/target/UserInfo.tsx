import React from 'react'

interface UserInfoProps {
  name: string
  completedTargetsCount: number
}

const UserInfo: React.FC<UserInfoProps> = (props: UserInfoProps) => {
  return (
    <section className='p-6 bg-white shadow rounded-sm flex flex-row items-center justify-evenly'>
      <section className='flex flex-row items-center space-x-2'>
        <div className='w-16 h-16 rounded-full bg-indigo-400' />
        <p className='text-md'>{props.name}</p>
      </section>
      <div className='border-r border-gray-300 h-28'></div>
      <section className='flex flex-col items-center space-y-1'>
        <p className='text-sm'>達成した目標数</p>
        <h2 className='text-3xl'>{props.completedTargetsCount}</h2>
      </section>
    </section>
  )
}

export default UserInfo
