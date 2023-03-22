import React, { useContext, useEffect, useState } from "react"
import { Row, Col, Container } from "reactstrap"
import { NavLink, useNavigate } from "react-router-dom"
import doorout from "../../assets/img/AssetsGame/doorout.png"
import { JuecoContext } from "../../context/Juego/JuecoContext"
import LogoBlipBlaPalabra from "../../componentes/iconosCom/LogoBlipBlaPalabra"
import VocabularioIcon from "../../componentes/iconosCom/VocabularioIcon"
import OracionIcon from "../../componentes/iconosCom/OracionIcon"
import MultiJugadorIcon from "../../componentes/iconosCom/MultiJugadorIcon"
import TrofeoIcon from "../../componentes/iconosCom/TrofeoIcon"

const MenuJuego = () => {
  const { datoVocabulario, dispatchMutli} = useContext(JuecoContext);
  const [usuario, setUsuario] = useState("");
  const [Email, setEmail] = useState("");
  const [Identificacion, setIdentificacion] = useState(0);
  const navegar = useNavigate();
  useEffect (() => {
    if(localStorage.getItem("Email") === null&&localStorage.getItem("Identificacion") === null&&localStorage.getItem("Usuario") === null ){
         navegar("/");
       }
    setEmail(localStorage.getItem("Email"));
    setIdentificacion(localStorage.getItem("Identificacion"));
    setUsuario(localStorage.getItem("Usuario"))
    dispatchMutli({type:"RESETEAR"})
  }, [])
  
  return (
    
    <Container className="fondoImagen vh-100" fluid  >
    <Row className="mx-2 j">
    <Col className="mt-3" lg="12" md="12" sm="12" xs="12" style={{  borderRadius:"10px", border:"#f6f6f6 solid", boxShadow: "5px 5px #d7d7d7", height:"64px"}}> 
    <Row>
      <Col  lg="1" md="1" sm="1" xs="2">
        <LogoBlipBlaPalabra className="ms-3 mt-1" style={{width:"8em"}}/>
      </Col>
      <Col lg="11"  sm="11"  xs="9" md="11">
      <Row className="justify-content-end"  lg="10">
      <Col  lg="10" md="10" sm="10" xs="10" style={{ fontSize:"12px"}} className="float-end d-none d-sm-block">
        <p className="text-end mt-1" style={{color:"#777777"}}><span>{`${Email}`}</span><br/><span> {`${usuario}`}</span> <br/><span>{`${Identificacion}`}</span></p>
      </Col>
      <Col  lg="1" md="1" sm="1" xs="4">
        <div className="mt-2 position-relative" style={{background:"#777777", width:"40px",borderRadius:"100px", height:"40px"}}>
        <div className="position-absolute bottom-0 end-0" style={{background:"#4BAD4B",width:"15px",borderRadius:"100px", height:"15px"}}></div>
        </div>
      </Col>
      <Col  lg="1" md="1" sm="1" xs="2">
      <NavLink to={"/"}>
<img src={doorout} width="20" className="mt-3" alt="salida"/>
   </NavLink>
      </Col>
      </Row>
      </Col>
     </Row>
      </Col>
      {  /*---------------NOMBRE DE LA SECCION--------------*/ }
    <Col  sm="11" lg="11" md="11" xs="11" className="mt-3" style={{color:"#8B8B8C"}}>
    <h2 >Categoría</h2>
    </Col>
    </Row>
    {/*----------------------OPCIONES------------------------------- */}
   <Row className="">
    <Col lg="3" sm="12" className="offset-lg-3">
    <NavLink  to={'/RompecabezaJV'} onClick={()=>datoVocabulario(usuario)} style={{color:"#fff", textDecoration:"none", textAlign:"center"}}>
      <div className="position-relative  start-50  top-0  translate-middle-x OracionMenu " style={{width:250, height:197, background:"#BFBFD9", borderRadius:"10px", boxShadow: "5px 5px rgba(0, 0, 0, 0.13)"}}> <div className="py-5"><VocabularioIcon/><h4  className="">VOCABULARIO</h4></div></div>
        </NavLink>
      </Col>
      <Col lg="3"  sm="12" className="ms-3" >
      <NavLink  to={'/RompecabezaJO'} style={{color:"#fff", textDecoration:"none", textAlign:"center"}}>
        <div className="position-relative  start-50  translate-middle-x OracionMenu" style={{width:250, height:197,background:"#EDCD90", textDecoration:"none", borderRadius:"10px", boxShadow: "5px 5px rgba(0, 0, 0, 0.13)"}}> <div className="py-5"> <OracionIcon/><h4  className="">ORACION</h4> </div></div>
      </NavLink>
      </Col>
      </Row>
      <Row className="mt-4">
      <Col lg="3" sm="12" className="offset-lg-3" >
      <NavLink to={`/SeleccionDeEquipo`} style={{color:"#fff", textDecoration:"none", textAlign:"center"}} >
      <div className="position-relative  start-50 translate-middle-x OracionMenu" style={{width:250, height:197, background:"#C3D7CA", borderRadius:"10px", boxShadow: "5px 5px rgba(0, 0, 0, 0.13)"}}> <div className="py-5"><MultiJugadorIcon/> <h4>CARRERA</h4></div></div>
      </NavLink>
      </Col>
      <Col lg="3" sm="12" className="ms-3">
      <NavLink to={`/Trofeo/${2}`} style={{color:"#fff", textDecoration:"none", textAlign:"center"}} >
      <div className="position-relative  start-50 bottom-0 translate-middle-x OracionMenu" style={{width:250, height:197, background:"#E5BDB1", borderRadius:"10px", boxShadow: "5px 5px  rgba(0, 0, 0, 0.13)"}}><div className="py-5"><TrofeoIcon/> <h4  className="">TROFEO</h4></div></div>
      </NavLink>
      </Col>
       {/*--------------------FIN--------------------------------- */}
      </Row>
      
    </Container>

  )
}

export default MenuJuego