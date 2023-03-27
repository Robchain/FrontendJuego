import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { NavItem, Nav, Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap";
import { User,  Columns,  Users, Image, Circle,  Grid,  Layers} from "react-feather"
import ReporteDeNegocio from '../assets/img/reporte-de-negocios.png'
import LogoBlipBlaPalabra from "./iconosCom/LogoBlipBlaPalabra";

const MenuAdmi = ({toggle, isOpen}) => {
  return (<Offcanvas toggle={toggle}  isOpen={isOpen} >
  <OffcanvasHeader style={{padding:"0 15px"}} >  <LogoBlipBlaPalabra style={{width:"7em"}} className="mt-2"/> </OffcanvasHeader>
  <OffcanvasBody style={{padding:0}}>
    <Nav   vertical className="flex-column mb-auto  minav" >
    <NavItem    className="item">
     <NavLink    to='/VerEstudiante'    className='linkNav'> <User size={20}/>Estudiante</NavLink>
     </NavItem>
     <NavItem    className="item">
    <NavLink    to='/VerCategoria'  className='linkNav'><Grid  size={20}/>Categoria</NavLink>
    </NavItem>
    <NavItem     className="item">
    <NavLink    to="/VerRompecabeza"    className='linkNav'> <Image size={20}/>Rompecabeza</NavLink>
    </NavItem>
    <NavItem     className="item">
   <NavLink     to='/VerVocabulario'    className='linkNav'><Circle  size={20}/> Vocabulario</NavLink>
   </NavItem>
   <NavItem  className="item">
    <NavLink    to='/VerOracion'    className='linkNav'><Columns size={20}/>Oracion</NavLink>  
    </NavItem>    
   <NavItem  className="item">
    <NavLink    to='/Equipo'    className='linkNav'><Users  size={20}/>Equipo</NavLink>
    </NavItem>
    <NavItem     className="item">
    <NavLink    to='/ActividadColaborativa' className='linkNav'><Layers  size={20}/>Actividades</NavLink>
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