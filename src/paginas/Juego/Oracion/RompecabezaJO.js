import React, { useContext, useEffect,  useState } from 'react'
import axios from "axios";
import { Link} from 'react-router-dom'
import { Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import {JuecoContext} from "../../../context/Juego/JuecoContext"
import { RompecabaSolitaria } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabaSolitaria'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego';
const RompecabezaJO = () => {
const [modal, setModal] = useState(false)
const {oraciondata, setOraciondata, dispatchProgreso} = useContext(JuecoContext);

const dataOracion = (user)=>{
  axios.post("http://localhost:3002/api/auth/llamadaPartidaOracion",{Usuario:user}).then(response =>{setOraciondata(response.data)})
}
const clickHandle = (event, condicional) => {
    if (condicional) {
      event.preventDefault();
      setModal(!modal);
    }
  }
useEffect(() => {
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
        <Container className='fondoMC a'>
        <Modalaqui descripcion={oraciondata.Juego1.Partida.Rompecabeza.Nombre} modal={modal} setModal={setModal} url={oraciondata.Juego1.Partida.Rompecabeza.FileColor}/>
         <NavBarJuego Seccion={"Oracion"} urlBack={"/MenuJuego"} />
          <Row >
            <Row className="justify-content-evenly  mt-2 mx-2" >
            <Col lg="4" md="4" sm="10" xs="10">
              <Link to={`/OracionJuego/${1}`} onClick={(e) => clickHandle(e, oraciondata.Juego1.Avance.Terminado)} > <RompecabaSolitaria  url={oraciondata.Juego1.Partida.Rompecabeza.FileColor} piezas={oraciondata.Juego1.Partida.Rompecabeza.Pieza} a={(oraciondata.Juego1.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(oraciondata.Juego1.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(oraciondata.Juego1.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(oraciondata.Juego1.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(oraciondata.Juego1.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(oraciondata.Juego1.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(oraciondata.Juego1.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(oraciondata.Juego1.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} i={(oraciondata.Juego1.Avance.Juego5.Resultado === "CORRECTO") && "hidden"} j={isCorrect1 && "hidden"} /></Link><p className='mt-2' style={{fontWeight:700}}><span style={{color:"#8B8B8C"}}>Piezas:</span> <span style={{color:"#62269E"}}>{`${0}/${oraciondata.Juego1.Partida.Rompecabeza.Pieza}`}</span></p> 
              </Col>
              <Col lg="4" md="4" sm="10" xs="10">
              <Link to={`/OracionJuego/${2}`} onClick={(e) => clickHandle(e, oraciondata.Juego2.Avance.Terminado)}> <RompecabaSolitaria url={oraciondata.Juego2.Partida.Rompecabeza.FileColor} piezas={oraciondata.Juego2.Partida.Rompecabeza.Pieza} a={(oraciondata.Juego2.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(oraciondata.Juego2.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(oraciondata.Juego2.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(oraciondata.Juego2.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(oraciondata.Juego2.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(oraciondata.Juego2.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(oraciondata.Juego2.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(oraciondata.Juego2.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} i={(oraciondata.Juego2.Avance.Juego5.Resultado === "CORRECTO") && "hidden"} j={isCorrect2 && "hidden"} /></Link><p className='mt-2' style={{fontWeight:700}}><span style={{color:"#8B8B8C"}}>Piezas:</span> <span style={{color:"#62269E"}}>{`${0}/${oraciondata.Juego2.Partida.Rompecabeza.Pieza}`}</span></p>
              </Col>
              <Col lg="4" md="4" sm="10" xs="10">
              <Link  to={`/OracionJuego/${3}`} onClick={(e) => clickHandle(e, oraciondata.Juego3.Avance.Terminado)} >     <RompecabaSolitaria url={oraciondata.Juego3.Partida.Rompecabeza.FileColor} piezas={oraciondata.Juego3.Partida.Rompecabeza.Pieza} a={(oraciondata.Juego3.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(oraciondata.Juego3.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(oraciondata.Juego3.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(oraciondata.Juego3.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(oraciondata.Juego3.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(oraciondata.Juego3.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(oraciondata.Juego3.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(oraciondata.Juego3.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} i={(oraciondata.Juego3.Avance.Juego5.Resultado === "CORRECTO") && "hidden"} j={isCorrect3 && "hidden"} /></Link><p className='mt-2' style={{fontWeight:700}}><span style={{color:"#8B8B8C"}}>Piezas:</span> <span style={{color:"#62269E"}}>{`${0}/${oraciondata.Juego3.Partida.Rompecabeza.Pieza}`}</span></p> 
            </Col>
            </Row>
            <Row className=" justify-content-evenly mt-2 mx-2">
          <Col lg="4" md="4" sm="10" xs="10"> 
              <Link to={`/OracionJuego/${4}`} onClick={(e) => clickHandle(e, oraciondata.Juego4.Avance.Terminado)}>    <RompecabaSolitaria url={oraciondata.Juego4.Partida.Rompecabeza.FileColor} piezas={oraciondata.Juego4.Partida.Rompecabeza.Pieza} a={(oraciondata.Juego4.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(oraciondata.Juego4.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(oraciondata.Juego4.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(oraciondata.Juego4.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(oraciondata.Juego4.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(oraciondata.Juego4.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(oraciondata.Juego4.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(oraciondata.Juego4.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} i={(oraciondata.Juego4.Avance.Juego5.Resultado === "CORRECTO") && "hidden"} j={isCorrect4 && "hidden"} /></Link><p className='mt-2' style={{fontWeight:700}}><span style={{color:"#8B8B8C"}}>Piezas:</span> <span style={{color:"#62269E"}}>{`${0}/${oraciondata.Juego4.Partida.Rompecabeza.Pieza}`}</span></p>
            </Col>
            <Col lg="4" md="4" sm="10" xs="10">
              <Link to={`/OracionJuego/${5}`} onClick={(e) => clickHandle(e, oraciondata.Juego5.Avance.Terminado)}>   <RompecabaSolitaria url={oraciondata.Juego5.Partida.Rompecabeza.FileColor}  piezas={oraciondata.Juego5.Partida.Rompecabeza.Pieza} a={(oraciondata.Juego5.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(oraciondata.Juego5.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(oraciondata.Juego5.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(oraciondata.Juego5.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(oraciondata.Juego5.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(oraciondata.Juego5.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(oraciondata.Juego5.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(oraciondata.Juego5.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} i={(oraciondata.Juego5.Avance.Juego5.Resultado === "CORRECTO") && "hidden"} j={isCorrect5 && "hidden"} /></Link><p className='mt-2' style={{fontWeight:700}}><span style={{color:"#8B8B8C"}}>Piezas:</span> <span style={{color:"#62269E"}}>{`${0}/${oraciondata.Juego5.Partida.Rompecabeza.Pieza}`}</span></p>
            </Col>
            <Col lg="4" md="4" sm="10" xs="10">
              <Link to={`/OracionJuego/${6}`} onClick={(e) => clickHandle(e, oraciondata.Juego6.Avance.Terminado)}>   <RompecabaSolitaria url={oraciondata.Juego6.Partida.Rompecabeza.FileColor} piezas={oraciondata.Juego6.Partida.Rompecabeza.Pieza} a={(oraciondata.Juego6.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(oraciondata.Juego6.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(oraciondata.Juego6.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(oraciondata.Juego6.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(oraciondata.Juego6.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(oraciondata.Juego6.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(oraciondata.Juego6.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(oraciondata.Juego6.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} i={(oraciondata.Juego6.Avance.Juego5.Resultado === "CORRECTO") && "hidden"} j={isCorrect6 && "hidden"} /></Link><p className='mt-2' style={{fontWeight:700}}><span style={{color:"#8B8B8C"}}>Piezas:</span> <span style={{color:"#62269E"}}>{`${0}/${oraciondata.Juego6.Partida.Rompecabeza.Pieza}`}</span></p>
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
const Modalaqui = ({ url, descripcion, modal, setModal }) => {
  const toggle = () => setModal(!modal)
  const impresion = () => {
    document.querySelector(".print").classList.add("print-image");
    document.querySelector(".bot").classList.add("desaparecer");
    document.querySelector(".a").classList.add("desaparecer");
    window.print();
    document.querySelector(".print").classList.remove("print-image");
    document.querySelector(".bot").classList.remove("desaparecer");
    document.querySelector(".a").classList.remove("desaparecer");
  }
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} backdrop={false} style={{textAlign:"center"}}  >
        <ModalHeader  style={{backgroundColor:"#E6DFF0",color:"#62269E"}}><span style={{fontWeight:"bold", textAlign:"center"}}>Rompecabeza Completado</span></ModalHeader>
        <ModalBody>
          <img className='print cac' src={url} alt={descripcion} style={{ borderRadius:10,boxShadow: "5px 5px 5px 5px #d7d7d7"}}  />
        </ModalBody>
        <ModalFooter className='justify-content-center'>
        <Row className='justify-content-center'>
        <Col lg="6" md="6" sm="6" xs="6">
        <Button outline className='bot' onClick={toggle}  style={{borderRadius:"10px",color:"#62259E", borderColor:"#62259E"}}>
            Cancelar
          </Button>
          </Col>
          <Col lg="6" md="6" sm="6" xs="6" >
          <Button  className='bot' style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}} onClick={() => { impresion() }}>
            Imprimir
          </Button>
          </Col>
          </Row>
        </ModalFooter>
      </Modal>
      </div>
  )
}
export default RompecabezaJO;