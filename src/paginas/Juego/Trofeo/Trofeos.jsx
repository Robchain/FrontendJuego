import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import  Rompecabezas from '../../../assets/img/AssetsGame/puzzles.gif'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import { Medallas, TrofeoVocabulario } from '../../../service/Juego/Vocabulario'
import { TrofeoOracion } from '../../../service/Juego/Oracion'
import  MedallaOro from '../../../assets/img/AssetsGame/medallaOro.png'
import  MedallaSilver from '../../../assets/img/AssetsGame/medallaSilver.png'
import  MedallaBronce from '../../../assets/img/AssetsGame/medallaBronce.png'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1 // optional, default to 1.
  },
  tabletuno: {
    breakpoint: { max: 1024, min: 800 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  tabletdos: {
    breakpoint: { max: 799, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};
export const Trofeos = () => {

  const { oraciondata,setOraciondata,dataJuegoInicialVocabulario,setDataJuegoInicialVocabulario } = useContext(JuecoContext);
  const [dataseleccionada, setDataseleccionada] = useState(null)
  const [medal, setMedal] = useState({
    ORO: 0,
    PLATA: 0,
    BRONCE: 0
  })
  const dataOracion = async (id)=>{
    try {
    const data = await TrofeoOracion({id:id});
    setOraciondata(data); 
    } catch (error) {
      setOraciondata([]);
    }
  }

  const medallas = async ()=>{
    let nombre = localStorage.getItem("Nombre");
    let apellido = localStorage.getItem("Apellido");
    let completo = `${nombre} ${apellido}`;
    let value = localStorage.getItem("Identificacion");

    const data = await Medallas({label: completo, value:value});
    setMedal(data)
  }

  useEffect(() => {
  
    medallas()
  }, [])
  
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
    <NavBarJuego  Seccion={"Trofeos"} urlBack={"/MenuJuego"} />
    <Modalaqui  data={dataseleccionada}  modal={modal} setModal={setModal} />
<Row>
  <Col className='d-flex align-items-center'>
    <div><img src={Rompecabezas} alt='Rompecabezas' width={75} /></div>
    <div>
    <h3 style={{ fontWeight: 'bold', color: '#8B8B8C' }} >Rompecabezas terminadas</h3>
    </div></Col>
</Row>
{ 
// seccion de Vocabulario
}
<Row className="justify-content-evenly  mt-2 mx-2">
<h3 style={{ fontWeight: 'bold', color: '#8B8B8C' }} >Vocabularios</h3>
{
  dataJuegoInicialVocabulario !== null ? (
  <Carousel 
  responsive={responsive}
  >
{
   dataJuegoInicialVocabulario.filter(i=>i.Terminado===true).map(i=>(
    <div>
           <div onClick={(e) => {setDataseleccionada(i); clickHandle(e, i.Terminado)} }>
             <img src={i.Rompecabeza.FileColor} alt={i.Rompecabeza.Nombre} id="imagenRompecabezaTrofeo" style={{ borderRadius:10,boxShadow: " 5px 5px #d7d7d7"}}/>
           </div>
   </div>
     ))
}
  </Carousel>
  ):<span>
  No hay rompecabeza ganados
</span>
}
</Row>
{ 
// seccion de oraciones 
}
<Row className="justify-content-evenly  mt-2 mx-2">
<h3 style={{ fontWeight: 'bold', color: '#8B8B8C' }} >Oraciones</h3>
{
  oraciondata !== null ? (
  <Carousel responsive={responsive}>
{
   oraciondata.filter(i=>i.Terminado===true).map(i=>(
    <div>
           <div onClick={(e) => {setDataseleccionada(i); clickHandle(e, i.Terminado)} }>
             <img src={i.Rompecabeza.FileColor} alt={i.Rompecabeza.Nombre} id="imagenRompecabezaTrofeo" style={{ borderRadius:10,boxShadow: " 5px 5px #d7d7d7"}}/>
           </div>
   </div>
     ))
}
  </Carousel>
  ):<span>
  No hay rompecabeza ganados
</span>
}
</Row>
<Row className="justify-content-evenly  mt-2 mx-2">
<h3 style={{ fontWeight: 'bold', color: '#8B8B8C' }} >Colaborativo</h3>
<div style={{display:'flex', justifyContent:'space-evenly', }}><div>
<img src={MedallaOro} width={'100px'} alt='medalla de oro'/> <span><strong>{medal.ORO}</strong></span>
</div>
<div>
<img src={MedallaSilver} width={'100px'} alt='medalla de plata'/> <span><strong>{medal.PLATA}</strong></span>
</div>
<div>
<img src={MedallaBronce} width={'100px'} alt='medalla de bronce'/> <span><strong>{medal.BRONCE}</strong></span>
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
  }
  const impresionblanco = (urlDelArchivo, nombreDelArchivo) => {
    const enlace = document.createElement('a');
    enlace.href = urlDelArchivo;
    enlace.download = nombreDelArchivo;
    enlace.style.display = 'none';
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
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
          <div className='Trofeo-modal-footer-opciones'>
          <Button outline className='bot' onClick={toggle}  style={{borderRadius:"10px",color:"#62259E", borderColor:"#62259E" }}>
            Cancelar
          </Button>
          &nbsp;
          &nbsp;
          <div>
          { data!=null && <a className='bot' style={{display:'block',textDecoration:'none', borderRadius:"10px", padding:'7px', backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}} href={data.Rompecabeza.FileColor} download={data.Rompecabeza.Nombre}>
          Descargar a color
          </a> }
          </div>
          &nbsp;&nbsp;
          <div>
          <Button  className='bot' style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}} onClick={() => { impresionblanco(data.Rompecabeza.FileBlanco,data.Rompecabeza.Nombre) }}>
            Descargar blanco
          </Button>
          </div>
          </div>
       
        </ModalFooter>
      </Modal>
      </div>
  )
}