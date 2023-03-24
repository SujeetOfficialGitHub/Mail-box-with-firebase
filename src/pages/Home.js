import React from 'react'
import ComposeMail from '../components/mails/ComposeMail'
import SentMails from '../components/mails/SentMails'
import { Tab, Tabs } from 'react-bootstrap'
import Inbox from '../components/mails/Inbox'
import ReceivedMailRequest from '../components/http/received-mail'

const Home = () => {
  let count = 0;
  const result = ReceivedMailRequest()
  if (result.length === 0){
    count = 0
  }else{
    result.forEach((item) => {
      if (item.read === true){
        count++
      }
    })
  }

  return (
    <div>
        <Tabs
    //   defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Send Mails">
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