import Image from "next/image";

export default async function ({params}: {params: {id: string}}) {
      const res = await fetch(`http://localhost:3030/api/books/${params.id}`, {
        cache: 'no-store'
      });
      if(!res.ok) {
        throw new Error('failed to fetch posts')
      }
      const book = await res.json();
  return (
    <div className="overflow-auto h-full">
        <div className='w-full md:w-1/2 mx-auto my-7 shadow-lg border bg-white p-2'>
            <div className=''>
                <b>{book.title}</b><br />
                <small>by <span className="text-purple-600">{book.author.firstName} {book.author.lastName}</span></small>
            </div>
            <div className='relative h-64 w-full my-5'>
                <Image className='object-contain' fill src={(`${process.env.NEXT_PUBLIC_URL}/${book.image || "default.jpeg"}` as string)} alt='post image'/>
            </div>
            <p className='text-gray-500 text-sm'>{book.des}</p>
            <div className='py-2 text-black'><hr /></div>
            <div className="mt-5 flex justify-around">
              <b className="py-3 text-red-500">$ {book.price}</b>
              <button className="px-7 py-3 rounded-md text-white font-bold bg-purple-500 hover:bg-purple-600">buy</button>
            </div>
        </div>
    </div>
  )
}
