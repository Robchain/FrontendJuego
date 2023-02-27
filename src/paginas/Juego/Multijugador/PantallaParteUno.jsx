import React from 'react'
import { Container } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { Espera } from '../../../componentes/MultiJugador/Espera'
import { SeleccionDeEquipo } from '../../../componentes/MultiJugador/SeleccionDeEquipo'
import { VerProgresoYaTerminado } from '../../../componentes/MultiJugador/VerProgresoYaTerminado'

export const PantallaParteUno = () => {
  return (
    <Container>
         <NavBarJuego Seccion={"Activdad Asincrono"} urlBack={"/MenuJuego"}/>
         
          {/*
         <Espera/>
          
         <VerProgresoYaTerminado/>
         
          */}
        
         <SeleccionDeEquipo/>
          
    </Container>
  )
}
