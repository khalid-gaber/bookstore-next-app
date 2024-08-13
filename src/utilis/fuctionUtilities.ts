import { AppDispatch } from "@/store/store";
import { updateToken } from "@/store/slices/accessTokenSlice";
import { updateUser } from "@/store/slices/userSlice";

export async function setCookie(cookies: string[]){
    const res = await fetch('/api/set-cookie', {
        cache: 'no-store',
        method: 'POST',
        body: JSON.stringify({cookies})
    });
}

export async function getAccessToken (url = `${process.env.NEXT_PUBLIC_URL}/token`) {
    const res = await fetch(`/api/access-token?url=${url}`, {
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
    token && dispatch(updateToken({value: token}));
    
    if(!isUserStored && token) {
        const user = await getUser(token);
        dispatch(updateUser({...user}));
    }
}
