
import { update } from "@/store/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";



export async function checkToken(dispatch: Dispatch, router: AppRouterInstance, routeTo = '/books'){
    if(localStorage.token) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/`, {
            cache: 'no-store',
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: `${localStorage.getItem('token')}`
            },
        })
        if(!res.ok) {
            return;
        }
        const json = await res.json();
        if(json.user){
            dispatch(update({_id: json.user._id, username: json.user.username}));
            router.replace(routeTo);
        } else {
            return;
        }
    }
}
