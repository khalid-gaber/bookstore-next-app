"use client"
import { RootState } from "@/store/store";
import { HandleAccessTokenAndFetch } from "@/utilis/fuctionUtilities";
import { useState, useTransition } from "react";
import { useSelector } from "react-redux";

export default function PostForm() {
    const accessToken = useSelector((state: RootState) => state.accessToken).value;
    const [isPending, startTransition] = useTransition();
    const [content, setContent] = useState('');
    const [image, setImage] = useState<any>();
    const [message, setMessage] = useState('');


    async function handleSubmint() {
        let form_data = new FormData();
        form_data.append("content", content);
        if (image) {
            form_data.append("image", image);
        }
        const res = await HandleAccessTokenAndFetch(async (accessToken)=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts`, {
                cache: 'no-cache',
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
                body: form_data
            })
            return res;
        }, (accessToken as any) || '');
        if(!res.ok) {
            const json = await res.json()
            setMessage(json.message || 'sorry, there is a problem with uploading the post')
        } else {
            location.reload();
        }
    }

    return (
        <form>
            <div className=''>
                <label className="block bg-gray-300 py-12 text-center cursor-pointer" htmlFor="file">
                    <div className='bg-black text-white rounded mx-auto w-[230px] py-2'>Add Image</div>
                    <input
                    className="mt-3 w-[230px] cursor-pointer"
                    onChange={(e: any)=>setImage(e.target.files[0])}
                    placeholder="file"
                    type="file"
                    id="file"
                    />
                </label>
            </div>
            <div>
                <label className="sr-only" htmlFor="message">post content</label>

                <textarea
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    onChange={(e)=>setContent(e.target.value)}
                    value={content}
                    placeholder="post content"
                    rows={5}
                    id="message"
                    required
                ></textarea>
            </div>

                <button
                    className="w-full rounded-lg bg-blue-600 disabled:bg-gray-300 disabled:cursor-default px-5 py-3 font-medium text-white"
                    onClick={()=>startTransition(()=>handleSubmint())}
                    disabled={isPending}
                >
                    Add New Post
                </button>

            {message && 
            <p className="bg-white text-red-500 p-2">{message}</p>}
        </form>
    )
}
