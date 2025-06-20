import React from 'react'
import { fechaEcuador } from '../../../helpers/contador'
import { Col, Container, Row, Table } from 'reactstrap'

export const ReportePDFJuego = ({ data, juego='' }) => {
  console.log(data)
  return (
    <>
    {
      (data !== undefined && data !== null ) &&<Container className='m-3'>
         {juego !== 'Todos' && <Row>
            <Col>
              <h3 style={{ color: "#9696D3" }}>Reportesss {`${juego}`}</h3>
            </Col>
          </Row>}
          {juego === 'Todos' && <Row>
            <Col>
              <h3 style={{ color: "#9696D3" }}>Reporte</h3>
            </Col>
          </Row>}
          {
            data.Juego==='vocabulario' &&<>
            <div style={{  color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Desde:</span> {fechaEcuador(data.fechaInicio)}  <span>&nbsp;&nbsp;</span> <span style={{ color: '#85858C' }}>Hasta:</span> {fechaEcuador(data.fechaFin)}</p>
                  </div>
                  {
                    data.Cursos.map(Curso=>(<>
                      <div style={{  color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Curso:</span> {Curso.Curso}  <span>&nbsp;&nbsp;</span> <span style={{ color: '#85858C' }}>Paralelo:</span> {Curso.Paralelo}&nbsp;&nbsp; <span style={{ color: '#85858C' }}>Docente:</span>{data.Docente}</p>
                  </div>
                  <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Nombre</th>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Juegos</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data.data.filter(item=>(item._id.Curso=== Curso.Curso && item._id.Paralelo=== Curso.Paralelo)).map(i=>(<tr className='m-4' >
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{i._id.Nombre}</span> </td>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{i.documentos.length}</span> </td>
                          </tr>))
                        }
                      </tbody>
                    </Table>  
                    </>))
                  }
            
            </>
          }
          {
            data.Juego==='oracion' && <>
            <div style={{  color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Desde:</span> {fechaEcuador(data.fechaInicio)}  <span>&nbsp;&nbsp;</span> <span style={{ color: '#85858C' }}>Hasta:</span> {fechaEcuador(data.fechaFin)}</p>
                  </div>
                  {
                    data.Cursos.map(Curso=>(<>
                      <div style={{  color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Curso:</span> {Curso.Curso}  <span>&nbsp;&nbsp;</span> <span style={{ color: '#85858C' }}>Paralelo:</span> {Curso.Paralelo}&nbsp;&nbsp; <span style={{ color: '#85858C' }}>Docente:</span>{data.Docente}</p>
                  </div>
                  <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Nombre</th>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Juegos</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data.data.filter(item=>(item._id.Curso=== Curso.Curso && item._id.Paralelo=== Curso.Paralelo)).map(i=>(<tr className='m-4' >
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{i._id.Nombre}</span> </td>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{i.documentos.length}</span> </td>
                          </tr>))
                        }
                      </tbody>
                    </Table>  
                    </>))
                  }
            </>
          }
          {
            data.Juego==='colaborativo'  && <>
             <div style={{  color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Desde:</span> {fechaEcuador(data.fechaInicio)}  <span>&nbsp;&nbsp;</span> <span style={{ color: '#85858C' }}>Hasta:</span> {fechaEcuador(data.fechaFin)}</p>
                  </div>
                  {
                    data.data.map(individual=>(<>
                      <div style={{  color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Curso:</span> {individual.curso}  <span>&nbsp;&nbsp;</span> <span style={{ color: '#85858C' }}>Paralelo:</span> {individual.paralelo}&nbsp;&nbsp; <span style={{ color: '#85858C' }}>Docente:</span><DocentesList2 data={data.docentes}  /></p>
                  </div>
                  <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#171618", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Nombre</th>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Juegos</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                           individual.nameCounts.map(i=>(<tr className='m-4' >
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{i.nombre}</span> </td>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{i.count}</span> </td>
                          </tr>))
                        }
                      </tbody>
                    </Table>  
                    </>))
                  }
            </>
          }
        {
          data.juego === 'Todos' &&<>
          <div style={{  color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Desde:</span> {fechaEcuador(data.fechaInicio)}  <span>&nbsp;&nbsp;</span> <span style={{ color: '#85858C' }}>Hasta:</span> {fechaEcuador(data.fechaFin)}</p>
                  </div>
                  {
            data.dataVocabulario.Cursos.length>0 &&      data.dataVocabulario.Cursos.map(Curso=>(<>

              <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Docente:</span><DocentesList2 data={data.dataColaborativo.docentes}  /></p>
                 <p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Actividad:</span> Vocabulario</p>
                
                      <div style={{  color: "#62269E" }}>
                    
                  </div>
                  <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Nombre</th>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Juegos</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data.dataVocabulario.data.filter(item=>(item._id.Curso=== Curso.Curso && item._id.Paralelo=== Curso.Paralelo)).map(i=>(<tr className='m-4' >
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{i._id.Nombre}</span> </td>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{i.documentos.length}</span> </td>
                          </tr>))
                        }
                      </tbody>
                    </Table>  
                    </>))
                  }
          {
          data.dataOracion.Cursos.length>0 &&  data.dataOracion.Cursos.map(Curso=>(<>
           <p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Actividad:</span> Oración</p>
            <div style={{  color: "#62269E" }}>
          {/* <p style={{ fontWeight: 700 }}> <span style={{ color: '#85858C' }}>Docente:</span><DocentesList data={ data.dataOracion.data}  /></p> */}
        </div>
        <Table striped>
            <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
              <tr>
                <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Nombre</th>
                <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Juegos</th>
              </tr>
            </thead>
            <tbody>
              {
                data.dataOracion.data.filter(item=>(item._id.Curso=== Curso.Curso && item._id.Paralelo=== Curso.Paralelo)).map(i=>(<tr className='m-4' >
                  <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{i._id.Nombre}</span> </td>
                  <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{i.documentos.length}</span> </td>
                </tr>))
              }
            </tbody>
          </Table>  
          </>))
          }
          {
            data.dataColaborativo.data.map(individual=>(<>
            <p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Actividad:</span> Colaborativo</p>
              <div style={{  color: "#62269E" }}>
            {/* <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Docente:</span><DocentesList2 data={data.dataColaborativo.docentes}  /></p> */}
          </div>
          <Table striped>
              <thead style={{ backgroundColor: "#E6DFF0", color: "#171618", textAlign: "initial" }}>
                <tr>
                  <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Nombre</th>
                  <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Juegos</th>
                </tr>
              </thead>
              <tbody>
                {
                   individual.nameCounts.map(i=>(<tr className='m-4' >
                    <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{i.nombre}</span> </td>
                    <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{i.count}</span> </td>
                  </tr>))
                }
              </tbody>
            </Table>  
            </>))
          }
          </>
        }
      </Container>
    }

    </>
  )
}





function DocentesList({data}) {
  const uniqueDocentes = Array.from(
    new Set(data.map(item => item._id.Docente))
  );

  return (
    <>
      {uniqueDocentes.map((docente, index) => (
        <span key={index}>{docente}{index < uniqueDocentes.length - 1 ? ', ' : ''}</span>
      ))}
    </>
  );
}

function DocentesList2({data}) {
  const uniqueDocentes = Array.from(
    new Set(data.map(item => item))
  );

  return (
    <>
      {uniqueDocentes.map((docente, index) => (
        <span key={index}>{docente}{index < uniqueDocentes.length - 1 ? ', ' : ''}</span>
      ))}
    </>
  );
}
