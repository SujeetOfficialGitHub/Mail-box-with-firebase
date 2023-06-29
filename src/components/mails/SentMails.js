import { useEffect, useState } from 'react'
import SentMailView from './SentMailView';
// import AllSentMails from '../../http/all-sent-mails';
import axios from 'axios';
import { useSelector } from 'react-redux';

const SentMails = () => {
  const [sentAllMails, setsentAllMails] = useState([])

  const email = useSelector(state => state.auth.email)
  const mails = useSelector(state => state.mails)

    useEffect(() => {
        const fetchAllSentMails = async() => {
          try{
            const res = await axios.get(`https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com/email-box/${email}/sent.json`);
            const data = [];
            for (let key in res.data){
              data.push({...res.data[key], id: key})
            }
            setsentAllMails(data)
          }catch(error){
            // console.log(error)
          }
        }
        fetchAllSentMails()
    },[email, mails])
    if (sentAllMails === null){
      return <h1>No mails found</h1>

    }
    const result = Object.values(sentAllMails);
    result.reverse();


  return (
    <div>
        {result && result.map((sentMail) => (
            <SentMailView
                key={sentMail.id}
                id= {sentMail.id}
                to= {sentMail.to}
                subject= {sentMail.subject}
                message= {sentMail.message}
            />
        ))}
    </div>
  )
}

export default SentMails