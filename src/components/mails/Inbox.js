import axios from 'axios'
import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReceivedMailView from './ReceivedMailsView'

const Inbox = () => {
    const [receivedAllEmails, setReceivedAllEmails] = useState([])
    const email = useSelector(state => state.auth.email)
    const reMails = useSelector(state => state.email)
    useEffect(() => {
        const fetchReceivedAllEmail = async() => {
            try{
                const {data} = await axios.get(`https://mail-box-a39e6-default-rtdb.firebaseio.com/email-box/${email}/received.json`);
                setReceivedAllEmails(data)
            }catch(error){
                console.log(error)
            }
        }
        fetchReceivedAllEmail()
    },[email, reMails])
    if (receivedAllEmails === null) {
        return "";
      }
    
    const result = Object.values(receivedAllEmails);
    result.reverse();
    console.log(result)
  return (
    <div>
        {result && result.map((receivedEmail) => (
            <ReceivedMailView 
                key={receivedEmail.id}
                id=  {receivedEmail.id}
                from=  {receivedEmail.from}
                subject=  {receivedEmail.subject}
                message=  {receivedEmail.message}
                read = {receivedEmail.read}
            />
        ))}
    </div>
  )
}

export default Inbox