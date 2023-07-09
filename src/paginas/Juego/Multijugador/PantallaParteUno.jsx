import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { SeleccionDeEquipo } from '../../../componentes/MultiJugador/SeleccionDeEquipo'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import cargando from '../../../assets/img/AssetsGame/paperplane.gif'
import { CreaJuegoMulti } from '../../../service/Multijugador'
export const PantallaParteUno = () => {

  const { InfoEstudiaSituacion,LLamadaIncial,setDataMultiJu} = useContext(JuecoContext);
  const llamadaDeJuego = async ()=>{
    try {
      const data =await CreaJuegoMulti({num:InfoEstudiaSituacion.TipoDeJuego});
      setDataMultiJu(data)
    } catch (error) {
      setDataMultiJu(null);
    }
  }
  
  useEffect(() => {
    llamadaDeJuego();
  }, [])
  
  useEffect(() => {
    LLamadaIncial();
  }, [])
  return (
    <Container  >
         <NavBarJuego Seccion={"Actividad Asíncrona"} urlBack={"/MenuJuego"}/>
         { InfoEstudiaSituacion !== null ? (
<>
        {//el primero de la lista y selecciona el equipo
          InfoEstudiaSituacion.Situacion === "Eleccion Equipo" && <SeleccionDeEquipo IdDeLaAsignacion={InfoEstudiaSituacion.IdDeLaAsignacion} IdDelGrupo={InfoEstudiaSituacion._id} id={InfoEstudiaSituacion.Posicion} TipoDeJuego={InfoEstudiaSituacion.TipoDeJuego}/>
        } 
        {// ya le toca al jugador, 
          InfoEstudiaSituacion.Situacion === "Sala de espera"  && <Navigate to={`/Intermedio/Jugador/${InfoEstudiaSituacion.Posicion}`} replace={true}/>
        }
        {  
          InfoEstudiaSituacion.Situacion === "Jugar"  && <Navigate  to={`/JuegoActivo/Jugador/${InfoEstudiaSituacion.Posicion}`} replace={true}/>
        }
        {
          InfoEstudiaSituacion.Situacion === "Podio"  && <Navigate  to={`/JuegoActivo/Jugador/${InfoEstudiaSituacion.Posicion}/podio`} replace={true}/>
        }       
</>
    ):(
      <div className="loading-overlay">
        <img src={cargando} alt='cargando'/>
      </div>
    )
         }
    </Container>
  )
}
