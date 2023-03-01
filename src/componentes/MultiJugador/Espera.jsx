import React from 'react'
import { Col, Row } from 'reactstrap'
import gifDeEspera from "../../assets/img/AssetsGame/7b7cf921ce173141157bc30a2b03569e.gif"

export const Espera = () => {
  return (
    <Row className='justify-content-center'>
    <Col lg="7">
      <img src={gifDeEspera} alt="esperando" width={200}/>
      </Col>
      <Col lg="7">
        <h1>Espera...</h1>
        <p>
         hay un jugador delante tuyo jugando 
        </p>
</Col>
<Col lg="7" className='mt-3'>
  <code>linea de progreso aqui </code>
</Col>
    </Row>
  )
}
