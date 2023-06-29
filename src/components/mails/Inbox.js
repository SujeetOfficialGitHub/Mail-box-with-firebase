
import ReceivedMailView from './ReceivedMailsView'
import useReceivedMailRequest from '../../http/received-mail'

const Inbox = () => {
    const receivedAllMails = useReceivedMailRequest();
    if (receivedAllMails.length === 0){
        return <h1>No mails found</h1>
    }
    // console.log(receivedAllMails)

  return (
    <div>
        {receivedAllMails.map((receivedEmail) => (
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