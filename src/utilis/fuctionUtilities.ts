import { AppDispatch } from "@/store/store";
import { resetToken, updateToken } from "@/store/slices/accessTokenSlice";
import { updateUser } from "@/store/slices/userSlice";

export async function setCookie(cookies: string[]){
    const res = await fetch('/api/set-cookie', {
        cache: 'no-store',
        method: 'POST',
        body: JSON.stringify({cookies})
    });
}

export async function getAccessToken () {
    const res = await fetch(`/api/access-token`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }
    });
    if(res.ok) {
        const json = await res.json();
        return json.accessToken;
    } else {
        console.log(res);
        return null;
    }
  }

  export async function getUser (accessToken: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
    });
    const json = await res.json();
    if(res.ok) {
        return json.data;
    } else {
        return null;
    }
  }

  export async function setAccessTokenAndUser(dispatch: AppDispatch, isUserStored: boolean) {
    const token = await getAccessToken();
    token ? dispatch(updateToken({value: token})) : dispatch(resetToken());
    
    if(!isUserStored && token) {
        const user = await getUser(token);
        dispatch(updateUser({...user}));
    }
    return token;
}

export async function HandleAccessTokenAndFetch(callbackFetch: (accessToken: string)=>any, accessToken: string, dispatch: AppDispatch | null = null) {
    let res: Response = await callbackFetch(accessToken);

    if(res.status === 403 || !accessToken) {
        if(dispatch) {
            accessToken = await setAccessTokenAndUser(dispatch, true);
        } else {
            accessToken = await getAccessToken();
        }
    res = await callbackFetch(accessToken);
    }
  
    return await res;
  }
  
