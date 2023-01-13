import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { DooroutButton } from '../../../componentes/JuegoComponent/JuegoGeneral/DooroutButton'
import { RompecabezaFinalRespuesta } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabezaFinalRespuesta'
import { JuecoContext } from '../../../context/Juego/JuecoContext'

export const FinalVocabulario = () => {
  const {getresultado, data, getPuzzles} = useContext(JuecoContext);
  const res = getresultado();
  const {id}= useParams();
  const totalPiezas = data[`Juego${id}`].Rompecabeza.Pieza
  if(data===null){
    return <>Cargando...</>
  }
  const finalGuardado = ()=>{ 
    getPuzzles(id, res )
  }
  useEffect(() => {
    finalGuardado();
  }, [])
  
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
      <h1>{`${res-1}/${totalPiezas}`}</h1>
      </div>  
    </Col>
    </Col>
 <DooroutButton Urlsalida={"/RompecabezaJV"}/>
 </Col>
 </Row>
 </Container>
     </div>
  )
}
