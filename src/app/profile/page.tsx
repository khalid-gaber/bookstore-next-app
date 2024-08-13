"use client"

import { RootState } from '@/store/store'
import { getAccessToken } from '@/utilis/fuctionUtilities';
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

export default function page() {
    const [isEdit, setIsEdit] = useState(false);
    const user = useSelector((state: RootState)=>state.user);
    const router = useRouter();

    useEffect(()=>{
        async function checkCookieToken() {
            const accessToken = await getAccessToken();
            if(!accessToken) {
                router.push('/login');
            }
        }
        checkCookieToken();
    console.log(user);
    // async function checkUser() {
        //     if(!user._id){
        //         router.push('/login');
        //     }
        // }
        // checkUser();
    }, [])
  return (
    <div className='h-full flex justify-center items-start'>
        {/* <form action={formAction} className='form'> */}
        {isEdit ? <EditProfile /> : <ShowProfile />}

    </div>
  )

  function ShowProfile() {
    return (
        <form className='profile-form md:w-3/4 [&_input:hover]:cursor-auto'>
            <div className='text-center mb-6'>
                <div className='inline-block my-5'>
                    <Image className='border border-purple-600 rounded-full' src={`/${user.avatar}`} alt='avatar' width={150} height={150} />
                </div>
                <h1 className='text-lg font-bold text-purple-600'>{user.username}</h1>
            </div>

            <label>
                <span>email</span>
                <input type="email" readOnly name='email' value={user.email} />
            </label>

            <div className='flex justify-between gap-x-5'>
                <label className='flex-1'>
                    <div>phone</div>
                    <input className='w-full' type="tel" value={user.phone} readOnly name='phone' />
                </label>
                <label className='flex-1'>
                    <div>country</div>
                    <input className='w-full' readOnly value={user.country} name='country' />
                </label>
            </div>

            <div className='flex justify-between items-center gap-x-5'>
                <div>
                    <div>gender</div>
                    <div className='flex gap-x-8 py-[5px] bg-purple-50 px-1'>
                        <label className=''> 
                        {user.gender + ` `}
                        <input className='invisible' type="radio" value='male'readOnly name='gender' />
                        </label>

                        <label className='invisible'> 
                        <input className='invisible' type="radio" value='female' readOnly name='gender' />
                        {` female`}
                        </label>
                    </div>
                </div>
                <label className='flex-1'>
                    <div>birth date</div>
                    <input type="date" readOnly value={user.birthDate.split('T')[0]} name='birthDate' className='w-full' />
                </label>
            </div>
            {/* <div className='flex justify-between gap-5 text-center pt-10'>
                <button className='flex-1 py-3 text-white rounded-lg bg-red-600 hover:bg-red-700'>Delete Account</button>
                <button onClick={()=>setIsEdit(true)} className='flex-1 py-3 text-white rounded-lg bg-gray-500 hover:bg-gray-600'>Edit Profile</button>
            </div> */}
            
            {/* <SubmitButton /> */}
            {/* <p className='min-h-[2em] w-full text-red-500'>{state.message as string}</p> */}
        </form>
    )
}

function EditProfile() {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [country, setCountry] = useState(user.country);
    const [gender, setGender] = useState(user.gender);
    const [birthDate, setBirthDate] = useState(user.birthDate);

    return (
        <form className='profile-form md:w-3/4 [&_input:focus]:border-b-red-500'>
            <div className='text-center mb-6'>
                <div className='inline-block my-5'>
                    <Image className='border border-purple-600 rounded-full' src={`/${user.avatar}`} alt='avatar' width={150} height={150} />
                </div>
                <h1 className='text-lg font-bold text-purple-600'>{username}</h1>
            </div>

        <label>
            <span>username</span>
            <input autoFocus onChange={(e)=>setUsername(e.target.value)} type="text" required value={username} name='username' />
        </label>
        <label>
            <span>email</span>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required name='email' />
        </label>

        <div className='flex justify-between gap-x-5'>
            <label className='flex-1'>
                <div>phone</div>
                <input className='w-full' onChange={(e)=>setPhone(e.target.value)} value={phone} type="tel" required name='phone' />
            </label>
            <label className='flex-1'>
                <div>country</div>
                <input className='w-full' onChange={(e)=>setCountry(e.target.value)} value={country} type='' required name='country' />
            </label>
        </div>

        <div className='flex justify-between items-center gap-x-5'>
            <div>
                <div>gender</div>
                <div className='py-[5px] px-1 flex gap-x-8 bg-purple-50'>
                    <label> 
                    <input type="radio" value='male' onChange={(e)=>setGender(e.target.value as 'male')} checked={gender === 'male'} required name='gender' />
                    {` male`}
                    </label>

                    <label> 
                    <input type="radio" value='female' onChange={(e)=>setGender(e.target.value as 'female')} checked={gender === 'female'} required name='gender' />
                    {` female`}
                    </label>
                </div>
            </div>
            <label className='flex-1'>
                <div>birth date</div>
                <input type="date" onChange={(e)=>setBirthDate(e.target.value)} value={birthDate.split('T')[0]} required name='birthDate' className='w-full' />
            </label>
        </div>

        <div className='flex justify-between gap-5 text-center pt-10'>
                <button className='flex-1 py-3 text-white rounded-lg bg-blue-600 hover:bg-blue-700'>Save Changes</button>
                <button onClick={()=>setIsEdit(false)} className='flex-1 py-3 text-white rounded-lg bg-gray-500 hover:bg-gray-600'>Don't Save</button>
        </div>
        {/* <SubmitButton /> */}
        {/* <p className='min-h-[2em] w-full text-red-500'>{state.message as string}</p> */}
    </form>
    )
}
}

// function SubmitButton() {
//     const {pending} = useFormStatus();
//     return (
//         <button type="submit" disabled={pending} className={`block py-1 disabled:bg-gray-300 disabled:cursor-auto bg-violet-600 hover:bg-violet-700 rounded-md text-white cursor-pointer`}>
//             log in
//         </button>
//     )
// }


