"use client"

import React, { FormEvent, use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '@/store/userSlice';
import { RootState } from '@/store/store';
import { Dispatch } from '@reduxjs/toolkit';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

async function handleSubmit(e: React.FormEvent, userName: string, pass: string, dispatch: Dispatch, router: AppRouterInstance) {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/login`, {
        // cache: 'no-store',
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userName,
            pass: pass
        })
    })
    const json = await res.json();
    if(!res.ok) {
        throw new Error(json.message);
    }
    if(!json.token) {
        throw new Error('there is no token to store');
    }
    dispatch(update({_id: json._id, username: json.username}));
    localStorage.setItem('token', json.token);
    router.replace('/books');
}

async function checkToken(dispatch: Dispatch, router: AppRouterInstance){
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/`, {
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

export default () => {
    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(()=>{
        checkToken(dispatch, router);
    },[])
  return (
        <form onSubmit={(e)=>handleSubmit(e, userName, pass, dispatch, router)} className='form'>
            <h1 className='text-center mb-6 text-lg font-bold'>log in</h1>
            <label>
                <span>email</span>
                <input type="text" value={userName} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUserName(e.target.value)} className='border ' />
            </label>
            <label>
                <span>password</span>
                <input type="text" value={pass} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPass(e.target.value)} className='border' />
            </label>
            <input type="submit" value="log in" className='block py-1 bg-violet-600 hover:bg-violet-700 rounded-md text-white hover:cursor-pointer' />
            <Link className='text-sm text-blue-600 w-fit' href='/register'>don't have an account? register</Link>
        </form>
  )
}

 