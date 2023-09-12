import React from 'react'
import { Col, Container, Row, Table } from 'reactstrap'
import { buscarValor, fechaEcuador } from '../../../helpers/contador'

export const ReportePDFJugador = ({data, actividad,Estudiante, Estudiantes}) => {
  

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
        {
         data[0].Estudiante!==undefined?<>
         <p><span style={{fontWeight:700,color:'#8cc5b0'}}>Estudiante:</span> {data[0].Estudiante.Nombre}</p>
         <p><span style={{fontWeight:700,color:'#8cc5b0'}}>Cedula:</span> {data[0].Estudiante.Identificacion}</p>
         </> :<><p><span style={{fontWeight:700,color:'#8cc5b0'}}>Estudiante:</span> {buscarValor(Estudiantes,Estudiante).label}</p>
         <p><span style={{fontWeight:700,color:'#8cc5b0'}}>Cedula:</span> {buscarValor(Estudiantes,Estudiante).value}</p></>
        }
         <p><span style={{fontWeight:700,color:'#8cc5b0'}}>Actividad:</span> {actividad}</p>
       </Col>
      </Row>
{
  data.filter((item) => item.Avance !== null).map((i,index)=>(
    <Col className='m-4' >
    <h5 className='mb-3' style={{color: "#62269E"}}>Juego {index+1}</h5>
    <div  className='m-3'>
    <div style={{ backgroundColor: "#E6DFF0", color: "#62269E" }}>
              <p style={{fontWeight:700}}> <span style={{color:'#85858C'}} > Fecha de creacion del juego:</span> {fechaEcuador(i.createdAt)} --- <span style={{color:'#85858C'}}>ultima fecha de actualizacion:</span> {fechaEcuador(i.updatedAt)}</p>
            </div>
          
            <h5>Correctos</h5>
   <Table striped>
   <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
            <tr>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>Palabra/Oracion seleccionada</th>
            </tr>
            </thead>
            <tbody>
            {i.Avance.Correcto.map((e)=>(<tr className='m-4'>
         <td style={{fontWeight:700}}><span style={{ color:"#85858C"}}>{e}</span> </td>
    </tr>))}
            </tbody>
   </Table>
          <h5>Incorrectos</h5>
   <Table striped>
   <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
            <tr>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>Palabra seleccionada</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>Palabra a evaluar</th>
            </tr>
            </thead>
            <tbody>
            {i.Avance.Incorrecto.map((e)=>(<tr className='m-4'>
         <td style={{fontWeight:700}}><span style={{ color:"#85858C"}}>{e.PalabraASeleccionada}</span> </td>
         <td style={{fontWeight:700}}><span style={{ color:"#85858C"}}>{e.PalabraAEvaluar} </span></td>
         
    </tr>))}
            </tbody>
   </Table>
    </div>
    </Col>
  ))
}
      </Container>
     
    }
</>
  )
}
