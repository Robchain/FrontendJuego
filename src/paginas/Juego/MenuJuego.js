import React from "react"
import { Row, Col, Container } from "reactstrap"
import { NavLink } from "react-router-dom"
import Vocabulario from  "../../assets/img/AssetsGame/Vocabulario.png"//'../../assets/images/AssetsGame/Vocabulario.png'
import Carrera from '../../assets/img/AssetsGame/Carrera.png'
import Oracion from '../../assets/img/AssetsGame/Oraciones.png'
import trofeo from '../../assets/img/AssetsGame/Trofeo.png'
import { DooroutButton } from "../../componentes/JuegoComponent/JuegoGeneral/DooroutButton"

const MenuJuego = () => {
  return (
    <div className="fondoMC vh-100">
    <Container>
    <Row>
    <Row>
      <Col className="align-self-center mt-2" lg="12" md="12">
      <div>
        <span>Email</span><br/>
        <span>Usuario</span><br/>
        <span>Identificacion</span><br/>
      </div>
      </Col>
    </Row>
    <Col>
    <NavLink  to={'/RompecabezaJV'}> <input  className="position-relative  start-50  top-0  translate-middle-x" type="image" src={Vocabulario} width='350' alt="Menu Vocabulario" ></input></NavLink>
      </Col>
      <Col>
      <NavLink  to={'/RompecabezaJO'}>  <input alt="Menu Oracion" className="position-relative  start-50  translate-middle-x" type="image" src={Oracion} width='350'></input> </NavLink>
      </Col>
      </Row>
      <Row>
      <Col>
      <input alt="Menu Carrera"  className=" position-relative  start-50 translate-middle-x" type="image" src={Carrera} width='350'></input>
      </Col>
      <Col>
      <input alt="Menu Premio"   className="position-relative  start-50 bottom-0 translate-middle-x" type="image" src={trofeo} width='350'></input>
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