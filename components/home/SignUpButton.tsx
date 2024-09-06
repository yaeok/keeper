import NextLink from 'next/link'

export type ButtonProps = {
  title: string
}

const SignUpButton = (props: ButtonProps) => {
  return (
    <NextLink href='/sign_up'>
      <p className='px-6 py-4 text-md font-bold text-white rounded-md shadow-lg bg-indigo-500 hover:bg-indigo-600 cursor-pointer'>
        {props.title}
      </p>
    </NextLink>
  )
}

export default SignUpButton
