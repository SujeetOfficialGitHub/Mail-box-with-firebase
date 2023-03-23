import React, { useState, useRef, useContext, useMemo } from 'react';
import { EditorState, convertToRaw, convertFromHTML, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Form, Button } from 'react-bootstrap';
import AuthContext from '../../store/auth-context';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { emailActions } from '../../store/emailSlice';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';


const ComposeMail = () => {
    // const [message, setMessage] = useState('This is the messade');
    const [editorState, setEditorState] = useState(() =>
            EditorState.createEmpty()
        );

    const emailInputRef = useRef();
    const subjectInputRef = useRef()
    
    const authCtx = useContext(AuthContext)
    const dispatch = useDispatch();

    const messageHandler = (e) => {
        setEditorState(e)
        
    }
    // console.log(editorState)
    const message = draftToHtml(convertToRaw(editorState.getCurrentContent()))

    const submitHandler = async(e) => {
        e.preventDefault()
        const enteredEmail = emailInputRef.current.value;
        const enteredSubject = subjectInputRef.current.value;

        const receiverEmail = enteredEmail.replace('@','').replace('.','');
        const senderEmail = authCtx.email;

        const objSent = {
            to: receiverEmail,
            subject: enteredSubject,
            message: message,
        };

        try{
            const res = await axios.post(`https://mail-box-a39e6-default-rtdb.firebaseio.com/email-box/${senderEmail}/sent.json`, objSent);
            if (res.status === 200){
                const data = await res.data;
                const backRes = await axios.post(`https://mail-box-a39e6-default-rtdb.firebaseio.com/email-box/${senderEmail}/sent/${data.name}.json`, {id: data.name});
                if (backRes.status === 200){
                    dispatch(emailActions.sentBox({
                        id: data.name,
                        to: objSent.to,
                        subject: objSent.subject,
                        message: objSent.message
                    }))
                    alert("Send successfully")
                }
            }
        }catch(error){
            console.log(error)
            alert("failed to send message")
        }
        const objReceived = {
            from: senderEmail,
            subject: enteredSubject,
            message: message,
        }
        try{
            const res = await axios.post(`https://mail-box-a39e6-default-rtdb.firebaseio.com/email-box/${receiverEmail}/received.json`, objReceived);
            if (res.status === 200){
                const data = await res.data
                const backRes = await axios.post(`https://mail-box-a39e6-default-rtdb.firebaseio.com/email-box/${receiverEmail}/received/${data.name}.json`, {id:data.name, read: true});
                if (backRes.status === 200){
                    dispatch(emailActions.recievedEmails({
                        id: data.name,
                        from: objReceived.from,
                        subject: objReceived.subject,
                        message: objReceived.message,
                        read: true
                    }))
                }
            }
        }catch(error){
            console.log(error)
            alert("failed")
        }
        emailInputRef.current.value = '';
        subjectInputRef.current.value = '';
        setEditorState(() => EditorState.createEmpty()) 

    }


    return (
    <div style={{maxWidth: "40rem", margin: "2rem auto"}} >
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>To</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                ref={emailInputRef}
                className="bg-light"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject"
                required
                ref={subjectInputRef}
                className="bg-light"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMessage">
              <Form.Label>message</Form.Label>

              <Editor
                editorState={editorState}
                onEditorStateChange={messageHandler}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                wrapperStyle={{
                  border: "1px solid black",
                  borderRadius: "5px",
                  minHeight: "250px",
                }}
                />;
            </Form.Group>
            <Button type="submit">Send</Button>
        </Form>
        <div>
         
          {/* <div
            dangerouslySetInnerHTML={{
              __html: messData
            }}
          /> */}
        </div>
    </div>
  )
}


export default ComposeMail