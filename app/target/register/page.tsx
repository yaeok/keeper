'use client'

import { useState } from 'react'
import GoalForm from '@/components/target/register/GoalForm'
import GoalCalendar from '@/components/target/register/GoalManager'
import { Goal } from '@/app/target/props/goal'

const GoalManager: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([])

  const handleNewGoal = (goal: Goal) => {
    setGoals([...goals, goal])
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>目標とタスクの管理</h1>
      <GoalForm onNewGoal={handleNewGoal} />
      <div>
        <h2 className='text-xl font-semibold mt-8 mb-4'>カレンダー</h2>
        <GoalCalendar goals={goals} />
      </div>
    </div>
  )
}

export default GoalManager
