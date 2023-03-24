import React from 'react'
import ComposeMail from '../components/mails/ComposeMail'
import SentMails from '../components/mails/SentMails'
import { Tab, Tabs } from 'react-bootstrap'
import Inbox from '../components/mails/Inbox'

const Home = () => {
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
      <Tab eventKey="inbox" title="Inbox">
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