import { useEffect, useState } from 'react'
import SentMailView from './SentMailView';
// import AllSentMails from '../../http/all-sent-mails';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const SentMails = () => {
  const [sentAllMails, setsentAllMails] = useState([])

  const email = useSelector(state => state.auth.email)
  const remail = useSelector(state => state.email)

    useEffect(() => {
        const fetchAllSentMails = async() => {
          try{
            const {data} = await axios.get(`https://mail-box-a39e6-default-rtdb.firebaseio.com/email-box/${email}/sent.json`);
            setsentAllMails(data)
          }catch(error){
            console.log(error)
          }
        }
        fetchAllSentMails()
    },[email, remail])
    if (sentAllMails === null){
      return ''
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