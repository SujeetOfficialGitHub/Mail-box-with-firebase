import axios from 'axios'
import React, {useRef, useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../store/authSlice'
import './Signup.css'

const Signup = () => {
    const [error, setError] = useState()
    const inputEmailRef = useRef()
    const inputPasswordRef = useRef()
    const inputCPasswordRef = useRef()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submitHandler = async(e) => {
        e.preventDefault()
        const email = inputEmailRef.current.value;
        const password = inputPasswordRef.current.value;
        const cPassowrd = inputCPasswordRef.current.value;
        if (password === cPassowrd){
            try{
                const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
                {email: email, password: password, returnSecureToken: true})
                if (res.status === 200){
                    const data = await res.data
                    inputEmailRef.current.value = '';
                    inputPasswordRef.current.value = '';
                    dispatch(authActions.signup({token: data.token, email: data.email}))
                    // console.log("Sign up successfully")
                    navigate('/')
                }else{
                    throw new Error('Registration Failed')
                }
            }catch(error){
                setError(error.response.data.error.message)
            }
        }else{
            setError("Invalid email and password")
        }
    }
    if (error){
        setTimeout(() => {
            setError('')
        }, 10000)
    }
  return (
    <div className='signup mx-auto border'>
        <h3 className='text-center'>Signup</h3>
        {error && <p className='bg-danger text-light text-center'>{error}</p>}
        <Form onSubmit={(submitHandler)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" ref={inputEmailRef} placeholder="Enter email" required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={inputPasswordRef} placeholder="Password" required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" ref={inputCPasswordRef} placeholder="Confirm Password" required/>
            </Form.Group>

            <Button variant="secondary" type="submit">
                Sign up
            </Button>
        </Form>
        <p>Have an account <Link to='/login'>Login</Link></p>
    </div>
  )
}

export default Signup