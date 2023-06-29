import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useReceivedMailRequest = () => {
    const [inboxMails, setInboxMails] = useState([])

    const email = useSelector(state => state.auth.email)
    const mails = useSelector(state => state.mails)

    useEffect(() => {
        const fetchReceivedAllEmail = async() => {
            try{
                const res = await axios.get(`https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com/email-box/${email}/received.json`);
                if (res.status === 200){
                    const data = [];
                    for (let key in res.data){
                        data.push({...res.data[key], id:key})
                    }
                    setInboxMails(data)
                }else{
                    throw new Error("Mails not Found")
                }
            }catch(error){
                // console.log(error)
            }
        }
        fetchReceivedAllEmail()
        const checkNewMessages = setInterval(fetchReceivedAllEmail, 1000);
        return () => clearInterval(checkNewMessages)
    },[email, mails])

    if (inboxMails === null) {
        return "";
    }
    
    const result = Object.values(inboxMails);
    result.reverse();

  return result;
}

export default useReceivedMailRequest