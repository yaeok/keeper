'use client'

import { useState } from 'react';

import TargetCalendar from '@/components/target/register/TargetCalendar';
import TargetForm from '@/components/target/register/TargetForm';

const TargetRegisterView: React.FC = () => {
  const [currentTarget, setCurrentTarget] = useState<Target | null>(null)

  const handleNewTarget = (target: Target) => {
    setCurrentTarget(target)
  }

  return (
    <div className='bg-gray-100 w-screen'>
      <div className='w-2/3 mx-auto p-4 bg-white'>
        <h1 className='text-xl font-normal mb-4'>目標とタスクの管理</h1>
        <TargetForm onNewTarget={handleNewTarget} />
        <div>
          <h2 className='text-xl font-normal mt-8 mb-4'>カレンダー</h2>
          <TargetCalendar initialTarget={currentTarget} />
        </div>
      </div>
    </div>
  )
}

export default TargetRegisterView
