'use client'
import { RootState } from '@/store/store'
import { HandleAccessTokenAndFetch } from '@/utilis/fuctionUtilities'
import { post, comment } from '@/utilis/types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { BiSolidLike, BiSolidDislike, BiDislike, BiLike, BiComment, BiSolidPencil, BiSolidTrashAlt } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux'

export default function PostItem({post, isAuth}: {post: post, isAuth?: boolean}) {
    const router = useRouter();
    const accessToken = useSelector((state: RootState)=> state.accessToken).value;
    const dispatch = useDispatch();
    const [postInteractions, setPostInteractions] = useState({
        likesNumber: post.likesNumber,
        dislikesNumber: post.dislikesNumber,
        isLiked: post.isLiked,
        isDisliked: post.isDisliked,
    });
    const [showExtraText, setShowExtraText] = useState(post.content.length<450);
    const [isPendingLike, startTransitionLike] = useTransition();
    const [isPendingDislike, startTransitionDislike] = useTransition();
    
    return (
        <div className='w-full md:w-3/4 bg-white shadow-lg px-5 border'>
            <div className='flex justify-between'>
                <div className='py-2 flex items-stretch gap-2'>
                    <Link href="#">
                        <Image className='border' width={40} height={40} src={'/'+post.user.avatar} alt='avatar-photo'/>
                    </Link>
                    <div className='flex flex-col justify-between'>
                        <Link href="#" className='text-green-400 text-sm'>{post.user.username}</Link>
                        <small className='text-xs text-gray-300'>{post.createdAt.split('T')[0]} | {post.createdAt.split('T')[1].slice(0,5)}</small>
                    </div>
                </div>
                
                {isAuth===true && (
                <div className='flex items-center gap-1'>
                    <button className='text-xl text-blue-400 p-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-xl'>
                    <BiSolidPencil   />
                    </button>
                    <button className='text-xl text-red-400 p-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-xl'>
                    <BiSolidTrashAlt   />
                    </button>
                </div>)}
            </div>
            <div className="block my-5">
                {post.image && (
                // <div className='relative flex-1 w-full my-5'>
                //     <Image className='object-contain' quality={1} fill src={process.env.NEXT_PUBLIC_URL+post.image} alt='post image'/>
                // </div>

                <div className='w-full'>
                    <img className='w-full' src={process.env.NEXT_PUBLIC_URL+post.image} alt="post image" />
                    {/* // <Image className='object-contain' fill src={process.env.NEXT_PUBLIC_URL+post.image} alt='post image'/> */}
                </div>

                // <div className='relative w-full h-48'>
                //     <Image className='object-contain' fill src={process.env.NEXT_PUBLIC_URL+post.image} alt='post image'/>
                // </div>
                )}
                <p onClick={()=>setShowExtraText(true)} className={`${!showExtraText&&'cursor-pointer'} mt-5 w-full text-gray-700`}>
                    {showExtraText ? post.content : <>{post.content.slice(0, 400)}<small className='text-green-600'>...read more</small></>}
                </p>
            </div>
            <hr />
            <div className="flex items-center justify-between py-2">
                {!post.comments ? (<Link href={`/post/${post._id}`} className='flex items-center gap-2 py-2 px-3 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-3xl'>
                    {post.commentsNumber} <BiComment className='text-2xl' />
                </Link>) : (<div></div>)}
                <div className='flex items-center gap-1'>
                    <button 
                    onClick={()=>startTransitionDislike(()=>handleDislike())} 
                    disabled={isPendingLike || isPendingDislike} 
                    className={`${(!isPendingLike&&!isPendingDislike)&&'cursor-pointer'} flex gap-2 text-red-400 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-l-3xl`}
                    >
                        { isPendingDislike ? <DislikeSpin /> : postInteractions.isDisliked ? <BiSolidDislike className='text-2xl' /> : <BiDislike className='text-2xl' />}
                        {postInteractions.dislikesNumber}
                    </button>

                    <button 
                    onClick={()=>startTransitionLike(()=>handleLike())} 
                    disabled={isPendingLike || isPendingDislike} 
                    className={`${(!isPendingLike&&!isPendingDislike)&&'cursor-pointer'} flex gap-2 text-green-400 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-e-3xl`}
                    >
                        {postInteractions.likesNumber}
                        { isPendingLike ? <LikeSpin /> : postInteractions.isLiked ? <BiSolidLike className='text-2xl' /> : <BiLike className='text-2xl' />}
                    </button>
                </div>
            </div>
        </div>
    )

    async function handleLike() {
        if (postInteractions.isLiked) {
            const res = await HandleAccessTokenAndFetch(async (accessToken)=>{
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/likes`, {
                    cache: 'no-store',
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        postId: `${post._id}`
                    })
                });
                return res;
            }, accessToken, dispatch)
            if(res.ok) {
                const json = await res.json();
                setPostInteractions({...json.data});
            }
        } else {
            const res = await HandleAccessTokenAndFetch(async (accessToken)=>{
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/likes`, {
                    cache: 'no-store',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        postId: `${post._id}`
                    })
                });
                return res;
            }, accessToken, dispatch)
            if(res.ok) {
                const json = await res.json();
                setPostInteractions({...json.data});
            } else if(res.status === 403) {
                router.push('/login');
            }
        }
    }

    async function handleDislike() {
        if (postInteractions.isDisliked) {
            const res = await HandleAccessTokenAndFetch(async (accessToken)=>{
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/dislikes`, {
                    cache: 'no-store',
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        postId: `${post._id}`
                    })
                });
                return res;
            }, accessToken, dispatch)
            if(res.ok) {
                const json = await res.json();
                setPostInteractions({...json.data});
            }
        } else {
            const res = await HandleAccessTokenAndFetch(async (accessToken)=>{
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/dislikes`, {
                    cache: 'no-store',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        postId: `${post._id}`
                    })
                });
                return res;
            }, accessToken, dispatch)
            if(res.ok) {
                const json = await res.json();
                setPostInteractions({...json.data});
            } else if(res.status === 403) {
                router.push('/login');
            }
        }
    }

}

function LikeSpin () {
    return (
        <svg className="animate-spin h-5 w-5 border-2 border-l-green-200 border-t-green-300 border-r-green-400 border-b-green-500 rounded-full" viewBox="0 0 24 24">
        </svg>
    )
}

function DislikeSpin () {
    return (
        <svg className="animate-spin h-5 w-5 border-2 border-l-red-200 border-t-red-300 border-r-red-400 border-b-red-500 rounded-full" viewBox="0 0 24 24">
        </svg>
    )
}


