import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import LogoBlipBlaPalabra from '../../iconosCom/LogoBlipBlaPalabra'
import doorout from "../../../assets/img/AssetsGame/doorout.png"
import backbutton from "../../../assets/img/AssetsGame/backbotton.png"
export const NavBarJuego = ({ urlBack,Seccion }) => {
  const [Email, setEmail] = useState("");
const [usuario, setUsuario] = useState("")
const navegar = useNavigate();
const [Identificacion, setIdentificacion] = useState("")
  useEffect(() => { 
    if(localStorage.getItem("Email") === null&&localStorage.getItem("Identificacion") === null&&localStorage.getItem("Usuario") === null ){
      navegar("/");
    }
    setEmail(localStorage.getItem("Email"));
    setIdentificacion(localStorage.getItem("Identificacion"));
    setUsuario(localStorage.getItem("Usuario"))
  }, [])
  return (
    <Row className="justify-content-end" lg="12" md="12" sm="12" xs="12">
    <Col  className="mt-3" lg="12" md="12" sm="12" xs="12"  style={{  borderRadius:"10px", border:"#f6f6f6 solid", boxShadow: "5px 5px #d7d7d7", height:"64px"}}> 
    <Row>
    <Col lg="1" sm="1" xs="2" md="1">
    <NavLink to={urlBack}>
    <img src={backbutton} width="14" className="mt-3 ms-4" alt="salida"/>
    </NavLink>
    </Col>
      <Col  lg="1"  sm="1" xs="2" md="1">
        <LogoBlipBlaPalabra style={{width:"8em"}} className="mt-1"/>
      </Col>
      <Col lg="10"  sm="10"  xs="8" md="10">
      <Row className='justify-content-end' lg="10">
      <Col  lg="8"  sm="7"  xs="8" md="8" style={{ fontSize:"12px"}} className="float-end d-none d-sm-block">
        <p className="text-end mt-1" style={{color:"#777777"}}><span>{`${Email}`}</span><br/><span> {`${usuario}`}</span> <br/><span>{`${Identificacion}`}</span></p>
      </Col>
      <Col  lg="1"  sm="2" xs="2" md="1">
        <div className="mt-2 position-relative" style={{background:"#777777", width:"40px",borderRadius:"100px", height:"40px"}}>
        <div className="position-absolute bottom-0 end-0" style={{background:"#4BAD4B",width:"15px",borderRadius:"100px", height:"15px"}}></div>
        </div>
      </Col>
      <Col  lg="1"  sm="1" xs="2" md="2">
      <NavLink to={"/"}>
<img src={doorout} width="20" className="mt-3" alt="salida"/>
   </NavLink>
      </Col>
      </Row>
      </Col>
     </Row>
      </Col>
      {/*---------------NOMBRE DE LA SECCION--------------*/}
      {Seccion.length >2 &&(
    <Col  sm="11" lg="11" md="11" xs="11" className="mt-3" style={{color:"#9696D3"}}>
    <h2 >{Seccion}</h2>
    </Col>)}
    </Row>
  )
}
