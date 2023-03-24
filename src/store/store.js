import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authSlice";
import emailSlice from "./emailSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        email: emailSlice.reducer
    }
})
export default store