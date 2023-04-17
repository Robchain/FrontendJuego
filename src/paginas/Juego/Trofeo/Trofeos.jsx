import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import  Rompecabezas from '../../../assets/img/AssetsGame/puzzles.gif'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import { Link } from 'react-router-dom'
import { llamadaRompecabezaGet } from '../../../service/Juego/Vocabulario'
import { llamadaPartidaOracion } from '../../../service/Juego/Oracion'
export const Trofeos = () => {

  const { oraciondata,setOraciondata,dataJuegoInicialVocabulario,setDataJuegoInicialVocabulario } = useContext(JuecoContext);
  const [dataseleccionada, setDataseleccionada] = useState(null)
  const dataOracion = async (user)=>{
    try {
    const data = await llamadaPartidaOracion({Usuario:user});
    setOraciondata(data); 
    } catch (error) {
      setOraciondata([]);
    }
  }
  
  const [modal, setModal] = useState(false);
  const datoVocabulario = async (user) => {
    const data = await  llamadaRompecabezaGet({user});
    setDataJuegoInicialVocabulario(data);
   }
  const clickHandle = (event, condicional) => {
    if (condicional) {
      event.preventDefault();
      setModal(!modal);
    }
  }
  useEffect(() => {
    datoVocabulario(localStorage.getItem("Usuario"));
    dataOracion(localStorage.getItem("Usuario"));
  }, [])

  return (
    <Container className='a'>
    <NavBarJuego  Seccion={"Trofeo"} urlBack={"/MenuJuego"} />
    <Modalaqui  data={dataseleccionada}  modal={modal} setModal={setModal} />
<Row>
  <Col className='d-flex align-items-center'>
    <div><img src={Rompecabezas} alt='Rompecabezas' width={100} /></div>
    <div>
    <h3 style={{ fontWeight: 'bold', color: '#8B8B8C' }} >Rompecabezas terminadas</h3>
    </div></Col>
</Row>
<Row>
<h3 style={{ fontWeight: 'bold', color: '#8B8B8C' }} >Vocabularios</h3>
{
  dataJuegoInicialVocabulario !== null && (
  dataJuegoInicialVocabulario.filter((item) => item.Terminado === true).map(i=>(
 <Col lg="4" md="4" sm="10" xs="10" xl="4" xxl="4" >
        <div onClick={(e) => {setDataseleccionada(i); clickHandle(e, i.Terminado)} }>
          <img src={i.Rompecabeza.FileColor} alt={i.Rompecabeza.Nombre} id="imagenRompecabeza" style={{ borderRadius:10,boxShadow: " 5px 5px #d7d7d7"}}/>
          <span style={{ fontWeight: 'bold', color: '#8B8B8C' }}>{i.Rompecabeza.Nombre}</span>
        </div>
</Col>
  ))
  ) 
}
</Row>
<Row>
<h3 style={{ fontWeight: 'bold', color: '#8B8B8C' }} >Oraciones</h3>
{
  oraciondata !==null && (
  oraciondata.filter((item) => item.Terminado === true).map(i=>(
 <Col lg="4" md="4" sm="10" xs="10" xl="4" xxl="4" >
        <Link onClick={(e) => {setDataseleccionada(i); clickHandle(e, i.Terminado)} }>
          <img src={i.Rompecabeza.FileColor} alt={i.Rompecabeza.Nombre} id="imagenRompecabeza" style={{ borderRadius:10,boxShadow: " 5px 5px #d7d7d7"}}/>
          <span style={{ fontWeight: 'bold', color: '#8B8B8C' }}>{i.Rompecabeza.Nombre}</span>
        </Link>
</Col>
  ))
  )
}
</Row>
    </Container>
  )
}
const Modalaqui = ({ data , modal, setModal }) => {
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
        {
          data!==null &&  <img className='print cac' src={data.Rompecabeza.FileColor} alt={data.Rompecabeza.Nombre} style={{ borderRadius:10,boxShadow: "5px 5px 5px 5px #d7d7d7"}}  />
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