import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import accessTokenSlice from "./slices/accessTokenSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        accessToken: accessTokenSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;