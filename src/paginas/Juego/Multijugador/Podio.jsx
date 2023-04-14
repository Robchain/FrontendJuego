import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import gifendrace from '../../../assets/img/AssetsGame/raceend.gif'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
export const Podio = () => {
  const { InfoEstudiaSituacion,LLamadaIncial } = useContext(JuecoContext);

  useEffect(() => {
    LLamadaIncial()
  }, [])
  
  return (
    <Container>
         <NavBarJuego Seccion={"Podio"} urlBack={"/MenuJuego"}/>
         {InfoEstudiaSituacion !== null ?(<>      <Row className='justify-content-center'>
            <Col lg='3' >
      <img src={gifendrace} alt="finalCarrera" className='mx-auto' width={200}/>
      </Col>
          </Row>
          <Row className='justify-content-center'>
      <Col lg="4" className='mx-e'>
      { 
        <img src={InfoEstudiaSituacion.Equipo.Imagen} alt={InfoEstudiaSituacion.Equipo.Nombre} width={100}/>
      }
      </Col>
      <Col lg='6' className='mx-s'>
        <h1 style={{ fontWeight: 'bold', color: '#8B8B8C' }} >Felicidades <span>{InfoEstudiaSituacion.Equipo.Nombre}</span></h1>
        <p style={{ fontWeight: 'bold', fontSize: '2vw', color: '#8B8B8C' }}>
       Han termiando la carrera
        </p>
        </Col>

</Row></>):(<> Cargando...</>)}
         </Container>
  )
}
