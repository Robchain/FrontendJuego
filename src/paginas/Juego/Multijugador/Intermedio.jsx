import React, { useContext, useEffect } from 'react'
import { Container } from 'reactstrap'
import { Espera } from '../../../componentes/MultiJugador/Espera'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import { Navigate } from 'react-router-dom'

export const Intermedio = () => {
  const { InfoEstudiaSituacion,LLamadaIncial,setInfoEstudiaSituacion} = useContext(JuecoContext);
  useEffect(() => {
    LLamadaIncial();
    return () =>{
      setInfoEstudiaSituacion(null);
    }
  }, [])

  const verificacionDeSiHaJugadoElAnterior = ()=>{
  let posicionAnterior = InfoEstudiaSituacion.Posicion - 1;
    if(posicionAnterior === -1){
      if(InfoEstudiaSituacion.Avance[0].Terminado === true){
      return true;
    }else if(InfoEstudiaSituacion.Avance[0].Terminado === false){
      return false;
    }}else if(posicionAnterior>=0){
      if(InfoEstudiaSituacion.Avance[posicionAnterior].Terminado === true && InfoEstudiaSituacion.Avance[InfoEstudiaSituacion.Posicion].Terminado === true  ){
        // el de atras mio ya termino, y yo tambien
        return true;
      }else if(InfoEstudiaSituacion.Avance[posicionAnterior].Terminado === true && InfoEstudiaSituacion.Avance[InfoEstudiaSituacion.Posicion].Terminado === false ){
        // el de atras mio ya termino y yo no
        return false;
      }else if(InfoEstudiaSituacion.Avance[posicionAnterior].Terminado === false && InfoEstudiaSituacion.Avance[InfoEstudiaSituacion.Posicion].Terminado === false ){
        // el de atras mio aun no termina y yo tampoco
        return true;
      }
    }
  }


  return (
    <Container>
         <NavBarJuego Seccion={"Actividad Asincro"} urlBack={"/MenuJuego"}/>
         { InfoEstudiaSituacion !== null ? (<>         
          {
            !verificacionDeSiHaJugadoElAnterior() ? ( <Navigate to={`/JuegoActivo/Jugador/${InfoEstudiaSituacion.Posicion}`} replace={true}/> ) :   (<Espera/>) 
          }
          </>):(<>Cargador</>)}
</Container>
  )
}
