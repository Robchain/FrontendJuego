import React from 'react'
import { fechaEcuador } from '../../../helpers/contador'
import { Col, Container, Row, Table } from 'reactstrap'

export const ReportePDFCurso = ({ data, juego, Curso, Paralelo }) => {
  return (
    <>
      {
        data.length > 0 && <Container className='m-3'>
          <Row>
            <Col>
              <h3 style={{ color: "#9696D3" }}>Reporte {`${Curso}`} {`${Paralelo}`}</h3>
            </Col>
          </Row>
          {
            data.map(documentos => (
              <>
                <Row className='m-3 '>
                  <Col>
                    {documentos.documentos.Estudiante !== undefined && <> <p style={{ fontWeight: 700 }}><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Estudiante:</span> {documentos.documentos.Estudiante.Nombre}</p>
                      <p style={{ fontWeight: 700 }}><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Cédula:</span> {documentos.documentos.Estudiante.Identificacion}</p></>}
                    <p style={{ fontWeight: 700 }}><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Actividad:</span> {(documentos.documentos.Integrantes !== undefined && documentos.documentos.Integrantes !== null) ? 'Colaborativo' : juego}</p>
                    {(documentos.documentos.Equipo !== undefined && documentos.documentos.Equipo !== null) && <p style={{ fontWeight: 700 }}><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Equipo:</span> {documentos.documentos.Equipo.Nombre}</p>}
                    {(documentos.documentos.Integrantes !== undefined && documentos.documentos.Integrantes !== null) && <><p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Integrantes:</span></p> {documentos.documentos.Integrantes.map((e) => (<>
                      <p style={{ fontWeight: 700 }}>{e.value} -- {e.label}</p>
                    </>))}</>}
                  </Col>
                </Row>
                <Col className='m-4'>
                  <div style={{ backgroundColor: "#E6DFF0", color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}> <span style={{ color: '#85858C' }} > Fecha de creación del juego:</span> {fechaEcuador(documentos.documentos.createdAt)} ---  {documentos.documentos.updatedAt && <><span style={{ color: '#85858C' }}>última fecha de actualización:</span> {fechaEcuador(documentos.documentos.updatedAt)}</>} {documentos.documentos.FechaDeFin && <><span style={{ color: '#85858C' }}>Fecha de cierre del juego:</span> {fechaEcuador(documentos.documentos.FechaDeFin)}</>}</p>
                  </div>
                  {(documentos.documentos.Avance !== null && documentos.documentos.Avance !== undefined) && documentos.documentos.Avance.map((avance, index) => (<>
                    <h5>{`Actividades ${index + 1}`}</h5>
                    <h5>Correctos</h5>
                    <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(avance.Correcto !== null && avance.Correcto !== undefined) && avance.Correcto.map((e) => (<tr className='m-4'>
                          <td><span style={{ color: "#85858C", fontWeight: 700 }}>{e}</span></td>
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
                        {(avance.Incorrecto !== null && avance.Incorrecto !== undefined) && avance.Incorrecto.map(e => (
                          <tr className='m-4'>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e.PalabraASeleccionada}</span> </td>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e.PalabraAEvaluar} </span></td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table>
                  </>))}
                </Col>
              </>
            ))
          }
        </Container>
      }</>
  )
}
