import React, {useState}from "react";
import { Container } from "reactstrap";
import MenuAdmi from "../../componentes/MenuAdmi";
import { NavBar } from "../../componentes/NavBar";

const ActividadColaborativaAdm    =   ()  =>{
    const [isOpen, setIsOpen] = useState(false)
    const toggle  = ()  =>  {setIsOpen(!isOpen)}
   
    return(
        <Container>
        <NavBar toggle={toggle} Seccion={"Actividad Colaborativa"}/>
    <MenuAdmi toggle={toggle} isOpen={isOpen}/>         
        </Container>
       

    )
}
export default ActividadColaborativaAdm;