import React, { useContext, useEffect } from 'react'
import { Container } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { Espera } from '../../../componentes/MultiJugador/Espera'
import { SeleccionDeEquipo } from '../../../componentes/MultiJugador/SeleccionDeEquipo'
import { VerProgresoYaTerminado } from '../../../componentes/MultiJugador/VerProgresoYaTerminado'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
export const PantallaParteUno = () => {

  const { InfoEstudiaSituacion,LLamadaIncial} = useContext(JuecoContext);
  useEffect(() => {
    LLamadaIncial();
  }, [])

    const SituacionUno =()=>{
      if(InfoEstudiaSituacion.Juegos === null && InfoEstudiaSituacion.Posicion === 0){
        return true
      }
    }
    const Situaciondos =()=>{
      if(InfoEstudiaSituacion.Posicion !== 0){
      return true;
    }

    }
    const SituacionTres =()=>{
      return false;
    }


  
  return (
    <Container  >
         <NavBarJuego Seccion={"Actividad Asincro"} urlBack={"/MenuJuego"}/>
         { InfoEstudiaSituacion !== null ? (
<>
        {//el primero de la lista y selecciona el equipo
        SituacionUno() && <SeleccionDeEquipo IdDeLaAsignacion={InfoEstudiaSituacion.IdDeLaAsignacion} IdDelGrupo={InfoEstudiaSituacion._id} id={InfoEstudiaSituacion.Posicion}/>
        } 
        {// ya le toca al jugador, 
        Situaciondos() &&  <Espera/>
        }
        { // espera mientras los demas estan jugando, 
        SituacionTres() &&  <VerProgresoYaTerminado/>
        }
</>
    ):(<>Cargador</>)
         }
        
    </Container>
  )
}
