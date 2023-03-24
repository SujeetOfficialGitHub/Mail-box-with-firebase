import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const ReceivedMailRequest = () => {
    const [inboxMails, setInboxMails] = useState([])

    const email = useSelector(state => state.auth.email)
    const resmail = useSelector(state => state.email)

    useEffect(() => {
        const fetchReceivedAllEmail = async() => {
            try{
                const {data} = await axios.get(`https://mail-box-a39e6-default-rtdb.firebaseio.com/email-box/${email}/received.json`);
                setInboxMails(data)
            }catch(error){
                console.log(error)
            }
        }
        fetchReceivedAllEmail()
    },[email, resmail])

    if (inboxMails === null) {
        return "";
    }
    
    const result = Object.values(inboxMails);
    result.reverse();

  return result;
}

export default ReceivedMailRequest