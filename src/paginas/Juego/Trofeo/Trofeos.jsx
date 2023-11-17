import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import  Rompecabezas from '../../../assets/img/AssetsGame/puzzles.gif'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import { TrofeoVocabulario } from '../../../service/Juego/Vocabulario'
import { TrofeoOracion } from '../../../service/Juego/Oracion'
import  MedallaOro from '../../../assets/img/AssetsGame/medallaOro.png'
import  MedallaSilver from '../../../assets/img/AssetsGame/medallaSilver.png'
import  MedallaBronce from '../../../assets/img/AssetsGame/medallaBronce.png'
export const Trofeos = () => {

  const { oraciondata,setOraciondata,dataJuegoInicialVocabulario,setDataJuegoInicialVocabulario } = useContext(JuecoContext);
  const [dataseleccionada, setDataseleccionada] = useState(null)
  const dataOracion = async (id)=>{
    try {
    const data = await TrofeoOracion({id:id});
    setOraciondata(data); 
    } catch (error) {
      setOraciondata([]);
    }
  }
  
  const [modal, setModal] = useState(false);
  const datoVocabulario = async (id) => {
    const data = await  TrofeoVocabulario({id:id});
    setDataJuegoInicialVocabulario(data);
   }
  const clickHandle = (event, condicional) => {
    if (condicional) {
      event.preventDefault();
      setModal(!modal);
    }
  }

  useEffect(() => {
    datoVocabulario(localStorage.getItem("Id"));
    dataOracion(localStorage.getItem("Id"));
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
<Row className="justify-content-evenly  mt-2 mx-2">
<h3 style={{ fontWeight: 'bold', color: '#8B8B8C' }} >Vocabularios</h3>
{
  dataJuegoInicialVocabulario !== null ? (
  dataJuegoInicialVocabulario.map(i=>(
 <Col lg="4" md="4" sm="10" xs="10" xl="4" xxl="4"  className='my-2'>
        <div onClick={(e) => {setDataseleccionada(i); clickHandle(e, i.Terminado)} }>
          <img src={i.Rompecabeza.FileColor} alt={i.Rompecabeza.Nombre} id="imagenRompecabeza" style={{ borderRadius:10,boxShadow: " 5px 5px #d7d7d7"}}/>
        </div>
</Col>
  ))
  ):<span>
  No hay rompecabeza ganados
</span>
}
</Row>
<Row className="justify-content-evenly  mt-2 mx-2">
<h3 style={{ fontWeight: 'bold', color: '#8B8B8C' }} >Oraciones</h3>
{
  oraciondata !==null ? (
  oraciondata.map(i=>(
 <Col lg="4" md="4" sm="10" xs="10" xl="4" xxl="4" className='my-2' >
        <div onClick={(e) => {setDataseleccionada(i); clickHandle(e, i.Terminado)} }>
          <img src={i.Rompecabeza.FileColor} alt={i.Rompecabeza.Nombre} id="imagenRompecabeza" style={{ borderRadius:10,boxShadow: " 5px 5px #d7d7d7"}}/>
        </div>
</Col>
  ))
  ):<span>
    No hay rompecabeza ganados
  </span>
}
</Row>
<Row className="justify-content-evenly  mt-2 mx-2">
<h3 style={{ fontWeight: 'bold', color: '#8B8B8C' }} >Colaborativo</h3>
<div style={{display:'flex', justifyContent:'space-evenly', }}><div>
<img src={MedallaOro} width={'100px'} alt='medalla de oro'/> <span><strong>0</strong></span>
</div>
<div>
<img src={MedallaSilver} width={'100px'} alt='medalla de plata'/> <span><strong>0</strong></span>
</div>
<div>
<img src={MedallaBronce} width={'100px'} alt='medalla de bronce'/> <span><strong>0</strong></span>
</div></div>
</Row>
    </Container>
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
        <Row className='justify-content-center '>
        <Col lg="6" md="6" sm="6" xs="6">
        <Button outline className='bot' onClick={toggle}  style={{borderRadius:"10px",color:"#62259E", borderColor:"#62259E" }}>
            Cancelar
          </Button>
          </Col>
          <Col lg="6" md="6" sm="6" xs="6" >
          {/* <Button  className='bot' style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}} onClick={() => { impresion(data.Rompecabeza.FileColor,data.Rompecabeza.Nombre) }}>
          Descargar
          </Button> */}
          { data!=null && <a className='bot' style={{display:'block',textDecoration:'none', borderRadius:"10px", padding:'9px', backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}} href={data.Rompecabeza.FileColor} download={data.Rompecabeza.Nombre}>
          Descargar
          </a> }
          </Col>
          </Row>
        </ModalFooter>
      </Modal>
      </div>
  )
}