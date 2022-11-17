import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { NavItem, Nav } from "reactstrap";
import IconP    from './IconP'
import ReporteDeNegocio from '../assets/img/reporte-de-negocios.png'

class MenuAdmi extends Component{

    render(){
    return(
        <Nav   vertical className="flex-column mb-auto  minav" >
        <NavItem  className="item">
         <NavLink  className='d-flex '   to='/'><IconP/></NavLink>
         </NavItem>
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
    )
}
}
export default MenuAdmi;
