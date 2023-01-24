import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { Container, Row, Col } from 'reactstrap'
import Quien from '../../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../../assets/img/AssetsGame/ico_verbo.png";
import { DooroutButton } from '../../../componentes/JuegoComponent/JuegoGeneral/DooroutButton'
const OracionJ = () => {
  const [QueSelecion, setQueSelecion] = useState(0);
const [QuienSeleccion, setQuienSeleccion] = useState(0);




const SeleccionQue = ()=>{
  
  if(QueSelecion === 1){return(<img  alt='opcion1'/>)}
  if(QueSelecion === 2 ){return(<img  alt='opcion2'/>)}
  if(QueSelecion === 3){return(<img  alt='opcion3'/>)}
  if(QueSelecion===0){return (<>nada</>)}
}
const SeleccionQuien = ()=>{
  
  if(QuienSeleccion === 1){return(<img  alt='opcion1'/>)}
  if(QuienSeleccion === 2 ){return(<img  alt='opcion2'/>)}
  if(QuienSeleccion === 3){return(<img  alt='opcion3'/>)}
  if(QuienSeleccion===0){return (<>nada</>)}

}

  const Pantalla = () => {
    if (false) {
    } else {
      return (
        <div className='window'>
          <Container style={{ zIndex: 1, position: "fixed" }}>
            <Row className="d-flex justify-content-around">
              <Col className="d-flex justify-content-evenly" lg="12" >
                <h1>Armar Oracion</h1>
              </Col>
              <Col className='mt-2' lg="6">
                <ReactPlayer
                  url={""}
                  playing
                  style={{ border: "solid" }}
                />
                <div style={{ width: 300, height: 180, borderRadius: 100 }} className='m-auto'>
                </div>
              </Col>
              <Col lg="6">
                <Row lg="12" className='align-items-center'>
                  <div style={{ width: "150px", height: "100px" }}>
                    <img alt='sujeto' src={Quien} width="100" />
                  </div>
                  <div style={{ width: "150px", height: "100px" }}  onClick={()=>{setQuienSeleccion(1)}}>
                    <img alt='opcion1' />
                  </div>
                  <div style={{ width: "150px", height: "100px" }} onClick={()=>{setQuienSeleccion(2)}} >
                    <img alt='opcion2' />
                  </div>
                  <div style={{ width: "150px", height: "100px" }} onClick={()=>{setQuienSeleccion(3)}}>
                  <img alt='opcion3' />
                  </div>
                </Row>
                <Row lg="12" className='align-items-center mt-5 '>
                  <div style={{ width: "150px", height: "100px" }}>
                    <img alt='que' src={Que} width="100" />
                  </div>
                  <div style={{ width: "150px", height: "100px" }}  onClick={()=>{setQueSelecion(1)}}>
                    <img alt='opcion1' />
                  </div>
                  <div style={{ width: "150px", height: "100px" }} onClick={()=>{setQueSelecion(2)}}>
                    <img alt='opcion2' />
                  </div>
                  <div style={{ width: "150px", height: "100px" }} onClick={()=>{setQueSelecion(3)}}>
                    <img alt='opcion3' />
                  </div>
                </Row>
                <Row lg="12" className='align-items-center mt-5'>
                  <div style={{ width: "150px", height: "100px" }} className="ms-5">
                    <img alt='que' src={Quien} width="100" />
                  </div>
                  <div style={{ width: "150px", height: "100px" }}  className="ms-5">
                    <img  src={Verbo} alt='opcion1' width="100" />
                  </div>
                  <div style={{ width: "150px", height: "100px" }}  className="ms-5">
                  <img alt='que' src={Que}  width="100" />
                  </div>
                </Row>
                <Row lg="12" className='align-items-center mt-5'>
                  <div style={{ width: "150px", height: "100px" }} className='me-5'>
                    <SeleccionQuien/>
                  </div>
                  <div style={{ width: "150px", height: "100px" }}  className="ms-5">
                    <h3 style={{color:"red"}}>COMER</h3>
                  </div>
                  <div style={{ width: "150px", height: "100px" }}  className="ms-5">
                    <SeleccionQue/>
                  </div>
                </Row>
              </Col>
              <Col lg="12" className="d-flex justify-content-end">
              <DooroutButton Urlsalida={"/RompecabezaJO"} />
              </Col>
            </Row>
          </Container>
        </div>
      )
    }

  }
  return (
    <Pantalla />
  )
}

export default OracionJ