import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { fechaEcuador } from '../../../helpers/contador'

export const ReportePDFJugador = ({data, actividad}) => {
  

  return (
    <>
    {
      data.length > 0 && <Container className='m-3'>
      <Row>
       <Col>
         <h3 style={{ color: "#9696D3" }}>Reporte por Estudiante</h3>
       </Col>
      </Row>
      <Row className='m-3'>
       <Col>
         <p><span style={{fontWeight:700,color:'#8cc5b0'}}>Estudiante:</span> {data[0].Estudiante.Nombre}</p>
         <p><span style={{fontWeight:700,color:'#8cc5b0'}}>Cedula:</span> {data[0].Estudiante.Identificacion}</p>
         <p><span style={{fontWeight:700,color:'#8cc5b0'}}>Actividad:</span> {actividad}</p>
       </Col>
      </Row>
{
  data.filter((item) => item.Avance !== null).map((i,index)=>(
    <Col className='m-4' >
    <h5 className='mb-3'>Juego {index+1}</h5>
    <div  className='m-3'>
      <p style={{fontWeight:700}}> <span style={{color:'#8cc5b0'}} > Fecha de creacion del juego:</span> {fechaEcuador(i.createdAt)} --- <span style={{color:'#8cc5b0'}}>ultima fecha de actualizacion:</span> {fechaEcuador(i.updatedAt)}</p>
   {i.Avance.map((e)=>(<div className='m-4' style={{borderBottom:'solid'}}>
         <p style={{fontWeight:700}}><span style={{ color:"#85858C"}}>Palabra seleccionada: </span> {e.PalabraASeleccionada}</p>
         <p style={{fontWeight:700}}><span style={{ color:"#85858C"}}> Palabra a evaluar: </span>{e.PalabraAEvaluar}</p>
         <p style={{fontWeight:700}}><span style={{ color:"#85858C"}}>Resultado: </span>{e.Resultado}</p>
    </div>))}

    </div>
    </Col>
  ))
}
      </Container>
    }</>
  )
}
