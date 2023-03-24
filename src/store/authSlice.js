import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    email: localStorage.getItem('email') ? localStorage.getItem('email') : '',
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    isLoggedIn: true ? localStorage.getItem('token') : false,
}
const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        signup(state, action){
            state.isLoggedIn = true;
            state.email = action.payload.email.replace('@','').replace('.','');
            state.token = action.payload.token;
            localStorage.setItem('email', action.payload.email.replace('@','').replace('.',''))
            localStorage.setItem('token',action.payload.token)
        },
        login(state, action){
            state.isLoggedIn = true;
            console.log(action)
            state.email = action.payload.email.replace('@','').replace('.','');
            state.token = action.payload.token;
            localStorage.setItem('email', action.payload.email.replace('@','').replace('.',''))
            localStorage.setItem('token',action.payload.token)
        },
        logout(state){
            state.isLoggedIn = false;
            state.email = '';
            state.token = '';
            localStorage.removeItem('token')
            localStorage.removeItem('email')
        },
    }
})
export const authActions = AuthSlice.actions
export default AuthSlice