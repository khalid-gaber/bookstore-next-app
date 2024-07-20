"use client"

import Book from "@/components/Book"
import Paginater from "@/components/Paginater";
import { book, meta } from "@/utilis/types";
import { useEffect, useState, Suspense } from "react";

export default function () {
  const [books, setBooks] = useState((null as unknown as book[]));
  const [meta, setMeta] = useState({
    current_page: 0,
    limit: 0,
    isMore: true
  });
  useEffect(()=>{
    async function fetchData(){
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books?limit=12&current_page=1`, {
        cache: 'no-store'
      });
      if(!res.ok) {
        throw new Error('failed to fetch posts')
      }
      const data = await res.json();
      console.log(data);
      setBooks(data.data);
      setMeta(data.meta);
    }
    fetchData();
  }, [])
  return (
    <>
    <div className="w-full md:w-3/4 mx-auto flex flex-wrap justify-center text-center">
      {books?.map(b => (
        <Book key={b._id} _id={b._id} title={b.title} price={b.price} image={b.image} /> 
      ))}
    </div>
      <Suspense fallback={<Loading />}>
        <Paginater meta={meta} setMeta={setMeta} books={books} setBooks={setBooks} />
      </Suspense>
      </>
  )
}

function Loading() {
  return (
    <div>loading</div>
  )
}
