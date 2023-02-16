import React from 'react'
import { Container } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'

export const Trofeos = () => {
  return (
    <Container>
    <NavBarJuego  Seccion={"Trofeo"} urlBack={"/MenuJuego"} />
    </Container>
  )
}
