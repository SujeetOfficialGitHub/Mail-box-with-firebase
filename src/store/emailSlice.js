import { createSlice } from "@reduxjs/toolkit";


const initialEmailState = {
    recievedEmails: [],
    sentEmails: [],
    unread: 0,
    email: localStorage.getItem('email')
}
const emailSlice = createSlice({
    name: "email",
    initialState: initialEmailState,
    reducers: {
        recievedEmails(state, action){
            state.recievedEmails.push(action.payload)
        },
        sentBox(state, action){
            state.sentEmails.push(action.payload)
        },
        deleteMail(state, action){
            state.recievedEmails = state.recievedEmails.filter(item => {
                return item.id !== action.payload.id
            })
        }
    },
})
export const emailActions = emailSlice.actions;
export default emailSlice