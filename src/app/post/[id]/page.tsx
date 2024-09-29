"use client"
import PostItem from '@/components/posts/PostItem';
import PostSkeleton from '@/components/posts/PostSkeleton';
import { comment, post } from '@/utilis/types';
import React, { FormEvent, useEffect, useState, useTransition } from 'react'
import { getAccessToken, HandleAccessTokenAndFetch } from '@/utilis/fuctionUtilities';
import CommentItem from '@/components/posts/CommentItem';
import { IoAdd } from "react-icons/io5";
import { useRouter } from 'next/navigation';

export default function page({params}: {params: {id: string}}) {
  const [isPending, startTransition] = useTransition();
  const [post, setPost] = useState(null as unknown as post);
  const [postComments, setPostComments] = useState<comment[]>(null as unknown as comment[]);
  let accessToken = '';

  async function fetchPosts(accessToken: string) {
    const res = await HandleAccessTokenAndFetch(async (accessToken)=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts/${params.id}`, {
        cache: 'no-store',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
      });  
      return res;
    }, accessToken)
    const post = await res.json();
    if(!res.ok) {
      throw new Error(post.message || 'failed to fetch post')
    }
    setPost(post.data);
    setPostComments(post.data.comments)
  }

  useEffect(()=>{
    getAccessToken().then((res)=>{
      accessToken = res;
      startTransition(()=>fetchPosts(res));
    })
  }, [])
  
  return (
    <div className="w-full md:w-3/4 mx-auto my-5 flex flex-col gap-1 items-center">
      {post && <PostItem key={post._id} post={post}/>}
      {(isPending || !post) && <PostSkeleton />}
      <div className='w-full md:w-3/4 bg-white shadow-lg px-5 border'>
        <h1 className='text-3xl'>comments</h1>
        <hr className='my-4' />
        <div className='py-5 px-1 md:px-4 flex flex-col gap-5 bg-purple-50 max-h-[75dvh] overflow-y-auto'>
          {!postComments ? (
            (<><CommentSkeleton /><CommentSkeleton /></>)
          ) : postComments.length>0 ? postComments.map((comment)=>(
            <CommentItem comment={comment} accessToken={accessToken} setPostComments={setPostComments} />
          )) : (
            <div className='text-center'>there is no comments to show</div>
          )}
        </div>
        <AddCommentForm />
      </div>
    </div>
  )

  function AddCommentForm() {
    const router = useRouter();
    const [comment, setComment] = useState('');
    const [isPending, startTransition] = useTransition();
  
    async function addComment(e: FormEvent) {
      e.preventDefault();
      await new Promise(res => setTimeout(res, 2000));

      const res = await HandleAccessTokenAndFetch(async (accessToken)=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/comments`, {
          cache: 'no-store',
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            "postId": post._id,
            "content": comment
        })
        });  
        return res;
      }, accessToken)
      if(res.ok) {
        const json = await res.json();
        setPostComments(json.data.comments)
      } else if(res.status === 403) {
        router.push('/login');
      }
    }
    return (
      <form onSubmit={(e)=>startTransition(()=>addComment(e))} className='pb-2 pt-4 flex gap-2'>
        <input
          type="text"
          onChange={(e)=>setComment(e.target.value)}
          required
          value={comment}
          placeholder="Add comment"
          className={`${isPending && 'animate-pulse'} w-full rounded-lg border-2 border-gray-100 focus:outline-none p-2 text bg-blue-100`}
        />
        <button type='submit' disabled={isPending} className='disabled:cursor-default bg-blue-300 rounded-lg w-12'>
          {isPending ? (
            <svg className="mx-auto animate-spin h-5 w-5 border-2 border-l-green-200 border-t-green-300 border-r-green-400 border-b-green-500 rounded-full" viewBox="0 0 24 24">
            </svg>
          ) : (
            <IoAdd className='mx-auto text-3xl text-green-600' />
          )}
        </button>
      </form>
    )
  }
}
  

function CommentSkeleton() {
  return (
    <div className='w-full bg-gray-200 rounded-xl'>
      <div className='flex justify-between p-1'>
        <div className='flex items-stretch gap-2'>
            <div className='animate-pulse bg-gray-100 w-9 h-9 rounded-full'></div>
            <div className='flex flex-col justify-between'>
                <div className='animate-pulse bg-gray-100 w-24 h-3'></div>
                <div className='animate-pulse bg-gray-100 w-32 h-3'></div>
            </div>
        </div>
      </div>
      <div className='flex'>
        <div className='w-5 lg:w-12 bg-purple-50 rounded-tr-xl'></div>
        <div className='flex-1 pr-5 bg-gray-200 rounded-2xl shadow-lg'>
          <p className='animate-pulse bg-gray-100 w-full h-4 m-2'></p>
          <p className='animate-pulse bg-gray-100 w-2/3 h-4 m-2'></p>
        </div>
      </div>
    </div>
  )
}