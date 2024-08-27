import React from 'react'
import { Col, Container, Row, Table } from 'reactstrap'
import { buscarValor, fechaEcuador } from '../../../helpers/contador'
import { SinRepeticiones } from '../../../helpers'

export const ReportePDFJugador = ({ data, actividad, Estudiante, Estudiantes }) => {
  return (
    <>
      {
        data.length > 0 && <Container className='m-3'>
          <Row>
            <Col>
              <h4 style={{ color: "#9696D3" }}>Reporte por Estudiante</h4>
            </Col>
          </Row>
          <Row className='m-2'>
              <Col>
                {
                   <><p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Estudiante:</span> {buscarValor(Estudiantes, Estudiante).label}</p>
                    <p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Cédula:</span> {buscarValor(Estudiantes, Estudiante).value}</p></>
                }
                {
                  actividad !=='Todos' && <p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Actividad:</span> {actividad}</p>
                }
              </Col>
            </Row>
          {  actividad !=='Todos' &&  data.map(ind=>( <>
                {
                   ind.tipo==="vocabulario" && <Col className='m-4' >
                     <div className='m-3'>
                     <div style={{ backgroundColor: "#E6DFF0", color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Fecha:</span> {fechaEcuador(ind.updatedAtDay)}</p>
                  </div>
                  
                  {
                ind.data[0].Avance.Correcto.length > 0 && <>
                <h5 style={{ fontWeight: 700, color: '#8cc5b0' }}>{`Actividad 1`}</h5>
                       <h5>Correctos</h5>
                       <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada</th>
                        </tr>
                      </thead>
                      <tbody>
                        {  ind.data[0].Avance.Correcto.length > 0 && SinRepeticiones({input:ind.data[0].Avance.Correcto}).map(e => (
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
                      ( ind.data[0].Avance.Incorrecto.length > 0) && <>
                       <h5>Incorrectos</h5>
                    <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada (incorrecta)</th>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada (correcta)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ind.data[0].Avance.Incorrecto.map(e => (
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
                      ( ind.data[0].Avance.NoContesto.length > 0) && <>
                       <h5>No Contestados (por tiempo excedido)</h5>
                       <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada</th>
                        </tr>
                      </thead>
                      <tbody>
                        { SinRepeticiones({input:ind.data[0].Avance.NoContesto}).map(e => (
                          <tr className='m-4'>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e}</span> </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table>
                      </>
                    }
                    <br />
           
                  
                  
                     </div>
                   </Col>
                }
                {
                   ind.tipo==="oracion" && <Col className='m-4' >
                    <div className='m-3'>
                    <div style={{ backgroundColor: "#E6DFF0", color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Fecha:</span> {fechaEcuador(ind.updatedAtDay)}</p>
                  </div>

                  {
                    ind.data.map((jueguitos,indice)=>(<>
                                        <h5 style={{ fontWeight: 700, color: '#8cc5b0' }}>{`Actividad ${indice + 1}`}</h5>
                                        {
                    
                    jueguitos.Avance.Correcto.length>0 && <>

                       <h5>Correctos</h5>
                       <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SinRepeticiones({input:jueguitos.Avance.Correcto}).map(e => (
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
                        jueguitos.Avance.Incorrecto.length > 0 && <>
                        <h5>Incorrectos</h5>
                    <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada (incorrecta)</th>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada (correcta)</th>
                        </tr>
                      </thead>
                      <tbody>
                        { jueguitos.Avance.Incorrecto.map(e => (
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
        (jueguitos.Avance.NoContesto != undefined && jueguitos.Avance.NoContesto != null)  && <>
{
          (jueguitos.Avance.NoContesto.length > 0) && <>
                <h5>No Contestados (por tiempo excedido)</h5>
                    <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada</th>
                        </tr>
                      </thead>
                      <tbody>
                        { SinRepeticiones({input:jueguitos.Avance.NoContesto}).map(e => (
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

                    </div>
                   </Col>
                }
               
                {
                   ind.tipo==="colaborativo" &&  <Col className='m-4' >
                     <div className='m-3'>
                     <div style={{ backgroundColor: "#E6DFF0", color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Fecha:</span> {fechaEcuador(ind.updatedAtDay)}</p>
                  </div>
                  <div style={{  color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Fecha de inicio:</span> {fechaEcuador(ind.FechaDeInicio)}  <span>---</span> <span style={{ color: '#85858C' }}>Fecha de cierre:</span> {fechaEcuador(ind.FechaDeFin)}</p>
                  </div>
                  {
                     ind.motivo.length > 0 && <div style={{  color: "#62269E" }}>
                     <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Motivo:</span> { ind.motivo}</p>
                   </div>
                  }
                    {
                     ind.Avance.Correcto.length > 0 &&   <>
                        <h5>Correctos</h5>
                       <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada</th>
                        </tr>
                      </thead>
                      <tbody>
                        {  SinRepeticiones({input:ind.Avance.Correcto}).map(e => (
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
                        ( ind.Avance.Incorrecto.length > 0) &&  <>
                            <h5>Incorrectos</h5>
                    <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada (incorrecta)</th>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada (correcta)</th>
                        </tr>
                      </thead>
                      <tbody>
                        { ind.Avance.Incorrecto.map(e => (
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
                   ind.Avance.NoContesto.length > 0  && <>
                       <h5>No Contestados (por tiempo excedido)</h5>
                    <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada (correcta)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {  SinRepeticiones({input:ind.Avance.NoContesto}).map(e => (
                          <tr className='m-4'>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e}</span> </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table>
                    </>
                    }
                    <br />
                     </div>
                   </Col>
                }
            </>
            ))
          }
           {  (data!= undefined && actividad ==='Todos' ) && data.map((indi)=>(<>
            <div style={{ backgroundColor: "#E6DFF0", color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Fecha:</span> {fechaEcuador(indi.updatedAtDay)}</p>
                  </div>
            {
            (indi.data != undefined) &&  indi.data.map(juego=>(<> 
                {
                  juego.tipo ==='vocabulario' &&<Col className='m-4' > 
                  <p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Actividad:</span> Vocabulario</p>
                    {
                      juego.data.map((z, index) =>(<>
                      {
                        z.Avance.Correcto.length > 0 && <> 
                        <h5 style={{ fontWeight: 700, color: '#8cc5b0' }}>{`Actividad ${index +1}`}</h5>
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
                        <h5>Incorrectos</h5>
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
                        <h5>No Contestados (por tiempo excedido)</h5>
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
                  juego.tipo ==='oracion' &&<Col className='m-4' >
                    <p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Actividad:</span> Oración</p>
                    {
                      juego.data.map((z, index) =>(<>
                      {
                        z.Avance.Correcto.length > 0 && <> 
                        <h5 style={{ fontWeight: 700, color: '#8cc5b0' }}>{`Actividad ${index +1}`}</h5>
                     <h5>Correctos</h5>
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
                         <h5>Incorrectos</h5>
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
                         <h5>No Contestados (por tiempo excedido)</h5>
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
                  juego.tipo ==='colaborativo' &&<Col className='m-4' >
                    <p><span style={{ fontWeight: 700, color: '#8cc5b0' }}>Actividad:</span> Colaborativo</p>

                    <div style={{  color: "#62269E" }}>
                    <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Fecha de inicio:</span> {fechaEcuador(juego.FechaDeInicio)}  <span>---</span> <span style={{ color: '#85858C' }}>Fecha de cierre:</span> {fechaEcuador(juego.FechaDeFin)}</p>
                  </div>
                  {
                      juego.motivo.length > 0 && <div style={{  color: "#62269E" }}>
                     <p style={{ fontWeight: 700 }}><span style={{ color: '#85858C' }}>Motivo:</span> {  juego.motivo}</p>
                   </div>
                      }
                       {
                        juego.Avance.Correcto.length > 0 && <> 
                         <h5>Correctos</h5>
                       <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada</th>
                        </tr>
                      </thead>
                      <tbody>
                        {  SinRepeticiones({input: juego.Avance.Correcto}).map(e => (
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
                       juego.Avance.Incorrecto.length > 0 && <> 
                       <h5>Incorrectos</h5>
                    <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración seleccionada (incorrecta)</th>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada (correcta)</th>
                        </tr>
                      </thead>
                      <tbody>
                        { juego.Avance.Incorrecto.map(e => (
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
                        juego.Avance.NoContesto.length > 0 && <>
                        <h5>No Contestados (por tiempo excedido)</h5>
                    <Table striped>
                      <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                        <tr>
                          <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>Palabra/Oración evaluada (correcta)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {  SinRepeticiones({input: juego.Avance.NoContesto}).map(e => (
                          <tr className='m-4'>
                            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{e}</span> </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table> </>
                      }
                      </Col>
                }
              </>))
            }
           </>
           ))}
        </Container>

      }
      
    </>
  )
}



// import React from 'react';

// const DownloadPDFButton = () => {
//   const handleDownload = async () => {
//     try {
//       // 1) Enviar la petición con la data del formulario
//       const response = await fetch('TU_ENDPOINT', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({/* Tu data del formulario */}),
//       });

//       // 2) Esperar la respuesta
//       if (!response.ok) {
//         throw new Error('Error en la petición');
//       }

//       const data = await response.json();

//       // 3) Recibir la respuesta y un texto en base64
//       const base64PDF = data.base64PDF; // Asumiendo que el base64PDF está en esta propiedad

//       // 4) Convertir de base64 a PDF
//       const pdfBlob = base64ToBlob(base64PDF, 'application/pdf');

//       // 5) Descargar el archivo en el dispositivo
//       downloadBlob(pdfBlob, 'archivo.pdf');
//     } catch (error) {
//       console.error('Error al descargar el PDF:', error);
//     }
//   };

//   // Función para convertir base64 a Blob
//   const base64ToBlob = (base64, type) => {
//     const binary = atob(base64.replace(/\s/g, ''));
//     const len = binary.length;
//     const buffer = new ArrayBuffer(len);
//     const view = new Uint8Array(buffer);

//     for (let i = 0; i < len; i++) {
//       view[i] = binary.charCodeAt(i);
//     }

//     return new Blob([view], { type });
//   };

//   // Función para descargar el Blob como archivo
//   const downloadBlob = (blob, filename) => {
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = filename;
//     document.body.appendChild(a);
//     a.click();
//     window.URL.revokeObjectURL(url);
//     document.body.removeChild(a);
//   };

//   return <button onClick={handleDownload}>Descargar PDF</button>;
// };

// export default DownloadPDFButton;
