interface MainProps {
  children: React.ReactNode
}

const Main: React.FC<MainProps> = ({ children }: MainProps) => {
  return (
    <div className='min-h-screen pt-16 bg-gray-50 flex flex-col items-center'>
      {children}
    </div>
  )
}

export default Main
