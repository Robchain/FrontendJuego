import React from 'react'
import { Col, Row } from 'reactstrap'

export const SeleccionDeEquipo = () => {
  return (
    <Row className='align-items-center'>
    <Col lg="7" className='mx-auto'>
      <h3>Selecion De Equipo</h3>
    </Col>
    <Row >
    <Col>
     <div style={{width:"200px", margin:"20px"}} >Equipo 1</div>
    </Col>
    <Col>
    <div style={{width:"200px", margin:"20px"}} >Equipo 2</div>
    </Col>
    <Col>
    <div style={{width:"200px", margin:"20px"}} >Equipo 3</div>
     </Col>
     </Row>
    </Row>
  )
}
