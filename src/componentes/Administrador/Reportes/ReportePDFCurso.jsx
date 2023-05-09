import React from 'react'
import { fechaEcuador, filtradoCurso } from '../../../helpers/contador'
import { Col, Container, Row } from 'reactstrap'

export const ReportePDFCurso = ({data,juego, Curso, Paralelo}) => {
  return (
    <>
    {
      data.length > 0 && <Container className='m-3'>
    <Row>
       <Col>
         <h3 style={{ color: "#9696D3" }}>Reporte {`${Curso}`} {`${Paralelo}`}</h3>
       </Col>
      </Row>
  {filtradoCurso({data:data}).filter((item) => item.Avance.length > 0).map((i)=>(<>
    <Row className='m-3 '>
<Col>
<p><span style={{fontWeight:700,color:'#8cc5b0'}}>Estudiante:</span> {i.Estudiante.Nombre}</p>
         <p><span style={{fontWeight:700,color:'#8cc5b0'}}>Cedula:</span> {i.Estudiante.Identificacion}</p>
         <p><span style={{fontWeight:700,color:'#8cc5b0'}}>Actividad:</span> {juego}</p>
</Col>
    </Row>
    <Col className='m-4'>
    <p style={{fontWeight:700}}> <span style={{color:'#8cc5b0'}} > Fecha de creacion del juego:</span> {fechaEcuador(i.createdAt)} --- <span style={{color:'#8cc5b0'}}>ultima fecha de actualizacion:</span> {fechaEcuador(i.updatedAt)}</p>
{i.Avance.map((e)=>(<div className='m-4' style={{borderBottom:'solid'}}>
         <p style={{fontWeight:700}}><span style={{ color:"#85858C"}}>Palabra seleccionada: </span> {e.PalabraASeleccionada}</p>
         <p style={{fontWeight:700}}><span style={{ color:"#85858C"}}> Palabra a evaluar: </span>{e.PalabraAEvaluar}</p>
         <p style={{fontWeight:700}}><span style={{ color:"#85858C"}}>Resultado: </span>{e.Resultado}</p>
    </div>))}
    </Col>
    </>
  ))}
  </Container>
    }</>
  )
}
