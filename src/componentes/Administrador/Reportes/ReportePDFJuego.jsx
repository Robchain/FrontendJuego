import React from 'react'
import { fechaEcuador, filtradoCurso } from '../../../helpers/contador'
import { Col, Container, Row, Table } from 'reactstrap'

export const ReportePDFJuego = ({ data, juego }) => {
  return (
    <>
      {
        data.length > 0 && <Container className='m-3'>
          <Row>
            <Col>
              <h3 style={{ color: "#9696D3" }}>Reporte {`${juego}`}</h3>
            </Col>
          </Row>
          {
            data.map(i=>(<>
             <Row className='m-3 '>
                <Col>
                  {i.documentos.Estudiante !== undefined && <><p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Estudiante:</span> {i.documentos.Estudiante.Nombre}  &ensp; <span style={{ fontWeight: 700, color: '#8cc5b0' }}>Cedula:</span> {i.documentos.Estudiante.Identificacion}</p>
                    <p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Curso:</span> {i.documentos.Estudiante.Curso}  &ensp;  <span style={{ fontWeight: 700, color: '#8cc5b0' }}>Paralelo:</span> {i.documentos.Estudiante.Paralelo}</p></>}
                  <p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Actividad:</span> {(i.documentos.Integrantes !== undefined && i.documentos.Integrantes !== null) ? 'Colaborativo' : juego}</p>
                  {(i.documentos.Equipo !== undefined && i.documentos.Equipo !== null) && <><p style={{ fontWeight: 700 }}><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Equipo:</span> {i.documentos.Equipo.Nombre}</p></>}
                  {(i.documentos.Integrantes !== undefined && i.documentos.Integrantes !== null) && <>
                     <p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Integrantes:</span></p>
                     {i.documentos.Integrantes.map((e) => (<>
                       <p style={{ fontWeight: 700 }}>{e.value} -- {e.label}</p>
                     </>))}
                     </>}
                </Col>
              </Row>
              <Col className='m-4'>
              <div style={{ backgroundColor: "#E6DFF0", color: "#62269E" }}>
                <p style={{ fontWeight: 700 }}> <span style={{ color: '#85858C' }} > Fecha de creacion del juego:</span> {fechaEcuador(i.documentos.createdAt)} --- {i.documentos.updatedAt && <><span style={{ color: '#85858C' }}>ultima fecha de actualizacion:</span> {fechaEcuador(i.documentos.updatedAt)}</>} {i.documentos.FechaDeFin && <><span style={{ color: '#85858C' }}>Fecha de cierre del juego:</span> {fechaEcuador(i.documentos.FechaDeFin)}</>}</p>
              </div>
{
 (i.documentos.Avance !== null && i.documentos.Avance !== undefined) && i.documentos.Avance.map((avance, index) => (<>
    <h5>{`Actividades ${index + 1}`}</h5>
    <h5>Correctos</h5>
              <Table striped>
                <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                  <tr>
                    <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oracion seleccionada</th>
                  </tr>
                </thead>
                <tbody>
                  {(avance.Correcto !== null && avance.Correcto !== undefined) && avance.Correcto.map((e) => (<tr className='m-4'>
                    <td><span style={{ color: "#85858C", fontWeight: 700 }}>{e} </span> </td>
                  </tr>))}
                </tbody>
              </Table>
              <h5>Incorrectos</h5>
              <Table striped>
                <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                  <tr>
                    <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra seleccionada</th>
                    <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra a evaluar</th>
                  </tr>
                </thead>
                <tbody>
                  {(avance.Incorrecto !== null && avance.Incorrecto !== undefined) && avance.Incorrecto.map((e) => (<tr className='m-4'>
                    <td><span style={{ color: "#85858C", fontWeight: 700 }}>{e.PalabraASeleccionada} </span> </td>
                    <td><span style={{ color: "#85858C", fontWeight: 700 }}> {e.PalabraAEvaluar} </span></td>
                  </tr>))}
                </tbody>
              </Table>
  </>))
}</Col>
            </>))
          }
        </Container>
      }

    </>
  )
}
