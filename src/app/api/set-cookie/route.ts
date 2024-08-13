export async function POST(req: Request) {
      const body = await req.json();

    return new Response('', {
        status: 200,
        headers: {
            'Set-Cookie': `${body.cookies}`
        }
    })
  }
  