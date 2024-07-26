"use server"


/////////////////login action///////////////////
export async function login (prevState: string, formData: FormData) {
    const email = formData.get('email');
    const pass = formData.get('pass');

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email,pass })
    })
    const json = await res.json();
    if(!res.ok || !json.token) {
        return {message: json.message || 'something went wrong'} as any;
    } else {
        return {...json};
    }
}


/////////////////register action///////////////////
export async function register (prevState: string, formData: FormData) {
    const username = formData.get('username');
    const email = formData.get('email');
    const pass = formData.get('pass');
    const rePass = formData.get('rePass');

    if(pass !== rePass) {
        return {message: 'make sure from your password'}
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, pass })
    })
    
    const json = await res.json();
    if(!res.ok || !json.token) {
        return {message: json.message || 'something went wrong'} as any;
    } else {
        return {...json};
    }
}

