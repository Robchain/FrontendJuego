import React from 'react'
import { fechaEcuador, filtradoCurso } from '../../../helpers/contador'
import { Col, Container, Row, Table } from 'reactstrap'

export const ReportePDFJuego = ({data, juego}) => {
  return (
    <>
    {
      data.length > 0 && <Container className='m-3'>
      <Row>
       <Col>
         <h3 style={{ color: "#9696D3" }}>Reporte {`${juego}`}</h3>
       </Col>
      </Row>
      {filtradoCurso({data:data}).filter((item) => item.Avance.length > 0).map((i)=>(
        <>
        <Row className='m-3 '>
<Col>
{i.Estudiante !==undefined && <><p><span style={{fontWeight:700,color:'#8cc5b0'}}>Estudiante:</span> {i.Estudiante.Nombre}  &ensp; <span style={{fontWeight:700,color:'#8cc5b0'}}>Cedula:</span> {i.Estudiante.Identificacion}</p>
         <p><span style={{fontWeight:700,color:'#8cc5b0'}}>Curso:</span> {i.Estudiante.Curso}  &ensp;  <span style={{fontWeight:700,color:'#8cc5b0'}}>Paralelo:</span> {i.Estudiante.Paralelo}</p></>}
         <p><span style={{fontWeight:700,color:'#8cc5b0'}}>Actividad:</span> {juego}</p>
         {(i.Equipo!==undefined && i.Equipo!==null ) && <><p style={{fontWeight:700}}><span style={{fontWeight:700,color:'#8cc5b0'}}>Equipo:</span> {i.Equipo.Nombre}</p>
         <p><span style={{fontWeight:700,color:'#8cc5b0'}}>Integrantes:</span></p>
         {i.Integrantes.map((e)=>(<>
          <p style={{fontWeight:700}}>{e.value} -- {e.label}</p>
         </>))}
         </>}
</Col>
    </Row>
    <div style={{ backgroundColor: "#E6DFF0", color: "#62269E" }}>
              <p style={{fontWeight:700}}> <span style={{color:'#85858C'}} > Fecha de creacion del juego:</span> {fechaEcuador(i.createdAt)} --- {i.updatedAt &&<><span style={{color:'#85858C'}}>ultima fecha de actualizacion:</span> {fechaEcuador(i.updatedAt)}</> } {i.FechaDeFin &&<><span style={{color:'#85858C'}}>Fecha de cierre del juego:</span> {fechaEcuador(i.FechaDeFin)}</> }</p>
            </div>
    <Table striped>
            <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
            <tr>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>Palabra seleccionada</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>Palabra a evaluar</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>Resultado</th>
            </tr>
            </thead>
<tbody>
{i.Avance.map((e)=>(<tr className='m-4'>
         <td><span style={{ color:"#85858C",fontWeight:700}}>{e.PalabraASeleccionada} </span> </td>
         <td><span style={{ color:"#85858C",fontWeight:700}}> {e.PalabraAEvaluar} </span></td>
         <td><span style={{ color:"#85858C",fontWeight:700}}>{e.Resultado} </span></td>
    </tr>))}
</tbody>
    </Table>
   
        </>
      ))}
     
      </Container>
    }
   
    </>
  )
}
