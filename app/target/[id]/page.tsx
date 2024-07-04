'use client'

import { useState } from 'react'

import { ContentCardProps } from '@/app/target/props/card'
import Header from '@/components/home/Header'
import { ContentCard } from '@/components/target/ContentCard'

interface TargetListViewProps {
  id: string
}

const TargetDetailView = (props: TargetListViewProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [cards, setCards] = useState<ContentCardProps[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newCard = {
      title,
      description,
      date: new Date().toLocaleString(),
    }
    setCards([newCard, ...cards])
    setTitle('')
    setDescription('')
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen mt-20 w-screen bg-gray-50'>
      <Header />
      <div className='flex h-screen w-screen'>
        <div className='w-1/4 bg-blue-500 flex flex-col items-center p-4 fixed h-screen'>
          <h1 className='text-white text-3xl mb-4'>今日やったこと</h1>
          <form className='w-full max-w-xs' onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label
                className='block text-white text-sm font-bold mb-2'
                htmlFor='title'
              >
                タイトル
              </label>
              <input
                id='title'
                type='text'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className='mb-6'>
              <label
                className='block text-white text-sm font-bold mb-2'
                htmlFor='description'
              >
                やったこと
              </label>
              <textarea
                id='description'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ height: '50vh' }}
              />
            </div>
            <div className='flex items-center justify-between'>
              <button
                type='submit'
                className='w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                送信
              </button>
            </div>
          </form>
        </div>
        <div className='w-3/4 ml-auto bg-gray-100 flex justify-center overflow-y-scroll h-screen'>
          <div className='w-full p-4'>
            {cards.map((card, index) => (
              <ContentCard
                key={index}
                title={card.title}
                description={card.description}
                date={card.date}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default TargetDetailView
