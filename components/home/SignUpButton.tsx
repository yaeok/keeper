import NextLink from 'next/link'

interface ButtonProps {
  title: string
}

const SignUpButton = (props: ButtonProps) => {
  return (
    <NextLink href='/sign_up'>
      <div className='px-6 py-4 text-sm  text-white bg-primary rounded-sm bg-primary-light hover:bg-primary-dark cursor-pointer'>
        {props.title}
      </div>
    </NextLink>
  )
}

export default SignUpButton
