import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import AuthContext from '../store/auth-context'
const Header = () => {
    const authCtx = useContext(AuthContext)
    const isLoggedIn = localStorage.getItem('token')
    const logoutHandler = () => {
        authCtx.logout()
    }
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
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