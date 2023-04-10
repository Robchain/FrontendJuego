import React, { useContext, useEffect,  useState } from 'react'
import { Link} from 'react-router-dom'
import { Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import {JuecoContext} from "../../../context/Juego/JuecoContext"
import { RompecabaSolitaria } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabaSolitaria'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego';
import { llamadaPartidaOracion } from '../../../service/Juego/Oracion';
import { contador, parte6 } from '../../../helpers/contador';
const RompecabezaJO = () => {
const [modal, setModal] = useState(false)
const {oraciondata, setOraciondata, dispatchProgreso,setDataOracionJuego} = useContext(JuecoContext);
const [dataSelecionada, setDataSelecionada] = useState(null)
const dataOracion = async (user)=>{
  try {
  const data = await llamadaPartidaOracion({Usuario:user});
  setOraciondata(data); 
  } catch (error) {
    setOraciondata([]);
  }
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





  const Pantalla = () => {
    if (oraciondata === null) {
      return (<>Cargando...</>)
    } else {
      return (
        <Container className='fondoMC a'>
        <Modalaqui  data={dataSelecionada} modal={modal} setModal={setModal} />
         <NavBarJuego Seccion={"Oracion"} urlBack={"/MenuJuego"} />
            <Row className="justify-content-evenly  mt-2 mx-2" >
            {oraciondata.map(i=>(
              <Col lg="4" md="4" sm="10" xs="10">
              <Link to={`/OracionJuego`} onClick={(e) =>{ setDataOracionJuego(i);setDataSelecionada(i);clickHandle(e, i.Avance.Terminado)}} > <RompecabaSolitaria  url={i.Partida.Rompecabeza.FileColor} piezas={i.Partida.Rompecabeza.Pieza} a={(i.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(i.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(i.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(i.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(i.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(i.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(i.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(i.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} i={(i.Avance.Juego5.Resultado === "CORRECTO") && "hidden"} j={parte6(i) && "hidden"} /></Link><p className='mt-2' style={{fontWeight:700}}><span style={{color:"#8B8B8C"}}>Piezas:</span> <span style={{color:"#62269E"}}>{`${contador(i.Avance,i.Partida.Rompecabeza.Pieza)}/${i.Partida.Rompecabeza.Pieza}`}</span></p> 
              </Col>
            ))}
            </Row>
        </Container>
      )
    }
  }
  return (
    <Pantalla />
  )
}
const Modalaqui = ({ data, modal, setModal }) => {
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
        <Row>
        <Col>
        {data !== null &&  <img className='print cac' src={data.Partida.Rompecabeza.FileColor} alt={data.Partida.Rompecabeza.Nombre} style={{ borderRadius:10,boxShadow: "5px 5px 5px 5px #d7d7d7"}}  /> }
          </Col>
          </Row>
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