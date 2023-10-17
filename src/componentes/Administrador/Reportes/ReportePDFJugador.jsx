import React from 'react'
import { Col, Container, Row, Table } from 'reactstrap'
import { buscarValor, fechaEcuador } from '../../../helpers/contador'

export const ReportePDFJugador = ({ data, actividad, Estudiante, Estudiantes }) => {


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
                data[0].documentos.Estudiante !== undefined ? <>
                  <p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Estudiante:</span> {data[0].documentos.Estudiante.Nombre}</p>
                  <p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Cédula:</span> {data[0].documentos.Estudiante.Identificacion}</p>
                </> : <><p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Estudiante:</span> {buscarValor(Estudiantes, Estudiante).label}</p>
                  <p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Cédula:</span> {buscarValor(Estudiantes, Estudiante).value}</p></>
              }
              <p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Actividad:</span> {actividad}</p>
            </Col>
          </Row>
          {
            data.map(i => (
              <Col className='m-4' >
                <div className='m-3'>
                  <div style={{ backgroundColor: "#E6DFF0", color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}> <span style={{ color: '#85858C' }} > Fecha de creación del juego:</span> {fechaEcuador(i.documentos.createdAt)} --- <span style={{ color: '#85858C' }}>última fecha de actualización:</span> {fechaEcuador(i.documentos.updatedAt)}</p>
                  </div>
                  {( i.documentos.Avance !== null && i.documentos.Avance!==undefined) && i.documentos.Avance.map((j, index) => (<>
                    <h5>{`Actividades ${index + 1}`}</h5>
                    <br />
                    <h5>Correctos</h5>
                    <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(j.Correcto !== null && j.Correcto !== undefined) && j.Correcto.map(e => (
                          <tr className='m-4'>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e}</span> </td>
                          </tr>
                        ))
                        }
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
                        {(j.Incorrecto !== null && j.Incorrecto !== undefined) && j.Incorrecto.map(e => (
                          <tr className='m-4'>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e.PalabraASeleccionada}</span> </td>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e.PalabraAEvaluar} </span></td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table>
                  </>
                  ))}
                </div>
              </Col>
            ))
          }
        </Container>

      }
    </>
  )
}
