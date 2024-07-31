/* eslint-disable @next/next/no-img-element */
import React from 'react'

interface UserInfoProps {
  avatarUrl: string
  name: string
  completedTargetsCount: number
}

const UserInfo = (props: UserInfoProps) => {
  return (
    <section className='p-6 bg-white shadow rounded-sm flex items-center justify-center'>
      <div className='mx-8 flex items-center'>
        <img
          src={props.avatarUrl}
          alt='User Avatar'
          className='w-20 h-20 rounded-full mr-4'
        />
        <h2 className='text-md'>{props.name}</h2>
      </div>
      <div className='border-r border-gray-300 h-28'></div>
      <div className='mx-8'>
        <p className='text-sm'>達成した目標数</p>
        <h2 className='text-3xl'>{props.completedTargetsCount}</h2>
      </div>
    </section>
  )
}

export default UserInfo
