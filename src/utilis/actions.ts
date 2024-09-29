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


////////////////////////////////////login action//////
export async function editProfile (prevState: string, formData: FormData) {
    const username = formData.get('username');
    const avatar = formData.get('avatar');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const country = formData.get('country');
    const gender = formData.get('gender');
    const birthDate = formData.get('birthDate');
    console.log(username , email, phone, country, gender, birthDate);
    console.log(avatar);

    // if(pass !== rePass) {
    //     return {message: 'make sure from your password'}
    // }
    // const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/register`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ username, email, pass, phone, country, gender, birthDate })
    // })
    
    // const json = await res.json();
    // const cookies = await res.headers.getSetCookie();
    // if(!res.ok) {
    //     return {message: json.message || 'something went wrong'} as any;
    // } else {
    //     return {...json, cookies};
    // }
    return 'any thong' as any;

}
////////////////////////////////////////


////////////////////////////////////post form action//////
// export async function addPost (prevState: string, formData: FormData) {
//     const content = formData.get('content');
//     const image: any = formData.get('image');
//     const accessToken = formData.get('accessToken');

//     let form_data = new FormData();
//     form_data.append("content", content as string);
//     if (image.size) {
//         form_data.append("image", image as string);
//     }

//     console.log('form_data');
//     return {ok: true, form_data} as any;

//     const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts`, {
//         cache: 'no-cache',
//         method: "POST",
//         headers: {
//             "Authorization": `Bearer ${accessToken}`
//         },
//         body: form_data
//     })
//     const json = await res.json();
//     console.log(json);
//     if(!res.ok) {
//         return {ok: false, message: json.message || 'post did not created'} as any;
//     } else {
//         return {ok: true};
//     }
// }
////////////////////////////////////////
