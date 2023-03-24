import axios from 'axios'
import React, {useRef, useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../store/authSlice'

const Login = () => {
    const [error, setError] = useState()
    const inputEmailRef = useRef()
    const inputPasswordRef = useRef()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submitHandler = async(e) => {
        e.preventDefault()
        const email = inputEmailRef.current.value;
        const password = inputPasswordRef.current.value;
        try{
            const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnOhETHoXsPijC-qmGQwUAOmngQVCJ3N4`,
            {email: email, password: password, returnSecureToken: true})
            if (res.status === 200){
                console.log(res)
                const data = await res.data
                inputEmailRef.current.value = '';
                inputPasswordRef.current.value = '';

                dispatch(authActions.login({token: data.token, email: data.email}))
                console.log("Login successfully")
                navigate('/')
            }else{
                throw new Error('Registration Failed')
            }
        }catch(error){
            console.log(error)
            setError(error.message)
        }
    }
    if (error){
        setTimeout(() => {
            setError('')
        }, 10000)
    }
  return (
    <div className='w-50 mx-auto m-3 p-3 border'>
        <h3 className='text-center'>Login</h3>
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

            <Button variant="secondary" type="submit">
                Login
            </Button>
        </Form>
        <p>Don't Have an account <Link to='/signup'>Signup</Link></p>
    </div>
  )
}

export default Login