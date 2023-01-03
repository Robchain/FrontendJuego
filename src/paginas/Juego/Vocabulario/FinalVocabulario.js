import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { BackButton } from '../../../componentes/JuegoComponent/JuegoGeneral/BackButton'
import { RompecabaSolitaria } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabaSolitaria'
export const FinalVocabulario = () => {
  return (
    <div className="fondoMC img-fluid vh-100">
    <Container>
 <Row>
 <Col lg="12" className="d-flex justify-content-evenly"><h1>Vocabulario</h1></Col>
 <Col lg='12'>
 <Col  className='mt-2' lg="6">
 <RompecabaSolitaria a={'hidden'}  b={'hidden'}  d={'hidden'}  c={'hidden'}/>
      <div style={{width:300, height:180, borderRadius:100}} className='m-auto'>
      </div>  
    </Col>
 <BackButton/>
 </Col>
 </Row>
 </Container>
     </div>
  )
}
