import axios from 'axios';
import React, {useState} from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {emailActions} from '../../store/emailSlice'

const ReceivedMailsView = (props) => {
    const [show, setShow] = useState(false);
    const email = useSelector(state => state.auth.email)
    const dispatch = useDispatch()

    const checkread = props.read
    
    const handleShow = async() => {
        try{
            const res = await axios.patch(`https://mail-box-a39e6-default-rtdb.firebaseio.com/email-box/${email}/received/${props.id}.json`,{read: false});
            if (res.status === 200){
                setShow(true);
                dispatch(emailActions.recievedEmails({...props, read: false}))
            }
        }catch(error){
            console.log(error)
        }
    }
    const handleDelete = async() => {
        try{
            const res = await axios.delete(`https://mail-box-a39e6-default-rtdb.firebaseio.com/email-box/${email}/received/${props.id}.json`);
            if (res.status === 200){
                console.log('Email deleted successfully')
            }
        }catch(error){
            console.log(error)
        }
        setShow(false); 
    }
    const handleClose = () => {
        setShow(false)
    }

    let seenCheck = checkread === true ? "🔵 " : " ";
  return (
    <div key={props.id} className='border mx-auto m-2 p-1' style={{maxWidth: '30rem', cursor: 'pointer'}}>
        <div variant="primary" onClick={handleShow}>
            <div>
                <p>From -{props.from}</p>
                <h6>{props.subject}</h6> 
                {seenCheck}
            </div>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.subject}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div
                    dangerouslySetInnerHTML={{
                    __html: props.message
                    }}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
        
    </div>
  )
}
export default ReceivedMailsView