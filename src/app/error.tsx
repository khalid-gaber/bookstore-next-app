'use client'
import React from 'react'

type error = {
    error: Error;
    reset: () => void;
}

const Error = ({error, reset}: error) => {
  return (
    <div className='h-full w-1/2 m-auto py-10 text-center flex flex-col justify-center gap-10'>
        <h1 className='font-bold text-xl'>Error: {error.message}</h1>
        <button onClick={()=>reset()} className='mt-4 py-4 px-10 bg-blue-700 hover:bg-blue-600 rounded-md text-white'>try again</button>
    </div>
  )
}

export default Error