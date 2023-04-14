import React,{ useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { Espera } from '../../../componentes/MultiJugador/Espera'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import { ActualizarJuego1, ActualizarJuego2, ActualizarJuego3, ActualizarJuego4, ActualizarJuego5, ActualizarJuegoFinal } from '../../../service/Multijugador'

export const FinalJuego = () => {
  const {MultiProgreso, dispatchMutli,InfoEstudiaSituacion,LLamadaIncial } = useContext(JuecoContext);
  const { id } = useParams();
  const Actualizaciones = async () => {
    await ActualizarJuego1({indice:id,idOutput:InfoEstudiaSituacion._id,PalabraCorrecta:MultiProgreso[0].PalabraCorrecta, PalabraSeleccionada:MultiProgreso[0].PalabraSeleccionada, Resultado:MultiProgreso[0].Resultado,Terminado:MultiProgreso[0].Terminado});
    await ActualizarJuego2({indice:id,idOutput:InfoEstudiaSituacion._id,PalabraCorrecta:MultiProgreso[1].PalabraCorrecta, PalabraSeleccionada:MultiProgreso[1].PalabraSeleccionada, Resultado:MultiProgreso[1].Resultado,Terminado:MultiProgreso[1].Terminado});
    await ActualizarJuego3({indice:id,idOutput:InfoEstudiaSituacion._id,PalabraCorrecta:MultiProgreso[2].PalabraCorrecta, PalabraSeleccionada:MultiProgreso[2].PalabraSeleccionada, Resultado:MultiProgreso[2].Resultado,Terminado:MultiProgreso[2].Terminado});
    await ActualizarJuego4({indice:id,idOutput:InfoEstudiaSituacion._id,PalabraCorrecta:MultiProgreso[3].PalabraCorrecta, PalabraSeleccionada:MultiProgreso[3].PalabraSeleccionada, Resultado:MultiProgreso[3].Resultado,Terminado:MultiProgreso[3].Terminado});
    await ActualizarJuego5({indice:id,idOutput:InfoEstudiaSituacion._id,PalabraCorrecta:MultiProgreso[4].PalabraCorrecta, PalabraSeleccionada:MultiProgreso[4].PalabraSeleccionada, Resultado:MultiProgreso[4].Resultado,Terminado:MultiProgreso[4].Terminado});
    await ActualizarJuegoFinal({indice:id,idOutput:InfoEstudiaSituacion._id,Terminado:true});
  }
  const navegar = useNavigate();
  useEffect(() => {

  LLamadaIncial();

    if(InfoEstudiaSituacion !==null){
    Actualizaciones();
    if(InfoEstudiaSituacion.Juegos.length === (id+1)){
      navegar(`/Intermedio/Jugador/${id}`)
    }
  }
    return ()=>{
      dispatchMutli({type:"RESETEAR"})
    }
  }, [])
  
  






  return (
    <Container>
      <NavBarJuego Seccion={"Oracion Final"} urlBack={"/MenuJuego"} />
      {InfoEstudiaSituacion !== null ? (    <Espera  InfoEstudiaSituacion={InfoEstudiaSituacion}/>):(<>  cargando...</>)}
    </Container>
  )
}
