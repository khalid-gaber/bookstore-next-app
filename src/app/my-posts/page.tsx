// import PostForm from '@/components/posts/PostForm';
// import UserPostItem from '@/components/posts/UserPostItem';
// import PostItem from '@/components/posts/PostItem';
// import { post } from '@/utilis/types';
// import React from 'react'

// export default async function page() {

//   const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts`, {
//     cache: 'no-store'
//   });
//   if(!res.ok) {
//     throw new Error('failed to fetch posts')
//   }
//   const posts: {data: post[]} = await res.json();
//   return (
//     <>
//     <div className="w-full md:w-3/4 mx-auto mt-10 flex flex-col gap-5 items-center">
//       <div className="bg-white w-full my-5 text-center text-4xl py-5 text-green-600 font-bold">
//         YOUR POSTS
//       </div>
//       <div className='my-5 w-full md:w-3/4 border'>
//         <PostForm />
//       </div>
//       {posts.data.map(post => (
//         <PostItem key={post._id} post={post} isAuth={true}/>
//       ))}
//     </div>
//     </>
//   )
// }


"use client"
import PostItem from '@/components/posts/PostItem';
import PostSkeleton from '@/components/posts/PostSkeleton';
import { post } from '@/utilis/types';
import React, { useEffect, useState, useTransition } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store';
import { HandleAccessTokenAndFetch } from '@/utilis/fuctionUtilities';
import { useRouter } from 'next/navigation';

type Meta = {
  totalPostsNumber: number,
  pagesNumber: number,
  postsPerPage: number,
  pageIndex: number,
}

export default function page() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  let accessToken =  useSelector((state: RootState) => state.accessToken).value;
  const dispatch = useDispatch();
  const [posts, setPosts] = useState({data: null} as unknown as {data: post[], meta: Meta});

  async function fetchPosts(pageIndex = 1) {
    const res = await HandleAccessTokenAndFetch(async (accessToken)=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts?postsPerPage=5&pageIndex=${pageIndex}&user=auth`, {
        cache: 'no-store',
        headers: {
          "Authorization": `Bearer ${accessToken}`
        },
      });
      return res;
    }, accessToken, dispatch)
    if(res.ok) {
      const posts = await res.json();
      setPosts(prevPosts=> {
        if(prevPosts.data) {
          return {
            meta: posts.meta, 
            data: [...prevPosts.data, ...posts.data]
          }  
        } else {
          return {
            meta: posts.meta, 
            data: posts.data
          }  
        }
      });  
    } else if (res.status === 403) {
      router.push('/login');
    } else {
      const posts = await res.json();
      throw new Error(posts.message || 'failed to fetch posts')
    }
  }

  useEffect(()=>{
    startTransition(()=>fetchPosts());
  }, [])
  
  return (
    <>
    <div className="w-full md:w-3/4 mx-auto mt-10 flex flex-col gap-5 items-center">
      {(posts.data && posts.data.length>0) && posts.data.map(post => (
        <PostItem key={post._id} post={post} isAuth={true}/>
      ))}
      {(posts.data && posts.data.length === 0) && (
        <div className='w-full md:w-3/4 bg-white shadow-lg px-5 py-40 border text-center text-2xl'>
          there are not posts to show
        </div>
      )}
      {(isPending || !posts.data) && (<><PostSkeleton /><PostSkeleton /></>)}
      {(posts.data && !isPending && posts.data.length>0 && posts.meta.pageIndex < posts.meta.pagesNumber) && <PaginationButton />}
    </div>
    </>
  )
  function PaginationButton() {
    return (
      <div className='pagination w-full mb-7'>
        <button onClick={()=>startTransition(()=>fetchPosts(posts.meta.pageIndex + 1))} className="block mx-auto bg-red-500 p-2 rounded-lg text-white text-xs">MORE</button>
      </div>
    )
  }
}

