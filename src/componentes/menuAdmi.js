import React, { Component } from "react";
import BotonAdmin from './botonAdmi';

class MenuAdmi extends Component{

    render(){
    return(
        <nav>
        <BotonAdmin value="ROMPECABEZA"/>
        <br/>
        <BotonAdmin value="VOCABULARIO" />
        <br/>
        <BotonAdmin value="ORACIONES"/>
        <br/>
        <BotonAdmin value="ESTUDIANTES"/>
        <br/>
        <BotonAdmin value="EQUIPO"/>
        <br/>
        <BotonAdmin value="ACTIVIDAD COLABORATIVA"/>
        <br/>
        <BotonAdmin value="REPORT DE ESTUDIANTE"/>
        </nav>
    )
}
}
export default MenuAdmi;
