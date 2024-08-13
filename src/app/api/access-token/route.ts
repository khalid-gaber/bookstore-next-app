import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    // const searchParams = req.nextUrl.searchParams;
    // const query = searchParams.get('url')

    const cookieStore = cookies()
    const refreshToken = cookieStore.get('refreshToken')
    if(refreshToken) {
        const cookie = `${refreshToken?.name}=${refreshToken?.value}`
    
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/token`, {
        cache: 'no-store',
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": `${cookie}`
        },
        })
        const status = res.status
        const json = res.ok && await res.json();
        if (!res.ok) {
            console.log('error from api/access-token');
        }

        return new Response(JSON.stringify(json), {
            status: status || 403,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': `${await res.headers.getSetCookie() || ''}`
            }
        })
    } else {
        return new Response(null, {
            status: 403,
        })
    }

}
  