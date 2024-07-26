export default function loading() {
  return (
    <div className="h-full py-10 w-full md:w-3/4 m-auto">
      <div className='h-full shadow-lg bg-white p-4 flex flex-col justify-between gap-2'>
        <div className='h-[2em] animate-pulse bg-blue-50 text-transparent'></div>
        <div className='h-[2em] animate-pulse bg-blue-50 text-transparent'></div>
        <div className='h-[2em] flex-1 animate-pulse bg-blue-50 text-transparent'></div>
        <div className='h-[2em] animate-pulse bg-blue-50 text-transparent'></div>
        <div className='h-[2em] animate-pulse bg-blue-50 text-transparent'></div>
      </div>
    </div>
)
}
