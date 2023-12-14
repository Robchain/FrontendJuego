import React, { useContext, useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { Col, Container, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { RompecabaSolitaria } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabaSolitaria'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { llamadaRompecabezaGet } from '../../../service/Juego/Vocabulario'
import { CrearJuegoVocabularioIndividual } from '../../../service/Adminstrador/Vocabulario'
import cargando from '../../../assets/img/AssetsGame/paperplane.gif'
import { Piezacalcular } from '../../../helpers/contador'
import { cantidadDePartidas } from '../../../helpers';
const RompecabezaJV = () => {
  const { dataJuegoInicialVocabulario, setavance, setpiezaAvanzadas,setIdRompecabeza, setDataJuegoInicialVocabulario,setdataJuegoVocabulario,setprevAvance, setPiezaJuegoIndi,setDataRompecabeza } = useContext(JuecoContext);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navegar = useNavigate();
  const datoVocabulario = async (id) => {
   const data = await  llamadaRompecabezaGet({id});
   setDataJuegoInicialVocabulario(data);
  }

  const [dataseleccionada, setDataseleccionada] = useState(null)

  useEffect(() => {
    setavance([]);
    datoVocabulario(localStorage.getItem("Id"));
  }, [])
  

  const clickHandle = async (event, condicional, pieza) => {
    if(condicional ===false){
    setLoading(true);
  const data = await CrearJuegoVocabularioIndividual({num:pieza})
  setdataJuegoVocabulario(data)
  setLoading(false);
  navegar(`/VocabularioJuego`);
}else if (condicional===true) {
      event.preventDefault();
      setModal(!modal);
    }
  }

  

  const Pantalla = () => {

    if (dataJuegoInicialVocabulario === null) {
      return (<div>Cargando...</div>)
    } else {
      return (
          <Container className='fondoMC'>
          <Modalaqui  data={dataseleccionada}  modal={modal} setModal={setModal} />
          {loading && (
      <div className="loading-overlay">
        <img src={cargando} alt='cargando'/>
      </div>
    )}
            <NavBarJuego  Seccion={"Vocabulario"} urlBack={"/MenuJuego"} />
              <div className="rompecabezas-grupo">
              {
                dataJuegoInicialVocabulario.map(i=>(
                  <div className='my-2'>
                  <div onClick={(e) => {setDataseleccionada(i); setprevAvance(i.Avance); setIdRompecabeza(i._id);setpiezaAvanzadas(Piezacalcular({objecto:i.Avance,piezatotales:i.Rompecabeza.Pieza })); setDataRompecabeza(i.Rompecabeza);setPiezaJuegoIndi( cantidadDePartidas({piezasfaltantes:Piezacalcular({objecto:i.Avance,piezatotales:i.Rompecabeza.Pieza }), piezasinicial:i.Rompecabeza.Pieza})); clickHandle(e, i.Terminado,i.Rompecabeza.Pieza)} }><RompecabaSolitaria terminado={i.Terminado} Avance={i.Avance}  piezas={i.Rompecabeza.Pieza} url={i.Rompecabeza.FileColor} alt={i.Rompecabeza.Nombre} /> </div> <p className='my-2' style={{fontWeight:700}}><span style={{color:"#8B8B8C"}}>{/*Piezas:*/}<IoExtensionPuzzleOutline /> </span> <span style={{color:"#62269E"}}>{`${Piezacalcular({objecto:i.Avance,piezatotales:i.Rompecabeza.Pieza })}/${i.Rompecabeza.Pieza}`}</span></p>
                </div>
                ))
              
              }
              </div>
          </Container>
      )
    }
  }

  return (
      <Pantalla />
  )
}
const Modalaqui = ({ data , modal, setModal }) => {
  const toggle = () => setModal(!modal)
  const impresion = (urlDelArchivo, nombreDelArchivo) => {
    const enlace = document.createElement('a');
    enlace.href = urlDelArchivo;
    enlace.download = nombreDelArchivo;
    enlace.style.display = 'none';
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);

    // document.querySelector(".print").classList.add("print-image");
    // document.querySelector(".bot").classList.add("desaparecer");
    // document.querySelector(".a").classList.add("desaparecer");
    // window.print();
    // document.querySelector(".print").classList.remove("print-image");
    // document.querySelector(".bot").classList.remove("desaparecer");
    // document.querySelector(".a").classList.remove("desaparecer");
  }
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered'  >
        <ModalHeader  style={{backgroundColor:"#E6DFF0",color:"#62269E"}}><span style={{fontWeight:"bold", textAlign:"center"}}>Rompecabeza Completado</span></ModalHeader>
        <ModalBody>
        {
          data!==null &&  <img className='print cac' src={data.Rompecabeza.FileColor} alt={data.Rompecabeza.Nombre} style={{ borderRadius:10,boxShadow: "5px 5px 5px 5px #d7d7d7", maxWidth:'450px'}}  />
        } 
        </ModalBody>
        <ModalFooter className='justify-content-center'>
        <Row className='justify-content-center'>
        <Col lg="6" md="6" sm="6" xs="6">
        <Button outline className='bot' onClick={toggle}  style={{borderRadius:"10px",color:"#62259E", borderColor:"#62259E"}}>
            Cancelar
          </Button>
          </Col>
          <Col lg="6" md="6" sm="6" xs="6" >
          <Button  className='bot' style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}} onClick={() => { impresion(data.Rompecabeza.FileBlanco,data.Rompecabeza.Nombre) }}>
            Descargar
          </Button>
          </Col>
          </Row>
        </ModalFooter>
      </Modal>
      </div>
  )
}
export default RompecabezaJV;


