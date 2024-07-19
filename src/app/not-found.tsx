import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='h-full w-1/2 m-auto py-10 text-center flex flex-col justify-center'>
        <h1 className='font-bold text-4xl'>404</h1>
        <p>NOT FOUND</p>
        <Link href='/books' className='mt-4 py-4 px-10 bg-blue-700 hover:bg-blue-600 rounded-md text-white'>books Page</Link>
    </div>
  )
}

export default NotFound