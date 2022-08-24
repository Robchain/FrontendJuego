import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import BotonAdmin from './BotonAdmi';


class MenuAdmi extends Component{

    render(){
    return(
        
        <nav>
        <NavLink    to='/Administrador'><BotonAdmin value="ESTUDIANTES"></BotonAdmin></NavLink>
        <br/>
        <NavLink    to="/Rompecabeza"><BotonAdmin value="ROMPECABEZA"/></NavLink>
        <br/>
       <NavLink to='/Vocabulario'> <BotonAdmin value="VOCABULARIO" /></NavLink>
        <br/>
        <NavLink    to='/Oracion'><BotonAdmin value="ORACIONES"/>  </NavLink>      
        <br/>
        <NavLink    to='/Equipo'><BotonAdmin value="EQUIPOS"/></NavLink>
        <br/>
        <NavLink    to='/ActividadColaborativa'><BotonAdmin value="ACTIVIDAD COLABORATIVA"/></NavLink>
        <br/>
        <NavLink    to='/ReporteEstudiante'><BotonAdmin value="REPORTE DE ESTUDIANTE"/></NavLink>
        </nav>
     
    )
}
}
export default MenuAdmi;
