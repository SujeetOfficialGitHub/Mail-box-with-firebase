import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "./emailSlice";

const store = configureStore({
    reducer: {
        email: emailSlice.reducer
    }
})
export default store