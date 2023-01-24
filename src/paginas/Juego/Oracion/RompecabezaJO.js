import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { BackButton } from '../../../componentes/JuegoComponent/JuegoGeneral/BackButton'
import { RompecabaSolitaria } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabaSolitaria'
const RompecabezaJO = () => {

  const Pantalla = () => {
    if (false) {
      return (<>Cargando...</>)
    } else {
      return (<div className="fondoMC img-fluid vh-100">
        <Container>
          <Row>
            <Col className="d-flex justify-content-evenly" lg='12'>
              <h1 style={{ color: '#000', fontWeight: 'bold' }}>Oracion</h1>
            </Col>
            <Col className="d-flex justify-content-evenly  mt-2 mb-5">
              <Link to={`/OracionJuego/${1}`}> <RompecabaSolitaria a={'hidden'} d={'hidden'} url="https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/random.jpg?alt=media&token=2b8420e7-7fe9-47ef-a0c9-12f78341581f" /> </Link>
              <Link to={`/OracionJuego/${2}`}> <RompecabaSolitaria url="https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/random.jpg?alt=media&token=2b8420e7-7fe9-47ef-a0c9-12f78341581f" /></Link>
              <Link to={`/OracionJuego/${3}`}>     <RompecabaSolitaria url="https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/random.jpg?alt=media&token=2b8420e7-7fe9-47ef-a0c9-12f78341581f" /> </Link>
            </Col>
            <Col className="d-flex justify-content-evenly mt-2">
              <Link to={`/OracionJuego/${4}`}>    <RompecabaSolitaria url={"https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/random.jpg?alt=media&token=2b8420e7-7fe9-47ef-a0c9-12f78341581f"} a={'hidden'} c={'hidden'} /></Link>
              <Link to={`/OracionJuego/${5}`}>   <RompecabaSolitaria url={"https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/random.jpg?alt=media&token=2b8420e7-7fe9-47ef-a0c9-12f78341581f"} d={'hidden'} /></Link>
              <Link to={`/OracionJuego/${6}`}>   <RompecabaSolitaria url={"https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/random.jpg?alt=media&token=2b8420e7-7fe9-47ef-a0c9-12f78341581f"} a={'hidden'} d={'hidden'} /></Link>
            </Col>
            <Col lg='12'>
              <BackButton ruta='/MenuJuego' />
            </Col>
          </Row>
        </Container>
      </div>)
    }
  }


  return (
    <Pantalla />
  )
}

export default RompecabezaJO;