import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const cookieStore = cookies()
    const refreshToken = cookieStore.get('refreshToken')
    if(refreshToken) {
        const cookie = `${refreshToken?.name}=${refreshToken?.value}`
    //////////////////////////////////////////////
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/logout`, {
        cache: 'no-store',
        method: "POST",
        headers: {
            "Cookie": `${cookie}`
        },
        })
        const status = res.status
        if (!res.ok) {
            console.log('error from api/logout');
        }

        return new Response(null, {
            status: status || 404,
            headers: {
                'Set-Cookie': `${await res.headers.getSetCookie() || ''}`
            }
        })
    } else {
        return new Response(null, {
            status: 404,
        })
    }

}
  