import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { NavItem, Nav } from "reactstrap";
import IconP    from './IconP'

class MenuAdmi extends Component{

    render(){
    return(
        <Nav   vertical>
        <NavItem>
         <NavLink    to='/'><IconP/></NavLink>
         </NavItem>
        <NavItem>
         <NavLink    to='/VerEstudiante'>Estudiante</NavLink>
         </NavItem>
         <NavItem>
        <NavLink    to='/VerCategoria'>Categoria</NavLink>
        </NavItem>
        <NavItem>
        <NavLink    to="/VerRompecabeza">Rompecabeza</NavLink>
        </NavItem>
        <NavItem>
       <NavLink     to='/VerVocabulario'> Vocabulario</NavLink>
       </NavItem>
       <NavItem>
        <NavLink    to='/VerOracion'>Oracion</NavLink>  
        </NavItem>    
       <NavItem>
        <NavLink    to='/Equipo'>Equipo</NavLink>
        </NavItem>
        <NavItem>
        <NavLink    to='/ActividadColaborativa'>Actividades</NavLink>
        </NavItem>
        <NavItem>
        <NavLink    to='/ReporteEstudiante'>Reporte</NavLink>
        </NavItem>
        </Nav>
    )
}
}
export default MenuAdmi;
