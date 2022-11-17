import React from 'react'
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap'
import BlipBlaPalabra from './BlipBlaPalabra'
import Alinieacion from './iconosCom/Alinieacion_del_texto'
export const NavBar = ({toggle}) => {
  return (
    
    <Navbar className='shadow bg-white rounded mt-4 mb-3'  light >
     <NavbarBrand className=' p-2'>
     {/*<div className='btn d-inline-block  d-xl-none' onClick={toggle}>
      <Alinieacion/>
      </div>*/}
      <Button onClick={toggle}>
        <Alinieacion/>
      </Button>
      <div  className='d-inline-block ms-3 '>
      <BlipBlaPalabra/>
      </div>
    </NavbarBrand>
    <Nav>
    <NavItem>
    </NavItem>
    </Nav>
    </Navbar>
    
  
  )
}
