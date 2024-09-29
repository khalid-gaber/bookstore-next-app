"use client"

import { resetToken } from '@/store/slices/accessTokenSlice';
import { RootState } from '@/store/store';
import { resetUser } from '@/store/slices/userSlice';
import { setAccessTokenAndUser } from '@/utilis/fuctionUtilities';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User } from '@/utilis/types';

//////////////returned component///////////////
export default function Header () {
    const user = useSelector((state: RootState) => state.user);
    const path = usePathname();
    const dispatch = useDispatch();
    useEffect(()=>{
        setAccessTokenAndUser(dispatch, false);
    }, [])
  return (
    <header className='w-full md:w-3/4 mx-auto pt-3 rounded-b-md shadow-lg mb-5 bg-white'>
        <div className='flex justify-between p-3'>
            <div className='*:inline-block *:mx-1 *:mt-2'>
                <Link className={`hover:text-purple-400 ${path === '/' && 'text-purple-400 font-bold'}`} href='/' >Posts</Link>
                {/* <Link className={`hover:text-purple-400 ${path === '/books' && 'text-purple-400 font-bold'}`} href='/books' >books</Link> */}
                <Link className={`hover:text-purple-400 ${path === '/profile' && 'text-purple-400 font-bold'}`} href='/profile' >profile</Link>
                <Link className={`hover:text-purple-400 ${path === '/my-posts' && 'text-purple-400 font-bold'}`} href='/my-posts' >my posts</Link>
            </div>
            {user?._id?<LogoutItem user={user} />:<LoginItem />}
        </div>
    </header>
  )
}
//////////////returned component///////////////


function LoginItem(){
    return(
        <div>
            <Link className='inline-block mx-1 p-1 border border-green-400 rounded-md text-green-400 hover:bg-green-400 hover:text-white' href='/login' >login</Link>
            <Link className='inline-block mx-1 p-1 border border-green-400 rounded-md text-green-400 hover:bg-green-400 hover:text-white' href='/register' >register</Link>
        </div>
)
}

function LogoutItem({user}: {user: User}){
    const dispatch = useDispatch();
    const router = useRouter();
    
    async function logOut(){
        const res = await fetch(`/api/logout`, {
            cache: 'no-store',
            method: 'POST'
        });
        dispatch(resetUser());
        dispatch(resetToken());
        router.replace('/login');
    }
    
    return(
        <div>
            <Link className='mx-2 text-green-400' href='/profile' >{user?.username}</Link>
            <button onClick={()=>logOut()}  className='mx-1 p-1 border border-red-400 rounded-md text-red-400 hover:bg-red-400 hover:text-white'>log out</button>
        </div>
    )
}

