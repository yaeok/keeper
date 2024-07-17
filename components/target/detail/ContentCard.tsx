import { ContentCardProps } from '@/props/'

export const ContentCard = ({ title, description, date }: ContentCardProps) => {
  return (
    <div className='bg-white shadow-md rounded p-4 mb-4'>
      <h2 className='text-xl font-bold mb-2'>{title}</h2>
      <p className='text-gray-700 mb-4'>{description}</p>
      <p className='text-gray-500 text-sm'>{date}</p>
    </div>
  )
}
