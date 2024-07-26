"use client"

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { update } from '@/store/userSlice';
import { useFormState, useFormStatus } from 'react-dom';
import { login } from '@/utilis/actions';
import { checkToken } from '@/utilis/checkToken';

export default function () {
    const [state, formAction] = useFormState(login, {message: null});
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(()=>{
        checkToken(dispatch, router);
    },[])

    if(state.token) {
        dispatch(update({_id: state._id, username: state.username}));
        localStorage.setItem('token', state.token);
        router.replace('/books');
    }
    
  return (
        <form action={formAction} className='form'>
            <h1 className='text-center mb-6 text-lg font-bold'>log in</h1>
            <label>
                <span>email</span>
                <input type="email" required name='email' className='border ' />
            </label>
            <label>
                <span>password</span>
                <input type="password" required name='pass' className='border' />
            </label>
            <SubmitButton />
            <Link className='text-sm text-blue-600 w-fit' href='/register'>don't have an account? register</Link>
            <p className='min-h-[2em] w-full text-red-500'>{state.message}</p>
        </form>
  )

  function SubmitButton() {
    const {pending} = useFormStatus();
    return (
        <button type="submit" disabled={pending} className={`block py-1 disabled:bg-gray-300 disabled:cursor-auto bg-violet-600 hover:bg-violet-700 rounded-md text-white cursor-pointer`}>
            log in
        </button>
    )
}
}

