import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store/authSlice';
import './Header.css'
const Header = () => {
    const {isLoggedIn, email} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(authActions.logout())
        navigate('/login')
    }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="#home">Mail Box</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                    {!isLoggedIn && 
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    }
                    {!isLoggedIn && 
                        <NavLink className="nav-link" to="/signup">Signup</NavLink>
                    }
                    {isLoggedIn && 
                        <Button onClick={logoutHandler} className='btn-sm h-50 mt-2' variant='secondary'>Logout</Button>
                    }
                </Nav>
                <Nav>
                    {email && <Button className='header-user' variant='secondary'>{email}</Button>}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header