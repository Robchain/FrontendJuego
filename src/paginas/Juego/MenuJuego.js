import React, { useContext, useEffect, useState } from "react"
import { Row, Col, Container } from "reactstrap"
import { NavLink } from "react-router-dom"
import { DooroutButton } from "../../componentes/JuegoComponent/JuegoGeneral/DooroutButton"
import { JuecoContext } from "../../context/Juego/JuecoContext"

const MenuJuego = () => {
  const {setUser} = useContext(JuecoContext);
  const [usuario, setUsuario] = useState("");
  const [Email, setEmail] = useState("");
  const [Identificacion, setIdentificacion] = useState(0);

  useEffect (() => {
    setUser(localStorage.getItem("Usuario"))
    setEmail(localStorage.getItem("Email"));
    setIdentificacion(localStorage.getItem("Identificacion"));
    setUsuario(localStorage.getItem("Usuario"))

  }, [])
  
  return (
    <div className="fondoMC vh-100">
    <Container>
    <Row>
    <Row>
      <Col className="align-self-center mt-2" lg="12" md="12">
      <div>
        <span><b>Email:</b> {`${Email}`}</span><br/>
        <span><b>Usuario:</b>  {`${usuario}`}</span><br/>
        <span><b>Identificacion:</b>  {`${Identificacion}`}</span><br/>
      </div>
      </Col>
    </Row>
    <Col>
    <NavLink  to={'/RompecabezaJV'}>
    
      <div className="position-relative  start-50  top-0  translate-middle-x OracionMenu" style={{width:300, height:197, background:"#DDD3DD"}}><h4  className="">VOCABULARIO</h4></div>
        </NavLink>
      </Col>
      <Col>
      <NavLink  to={'/RompecabezaJO'}> 
      <div className="position-relative  start-50  translate-middle-x OracionMenu" style={{width:300, height:197,background:"#DDD3DD", textDecoration:"none"}}><h4  className="">ORACION</h4></div>
      </NavLink>
      </Col>
      </Row>
      <Row>
      <Col>
      <div className="position-relative  start-50 translate-middle-x OracionMenu" style={{width:300, height:197, background:"#daf7f5"}}><h4>CARRERA</h4></div>
      </Col>
      <Col>
      <div className="position-relative  start-50 bottom-0 translate-middle-x OracionMenu" style={{width:300, height:197, background:"#daf7f5"}}><h4  className="">TROFEO</h4></div>
      </Col>
      <Col  lg='12' className="">
      <DooroutButton  Urlsalida={"/"}/>
      </Col>
      </Row>
    </Container>
    </div>
  )
}

export default MenuJuego