"use client"

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAccessToken, setCookie } from '@/utilis/fuctionUtilities';
import { useFormState, useFormStatus } from 'react-dom';
import { register } from '@/utilis/actions';

export default function() {
    const [state, formAction] = useFormState(register, {messsage: null});
    const router = useRouter();

    useEffect(()=>{
        async function checkCookieToken() {
            const accessToken = await getAccessToken();
            if(!!accessToken) {
                router.replace('/profile');
            }
        }
        checkCookieToken();
    },[])

    if(state.accessToken){
        setCookie(state.cookies);
        location.reload();
    }

  return (
        <form action={formAction} className='form'>
            <h1 className='text-center mb-6 text-lg font-bold'>register</h1>
            <label>
                <span>username</span>
                <input type="text" required name='username' />
            </label>
            <label>
                <span>email</span>
                <input type="email" required name='email' />
            </label>
            <label>
                <span>password</span>
                <input type="password" required name='pass' />
            </label>
            <label>
                <span>re-enter password</span>
                <input type="password" required name='rePass' />
            </label>

            <div className='flex justify-between gap-x-5'>
                <label className='flex-1'>
                    <div>phone</div>
                    <input className='w-full' type="tel" required name='phone' />
                </label>
                <label className='flex-1'>
                    <div>country</div>
                    <input className='w-full' type='' required name='country' />
                </label>
            </div>

            <div className='flex justify-between items-center gap-x-5'>
                <div>
                    <div>gender</div>
                    <div className='py-[5px] px-1 flex gap-x-8 bg-purple-50'>
                        <label> 
                        <input type="radio" value='male'required name='gender' />
                        {` male`}
                        </label>

                        <label> 
                        <input type="radio" value='female' required name='gender' />
                        {` female`}
                        </label>
                    </div>
                </div>
                <label className='flex-1'>
                    <div>birth date</div>
                    <input type="date" required name='birthDate' className='w-full' />
                </label>
            </div>

            <SubmitButton />
            <Link className='text-sm text-blue-600 w-fit' href='/login'>have an account? login</Link>
            <p className='min-h-[2em] w-full text-red-500'>{state.message as string}</p>
        </form>
  )

  function SubmitButton() {
    const {pending} = useFormStatus();
    return (
        <button type="submit" disabled={pending} className={`block py-1 disabled:bg-gray-300 disabled:cursor-auto bg-violet-600 hover:bg-violet-700 rounded-md text-white cursor-pointer`}>
            register
        </button>
    )
}

}
 