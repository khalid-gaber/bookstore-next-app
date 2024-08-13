"use server"

////////////////////////////////////login action//////
export async function login (prevState: string, formData: FormData) {
    const email = formData.get('email');
    const pass = formData.get('pass');

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/login`, {
        cache: 'no-cache',
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email,pass })
    })
    const json = await res.json();
    const cookies = await res.headers.getSetCookie();
    if(!res.ok) {
        return {message: json.message || 'something went wrong'} as any;
    } else {
        return {...json, cookies};
    }
}
////////////////////////////////////////




/////////////////register action///////////////////
export async function register (prevState: string, formData: FormData) {
    const username = formData.get('username');
    const email = formData.get('email');
    const pass = formData.get('pass');
    const rePass = formData.get('rePass');
    const phone = formData.get('phone');
    const country = formData.get('country');
    const gender = formData.get('gender');
    const birthDate = formData.get('birthDate');

    if(pass !== rePass) {
        return {message: 'make sure from your password'}
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, pass, phone, country, gender, birthDate })
    })
    
    const json = await res.json();
    const cookies = await res.headers.getSetCookie();
    if(!res.ok) {
        return {message: json.message || 'something went wrong'} as any;
    } else {
        return {...json, cookies};
    }
}
////////////////////////////////////////
