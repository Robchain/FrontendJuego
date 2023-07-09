import React from 'react'
import { Col, Row } from 'reactstrap'
import gifDeEspera from "../../assets/img/AssetsGame/101088-kids-studying-from-home (1)a.gif"
import { CarreraStepBar } from '../Administrador/CarreraStepBar'
import { nombre } from '../../helpers/contador'
  
export const Espera = ({InfoEstudiaSituacion}) => {
  return (
    <Row className='justify-content-center' style={{height:"50vh"}}>
    <Col lg="6">
      <img src={gifDeEspera} alt="esperando" width={400}/>
      </Col>
      <Row className='justify-content-center'>
      <Col lg="6" className='mx-auto'>
        <h1>Espera...</h1>
        {
          InfoEstudiaSituacion.Equipo===null ? <p>
        <b>{nombre({objecto:InfoEstudiaSituacion})}</b>, aun no selecciona un equipo
        </p> :<p>
        <b>{nombre({objecto:InfoEstudiaSituacion})}</b> le toca jugar
        </p>
        }
</Col>
</Row>
<Col lg="6" className='mt-3'>
{
 InfoEstudiaSituacion.Equipo !== null && (<CarreraStepBar steps={InfoEstudiaSituacion.Avance!==null ? (InfoEstudiaSituacion.Avance.length/5) : 0} InfoEstudiaSituacion={InfoEstudiaSituacion} />)
}
</Col>
    </Row>
  )
}
