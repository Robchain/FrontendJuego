import React from 'react'
import { fechaEcuador } from '../../../helpers/contador'
import { Col, Container, Row, Table } from 'reactstrap'
import { SinRepeticiones } from '../../../helpers'

export const ReportePDFCurso = ({ data, juego, Curso, Paralelo }) => {
  return (
    <>
{/* {
  JSON.stringify(data)
} */}
    {
      data.length >0 && <Container className='m-3'>
        {juego !== 'Todos' &&<Row>
            <Col>
              <h3 style={{ color: "#9696D3" }}>Reporte {`${Curso}`} {`${Paralelo}`} -- {`${juego} `}</h3>
            </Col>
          </Row>}
          {juego === 'Todos' &&<Row>
            <Col>
              <h3 style={{ color: "#9696D3" }}>Reporte {`${Curso}`} {`${Paralelo}`}</h3>
            </Col>
          </Row>}
        {
          juego !== 'Todos' && data.map(individual=>(
            <>
            {
              individual.tipo ==='vocabulario' && <>
                <div style={{ backgroundColor: "#E6DFF0", color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>FECHA:</span> {fechaEcuador(individual.updatedAtDay)}</p>
                  </div>
              {
                individual.data.map((dataIn, index)=>(<>
            {
                    (dataIn.Estudiante !== undefined && dataIn.Estudiante != null ) && <> <p style={{ fontWeight: 700 }}><span style={{ fontWeight: 700, color: '#8cc5b0' }}>ESTUDIANTE:</span> {dataIn.Estudiante.Nombre}   &nbsp;&nbsp; <span style={{ fontWeight: 700, color: '#8cc5b0' }}>Cédula:</span> {dataIn.Estudiante.Identificacion}</p></>
                  }

                  {
                    dataIn.Avance.Correcto.length > 0 && <>
                    <Row className='mx-3'>
                    <Col>
                     <h6 style={{ fontWeight: 700, color: '#8cc5b0' }}>{`Actividad ${index +1}`}</h6>
                     </Col>
                     </Row>
                       <h5>Correctos</h5>
                       <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada</th>
                        </tr>
                      </thead>
                      <tbody>
                        {   dataIn.Avance.Correcto.length > 0 && SinRepeticiones({input: dataIn.Avance.Correcto}).map(e => (
                          <tr className='m-4' >
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e}</span> </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table>       
                    </>
                  }
                {
                    dataIn.Avance.Incorrecto.length > 0 && <>
                        <h6>Incorrectos</h6>
                    <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada (incorrecta)</th>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada (correcta)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataIn.Avance.Incorrecto.map(e => (
                          <tr className='m-4'>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e.PalabraASeleccionada}</span> </td>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e.PalabraAEvaluar} </span></td>
                          </tr>
                        ))
                        
                        }
                      </tbody>
                    </Table>
                    </>
                  }

                  {
                    dataIn.Avance.NoContesto.length > 0 && <>
                    <h6>No Contestados (por tiempo excedido)</h6>
                       <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada</th>
                        </tr>
                      </thead>
                      <tbody>
                        { SinRepeticiones({input:dataIn.Avance.NoContesto}).map(e => (
                          <tr className='m-4'>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e}</span> </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table>
                    </>
                  }
                </>))
              }
               
              </>
            }

{
  individual.tipo ==='oracion' && <>
  <div style={{ backgroundColor: "#E6DFF0", color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Fecha:</span> {fechaEcuador(individual.updatedAtDay)}</p>
                  </div>
            {
                  individual.data.map((dataIn, index)=>(<>
                   {
                    (dataIn.Estudiante !== undefined && dataIn.Estudiante != null ) && <> <p style={{ fontWeight: 700 }}><span style={{ fontWeight: 700, color: '#8cc5b0' }}>ESTUDIANTE:</span> {dataIn.Estudiante.Nombre} &nbsp;&nbsp; <span style={{ fontWeight: 700, color: '#8cc5b0' }}>Cédula:</span> {dataIn.Estudiante.Identificacion}</p></>
                  }
        
                  {
                    dataIn.Avance.Correcto.length > 0 && <>
                          <Row className='mx-3'>
                          <Col>
                       <h6 style={{ fontWeight: 700, color: '#8cc5b0' }}>{`Actividad ${index +1}`}</h6>
                       </Col>
                       </Row>
                       <h5>Correctos</h5>
                       <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada</th>
                        </tr>
                      </thead>
                      <tbody>
                        {   dataIn.Avance.Correcto.length > 0 && SinRepeticiones({input: dataIn.Avance.Correcto}).map(e => (
                          <tr className='m-4' >
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e}</span> </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table>       
                    </>
                  }
                  {
                    dataIn.Avance.Incorrecto.length > 0 && <>
                      <h6>Incorrectos</h6>
                    <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada (incorrecta)</th>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada (correcta)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataIn.Avance.Incorrecto.map(e => (
                          <tr className='m-4'>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e.PalabraASeleccionada}</span> </td>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e.PalabraAEvaluar} </span></td>
                          </tr>
                        ))
                        
                        }
                      </tbody>
                    </Table>
                    </>
                  }
                  {
                    dataIn.Avance.NoContesto.length > 0 && <>
                     <h6>No Contestados (por tiempo excedido)</h6>
                       <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada</th>
                        </tr>
                      </thead>
                      <tbody>
                        { SinRepeticiones({input:dataIn.Avance.NoContesto}).map(e => (
                          <tr className='m-4'>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e}</span> </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table>
                    </>
                  }

              </>))
        }

  </>
}

{
  individual.tipo ==='colaborativo' && <>
<div style={{ backgroundColor: "#E6DFF0", color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Fecha:</span> {fechaEcuador(individual.updatedAtDay)}</p>
                  </div>
                  <div style={{  color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Fecha de inicio:</span> {fechaEcuador(individual.FechaDeInicio)}  <span>---</span> <span style={{ color: '#85858C' }}>Fecha de cierre:</span> {fechaEcuador(individual.FechaDeFin)}</p>
                  </div>

{
  individual.data.map((dataIn)=>(<>

                  {(dataIn.Integrantes !== undefined && dataIn.Integrantes !== null) && <><p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Integrantes:</span></p> {dataIn.Integrantes.map((e,index) => (<>
                      <p style={{ fontWeight: 700 }}>{index +1})&nbsp;&nbsp;{e.label}</p>
                    </>))}</>
                  }
                          {
                     dataIn.motivo.length > 0  && <div style={{  color: "#62269E" }}>
                     <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Motivo:</span> { dataIn.motivo}</p>
                   </div>
                  }
                  {
                    dataIn.Avance.map((avanceCo,index)=>(<>
                 
                        {
                          avanceCo.Correcto.length > 0 &&<>
                          <Row className='mx-3'>
                          <Col>
                           <h5 style={{ fontWeight: 700, color: '#8cc5b0' }}>{`Integrante ${index +1}`}</h5>
                           </Col>
                </Row>
                       <h6>Correctos</h6>
                       <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada</th>
                        </tr>
                      </thead>
                      <tbody>
                        {   avanceCo.Correcto.length > 0 && SinRepeticiones({input: avanceCo.Correcto}).map(e => (
                          <tr className='m-4' >
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e}</span> </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table>    
                          </>
                        }
                        {
 avanceCo.Incorrecto.length > 0 &&<>
 <h6>Incorrectos</h6>
                    <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada (incorrecta)</th>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada (correcta)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {avanceCo.Incorrecto.map(e => (
                          <tr className='m-4'>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e.PalabraASeleccionada}</span> </td>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e.PalabraAEvaluar} </span></td>
                          </tr>
                        ))
                        
                        }
                      </tbody>
                    </Table>
 </>
                        }
                                                {
 avanceCo.NoContesto.length > 0 &&<>
 <h6>No Contestados (por tiempo excedido)</h6>
                       <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada</th>
                        </tr>
                      </thead>
                      <tbody>
                        { SinRepeticiones({input:avanceCo.NoContesto}).map(e => (
                          <tr className='m-4'>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e}</span> </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table>
 </>
                        }
                    </>))
                  }
  </>))
}
  
  </>
}
            </>
          ))
        }

        {
          juego === 'Todos' && data.map((indi)=>(<>
            <div style={{ backgroundColor: "#E6DFF0", color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Fecha:</span> {fechaEcuador(indi.updatedAtDay)}</p>
                  </div>
            
            {
              indi.data.map(juego=>(<>
                {
                  juego.tipo ==='vocabulario' &&<Col className='m-4' > 
                  <p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Actividad:</span> Vocabulario</p>
                    {
                      juego.data.map((z, index) =>(<>
         
                  {
                    (z.Estudiante !== undefined && z.Estudiante != null ) && <> <p style={{ fontWeight: 700 }}><span style={{ fontWeight: 700, color: '#8cc5b0' }}>ESTUDIANTE:</span> {z.Estudiante.Nombre} &nbsp;&nbsp;<span style={{ fontWeight: 700, color: '#8cc5b0' }}>Cédula:</span> {z.Estudiante.Identificacion} </p>
                      <p style={{ fontWeight: 700 }}></p></>
                  }
      
                      {
                        z.Avance.Correcto.length > 0 && <> 
                           <Row className='m-3'>
                           <Col>
                        <h6 style={{ fontWeight: 700, color: '#8cc5b0' }}>{`Actividad ${index +1}`}</h6>
                        </Col>
                        </Row>
                       <h5>Correctos</h5>
                       <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada</th>
                        </tr>
                      </thead>
                      <tbody>
                        {  z.Avance.Correcto.length > 0 && SinRepeticiones({input:z.Avance.Correcto}).map(e => (
                          <tr className='m-4' >
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e}</span> </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table>   
                    </>
                      }
                      {
                        z.Avance.Incorrecto.length > 0 && <> 
                        <h6>Incorrectos</h6>
                    <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada (incorrecta)</th>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada (correcta)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {z.Avance.Incorrecto.map(e => (
                          <tr className='m-4'>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e.PalabraASeleccionada}</span> </td>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e.PalabraAEvaluar} </span></td>
                          </tr>
                        ))
                        
                        }
                      </tbody>
                    </Table></>
                      }
                      {
                        z.Avance.NoContesto.length > 0 && <> 
                        <h6>No Contestados (por tiempo excedido)</h6>
                       <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada</th>
                        </tr>
                      </thead>
                      <tbody>
                        { SinRepeticiones({input:z.Avance.NoContesto}).map(e => (
                          <tr className='m-4'>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e}</span> </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table></>
                      }
                       </>))
                    }
                  </Col>
                }
                {
                  juego.tipo ==='oracion' && <Col className='m-4' > 
                   <p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Actividad:</span> Oración</p>
                  {
                    juego.data.map((z,index)=>(<>
                    
                  {
                    (z.Estudiante !== undefined && z.Estudiante != null ) && <> <p style={{ fontWeight: 700 }}><span style={{ fontWeight: 700, color: '#8cc5b0' }}>ESTUDIANTE:</span> {z.Estudiante.Nombre} &nbsp;&nbsp;<span style={{ fontWeight: 700, color: '#8cc5b0' }}>Cédula:</span> {z.Estudiante.Identificacion}</p>
                      </>
                  }
                  
                    {
                        z.Avance.Correcto.length > 0 && <> 
                        <Row className='mx-3'>
                  <Col>
                        <h5 style={{ fontWeight: 700, color: '#8cc5b0' }}>{`Actividad ${index +1}`}</h5>
                        </Col>
                </Row>
                     <h6>Correctos</h6>
                       <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SinRepeticiones({input:z.Avance.Correcto}).map(e => (
                          <tr className='m-4' >
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e}</span> </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table>  </>
                      }
                      {
                        z.Avance.Incorrecto.length > 0 && <>
                         <h6>Incorrectos</h6>
                    <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada (incorrecta)</th>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada (correcta)</th>
                        </tr>
                      </thead>
                      <tbody>
                        { z.Avance.Incorrecto.map(e => (
                          <tr className='m-4'>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e.PalabraASeleccionada}</span> </td>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e.PalabraAEvaluar} </span></td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table> </>
                      }
                      {
                        ( z.Avance.NoContesto != undefined &&  z.Avance.NoContesto != null) && <>
                        {
                        z.Avance.NoContesto.length > 0 && <>
                         <h6>No Contestados (por tiempo excedido)</h6>
                    <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada</th>
                        </tr>
                      </thead>
                      <tbody>
                        { SinRepeticiones({input:z.Avance.NoContesto}).map(e => (
                          <tr className='m-4'>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e} </span></td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table>
                     </>
                      }
                        </>
                      }
                    </>))
                  }
                  </Col>
                }
                {
                  juego.tipo ==='colaborativo' && <Col className='m-4' > 
                   <p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Actividad:</span> Colaborativo</p>
                   <div style={{  color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Fecha de inicio:</span> {fechaEcuador(juego.FechaDeInicio)}  <span>---</span> <span style={{ color: '#85858C' }}>Fecha de cierre:</span> {fechaEcuador(juego.FechaDeFin)}</p>
                  </div>
                  {
                    juego.data.map((teams, index) => (<>
                          

                  {(teams.Integrantes !== undefined && teams.Integrantes !== null) && <><p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Integrantes:</span></p> {teams.Integrantes.map((e,index) => (<>
                      <p style={{ fontWeight: 700 }}>{index +1})&nbsp;&nbsp;{e.label}</p>
                    </>))}</>
                  }
                    {
                     teams.motivo.length > 0  && <div style={{  color: "#62269E" }} className='mt-3'>
                     <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Motivo:</span> { teams.motivo}</p>
                   </div>
                  }
                  {
                    teams.Avance.map((avanceCo,index)=>(<>
                    {
                          avanceCo.Correcto.length > 0 &&<>
                             <Row className='mx-3'>
                             <Col>
                           <h5 style={{ fontWeight: 700, color: '#8cc5b0' }}>{`Integrante ${index +1}`}</h5>
                           </Col>
                           </Row>
                       <h6>Correctos</h6>
                       <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada</th>
                        </tr>
                      </thead>
                      <tbody>
                        {   avanceCo.Correcto.length > 0 && SinRepeticiones({input: avanceCo.Correcto}).map(e => (
                          <tr className='m-4' >
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e}</span> </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table>    
                          </>
                        }
                        {
 avanceCo.Incorrecto.length > 0 &&<>
 <h6>Incorrectos</h6>
                    <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada (incorrecta)</th>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada (correcta)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {avanceCo.Incorrecto.map(e => (
                          <tr className='m-4'>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e.PalabraASeleccionada}</span> </td>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e.PalabraAEvaluar} </span></td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table>
 </>
                        }
                                                {
 avanceCo.NoContesto.length > 0 &&<>
 <h6>No Contestados (por tiempo excedido)</h6>
                       <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada</th>
                        </tr>
                      </thead>
                      <tbody>
                        { SinRepeticiones({input:avanceCo.NoContesto}).map(e => (
                          <tr className='m-4'>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e}</span> </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table>
 </>
                        }

                      
                    
                    </>))
                  }

                        
                    </>))
                  }

                  </Col>
                }
              </>))
            }

          </>))}
          
      </Container>
    }


    
      </>
  )
}
