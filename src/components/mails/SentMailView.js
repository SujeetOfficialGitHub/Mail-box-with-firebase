import React, {useState} from 'react'
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

const SentMailView = (props) => {
    const [show, setShow] = useState(false);
    const email = useSelector(state => state.auth.email)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = async() => {
        try{
            const res = await axios.delete(`https://mail-box-a39e6-default-rtdb.firebaseio.com/email-box/${email}/sent/${props.id}.json`);
            if (res.status === 200){
                setShow(false)
            }
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div key={props.id} className='border mx-auto m-2 p-1' style={{maxWidth: '30rem', cursor: 'pointer'}}>
        <div variant="primary" onClick={handleShow}>
            <div>
                <p>To -{props.to}</p>
                <h6>{props.subject}</h6> 
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
export default SentMailView