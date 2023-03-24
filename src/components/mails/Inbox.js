
import ReceivedMailView from './ReceivedMailsView'
import ReceivedMailRequest from '../http/received-mail'

const Inbox = () => {
    const receivedAllMails = ReceivedMailRequest()
    if (receivedAllMails.length === 0){
        return <h1>No mail found</h1>
    }

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