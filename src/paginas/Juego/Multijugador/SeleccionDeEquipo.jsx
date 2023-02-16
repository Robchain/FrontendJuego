import React from 'react'
import { Container } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'

export const SeleccionDeEquipo = () => {
  return (
    <Container>
         <NavBarJuego Seccion={"Sleccion de Equipo"} urlBack={"/MenuJuego"}/>
    </Container>
  )
}
