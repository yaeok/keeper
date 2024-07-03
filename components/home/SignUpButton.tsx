interface ButtonProps {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  title: string
}

const SignUpButton = (props: ButtonProps) => {
  return (
    <button
      onClick={props.handleClick}
      className='px-6 py-4 text-sm  text-white bg-primary rounded-sm bg-primary-light hover:bg-primary-dark'
    >
      {props.title}
    </button>
  )
}

export default SignUpButton
