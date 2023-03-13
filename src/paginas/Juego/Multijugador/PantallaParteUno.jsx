import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { SeleccionDeEquipo } from '../../../componentes/MultiJugador/SeleccionDeEquipo'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
export const PantallaParteUno = () => {

  const { InfoEstudiaSituacion,LLamadaIncial} = useContext(JuecoContext);
  useEffect(() => {
    LLamadaIncial();
  }, [])

  
    const SituacionUnoPuntoUno =()=>{
      if(InfoEstudiaSituacion.Juegos === null && InfoEstudiaSituacion.Posicion === 0){
        return true
      }
    }
    const SituacionUnoPuntoDos =()=>{
      if(InfoEstudiaSituacion.Posicion !== 0 &&(InfoEstudiaSituacion.Juegos === null || InfoEstudiaSituacion.Juegos !== null ) ){
      return true;
    }
    }
    const SituacionUnoPuntoTres =()=>{
      if(InfoEstudiaSituacion.Posicion === 0  && InfoEstudiaSituacion.Juegos !== null   ){
      return true;
    }}
  return (
    <Container  >
         <NavBarJuego Seccion={"Actividad Asincro"} urlBack={"/MenuJuego"}/>
         { InfoEstudiaSituacion !== null ? (
<>
        {//el primero de la lista y selecciona el equipo
          SituacionUnoPuntoUno() && <SeleccionDeEquipo IdDeLaAsignacion={InfoEstudiaSituacion.IdDeLaAsignacion} IdDelGrupo={InfoEstudiaSituacion._id} id={InfoEstudiaSituacion.Posicion}/>
        } 
        {// ya le toca al jugador, 
          SituacionUnoPuntoDos() && <Navigate to={`/Intermedio/Jugador/${InfoEstudiaSituacion.Posicion}`} replace={true}/>
        }
        {
          SituacionUnoPuntoTres() && <Navigate  to={`/Intermedio/Jugador/${InfoEstudiaSituacion.Posicion}`} replace={true}/>
        }
        
</>
    ):(<>Cargador</>)
         }
    </Container>
  )
}
