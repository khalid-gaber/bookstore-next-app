"use client"

import { RootState } from '@/store/store';
import { reset, update } from '@/store/userSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

async function checkToken(dispatch: Dispatch, router: AppRouterInstance){
    //////////////////////////// ${process.env.NEXT_PUBLIC_URL} ///////////////////////////
    const res = await fetch(`https://fake-bockstore.vercel.app/api/`, {
        cache: 'no-store',
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            token: `${localStorage.getItem('token')}`
        },
    })
    if(!res.ok) {
        return;
    }
    const json = await res.json();
    if(json.user){
        dispatch(update({_id: json.user._id, username: json.user.username}));
        router.replace('/books');
    } else {
        return;
    }
}

function logOut(dispatch: Dispatch, router: AppRouterInstance){
    localStorage.removeItem('token');
    dispatch(reset());
    router.replace('/login');
}

export default function Header () {
    const user = useSelector((state: RootState) => state.user);
    const path = usePathname();
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(()=>{
        checkToken(dispatch, router);
    }, [])
  return (
    <header className='w-full md:w-3/4 mx-auto pt-3 rounded-b-md shadow-lg mb-5 bg-white'>
        <div className='flex justify-between p-3'>
            <div className='*:inline-block *:mx-1 *:mt-2'>
                <Link className={`hover:text-purple-400 ${path === '/books' && 'text-purple-400 font-bold'}`} href='/books' >books</Link>
                <Link className={`hover:text-purple-400 ${path === '/profile' && 'text-purple-400 font-bold'}`} href='/profile' >profile</Link>
            </div>
            <div>{`${process.env.NEXT_PUBLIC_URL}`}</div>
            {user?._id?<UserItem user={user} />:<AuthItem />}
        </div>
    </header>
  )
}

function AuthItem(){
    return(
        <div>
            <Link className='inline-block mx-1 p-1 border border-green-400 rounded-md text-green-400 hover:bg-green-400 hover:text-white' href='/login' >login</Link>
            <Link className='inline-block mx-1 p-1 border border-green-400 rounded-md text-green-400 hover:bg-green-400 hover:text-white' href='/register' >register</Link>
        </div>
)
}

function UserItem({user}: RootState){
    const dispatch = useDispatch();
    const router = useRouter();
    return(
        <div>
            <Link className='mx-2 text-green-400' href='/' >{user?.username}</Link>
            <button onClick={()=>logOut(dispatch, router)}  className='mx-1 p-1 border border-red-600 rounded-md text-red-600 hover:bg-red-600 hover:text-white'>log out</button>
        </div>
    )
}

