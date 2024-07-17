'use client'

// import { useState } from 'react'

// import { ContentCardProps } from '@/props/'
// import Header from '@/components/target/Header'
// import { ContentCard } from '@/components/target/detail/ContentCard'

// interface TargetDetailViewProps {
//   params: {
//     id: string
//   }
// }

// const TargetDetailView = (props: TargetDetailViewProps) => {
//   return (
//     <main className='bg-white w-screen mt-20'>
//       <Header />
//       <div className='w-3/4 mx-auto p-4 bg-gray-100 min-h-screen'>
//         <h2 className='text-2xl font-bold border-b-red-400 border-b-2 p-2 bg-white rounded-sm'>
//           タイトル
//         </h2>
//         <div className='flex flex-row my-4 space-x-2'>
//           <section className='w-1/2 bg-white rounded-sm flex flex-col'>
//             <h2 className='text-md font-bold border-b-red-400 border-b-2 rounded-sm m-2 p-2'>
//               タスク状況
//             </h2>
//             <div className='m-2'>テスト</div>
//           </section>
//           <section className='w-1/2 bg-white rounded-sm flex flex-col'>
//             <h2 className='text-md font-bold border-b-red-400 border-b-2 rounded-sm m-2 p-2'>
//               学習内容
//             </h2>
//           </section>
//         </div>
//       </div>
//     </main>
//   )
// }

// export default TargetDetailView
// pages/dashboard.tsx
import React from 'react'

import GoalSummary from '@/components/target/detail/GoalSummary'
import CustomLearningTimeChart from '@/components/target/detail/LearningTimeChart'
import TaskList from '@/components/target/detail/TaskList'
import Header from '@/components/target/Header'
import { Actual } from '@/domain/entity/actual_entity'
import { Target } from '@/domain/entity/target_entity'
import { Task } from '@/domain/entity/task_entity'

const Dashboard: React.FC = () => {
  const target: Target = {
    targetId: '1',
    target: 'AWS資格取得',
    studyDays: [1, 2, 3, 4, 5], // 平日
    studyHoursPerDay: 2,
    startDate: '2024-07-16',
    endDate: '2024-09-16',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  }

  const tasks: Task[] = [
    {
      taskId: '1',
      task: '課題1',
      content: 'AWSの基本知識を学ぶ',
      priority: 1,
      taskStudyHours: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      taskId: '2',
      task: '課題2',
      content: 'AWSのサービスを理解する',
      priority: 2,
      taskStudyHours: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ]

  const actuals: Actual[] = [
    {
      actualId: '1',
      date: '2024-07-17',
      studyHours: 2,
      taskId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      actualId: '2',
      date: '2024-07-18',
      studyHours: 1.5,
      taskId: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ]

  const progress = 60 // 仮の進捗率

  return (
    <main className='min-h-screen mt-20 w-screen bg-white'>
      <Header />
      <div className='w-3/4 mx-auto bg-gray-50 p-4'>
        <h2 className='text-2xl font-bold border-b-red-400 border-b-2 my-4'>
          {target.target}
        </h2>
        <GoalSummary target={target} actuals={actuals} />
        <TaskList tasks={tasks} actuals={actuals} />
        <CustomLearningTimeChart actuals={actuals} />
      </div>
    </main>
  )
}

export default Dashboard
