export default function BooksSkeleton() {

    return (
    <div className='w-full md:w-3/4 bg-white shadow-lg px-5 border'>
        <div className='py-2 flex items-stretch gap-2'>
            <div className="animate-pulse bg-blue-50 w-10 h-10"></div>
            <div className='flex flex-col justify-between'>
                <div className='animate-pulse bg-blue-50 w-24 h-4'></div>
                <div className='animate-pulse bg-blue-50 w-32 h-4'></div>
            </div>
        </div>
        <div className="block my-5">
            <div className='animate-pulse bg-blue-50 w-full m-auto h-48'></div>
            <p className="animate-pulse bg-blue-50 my-2 h-6 w-full"></p>
            <p className="animate-pulse bg-blue-50 my-2 h-6 w-full"></p>
            <p className="animate-pulse bg-blue-50 my-2 h-6 w-2/3 "></p>
        </div>
        <hr />
        <div className="flex items-center justify-between py-2">
            <div className='animate-pulse bg-blue-100 h-10 w-14 rounded-3xl'></div>
            <div className='flex items-center gap-1'>
                <div className='animate-pulse bg-blue-100 h-10 w-14 rounded-l-3xl'></div>
                <div className='animate-pulse bg-blue-100 h-10 w-14 rounded-e-3xl'></div>
            </div>
        </div>
    </div>

    )
  }
