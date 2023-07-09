import React,{ useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { Espera } from '../../../componentes/MultiJugador/Espera'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import { ActualizarJuegoFinal } from '../../../service/Multijugador'
import cargando from '../../../assets/img/AssetsGame/paperplane.gif'
export const FinalJuego = () => {
  const {MultiProgreso, dispatchMutli,InfoEstudiaSituacion,LLamadaIncial } = useContext(JuecoContext);
  const navegar = useNavigate();
  const [cargandod, setCargando] = useState(true);
  const Actualizaciones = async () => {
    await ActualizarJuegoFinal({idOutput:InfoEstudiaSituacion._id,Avance:MultiProgreso});
    setCargando(false);
    setTimeout(() => {
      navegar(`/MenuJuego`)
    }, 10000);
  }

  useEffect(() => {

  //LLamadaIncial();
    if(InfoEstudiaSituacion !==null){
    Actualizaciones();
  }
    return ()=>{
      dispatchMutli({type:"RESETEAR"})
    }
  }, [])

  return (
    <>
    {
      cargandod ? <div className="loading-overlay">
        <img src={cargando} alt='cargando'/>
      </div> :
    <Container>
      <NavBarJuego Seccion={"Oracion Final"} urlBack={"/MenuJuego"} />
      {InfoEstudiaSituacion !== null ? (    <Espera  InfoEstudiaSituacion={InfoEstudiaSituacion}/>):(<div className="loading-overlay">
        <img src={cargando} alt='cargando'/>
      </div>)}
    </Container>
  }
    </>
  )
}
