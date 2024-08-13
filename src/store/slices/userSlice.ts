import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/utilis/types";


const initialState: User = {
    _id: '',
    username: '',
    email: '',
    phone: '',
    country: '',
    gender: '' as 'male',
    birthDate: '',
    avatar: '',
  };

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<User>) => {
            state._id = action.payload._id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.country = action.payload.country;
            state.gender = action.payload.gender;
            state.birthDate = action.payload.birthDate;
            state.avatar = action.payload.avatar;
        },
        resetUser: state => {
            state._id = '',
            state.username = ''
            state.email = ''
            state.phone = ''
            state.country = ''
            state.gender = initialState.gender
            state.birthDate = ''
            state.avatar = ''
        },
    }
})

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
