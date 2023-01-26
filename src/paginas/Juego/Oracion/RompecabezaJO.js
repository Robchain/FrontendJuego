import React, { useContext, useEffect } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import {JuecoContext} from "../../../context/Juego/JuecoContext"
import { BackButton } from '../../../componentes/JuegoComponent/JuegoGeneral/BackButton'
import { RompecabaSolitaria } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabaSolitaria'
const RompecabezaJO = () => {

const {oraciondata, setOraciondata} = useContext(JuecoContext);

const dataOracion = (user)=>{
  axios.post("http://localhost:3002/api/auth/llamadaPartidaOracion",{Usuario:user}).then(response =>{setOraciondata(response.data)})
}

useEffect(() => {
  dataOracion(localStorage.getItem("Usuario"));
}, []);


  const Pantalla = () => {
    if (oraciondata === null) {
      return (<>Cargando...</>)
    } else {
      return (<div className="fondoMC img-fluid vh-100">
        <Container>
          <Row>
            <Col className="d-flex justify-content-evenly" lg='12'>
              <h1 style={{ color: '#000', fontWeight: 'bold' }}>Oraciones</h1>
            </Col>
            <Col className="d-flex justify-content-evenly  mt-2 mb-5">
              <Link to={`/OracionJuego/${1}`}> <RompecabaSolitaria  url={oraciondata.Juego1.Partida.Rompecabeza.FileColor} piezas={oraciondata.Juego1.Partida.Rompecabeza.Pieza} a={(oraciondata.Juego1.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(oraciondata.Juego1.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(oraciondata.Juego1.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(oraciondata.Juego1.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(oraciondata.Juego1.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(oraciondata.Juego1.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(oraciondata.Juego1.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(oraciondata.Juego1.Avance.Juego4.Resultado === "CORRECTO") && "hidden"}  /> </Link>
              <Link to={`/OracionJuego/${2}`}> <RompecabaSolitaria url={oraciondata.Juego2.Partida.Rompecabeza.FileColor} piezas={oraciondata.Juego2.Partida.Rompecabeza.Pieza}  /></Link>
              <Link to={`/OracionJuego/${3}`}>     <RompecabaSolitaria url={oraciondata.Juego3.Partida.Rompecabeza.FileColor} piezas={oraciondata.Juego3.Partida.Rompecabeza.Pieza} /> </Link>
            </Col>
            <Col className="d-flex justify-content-evenly mt-2">
              <Link to={`/OracionJuego/${4}`}>    <RompecabaSolitaria url={oraciondata.Juego4.Partida.Rompecabeza.FileColor} piezas={oraciondata.Juego4.Partida.Rompecabeza.Pieza}  /></Link>
              <Link to={`/OracionJuego/${5}`}>   <RompecabaSolitaria url={oraciondata.Juego5.Partida.Rompecabeza.FileColor}  piezas={oraciondata.Juego5.Partida.Rompecabeza.Pieza}  /></Link>
              <Link to={`/OracionJuego/${6}`}>   <RompecabaSolitaria url={oraciondata.Juego6.Partida.Rompecabeza.FileColor} piezas={oraciondata.Juego6.Partida.Rompecabeza.Pieza}  /></Link>
            </Col>
            <Col lg='12'>
              <BackButton ruta='/MenuJuego' />
            </Col>
          </Row>
        </Container>
      </div>)
    }
  }


  return (
    <Pantalla />
  )
}

export default RompecabezaJO;