import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { Container } from 'reactstrap'
import { PiSquaresFourDuotone } from 'react-icons/pi'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import buentrabajo from '../../../assets/img/AssetsGame/GOOD JOD.png'
import maltrabajo from '../../../assets/img/AssetsGame/Bad Jood.png'
import { ActualizarJuegoFinal } from '../../../service/Multijugador'
export const FinalJuego = () => {
  const [guardad, setguardad] = useState(0)
  const { MultiProgreso, dispatchMutli, InfoEstudiaSituacion, rangoState } = useContext(JuecoContext);
  const navegar = useNavigate();
  const [Identificacion, setIdentificacion] = useState("");
  const [userArray, setUserArray] = useState("");
  const Actualizaciones = async () => {
    await ActualizarJuegoFinal({ idOutput: InfoEstudiaSituacion._id, Avance: MultiProgreso, pos: InfoEstudiaSituacion.Posicion });
  }

  useEffect(() => {
    console.log("InfoEstudiaSituacion", InfoEstudiaSituacion);
    console.log("usuario id",localStorage.getItem("Identificacion"));
    console.log("MultiProgreso",MultiProgreso);
    
    setIdentificacion(localStorage.getItem("Identificacion"));
    setUserArray(JSON.parse(localStorage.getItem("ARRAY_USERS")));
    console.log("userArray",userArray);
    

    if (rangoState === 5) {
      setguardad(0)
    } else {
      setguardad(5 - rangoState)
    }
    //LLamadaIncial();
    if (InfoEstudiaSituacion !== null) {
      Actualizaciones();
    } else {
      navegar(`/MenuJuego`)
    }
    return () => {
      dispatchMutli({ type: "RESETEAR" })
    }
  }, [])

  return (
    <>
      {
        <Container>
          <NavBarJuego Seccion={"Juego colaborativo"} urlBack={"/MenuJuego"} />
          <div class="titulo-nav" ><h2>Resultados del juego</h2></div>

          {
            userArray && 
            userArray[userArray.length - 1].value == Identificacion &&
            !MultiProgreso.find(item => item.Resultado === 'INCORRECTO') &&
            <div>
              <div class="titulo-nav final-text" ><h2>¡ Felicitaciones, tu equipo completó la carrera !</h2></div>
            </div>
          }

          {InfoEstudiaSituacion === null ? (
            <div className='final-coolaborativo'>
              <div className='final-aciertos'>
                <div className='numeros-aciertos'><span>{MultiProgreso.filter(item => item.Resultado === 'CORRECTO').length + guardad} Correctas</span></div> <div className='imagen-aciertos'><img src={buentrabajo} alt='buentrabajo' /></div>
              </div>
              <div className='final-fallos'>
                <div className='numeros-fallos'><span>{MultiProgreso.filter(item => item.Resultado === 'INCORRECTO').length} Incorrectas</span></div> <div className='imagen-fallos'><img src={maltrabajo} alt='buentrabajo' /></div>
              </div>
              <div className='menu-final'>
                <NavLink to={"/MenuJuego"} className="navegacion-final-vocabuarlio" >
                  <PiSquaresFourDuotone />
                </NavLink>
              </div>
              <div className='final-aciertos return-menu-label'>
                <div className='numeros-aciertos'>
                  <span>
                    Regresar al menu
                  </span>
                </div>
              </div>
            </div>) : (<><>Cargando...</></>)}
        </Container>
      }
    </>
  )
}


