import React, { useContext } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { BackButton } from '../../../componentes/JuegoComponent/JuegoGeneral/BackButton'
import { RompecabezaFinalRespuesta } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabezaFinalRespuesta'
import { JuecoContext } from '../../../context/Juego/JuecoContext'

export const FinalVocabulario = () => {
  const {getresultado, data} = useContext(JuecoContext);
  const res = getresultado();
  
  if(data===null){
    return <>Cargando...</>
  }
  return (
    <div className="fondoMC img-fluid vh-100">
    <Container>
 <Row>
 <Col lg="12" className="d-flex justify-content-evenly"><h1>Vocabulario</h1></Col>
 <Col lg='12'>
 <Col  className='mt-2' lg="6">
 <Col>
 <RompecabezaFinalRespuesta url={data.Juego1.Rompecabeza.FileColor} alt={data.Juego1.Rompecabeza.Nombre}/>
 </Col>
 <Col className='mt-5'>
      <div style={{width:300, height:180, borderRadius:100}} className='m-auto'>
      <h1>{`?/${res}`}</h1>
      </div>  
    </Col>
    </Col>
 <BackButton/>
 </Col>
 </Row>
 </Container>
     </div>
  )
}
