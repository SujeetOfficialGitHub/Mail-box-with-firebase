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
            const newEmail = action.payload;
            state.recievedEmails.push({
                id: newEmail.id,
                from: newEmail.from,
                subject: newEmail.subject,
                message: newEmail.message,
                read: newEmail.reads,
            })
        },
        sentBox(state, action){
            const sentEmail = action.payload;

            state.sentEmails.push({
                id: sentEmail.id,
                to: sentEmail.to,
                subject: sentEmail.subject,
                message: sentEmail.message,
            })
        },
        deleteMail(state, action){
            state.recievedEmails = state.recievedEmails.filter(item => {
                return item.id !== action.payload.id
            })
        }
        // increaseUnreadEmail(state){
        //     state.unread = state.unread + 1
        // },
        // decreaseUnreadEmail(state){
        //     if (state.unread > 0){
        //         state.unread = state.unread - 1
        //     }
        // }
    },
})
export const emailActions = emailSlice.actions;
export default emailSlice