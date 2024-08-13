import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type token = {value: string}

const initialState: token = {value: ''};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateToken: (state, action: PayloadAction<token>) => {
            state.value = action.payload.value;
        },
        resetToken: state => {value: ''},
    }
})

export const { updateToken, resetToken } = userSlice.actions;
export default userSlice.reducer;
