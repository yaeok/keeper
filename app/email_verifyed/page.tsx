import NextLink from 'next/link'

const EmailVerifyedPage: React.FC = () => {
  return (
    <div>
      <h1>
        メールアドレスの確認がまだです。完了にして再度ログインし直してください。
      </h1>
      <p>ログインしてください</p>
      <NextLink href='/sign_in'>
        <p>ログイン画面へ</p>
      </NextLink>
    </div>
  )
}

export default EmailVerifyedPage
