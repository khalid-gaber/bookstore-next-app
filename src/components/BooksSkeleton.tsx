export default function BooksSkeleton() {

    function Skeleton() {
      return (
        <div className='h-72 m-5 w-52 my-7 shadow-lg bg-white p-2 flex flex-col justify-between'>
          <div className='animate-pulse bg-blue-50 text-transparent'>t</div>
          <div className='animate-pulse bg-blue-50 flex-1 my-5'></div>
          <div className='animate-pulse bg-blue-50 text-transparent'>price</div>
        </div>
      )
      }

    return (
      <div className='w-full md:w-3/4 mx-auto flex flex-wrap justify-center text-center'>
        <Skeleton /><Skeleton /><Skeleton /><Skeleton />
        <Skeleton /><Skeleton /><Skeleton /><Skeleton />
      </div>
    )
  }
