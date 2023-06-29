import React, { useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import './ComposeMail.css'
import { emailActions } from '../../store/emailSlice';
import RichTextEditor from './RichTextEditor';

// Convert html to plain text 
function htmlToPlainText(html) {
    const temporaryElement = document.createElement('div');
    temporaryElement.innerHTML = html;
    return temporaryElement.textContent || temporaryElement.innerText;
}

const ComposeMail = () => {
    const [toEmail, setToEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const email = useSelector(state => state.auth.email)
    const dispatch = useDispatch();


    const submitHandler = async(e) => {
        e.preventDefault()
        const plainTextMessage = htmlToPlainText(message);

        const receiverEmail = toEmail.replace('@','').replace('.','');
        const senderEmail = email;

        const objSent = {
            to: receiverEmail,
            subject,
            message: plainTextMessage
        };
        const objReceived = {
            from: senderEmail,
            subject,
            message: plainTextMessage,
            read: false
        }
        try{
            const res1 = await axios.post(`https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com/email-box/${senderEmail}/sent.json`, objSent);
            const res2 = await axios.post(`https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com/email-box/${receiverEmail}/received.json`, objReceived);
            if (res1.status === 200 && res2.status === 200){
                dispatch(emailActions.sentBox(
                    {...objSent, id: res1.data.name}
                ))
                dispatch(emailActions.recievedEmails(
                    {...objReceived, id: res2.data.name}
                ))
                alert("Send successfully");
                setToEmail('')
                setSubject('')
                setMessage('')
            }else{
                alert("Failed to send message");
            }
        }catch(error){
            // console.log(error)
            alert("Failed to send message");
        }

    }
  return (
    <div className='compose-mail'>
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.to">
                <Form.Label>To</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="example@gmail.com" 
                    value={toEmail}
                    onChange={(e) => setToEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter subject" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
            </Form.Group>
            <hr />
            <RichTextEditor 
                value={message}
                onChange={value => setMessage(value)}
            />
            <Button className='mt-2' type="submit">Send</Button>
        </Form>
    </div>
  )
}

export default ComposeMail
