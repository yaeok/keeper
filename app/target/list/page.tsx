'use client'

import Header from '@/components/target/Header'
import TargetList from '@/components/target/TargetList'
import { Target } from '@/domain/entity/target_entity'
import { ITargetRepository } from '@/feature/infrastructure/repository/target_repository'
import { GetTargetsByUserIdUseCase } from '@/use_case/get_targets_by_user_id_use_case/get_targets_by_user_id_use_case'
import React from 'react'

const TargetListView: React.FC = () => {
  const [targets, setTargets] = React.useState<Target[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    const fetchTargets = async () => {
      const targetRepository = new ITargetRepository()
      const targets = await new GetTargetsByUserIdUseCase({
        targetRepository: targetRepository,
      }).execute()
      setTargets(targets.targets)
    }

    const fetchData = async () => {
      await fetchTargets()
      setLoading(false)
    }

    fetchData()
  }, [])
  return (
    <main className='w-screen min-h-screen bg-gray-50'>
      <Header />
      <div className='w-3/5 mx-auto p-4 mt-20 pb-10'>
        <h2 className='text-xl font-bold mb-4'>目標一覧</h2>
        <TargetList
          targets={targets}
          loading={loading}
          isTransitionListView={true}
        />
      </div>
    </main>
  )
}

export default TargetListView
