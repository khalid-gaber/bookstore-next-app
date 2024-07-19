import Image from 'next/image';
import { book } from '@/utilis/types';
import Link from 'next/link';

export default function Book ({title, price, image, _id}: book) {
  return (
    <Link href={`/books/${_id}`} className='h-72 m-5 w-52 my-7 shadow-lg border bg-white p-2 flex flex-col justify-between hover:shadow-purple-500 hover:shadow-2xl'>
        <b className=''>{title}</b>
        <div className='relative flex-1 w-full my-5'>
            <Image className='object-contain' fill src={(`${process.env.NEXT_PUBLIC_URL}/${image || "default.jpeg"}` as string)} alt='post image'/>
        </div>
        <h3 className='font-bold text-lg text-center text-red-500'>$ {price}</h3>
    </Link>
  )
}
