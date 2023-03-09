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
      if(InfoEstudiaSituacion.Juego === null && InfoEstudiaSituacion.Posicion === 0){
        return true
      }
    }
    const Situaciondos =()=>{
      if(InfoEstudiaSituacion.Posicion !== 0 && (InfoEstudiaSituacion.Juego===null || InfoEstudiaSituacion.Juego!==null)){
      return true;
    }
    }
    const SituacionTres =()=>{
      return false;
    }


  
  return (
    <Container>
         <NavBarJuego Seccion={"Actividad Asincrono"} urlBack={"/MenuJuego"}/>
         { InfoEstudiaSituacion !== null ? (
<>
        {
         SituacionUno() &&  <SeleccionDeEquipo/>
        }      
           {
         Situaciondos() &&  <VerProgresoYaTerminado/>
          }
          {
          SituacionTres() &&  <Espera/>
          }
          </>
          ):(<>Cargador</>)
         }
        
    </Container>
  )
}
