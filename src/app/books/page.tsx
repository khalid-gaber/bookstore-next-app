"use client"

import Book from "@/components/Book"
import { useTransition } from "react";
import { book } from "@/utilis/types";
import { useEffect, useState } from "react";
import BooksSkeleton from "@/components/BooksSkeleton";

export default function () {
  const [isPending, startTransition] = useTransition();
  const [books, setBooks] = useState(([] as unknown as book[]));
  const [meta, setMeta] = useState({
    current_page: 0,
    limit: 0,
    isMore: null
  });

  useEffect(()=>{
    startTransition(()=>{
      handleClick();
    })
  }, [])


  async function handleClick(){
    if(meta.isMore !== false){
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books?limit=12&current_page=${meta.current_page+1}`, {
        cache: 'no-store'
      });
      if(!res.ok) {
        throw new Error('failed to fetch posts')
      }
      const data = await res.json();
      setBooks(book => [...book, ...data.data]);
      setMeta(data.meta);
    }
  }


  console.log(isPending);
  return (
    <>
    <div className="w-full md:w-3/4 mx-auto flex flex-wrap justify-center text-center">
      {books?.map(b => (
        <Book key={b._id} _id={b._id} title={b.title} price={b.price} image={b.image} /> 
      ))}
    </div>
    {(isPending || meta.isMore === null) && <BooksSkeleton />}
    {(!isPending && meta.isMore) && <PaginationButton />}
    </>
  )

  function PaginationButton() {
    return (
      <div className='pagination w-full mb-7'>
        <button onClick={()=>startTransition(()=>handleClick())} className="block mx-auto bg-red-500 p-2 rounded-lg text-white text-xs">MORE</button>
      </div>
  
    )
  }  
}






