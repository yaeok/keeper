const Features = () => (
  <section id='features' className='flex items-center justify-center shadow-lg'>
    <section
      id='features'
      className='w-96 h-96 bg-primary-light text-white flex items-center justify-center shadow-lg'
    >
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-2xl font-bold mb-6'>サービスの特徴</h2>
        <ul className='space-y-4'>
          <li className='text-md'>資格取得の進捗管理</li>
          <li className='text-md'>モチベーション維持のためのリマインダー</li>
          <li className='text-md'>コミュニティによるサポート</li>
        </ul>
      </div>
    </section>
    <section className='w-96 h-96 bg-primary text-black flex items-center justify-center shadow-lg'>
      <div className='max-w-4xl mx-auto text-center'>
        <h2 className='text-2xl font-bold mb-6'>利用者の声</h2>
        <blockquote className='text-md mb-6'>
          <p>&ldquo;KeePerのおかげで資格取得に成功しました！&rdquo;</p>
          <cite className='block mt-2'>– 山田太郎</cite>
        </blockquote>
        <blockquote className='text-md'>
          <p>&ldquo;モチベーションを保つのに非常に役立ちました。&rdquo;</p>
          <cite className='block mt-2'>– 田中花子</cite>
        </blockquote>
      </div>
    </section>
  </section>
)

export default Features
