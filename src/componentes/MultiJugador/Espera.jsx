import React from 'react'
import { Col, Row } from 'reactstrap'
import gifDeEspera from "../../assets/img/AssetsGame/7b7cf921ce173141157bc30a2b03569e.gif"
import { CarreraStepBar } from '../Administrador/CarreraStepBar'

export const Espera = () => {
  return (
    <Row className='justify-content-center' style={{height:"50vh"}}>
    <Col lg="6">
      <img src={gifDeEspera} alt="esperando" width={200}/>
      </Col>
      <Row className='justify-content-center'>
      <Col lg="6" className='mx-auto'>
        <h1>Espera...</h1>
        <p>
         Alguien de tu Equipo esta jugando
        </p>
</Col>
</Row>
<Col lg="6" className='mt-3'>
<CarreraStepBar steps={0} />
</Col>
    </Row>
  )
}
