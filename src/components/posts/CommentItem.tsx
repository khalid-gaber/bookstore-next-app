"use client"
import Link from 'next/link';
import Image from 'next/image';
import { comment } from '@/utilis/types';
import { BiSolidPencil, BiSolidTrashAlt } from "react-icons/bi";
import { HandleAccessTokenAndFetch } from '@/utilis/fuctionUtilities';
import { FormEvent, useState, useTransition } from 'react';
import { IoAdd, IoClose } from "react-icons/io5";


export default function CommentItem({comment, accessToken ,setPostComments}: {comment: comment, accessToken: string ,setPostComments: any}) {
  return comment?.isCommented ? (
      <AuthedComment />
    ) : (<NonAuthedComment />)

    function NonAuthedComment() {
      return (
        <div className='w-full bg-gray-300 rounded-xl text-sm'>
          <div className='flex justify-between p-1'>
            <div className='flex items-stretch gap-2'>
                <Link href="#">
                    <Image className='border rounded-full' width={35} height={35} src={'/'+comment.user.avatar} alt='avatar-photo'/>
                </Link>
                <div className='flex flex-col justify-between'>
                    <Link href="#" className='text-green-600 text-xm'>{comment.user.username}</Link>
                    <small className='text-xs text-gray-50'>{comment.createdAt.split('T')[0]} | {comment.createdAt.split('T')[1].slice(0,5)}</small>
                </div>
            </div>
          </div>
          <div className='flex'>
            <div className='w-5 lg:w-12 bg-purple-50 rounded-tr-xl'></div>
            <div className='flex-1 border-8 p-2 border-gray-300 bg-gray-100 rounded-2xl shadow-lg'>
              <p>
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      )
    }

    function AuthedComment() {
      const [commentContent, setommentContent] = useState(comment.content);  
      const [isEditComment, setIsEditComment] = useState(false);
      const [isPending, startTransition] = useTransition();

      async function editComment(e: FormEvent, newCommentContent: string) {
        e.preventDefault();
        setIsEditComment(false);
        await new Promise(res => setTimeout(res, 2000));

        const res = await HandleAccessTokenAndFetch(async (accessToken)=>{
          const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/comments`, {
            cache: 'no-store',
            method: 'PUT',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
              commentId: comment._id,
              content: newCommentContent
            })
          });  
          return res;
        }, accessToken)
        const json = await res.json();
        if(res.status === 403){
          console.log('non authorized')/////////////////////////////////////
        }
        setommentContent(json.comment.content)
      }

      async function deleteComment() {
      await new Promise(res => setTimeout(res, 2000));

        const res = await HandleAccessTokenAndFetch(async (accessToken)=>{
          const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/comments`, {
            cache: 'no-store',
            method: 'DELETE',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
              commentId: comment._id
            })
          });  
          return res;
        }, accessToken)
        const json = await res.json();
        if(res.status === 403){
          console.log('non authorized')/////////////////////////////////
        }
        console.log(json);
        setPostComments(json.data.comments)  
      }

    return (
      <div className={`${isPending && 'animate-pulse'} w-full bg-blue-300 rounded-xl text-sm`}>
        <div className='flex justify-between p-1'>
          <div className='flex items-stretch gap-2'>
              <Link href="#">
                  <Image className='border rounded-full' width={35} height={35} src={'/'+comment.user.avatar} alt='avatar-photo'/>
              </Link>
              <div className='flex flex-col justify-between'>
                  <Link href="#" className='text-green-600 text-xm'>{comment.user.username}</Link>
                  <small className='text-xs text-gray-50'>{comment.createdAt.split('T')[0]} | {comment.createdAt.split('T')[1].slice(0,5)}</small>
              </div>
          </div>
          
          <div className='flex items-center gap-1'>
              <button onClick={()=>setIsEditComment(!isEditComment)} disabled={isPending} className='w-6 h-6 text-blue-400 p-1 bg-gray-100 disabled:bg-gray-200 disabled:cursor-default hover:bg-gray-200 rounded-lg'>
              {(isEditComment && !isPending) ? <IoClose className='mx-auto' /> : <BiSolidPencil className='mx-auto' />}
              </button>
              <button onClick={()=>startTransition(()=>deleteComment())} disabled={isPending} className='w-6 h-6 text-red-400 p-1 bg-gray-100 disabled:bg-gray-200 disabled:cursor-default hover:bg-gray-200 rounded-lg'>
              <BiSolidTrashAlt className='mx-auto' />
              </button>
          </div>
        </div>
        <div className='flex'>
          <div className='w-5 lg:w-12 bg-purple-50 rounded-tr-xl'></div>
          <div className='flex-1 border-8 p-2 border-blue-300 bg-blue-100 rounded-2xl shadow-lg shadow-blue-200'>
            {(isEditComment && !isPending) ? (
              <EditCommentForm />
            ) : (
              <p>
                {commentContent}
              </p>
              )}
          </div>
        </div>
      </div>
    )

    function EditCommentForm() {
      const [newCommentContent, setNewCommentContent] = useState(commentContent);
  
      return (
        <form 
        onSubmit={(e)=>startTransition(()=>editComment(e, newCommentContent))} 
        className='flex items-end gap-2'>
          <textarea
            onChange={(e)=>setNewCommentContent(e.target.value)}
            required
            autoFocus
            rows={3}
            value={newCommentContent}
            className={`w-full h-5 rounded-lg focus:outline-none text bg-blue-100`}
          ></textarea>
          <button type='submit' disabled={false} className='disabled:cursor-default bg-blue-300 p-1 rounded-lg'>
            <IoAdd className='mx-auto text-xl text-green-600' />
          </button>
        </form>
      )
    }
  }
}
