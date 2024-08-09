import NextLink from 'next/link'

const NotFound: React.FC = () => {
  return (
    <div className='min-h-screen w-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1 className='text-4xl font-bold mb-4'>404 - ページが見つかりません</h1>
      <p className='mb-4'>
        申し訳ありませんが、お探しのページは見つかりませんでした。
      </p>
      <NextLink href='/target'>
        <span className='px-4 py-2 bg-blue-600 text-white rounded-sm shadow-md hover:bg-blue-700'>
          ホームに戻る
        </span>
      </NextLink>
    </div>
  )
}

export default NotFound
