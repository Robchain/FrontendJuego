import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import gifendrace from '../../../assets/img/AssetsGame/raceend.gif'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import cargando from '../../../assets/img/AssetsGame/paperplane.gif'
import MedallaBronce from '../../../assets/img/AssetsGame/medallaBronce.png'
import MedallaOro from '../../../assets/img/AssetsGame/medallaOro.png'
import MedallaPlata from '../../../assets/img/AssetsGame/medallaSilver.png'
export const Podio = () => {
  const { InfoEstudiaSituacion, LLamadaIncial } = useContext(JuecoContext);

  useEffect(() => {
    LLamadaIncial()
  }, [])

  return (
    <Container>
      <NavBarJuego Seccion={"Podio"} urlBack={"/MenuJuego"} />
      {InfoEstudiaSituacion !== null ? (<div className='todo-final-multi-content'>
        {/* <div className='arriba-final-multi'>
            <div className='div-banderas-imagen-equipo-final' >
               <img src={gifendrace} alt="finalCarrera" className='banderas-image-quipo-final' />
            </div>
          </div> */}
        <div>
          <div className='abajo-final-multi'>
            <div className='div-imagen-equipo-final'>
              <img src={InfoEstudiaSituacion.Equipo.Imagen} alt={InfoEstudiaSituacion.Equipo.Nombre}
                className='imagen-equipo-final' />
            </div>
            <div className='letras-equipo-final'>
              <p className='titulo-felicidades'>Felicidades <span>{InfoEstudiaSituacion.Equipo.Nombre}</span></p>
              <p className='sudtitulo-terminado'> Han terminado la carrera</p>
            </div>
            <div>
              {
                InfoEstudiaSituacion.Medalla === "BRONCE" && <img src={MedallaBronce} alt='medalla' className='images-medalla-final' />
              }
              {
                InfoEstudiaSituacion.Medalla === "PLATA" && <img src={MedallaPlata} alt='medalla' className='images-medalla-final' />
              }
              {
                InfoEstudiaSituacion.Medalla === "ORO" && <img src={MedallaOro} alt='medalla' className='images-medalla-final' />
              }
            </div>
          </div>
        </div>
      </div>) : (<div className="loading-overlay">
        <img src={cargando} alt='cargando' />
      </div>)}
    </Container>
  )
}
