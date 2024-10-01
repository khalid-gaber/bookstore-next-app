"use client"
import { resetToken } from '@/store/slices/accessTokenSlice';
import { RootState } from '@/store/store';
import { resetUser } from '@/store/slices/userSlice';
import { setAccessTokenAndUser } from '@/utilis/fuctionUtilities';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User } from '@/utilis/types';
import { LuLogOut, LuMenu  } from "react-icons/lu";

//////////////returned component///////////////
export default function Header () {
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const path = usePathname();
    const dispatch = useDispatch();
    useEffect(()=>{
        setAccessTokenAndUser(dispatch, false);
    }, [])
  return (
    <header className='w-full md:w-3/4 mx-auto pt-3 md:rounded-b-md shadow-lg mb-5 bg-white relative'>
        <div className='flex justify-between items-center p-3'>
            <button
                className={`block rounded bg-gray-100 p-2 ${showMenu?'text-purple-400':'text-gray-600'} transition hover:text-purple-400 md:hidden`}
                onClick={()=>setShowMenu(!showMenu)}
            >
                <span className="sr-only">Toggle menu</span>
                <LuMenu className='text-xl' />
            </button>

            <div className=''>
                <nav aria-label="Global" className={`${!showMenu&&'hidden'} flex md:block absolute md:static top-full left-0 h-dvh md:h-auto w-dvw md:w-auto bg-[rgba(0,0,0,.4)] z-10`}>
                    <ul className={`flex flex-col p-2 md:p-0 md:flex-row items-start md:items-center h-full w-36 md:w-auto gap-6 text-sm bg-gray-100 md:bg-white`}>
                        <li>
                            <Link className={`text-gray-500 hover:text-purple-400 transition ${path === '/' && 'text-purple-400 font-bold'}`} href='/' >Posts</Link>
                        </li>

                        <li>
                            <Link className={`text-gray-500 hover:text-purple-400 transition ${path === '/profile' && 'text-purple-400 font-bold'}`} href='/profile' >profile</Link>
                        </li>

                        <li>
                            <Link className={`text-gray-500 hover:text-purple-400 transition ${path === '/my-posts' && 'text-purple-400 font-bold'}`} href='/my-posts' >my posts</Link>
                        </li>

                    </ul>
                    <div onClick={()=>setShowMenu(false)} className='md:hidden flex-1'></div>

                </nav>
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
        <div className='flex items-center '>
            <Link className='mx-2 text-green-400' href='/profile' >{user?.username}</Link>
            <button onClick={()=>logOut()}  className='mx-1 p-1 border border-red-400 rounded-md text-red-400 hover:bg-red-400 hover:text-white'>
                <LuLogOut  className='sm:hidden h-6'/>
                <span className='hidden sm:block'>log out</span>
            </button>
        </div>
    )
}

