import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { BackButton } from '../../../componentes/JuegoComponent/JuegoGeneral/BackButton'
import { RompecabaSolitaria } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabaSolitaria'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
const RompecabezaJV = () => {

  const {data} = useContext(JuecoContext);


if(!data){
  return <div>Cargando...</div>
}

  return (
    <div className="fondoMC img-fluid vh-100">
   <Container>
<Row>
<Col  className="d-flex justify-content-evenly" lg='12'>
  <h1 style={{color:'#000', fontWeight:'bold' }}>Vocabulario</h1>
</Col>
<Col  className="d-flex justify-content-evenly  mt-2 mb-5">
<Link  to={`/VocabularioJuego/${1}`}><RompecabaSolitaria a={''} d={''} b={""} c={""} e={""} f={""} g={""} h={""} i={""} j={""}  piezas={data.Juego1.Rompecabeza.Pieza} url={data.Juego1.Rompecabeza.FileColor} alt={data.Juego1.Rompecabeza.Nombre}  /> </Link><span>{data.Juego1.Rompecabeza.Pieza}</span>
<Link  to={`/VocabularioJuego/${2}`}> <RompecabaSolitaria  a={''} d={''} b={""} c={""} e={""} f={""} g={""} h={""} i={""} j={""}  piezas={data.Juego2.Rompecabeza.Pieza} url={data.Juego2.Rompecabeza.FileColor} alt={data.Juego2.Rompecabeza.Nombre}/></Link><span>{data.Juego2.Rompecabeza.Pieza}</span>
<Link  to={`/VocabularioJuego/${3}`}>     <RompecabaSolitaria a={''} d={''} b={""} c={""} e={""} f={""} g={""} h={""} i={""} j={""} piezas={data.Juego3.Rompecabeza.Pieza} url={data.Juego3.Rompecabeza.FileColor} alt={data.Juego3.Rompecabeza.Nombre}/> </Link><span>{data.Juego3.Rompecabeza.Pieza}</span>
</Col>
<Col  className="d-flex justify-content-evenly mt-2">
<Link  to={`/VocabularioJuego/${4}`}>    <RompecabaSolitaria a={''} d={''} b={""} c={""} e={""} f={""} g={""} h={""} i={""} j={""} piezas={data.Juego4.Rompecabeza.Pieza} url={data.Juego4.Rompecabeza.FileColor} alt={data.Juego4.Rompecabeza.Nombre} /></Link><span>{data.Juego4.Rompecabeza.Pieza}</span>
<Link  to={`/VocabularioJuego/${5}`}>   <RompecabaSolitaria a={''} d={''} b={""} c={""}  e={""} f={""} g={""} h={""} i={""} j={""} piezas={data.Juego5.Rompecabeza.Pieza} url={data.Juego5.Rompecabeza.FileColor} alt={data.Juego5.Rompecabeza.Nombre} /></Link><span>{data.Juego5.Rompecabeza.Pieza}</span>
<Link  to={`/VocabularioJuego/${6}`}>   <RompecabaSolitaria a={''} d={''} b={""} c={""} e={""} f={""} g={""} h={""} i={""} j={""} piezas={data.Juego6.Rompecabeza.Pieza} url={data.Juego6.Rompecabeza.FileColor} alt={data.Juego6.Rompecabeza.Nombre} /></Link><span>{data.Juego6.Rompecabeza.Pieza}</span>
</Col>     
 {
  //hidden
}
<Col lg='12'>
<BackButton/>
</Col>
</Row>
</Container>
    </div>
  )
}

export default RompecabezaJV;