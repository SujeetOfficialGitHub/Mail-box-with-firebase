import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store/authSlice'
const Header = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(authActions.logout())
        navigate('/login')
    }
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Mail Box</Navbar.Brand>
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
        </Container>
      </Navbar>
  )
}

export default Header