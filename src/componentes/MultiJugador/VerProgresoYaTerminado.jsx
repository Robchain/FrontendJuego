import React from 'react'
import { Col, Row } from 'reactstrap'
import gifDePits from "../../assets/img/AssetsGame/Pits.gif"

export const VerProgresoYaTerminado = () => {
  return (
    <Row className='justify-content-center'>
      <Col lg="7">
        <img src={gifDePits} alt="pits" />
      </Col>
      <Col lg="7">
        <h3>
          Ya puede Comenzar a Jugar
        </h3>
      </Col>
      <Col lg="7">
        <p>
          Prepárate...
        </p>
      </Col>
    </Row>
  )
}
