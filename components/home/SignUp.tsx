import SignUpButton from '@/components/home/SignUpButton'

const Signup = () => {
  return (
    <section id='signup' className='flex items-center justify-center shadow-lg'>
      <section
        id='signup'
        className='w-96 h-96 p-4 bg-indigo-100 text-white flex items-center justify-center shadow-lg'
      >
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-2xl font-bold mb-6'>今すぐ登録</h2>
          <p className='text-lg mb-6'>
            資格取得、個人開発に向けて
            <br />
            いますぐ登録しましょう！
          </p>
          <SignUpButton title='登録する'></SignUpButton>
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
}

export default Signup
