import React,{ useContext, useEffect } from 'react'
import { Container } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import { ActualizarJuego1, ActualizarJuego2, ActualizarJuego3, ActualizarJuego4, ActualizarJuego5, ActualizarJuegoFinal } from '../../../service/Multijugador'

export const FinalJuego = () => {
  const {MultiProgreso, dispatchMutli} = useContext(JuecoContext);
  const Actualizaciones = async () => {
    await ActualizarJuego1();
    await ActualizarJuego2();
    await ActualizarJuego3();
    await ActualizarJuego4();
    await ActualizarJuego5();
    await ActualizarJuegoFinal();
  }

  useEffect(() => {
    /*
    Actualizaciones();
    */return ()=>{
      dispatchMutli({type:"RESETEAR"})
    }
  }, [])
  
  






  return (
    <Container>
      <NavBarJuego Seccion={"Oracion FInal"} urlBack={"/MenuJuego"} />
  {JSON.stringify(MultiProgreso)}
    </Container>
  )
}
