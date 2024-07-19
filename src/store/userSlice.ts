import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/utilis/types";


const initialState: User = {
    _id: '',
    username: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<User>) => {
            state._id = action.payload._id;
            state.username = action.payload.username;
        },
        reset: state => {
            state._id = '',
            state.username = ''
        },
    }
})

async function checkToken(){
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
        console.log(json);
    } else {
        return;
    }
}

export const { update, reset } = userSlice.actions;
export default userSlice.reducer;
