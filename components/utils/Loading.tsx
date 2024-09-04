import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className='fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-gray-100 bg-opacity-50'>
      <div className='flex'>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 bg-indigo-500 rounded-full mx-1 animate-bounce${
              index + 1
            }`}
          ></div>
        ))}
      </div>
      <style jsx>{`
        @keyframes bounce1 {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
        @keyframes bounce2 {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1.2);
          }
        }
        @keyframes bounce3 {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(0.8);
          }
        }
        .animate-bounce1 {
          animation: bounce1 1.4s infinite ease-in-out both;
          animation-delay: -0.32s;
        }
        .animate-bounce2 {
          animation: bounce2 1.4s infinite ease-in-out both;
          animation-delay: -0.16s;
        }
        .animate-bounce3 {
          animation: bounce3 1.4s infinite ease-in-out both;
        }
      `}</style>
    </div>
  )
}

export default Loading
