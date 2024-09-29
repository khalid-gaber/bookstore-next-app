import { post } from '@/utilis/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default function UserPostItem({post}: {post: post}) {
  return (
    <div className='w-full md:w-3/4 bg-white shadow-lg px-5 border'>
        {/* <div className='py-2 flex items-center gap-2'>
            <Link href="#">
                <Image className='border' width={40} height={40} src={'/'+post.user.avatar} alt='avatar-photo'/>
            </Link>
            <Link href="#" className='text-green-400 text-sm'>{post.user.username}</Link>
        </div> */}
        <Link href="#" className="block my-5">
            {post.image && (
            <div className='relative w-full h-96'>
                <Image className='object-contain' fill src={process.env.NEXT_PUBLIC_URL+post.image} alt='post image'/>
            </div>
            )}
            <p className="mt-5 w-full text-gray-700">
                {post.content}
            </p>
        </Link>
        <hr />
        <div className="flex justify-between py-2">
            <div>comments</div>
            <div>likes</div>
        </div>
    </div>
  )
}

