import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { NavItem, Nav, Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap";
import IconP    from './IconP'
import ReporteDeNegocio from '../assets/img/reporte-de-negocios.png'
import LogoBlipBlaPalabra from "./iconosCom/LogoBlipBlaPalabra";

const MenuAdmi = ({toggle, isOpen}) => {
  return (<Offcanvas toggle={toggle}  isOpen={isOpen} >
  <OffcanvasHeader toggle={toggle} >  <NavLink  className='d-flex '   to='/'><LogoBlipBlaPalabra style={{width:"8em"}} className="mt-1"/>   </NavLink></OffcanvasHeader>
  <OffcanvasBody>
    <Nav   vertical className="flex-column mb-auto  minav" >
    <NavItem    className="item">
     <NavLink    to='/VerEstudiante'    className='linkNav'>Estudiante</NavLink>
     </NavItem>
     <NavItem    className="item">
    <NavLink    to='/VerCategoria'  className='linkNav'>Categoria</NavLink>
    </NavItem>
    <NavItem     className="item">
    <NavLink    to="/VerRompecabeza"    className='linkNav'>Rompecabeza</NavLink>
    </NavItem>
    <NavItem     className="item">
   <NavLink     to='/VerVocabulario'    className='linkNav'> Vocabulario</NavLink>
   </NavItem>
   <NavItem  className="item">
    <NavLink    to='/VerOracion'    className='linkNav'>Oracion</NavLink>  
    </NavItem>    
   <NavItem  className="item">
    <NavLink    to='/Equipo'    className='linkNav'>Equipo</NavLink>
    </NavItem>
    <NavItem     className="item">
    <NavLink    to='/ActividadColaborativa' className='linkNav'>Actividades</NavLink>
    </NavItem>
    <NavItem    className="item" >
    <NavLink    to='/ReporteEstudiante' className='linkNav'><img  src={ReporteDeNegocio}  alt='test'/> Reporte</NavLink>
    </NavItem>
    </Nav>
    </OffcanvasBody>
    </Offcanvas>
  )
}
 export default MenuAdmi