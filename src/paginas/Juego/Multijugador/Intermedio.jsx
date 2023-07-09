import React, { useContext, useEffect } from 'react'
import { Container } from 'reactstrap'
import { Espera } from '../../../componentes/MultiJugador/Espera'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import cargando from '../../../assets/img/AssetsGame/paperplane.gif'

export const Intermedio = () => {
  const { InfoEstudiaSituacion,LLamadaIncial,setInfoEstudiaSituacion} = useContext(JuecoContext);
  useEffect(() => {
    LLamadaIncial();
    return () =>{
      setInfoEstudiaSituacion(null);
    }
  }, [])


  return (
    <Container>
         <NavBarJuego Seccion={"Sala de espera"} urlBack={"/MenuJuego"}/>
         { InfoEstudiaSituacion !== null ? (<>   
          <Espera InfoEstudiaSituacion={InfoEstudiaSituacion} />
          </>):(<div className="loading-overlay">
        <img src={cargando} alt='cargando'/>
      </div>)}
</Container>
  )
}
