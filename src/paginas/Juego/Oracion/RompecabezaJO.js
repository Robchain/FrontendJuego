import React, { useContext, useEffect, useReducer, useState } from 'react'
import axios from "axios";
import { Link, NavLink } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import {JuecoContext} from "../../../context/Juego/JuecoContext"
import { BackButton } from '../../../componentes/JuegoComponent/JuegoGeneral/BackButton'
import { RompecabaSolitaria } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabaSolitaria'
import doorout from "../../../assets/img/AssetsGame/doorout.png"
import LogoBlipBlaPalabra from "../../../componentes/iconosCom/LogoBlipBlaPalabra"
import backbutton from "../../../assets/img/AssetsGame/backbotton.png"
const RompecabezaJO = () => {

const {oraciondata, setOraciondata, dispatchProgreso} = useContext(JuecoContext);
const [usuario, setUsuario] = useState("");
const [Email, setEmail] = useState("");
const [Identificacion, setIdentificacion] = useState(0);
const dataOracion = (user)=>{
  axios.post("http://localhost:3002/api/auth/llamadaPartidaOracion",{Usuario:user}).then(response =>{setOraciondata(response.data)})
}

useEffect(() => {
  setEmail(localStorage.getItem("Email"));
  setIdentificacion(localStorage.getItem("Identificacion"));
  setUsuario(localStorage.getItem("Usuario"))
  dispatchProgreso({type:"RESETEAR"});
  dataOracion(localStorage.getItem("Usuario"));
}, []);

const resultado1 = oraciondata && oraciondata.Juego1 && oraciondata.Juego1.Avance && oraciondata.Juego1.Avance.Juego6 && oraciondata.Juego1.Avance.Juego6.Resultado;
const isCorrect1 = resultado1 === "CORRECTO";
const resultado2 = oraciondata && oraciondata.Juego2 && oraciondata.Juego2.Avance && oraciondata.Juego2.Avance.Juego6 && oraciondata.Juego2.Avance.Juego6.Resultado;
const isCorrect2 = resultado2 === "CORRECTO";
const resultado3 = oraciondata && oraciondata.Juego3 && oraciondata.Juego3.Avance && oraciondata.Juego3.Avance.Juego6 && oraciondata.Juego3.Avance.Juego6.Resultado;
const isCorrect3 = resultado3 === "CORRECTO";
const resultado4 = oraciondata && oraciondata.Juego4 && oraciondata.Juego4.Avance && oraciondata.Juego4.Avance.Juego6 && oraciondata.Juego4.Avance.Juego6.Resultado;
const isCorrect4 = resultado4 === "CORRECTO";
const resultado5 = oraciondata && oraciondata.Juego5 && oraciondata.Juego5.Avance && oraciondata.Juego5.Avance.Juego6 && oraciondata.Juego5.Avance.Juego6.Resultado;
const isCorrect5 = resultado5 === "CORRECTO";
const resultado6 = oraciondata && oraciondata.Juego6 && oraciondata.Juego6.Avance && oraciondata.Juego6.Avance.Juego6 && oraciondata.Juego6.Avance.Juego6.Resultado;
const isCorrect6 = resultado6 === "CORRECTO";


  const Pantalla = () => {
    if (oraciondata === null) {
      return (<>Cargando...</>)
    } else {
      return (
        <Container className='fondoMC'>
        <Row className="justify-content-end" lg="12" md="12" sm="12" xs="12">
    <Col  className="mt-3" lg="12" md="12" sm="12" xs="12"  style={{  borderRadius:"10px", border:"#f6f6f6 solid", boxShadow: "10px 5px 5px #d7d7d7", height:"64px"}}> 
    <Row>
    <Col lg="1" sm="1" xs="1" md="1" >
    <NavLink to={"/MenuJuego"}>
    <img src={backbutton} width="14" className="mt-3 ms-4" alt="salida"/>
    </NavLink>
    </Col>
      <Col  lg="1"  sm="1" xs="1" md="1">
        <LogoBlipBlaPalabra style={{width:"8em"}} className="mt-1"/>
      </Col>
      <Col lg="10">
      <Row className="justify-content-end">
      <Col  lg="8"  sm="8"  xs="8" md="8" style={{ fontSize:"12px"}}>
      <div  className="float-end">
        <p className="text-end mt-1" style={{color:"#777777"}}><span>{`${Email}`}</span><br/><span> {`${usuario}`}</span> <br/><span>{`${Identificacion}`}</span></p>
        </div>
      </Col>
      <Col  lg="1"  sm="1" xs="1" md="1">
        <div className="mt-2 position-relative" style={{background:"#777777", width:"40px",borderRadius:"100px", height:"40px"}}>
        <div className="position-absolute bottom-0 end-0" style={{background:"#4BAD4B",width:"15px",borderRadius:"100px", height:"15px"}}></div>
        </div>
      </Col>
      <Col  lg="1"  sm="1" xs="1" md="1">
      <NavLink to={"/"}>
<img src={doorout} width="20" className="mt-3" alt="salida"/>
   </NavLink>
      </Col>
      </Row>
      </Col>
     </Row>
      </Col>
      {  /*---------------NOMBRE DE LA SECCION--------------*/ }
    <Col  sm="11" lg="11" md="11" xs="11" className="mt-3" style={{color:"#9696D3"}}>
    <h2 >Oracion</h2>
    </Col>
    </Row>
          <Row >
            <Row className="justify-content-evenly  mt-2 mx-2" >
            <Col lg="4" md="4" sm="10" xs="10">
              <Link to={`/OracionJuego/${1}`}> <RompecabaSolitaria  url={oraciondata.Juego1.Partida.Rompecabeza.FileColor} piezas={oraciondata.Juego1.Partida.Rompecabeza.Pieza} a={(oraciondata.Juego1.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(oraciondata.Juego1.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(oraciondata.Juego1.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(oraciondata.Juego1.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(oraciondata.Juego1.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(oraciondata.Juego1.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(oraciondata.Juego1.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(oraciondata.Juego1.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} i={(oraciondata.Juego1.Avance.Juego5.Resultado === "CORRECTO") && "hidden"} j={isCorrect1 && "hidden"} /></Link><p className='mt-1' style={{fontWeight:700}}><span style={{color:"#8B8B8C"}}>Piezas:</span> <span style={{color:"#62269E"}}>{`${0}`}</span></p> 
              </Col>
              <Col lg="4" md="4" sm="10" xs="10">
              <Link to={`/OracionJuego/${2}`}> <RompecabaSolitaria url={oraciondata.Juego2.Partida.Rompecabeza.FileColor} piezas={oraciondata.Juego2.Partida.Rompecabeza.Pieza} a={(oraciondata.Juego2.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(oraciondata.Juego2.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(oraciondata.Juego2.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(oraciondata.Juego2.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(oraciondata.Juego2.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(oraciondata.Juego2.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(oraciondata.Juego2.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(oraciondata.Juego2.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} i={(oraciondata.Juego2.Avance.Juego5.Resultado === "CORRECTO") && "hidden"} j={isCorrect2 && "hidden"} /></Link><p className='mt-1' style={{fontWeight:700}}><span style={{color:"#8B8B8C"}}>Piezas:</span> <span style={{color:"#62269E"}}>{`${0}`}</span></p>
              </Col>
              <Col lg="4" md="4" sm="10" xs="10">
              <Link to={`/OracionJuego/${3}`}>     <RompecabaSolitaria url={oraciondata.Juego3.Partida.Rompecabeza.FileColor} piezas={oraciondata.Juego3.Partida.Rompecabeza.Pieza} a={(oraciondata.Juego3.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(oraciondata.Juego3.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(oraciondata.Juego3.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(oraciondata.Juego3.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(oraciondata.Juego3.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(oraciondata.Juego3.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(oraciondata.Juego3.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(oraciondata.Juego3.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} i={(oraciondata.Juego3.Avance.Juego5.Resultado === "CORRECTO") && "hidden"} j={isCorrect3 && "hidden"} /></Link><p className='mt-1' style={{fontWeight:700}}><span style={{color:"#8B8B8C"}}>Piezas:</span> <span style={{color:"#62269E"}}>{`${0}`}</span></p> 
            </Col>
            </Row>
            <Row className=" justify-content-evenly mt-2 mx-2">
          <Col lg="4" md="4" sm="10" xs="10"> 
              <Link to={`/OracionJuego/${4}`}>    <RompecabaSolitaria url={oraciondata.Juego4.Partida.Rompecabeza.FileColor} piezas={oraciondata.Juego4.Partida.Rompecabeza.Pieza} a={(oraciondata.Juego4.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(oraciondata.Juego4.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(oraciondata.Juego4.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(oraciondata.Juego4.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(oraciondata.Juego4.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(oraciondata.Juego4.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(oraciondata.Juego4.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(oraciondata.Juego4.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} i={(oraciondata.Juego4.Avance.Juego5.Resultado === "CORRECTO") && "hidden"} j={isCorrect4 && "hidden"} /></Link><p className='mt-1' style={{fontWeight:700}}><span style={{color:"#8B8B8C"}}>Piezas:</span> <span style={{color:"#62269E"}}>{`${0}`}</span></p>
            </Col>
            <Col lg="4" md="4" sm="10" xs="10">
              <Link to={`/OracionJuego/${5}`}>   <RompecabaSolitaria url={oraciondata.Juego5.Partida.Rompecabeza.FileColor}  piezas={oraciondata.Juego5.Partida.Rompecabeza.Pieza} a={(oraciondata.Juego5.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(oraciondata.Juego5.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(oraciondata.Juego5.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(oraciondata.Juego5.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(oraciondata.Juego5.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(oraciondata.Juego5.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(oraciondata.Juego5.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(oraciondata.Juego5.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} i={(oraciondata.Juego5.Avance.Juego5.Resultado === "CORRECTO") && "hidden"} j={isCorrect5 && "hidden"} /></Link><p className='mt-1' style={{fontWeight:700}}><span style={{color:"#8B8B8C"}}>Piezas:</span> <span style={{color:"#62269E"}}>{`${0}`}</span></p>
              
            </Col>
            <Col lg="4" md="4" sm="10" xs="10">
              <Link to={`/OracionJuego/${6}`}>   <RompecabaSolitaria url={oraciondata.Juego6.Partida.Rompecabeza.FileColor} piezas={oraciondata.Juego6.Partida.Rompecabeza.Pieza} a={(oraciondata.Juego6.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(oraciondata.Juego6.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(oraciondata.Juego6.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(oraciondata.Juego6.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(oraciondata.Juego6.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(oraciondata.Juego6.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(oraciondata.Juego6.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(oraciondata.Juego6.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} i={(oraciondata.Juego6.Avance.Juego5.Resultado === "CORRECTO") && "hidden"} j={isCorrect6 && "hidden"} /></Link><p className='mt-1' style={{fontWeight:700}}><span style={{color:"#8B8B8C"}}>Piezas:</span> <span style={{color:"#62269E"}}>{`${0}`}</span></p>
            </Col>
            </Row>
          </Row>
        </Container>
      )
    }
  }
  return (
    <Pantalla />
  )
}

export default RompecabezaJO;