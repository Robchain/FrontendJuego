import React from 'react'
import { NavLink } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { BackButton } from '../../../componentes/JuegoComponent/JuegoGeneral/BackButton'
import { RompecabaSolitaria } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabaSolitaria'
const RompecabezaJV = () => {
  return (
    <div className="fondoMC img-fluid vh-100">
   <Container>
<Row>
<Col  className="d-flex justify-content-evenly" lg='12'>
  <h1 style={{color:'#000', fontWeight:'bold' }}>Vocabulario</h1>
</Col>
<Col  className="d-flex justify-content-evenly  mt-2 mb-5">
<NavLink  to={'/VocabularioJuego'}>
<RompecabaSolitaria a={'hidden'} d={'hidden'}  /> </NavLink>
<NavLink  to={'/VocabularioJuego'}> <RompecabaSolitaria/></NavLink>

<NavLink  to={'/VocabularioJuego'}>     <RompecabaSolitaria/> </NavLink>
</Col>
<Col  className="d-flex justify-content-evenly mt-2">
<NavLink  to={'/VocabularioJuego'}>    <RompecabaSolitaria a={'hidden'} c={'hidden'}/></NavLink>
<NavLink  to={'/VocabularioJuego'}>   <RompecabaSolitaria d={'hidden'}/></NavLink>
<NavLink  to={'/VocabularioJuego'}>   <RompecabaSolitaria a={'hidden'} d={'hidden'}/></NavLink>
</Col>
<Col lg='12'>
<BackButton/>
</Col>
</Row>
</Container>
    </div>
  )
}

export default RompecabezaJV;