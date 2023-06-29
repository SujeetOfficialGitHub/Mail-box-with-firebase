import React from 'react'
import ComposeMail from '../components/mails/ComposeMail'
import SentMails from '../components/mails/SentMails'
import { Tab, Tabs } from 'react-bootstrap'
import Inbox from '../components/mails/Inbox'
import useReceivedMailRequest from '../http/received-mail'

const Home = () => {
  let count = 0;
  const result = useReceivedMailRequest()
  if (result.length === 0){
    count = 0
  }else{
    result.forEach((item) => {
      if (item.read === false){
        count++
      }
    })
  }

  return (
    <div>
        <Tabs id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="home" title="Compose Mail">
                <ComposeMail />
            </Tab>
            <Tab eventKey="inbox" title={`Inbox ${count > 0 ? count : ''}`}>
                <Inbox />
            </Tab>
            <Tab eventKey="sent-mail" title="Sent">
                <SentMails />
            </Tab>
        </Tabs>
    </div>
  )
}

export default Home