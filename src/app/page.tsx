"use client"
import PostItem from '@/components/posts/PostItem';
import PostSkeleton from '@/components/posts/PostSkeleton';
import { post } from '@/utilis/types';
import React, { useEffect, useState, useTransition } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store';
import { HandleAccessTokenAndFetch } from '@/utilis/fuctionUtilities';

type Meta = {
  totalPostsNumber: number,
  pagesNumber: number,
  postsPerPage: number,
  pageIndex: number,
}

export default function page() {
  const [isPending, startTransition] = useTransition();
    let accessToken =  useSelector((state: RootState) => state.accessToken).value;
    const dispatch = useDispatch();
  const [posts, setPosts] = useState({data: null} as unknown as {data: post[], meta: Meta});

  async function fetchPosts(pageIndex = 1) {
    const res = await HandleAccessTokenAndFetch(async (accessToken)=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts?postsPerPage=5&pageIndex=${pageIndex}`, {
        cache: 'no-store',
        headers: {
          "Authorization": `Bearer ${accessToken}`
        },
      });  
      return res;
    }, accessToken, dispatch)
    const posts = await res.json();
    if(!res.ok) {
      throw new Error(posts.message || 'failed to fetch posts')
    }
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
}

  useEffect(()=>{
    startTransition(()=>fetchPosts());
  }, [])
  
  return (
    <>
    <div className="w-full md:w-3/4 mx-auto mt-10 flex flex-col gap-5 items-center">
      {(posts.data && posts.data.length>0) && posts.data.map(post => (
        <PostItem key={post._id} post={post}/>
      ))}
      {(posts.data && posts.data.length === 0) && (
        <div className='w-full md:w-3/4 bg-white shadow-lg px-5 py-40 border text-center text-2xl'>
          there are not posts to show
        </div>
      )}
      {/* {(isPending || !posts.data.length) && <PostSkeleton />} */}
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
