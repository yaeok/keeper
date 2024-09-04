interface SkeletonProps {
  className?: string
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-300 my-2 rounded ${className}`} />
  )
}

export default Skeleton
