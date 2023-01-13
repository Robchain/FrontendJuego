import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { BackButton } from '../../../componentes/JuegoComponent/JuegoGeneral/BackButton'
import { RompecabaSolitaria } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabaSolitaria'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
const RompecabezaJV = () => {

  const {data,
     rompecabeza1,
     rompecabeza2,
     rompecabeza3,
     rompecabeza4,
     rompecabeza5,
     rompecabeza6} = useContext(JuecoContext);


if(!data){
  return <div>Cargando...</div>
}

  return (
    <div className="fondoMC img-fluid vh-100">
   <Container>
<Row>
<Col  className=""  lg='9'> {/*"d-flex justify-content-evenly"*/}
  <h1 style={{color:'#000', fontWeight:'bold' }}>Vocabulario</h1>
</Col>
<Col  lg="3">
  <h2>Puntos:10</h2>
</Col>
<Col  className="d-flex justify-content-evenly  mt-2 mb-5">
<Col>
<Link  to={`/VocabularioJuego/${1}`}><RompecabaSolitaria a={'hidden'} d={''} b={""} c={""} e={""} f={""} g={""} h={""} i={""} j={""}  piezas={data.Juego1.Rompecabeza.Pieza} url={data.Juego1.Rompecabeza.FileColor} alt={data.Juego1.Rompecabeza.Nombre}  /> </Link><span>{`${rompecabeza1}/${data.Juego1.Rompecabeza.Pieza}`}</span>
</Col>
<Col>
<Link  to={`/VocabularioJuego/${2}`}> <RompecabaSolitaria  a={''} d={''} b={""} c={""} e={""} f={""} g={""} h={""} i={""} j={""}  piezas={data.Juego2.Rompecabeza.Pieza} url={data.Juego2.Rompecabeza.FileColor} alt={data.Juego2.Rompecabeza.Nombre}/></Link><span>{`${rompecabeza2}/${data.Juego2.Rompecabeza.Pieza}`}</span>
</Col>
<Col>
<Link  to={`/VocabularioJuego/${3}`}>     <RompecabaSolitaria a={''} d={''} b={""} c={""} e={""} f={""} g={""} h={""} i={""} j={""} piezas={data.Juego3.Rompecabeza.Pieza} url={data.Juego3.Rompecabeza.FileColor} alt={data.Juego3.Rompecabeza.Nombre}/> </Link><span>{`${rompecabeza3}/${data.Juego3.Rompecabeza.Pieza}`}</span>
</Col>
</Col>
<Col  className="d-flex justify-content-evenly mt-2">
<Col>
<Link  to={`/VocabularioJuego/${4}`}>    <RompecabaSolitaria a={''} d={''} b={""} c={""} e={""} f={""} g={""} h={""} i={""} j={""} piezas={data.Juego4.Rompecabeza.Pieza} url={data.Juego4.Rompecabeza.FileColor} alt={data.Juego4.Rompecabeza.Nombre} /></Link><span>{`${rompecabeza4}/${data.Juego4.Rompecabeza.Pieza}`}</span>
</Col>
<Col>
<Link  to={`/VocabularioJuego/${5}`}>   <RompecabaSolitaria a={''} d={''} b={""} c={""}  e={""} f={""} g={""} h={""} i={""} j={""} piezas={data.Juego5.Rompecabeza.Pieza} url={data.Juego5.Rompecabeza.FileColor} alt={data.Juego5.Rompecabeza.Nombre} /></Link><span>{`${rompecabeza5}/${data.Juego5.Rompecabeza.Pieza}`}</span>
</Col>
<Col>
<Link  to={`/VocabularioJuego/${6}`}>   <RompecabaSolitaria a={''} d={''} b={""} c={""} e={""} f={""} g={""} h={""} i={""} j={""} piezas={data.Juego6.Rompecabeza.Pieza} url={data.Juego6.Rompecabeza.FileColor} alt={data.Juego6.Rompecabeza.Nombre} /></Link><span>{`${rompecabeza6}/${data.Juego6.Rompecabeza.Pieza}`}</span>
</Col>
</Col>     
<Col lg='12'>
<BackButton ruta='/MenuJuego'/>
</Col>
</Row>
</Container>
    </div>
  )
}

export default RompecabezaJV;