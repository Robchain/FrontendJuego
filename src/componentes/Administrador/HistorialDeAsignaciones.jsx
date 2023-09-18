import React from 'react'
import { Card, CardBody, CardImg, Col, Row } from 'reactstrap'
import { actividadCaducadaBool, fechaEcuador, nombre } from '../../helpers/contador'

export const HistorialDeAsignaciones = ({data}) => {
  return (
    <Row style={{marginBottom:'50'}}>
      
          <h5 style={{color:"#85858C", fontSize:'1.5em'}}>Fecha de inicio: {fechaEcuador(data[0].FechaDeInicio)} -- Fecha final: {fechaEcuador(data[0].FechaDeFin)} {actividadCaducadaBool(data[0].FechaDeFin) && <span style={{color:'red'}}>&nbsp;&nbsp;Juego cerrado</span>} </h5>
            {
              data.map(i=>(
                <Col lg='4'>
                  <Card style={{padding:'12px', margin:'10px 0px'}}>
                  {
                    i.Equipo === null ? <span style={{color:"#85858C"}}>No hay equipos, el estudiante debe elegir uno</span> : <CardImg  alt={i.Equipo.Nombre} src={i.Equipo.Imagen}   top
      width="100%"/>
                  }
                    <CardBody>
<span style={{color:"#62259E", fontWeight:700}}>Listado de los integrantes</span>
<ul>
                  {i.Integrantes.map(e=>(<li>{e.label}</li> ))}
                  </ul>
                  <p><span style={{color:"#62259E", fontWeight:700}}>Tipo de Juego: </span> 
                  {
              i.TipoDeJuego == '1' && <span>Vocabularios</span>
            }
            {
              i.TipoDeJuego == '2' && <span>Oraciones</span>
            }
            {
              i.TipoDeJuego == '3' && <span>Oraciones y Vocabularios</span>
            }
            </p>
            {
              (i.Avance!==null&&(i.Avance.length/5===i.Integrantes.length)) ? <h3 style={{color:"#62259E"}}>
                    Juego terminado
                      </h3> : <p style={{marginTop:'10px'}}> <span style={{color:"#62259E", fontWeight:700}}>Turno actual: </span>{nombre({objecto:i})} </p>
            }
                    </CardBody>
                  </Card>
                </Col>
              ))
            }
          </Row>
          
  )
}
