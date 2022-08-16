import React, { Component } from "react";
import BotonAdmin from './botonAdmi';

class MenuAdmi extends Component{

    render(){
    return(
        <nav>
        <BotonAdmin value="ESTUDIANTES"/>
        <br/>
        <BotonAdmin value="ROMPECABEZA"/>
        <br/>
        <BotonAdmin value="VOCABULARIO" />
        <br/>
        <BotonAdmin value="ORACIONES"/>        
        <br/>
        <BotonAdmin value="EQUIPOS"/>
        <br/>
        <BotonAdmin value="ACTIVIDAD COLABORATIVA"/>
        <br/>
        <BotonAdmin value="REPORT DE ESTUDIANTE"/>
        </nav>
    )
}
}
export default MenuAdmi;
