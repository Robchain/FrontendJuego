import React, { useContext, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { Container, Row, Col } from 'reactstrap'
import Quien from '../../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../../assets/img/AssetsGame/ico_verbo.png";
import { DooroutButton } from '../../../componentes/JuegoComponent/JuegoGeneral/DooroutButton'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import Cantidad from '../../../assets/img/AssetsGame/ico_cantidad.png'
const OracionJ = () => {
  
  const [QueSelecion, setQueSelecion] = useState(0);
const [QuienSeleccion, setQuienSeleccion] = useState(0);
const [QueSeleccion, setQueSeleccion] = useState(0);
const [Pregu, setPregu] = useState(0);
const {oraciondata, dataOracion} = useContext(JuecoContext);
useEffect(() => {
  dataOracion(localStorage.getItem("Usuario"));
  randomBetween(1,2);
}, [])

function randomBetween(a, b) {
  setPregu(Math.floor(Math.random() * (b - a + 1) + a));
}


const VideosPreguntasQue = () => {
  let pregunta = "";
  if (oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.Respuesta === "CORRECTO") {
    pregunta = oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.FileVideoPreguntaQue
  } else if (oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.Respuesta === "CORRECTO") {
    pregunta = oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.FileVideoPreguntaQue
  } else if (oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.Respuesta === "CORRECTO") {
    pregunta = oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.FileVideoPreguntaQue
  }
  return (<div>
    {
      <ReactPlayer
        url={pregunta}
        width={300}
        playing
        loop={true}
         />
    } </div>)
}
const VideosPreguntasQuien = () => {
  let pregunta = "";
  if (oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.Respuesta === "CORRECTO") {
    pregunta = oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.FileVideoPreguntaQuien
  } else if (oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.Respuesta === "CORRECTO") {
    pregunta = oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.FileVideoPreguntaQuien
  } else if (oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.Respuesta === "CORRECTO") {
    pregunta = oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.FileVideoPreguntaQuien
  }
  return (<div>
    {
      <ReactPlayer
        url={pregunta}
        width={300}
        playing
          loop={true}
         />
    } </div>)
}
const VerboRespuesta = () =>{
  let verbo = "";
if (oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.Respuesta === "CORRECTO") {
  verbo= oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.Verbo
} else if (oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.Respuesta === "CORRECTO") {
  verbo = oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.Verbo
} else if (oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.Respuesta === "CORRECTO") {
  verbo = oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.Verbo
}

return (<h3>{verbo}</h3>)


}

const SeleccionQue = ()=>{
  if(QueSelecion === 1){return(<img src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.FileAdjetivoImagen} width="170"  alt='opcion1'/>)}
  if(QueSelecion === 2 ){return(<img src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.FileAdjetivoImagen} width="170" alt='opcion2'/>)}
  if(QueSelecion === 3){return(<img  src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.FileAdjetivoImagen} width="170" alt='opcion3'/>)}
  if(QueSelecion===0){return (<>nada</>)}
}
const SeleccionCantidad = ()=>{
  if(QueSeleccion === 1){return(<img  alt='opcion1'/>)}
  if(QueSeleccion === 2 ){return(<img  alt='opcion2'/>)}
  if(QueSeleccion === 3){return(<img  alt='opcion3'/>)}
  if(QueSeleccion===0){return (<>nada</>)}
}
const SeleccionQuien = ()=>{  
  if(QuienSeleccion === 1){return(<img  src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.FileSujetoImagen} width="170"  alt='opcion1'/>)}
  if(QuienSeleccion === 2 ){return(<img  src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.FileSujetoImagen} width="170"  alt='opcion2'/>)}
  if(QuienSeleccion === 3){return(<img  src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.FileSujetoImagen} width="170" alt='opcion3'/>)}
  if(QuienSeleccion===0){return (<>nada</>)}
}

  const Pantalla = () => {
    if (oraciondata === null) {
      return(
      <>Cargando...</>);
    } else {
      return (
        <div className='window'>
          <Container style={{ zIndex: 1, position: "fixed",  }} className="fluid">
            <Row className="d-flex justify-content-around">
              <Col className="d-flex justify-content-evenly" lg="12"  >
                <h1>Armar Oracion</h1>
              </Col>
              <Col className='mt-2' lg="4" sm="12" md="12" >
               {
                Pregu===1 && VideosPreguntasQue()
               }
               {
               Pregu===2 && VideosPreguntasQuien()
               }
              </Col>
              <Col lg="8">
                <Row lg="12" className='align-items-center'>
                  <div style={{ width: "95px", height:"120px"}}>
                    <img alt='sujeto' src={Quien} width="75" />
                  </div>
                  <div style={{ width: "175px",  marginLeft:"" }}  onClick={()=>{setQuienSeleccion(1)}}>
                    <img  src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.FileSujetoImagen} width="170" alt='opcion1' />
                  </div>
                  <div style={{ width: "175px",  }} onClick={()=>{setQuienSeleccion(2)}}>
                    <img  src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.FileSujetoImagen} width="170" alt='opcion2' />
                  </div>
                  <div style={{ width: "175px",  }} onClick={()=>{setQuienSeleccion(3)}}>
                  <img  src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.FileSujetoImagen} width="170" alt='opcion3' />
                  </div>
                </Row>
                {
                  oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.Adverbio
                   && (
                    <Row lg="12" className='align-items-center'>
                  <div style={{ width: "150px", height: "120px" }}>
                    <img alt='sujeto' src={Cantidad} width="100" />
                  </div>
                  <div style={{ width: "150px", height: "100px" }}  onClick={()=>{setQueSeleccion(1)}}>
                    <span>{oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.Adverbio}</span>
                  </div>
                  <div style={{ width: "150px", height: "100px" }} onClick={()=>{setQueSeleccion(2)}} >
                  <span>{oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.Adverbio}</span>
                  </div>
                  <div style={{ width: "150px", height: "100px" }} onClick={()=>{setQueSeleccion(3)}} >
                  <span>{oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.Adverbio}</span>
                  </div>
                </Row>)
                
                }
                <Row lg="12" className='align-items-center  '>
                  <div style={{ width: "95px" }}>
                    <img alt='que' src={Que} width="75" />  
                  </div>
                  <div style={{ width: "175px" }}  onClick={()=>{setQueSelecion(1)}}>
                    <img  src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.FileAdjetivoImagen} width="170"  alt='opcion1' />
                  </div>
                  <div style={{ width: "175px" }} onClick={()=>{setQueSelecion(2)}}>
                    <img src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.FileAdjetivoImagen} width="170" alt='opcion2' />
                  </div>
                  <div style={{ width: "175px"}} onClick={()=>{setQueSelecion(3)}}>
                    <img  src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.FileAdjetivoImagen} width="170" alt='opcion3' />
                  </div>
                </Row>
              </Col>
              <Col  lg="7">
              <Row lg="12" className='align-items-center'>
                  <div style={{ width: "95px" }} className="mx-auto">
                    <img alt='que' src={Quien} width="75" />
                  </div>
                  <div style={{ width: "95px" }}  className="mx-auto">
                    <img  src={Verbo} alt='opcion1' width="75" />
                  </div>
                  {  oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.Adverbio
                   &&
                  (
                  <div style={{ width: "95px" }}  className="mx-auto">
                    <img  src={Cantidad} alt='opcion1' width="75" />
                  </div>)
                  }
                  <div style={{ width: "95px" }}  className="mx-auto">
                  <img alt='que' src={Que}  width="75" />
                  </div>
                </Row>
                <Row lg="12" className='align-items-center'>
                  <div style={{ width: "95px" }} className='mx-auto'>
                    <SeleccionQuien/>
                  </div>
                  <div style={{ width: "95px" }}  className="mx-auto">
                   <VerboRespuesta/>
                  </div>
                  { 
                    oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.Adverbio
                     && (
                  <div style={{ width: "95px" }}  className="mx-auto">
                    <SeleccionCantidad/>
                  </div>
                  )
                  }
                  <div style={{ width: "95px" }}  className="mx-auto">
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