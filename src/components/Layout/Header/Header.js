import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Mail-Box</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink className="nav-link" to='/'>Home</NavLink>
            <NavLink className="nav-link" to='/signup'>Signup</NavLink>
            <NavLink className="nav-link" to='/login'>Login</NavLink>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default Header