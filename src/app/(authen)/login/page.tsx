"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { login } from '@/utilis/actions';
import { getAccessToken, setCookie } from '@/utilis/fuctionUtilities';

export default function () {
    const [state, formAction] = useFormState(login, {message: null});
    const router = useRouter();

    useEffect(()=>{
        async function checkCookieToken() {
            const accessToken = await getAccessToken();
            if(accessToken) {
                router.replace('/');
            }
        }
        checkCookieToken();
    },[])

    if(state.accessToken) {
        setCookie(state.cookies).then(()=>{
            location.reload();
        });
    }
    
  return (
        <form action={formAction} className='form'>
            <h1 className='text-center mb-6 text-lg font-bold'>log in</h1>
            <label>
                <span>email</span>
                <input type="email" required name='email' />
            </label>
            <label>
                <span>password</span>
                <input type="password" required name='pass' />
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
