"use client"
import { book, meta } from "@/utilis/types";
import { Dispatch, SetStateAction, } from "react";

type Paginator = {
    books: book[],
    setBooks: Dispatch<SetStateAction<book[]>>,
     meta: meta,
    setMeta: Dispatch<SetStateAction<meta>>,
}

export default async function Paginater({books, setBooks, meta, setMeta}: Paginator) {
        async function handleClick(){
        if(meta.isMore){
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
    return meta.isMore ? (
        <PaginateBottom />
    ) : (<></>)
    function PaginateBottom(){
        return (
            <div className='w-full mb-7'>
                <button onClick={handleClick} className="block mx-auto bg-red-500 p-2 rounded-lg text-white text-xs">MORE</button>
            </div>
        )
    }
}


