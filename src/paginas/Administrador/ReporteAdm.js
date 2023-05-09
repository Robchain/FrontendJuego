import React, {useState } from "react";
import {  Col, Container, Input, Label } from "reactstrap";
import MenuAdmi from '../../componentes/MenuAdmi';
import { NavBar } from "../../componentes/NavBar";
import { ReporteJugador } from "../../componentes/Administrador/Reportes/ReporteJugador";
import { ReporteCursos } from "../../componentes/Administrador/Reportes/ReporteCursos";
import { ReporteJuego } from "../../componentes/Administrador/Reportes/ReporteJuego";

const ReporteAdm = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [busquedaPor, setBusquedaPor] = useState("");
    const toggle = () => { setIsOpen(!isOpen) }

    return (
        <Container >
            <NavBar toggle={toggle} Seccion={"Reportes"}/>
            <MenuAdmi toggle={toggle} isOpen={isOpen} />
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='EmailMulti'>
              Busqueda por:
            </Label><br />
            <Label><Input
              type='radio'
              name="TipoUsuario"
              value="Estudiante"
             onChange={event => setBusquedaPor(event.target.value)  }
            checked={busquedaPor === "Estudiante"}
            /> Estudiante &ensp; </Label>
            <Label> 
             <Input
                type='radio'
                name="TipoUsuario"
                value="Curso"
                onChange={event => setBusquedaPor(event.target.value)  }
              checked={busquedaPor === "Curso"}
              /> Curso y paralelo&ensp;
            </Label>
            <Label> 
             <Input
                type='radio'
                name="TipoUsuario"
                value="Juego"
                onChange={event => setBusquedaPor(event.target.value)  }
                checked={busquedaPor === "Juego"}
              /> Juego&ensp;
            </Label>
          </Col>
          {
            busquedaPor === "Estudiante" && <ReporteJugador/>
          }
          {
            busquedaPor === "Curso" && <ReporteCursos/>
          }
          {
            busquedaPor === "Juego" && <ReporteJuego/>
          }
            <br/>
        </Container>
    )
}
export default ReporteAdm;