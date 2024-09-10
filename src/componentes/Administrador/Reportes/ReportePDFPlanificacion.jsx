import React from 'react'
import { Col, Container, Row, Table } from 'reactstrap'
import { fechaEcuador } from '../../../helpers'

export const ReportePDFPlanificacion = ({ data, Curso, Paralelo }) => {
  return (
    <>
    {/* {
        JSON.stringify(data)
    } */}
    {
         <Container className='m-3'>
          <Row>
            <Col>
              <h3 style={{ color: "#9696D3" }}>Reporte Planificación Colaborativa</h3>
            </Col>
          </Row>
          {
            data.docentes != undefined && <> <div style={{ backgroundColor: "#E6DFF0", color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Curso:</span> {Curso}&nbsp;&nbsp; <span style={{ color: '#85858C' }}>Paralelo:</span> {Paralelo} &nbsp;&nbsp; <span style={{ color: '#85858C' }}>Docente:</span> {data.docentes.map(docen=>(<>{docen}</>))}</p>
                  </div>                  
                  </>
          }
          {
            data.data!=undefined &&data.data.map(juego=>(<>
                      <p style={{ fontWeight: 700 }}><span style={{ color: '#8cc5b0' }}>{juego._id.TipoDeJuego == 1 && "Vocabulario:"}{juego._id.TipoDeJuego == 2 && "Oracion:"}{juego._id.TipoDeJuego == 3 && "Mixto:"}</span> {juego.documentos.length} Juegos</p>
                      <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Fecha de creación</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                    juego.documentos.map((i)=>(
                    <tr className='m-4' >
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{fechaEcuador(i.createdAtDay)}</span> </td>
                          </tr>
                    ))
                }
                      </tbody>
                    </Table>  
            </>))
          }
               {
            data.total!=undefined &&<p style={{ fontWeight: 700 }}><span style={{ color: '#8cc5b0' }}>TOTAL: </span> { data.total}  </p>
          }
                
        </Container>
    }
    </>
  )
}
