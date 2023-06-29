import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authSlice";
import emailSlice from "./emailSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        mails: emailSlice.reducer
    }
})
export default store