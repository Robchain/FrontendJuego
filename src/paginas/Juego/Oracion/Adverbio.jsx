import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { JuecoContext } from '../../../context/Juego/JuecoContext';
import buentrajo from '../../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../../assets/img/AssetsGame/Bad Jood.png'
import Quien from '../../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../../assets/img/AssetsGame/ico_verbo.png";
import Cantidad from '../../../assets/img/AssetsGame/ico_cantidad.png'
import ReactPlayer from 'react-player';
const RespuestaImagen =({oraciondata, id, window, Queselec, setMomento})=>{
  const [opcionRes, setopcionRes] = useState("Nada");
  let  AdjectivoRespuesta = "";
 let base = "Nada";
 if(Queselec.length >2){
  if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
    AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio;
  } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
    AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio;
  } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
    AdjectivoRespuesta = oraciondata.Juego1.Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio;
  }
  useEffect(() => {
      if(AdjectivoRespuesta === Queselec) {
        base ="Correcto"
      }else if(AdjectivoRespuesta !== Queselec){
        base = "Incorrecto"
      }
    setopcionRes(base);
  }, [Queselec])
  if(opcionRes === "Correcto"){
    setMomento("Respuesta");
    return(<><img src={buentrajo} width="100"/></>);
  }
  if(opcionRes ===  "Incorrecto"){
    setMomento("Respuesta");
    return(<><img src={malTrabajo} width="100"/></>);
  }
}
}
const Preguntasecction = ({id, window}) => {
  const { oraciondata } = useContext(JuecoContext);
  const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    setVideoseleccionado(preguntavideo);
  }, [])
  const preguntavideo =()=>{
    let selec = ""
    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileVideoPreguntaQue
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileVideoPreguntaQue
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileVideoPreguntaQue
    }

  }
  
  return (
    <div>
      <ReactPlayer
        url={videoseleccionado}
        width={300}
        playing
        loop={true}
      />
    </div>
  )
};
const Respuestasecction = ({id, window}) => {
  const { oraciondata } = useContext(JuecoContext);
  const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    setVideoseleccionado(preguntavideo);
  }, [])
  
   const preguntavideo = ()=>{
    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileVideoMuestra
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileVideoMuestra
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileVideoMuestra
    }
  }
  
  return (
    <div>
      <ReactPlayer
        url={videoseleccionado}
        width={300}
        playing
      />
    </div>
  )
};
const isAdverbio = (id, window, oraciondata) => {
  if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio || oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio) {
    return true;
  } else {
    return false;
  }
}
const VerVerboRespuesta = ({oraciondata,window, id })=>{
  let verbo = "";
  if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
    verbo = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Verbo
  } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
    verbo = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Verbo
  } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
    verbo = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Verbo
  }
  return (<h3>{verbo}</h3>)
 }
const VerSeleccionQuien = ({oraciondata,window, id })=>{
  let verbo = "";
  useEffect(() => {
    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      verbo = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      verbo = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      verbo = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen
    }
  }, [])
  return (<img src={verbo} width="170" alt='opcion1' />)
     }
const Adverbio = ({id, window, siguiente, progreso, dispatchProgreso }) => {
  const [momento, setMomento] = useState("inicial");
  const { oraciondata } = useContext(JuecoContext);
  const [Queselec, setQueselec] = useState("");
  const [QueSelecion, setQueSelecion] = useState(0);
  const [pointerEvent, setPointer] = useState("auto")
  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(1);
  const [opacity3, setOpacity3] = useState(1);    
  const onhandleClickQuePrimero = ()=>{
    setQueSelecion(1);
    setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio);
    setPointer("none")
    setOpacity2(0.4);
    setOpacity3(0.4);
    dispatchProgreso({type:"PROGRESO", selecionado:oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Oracion,Resul:oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta})
    setTimeout(() => { siguiente(window.id) }, 9000)
  }

  
  const onhandleClickQueSegundo =()=>{
    setQueSelecion(2);
    setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio);
    setPointer("none")
    setOpacity3(0.4);
    setOpacity1(0.4);
    dispatchProgreso({type:"PROGRESO", selecionado:oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Oracion,Resul:oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta})
    setTimeout(() => { siguiente(window.id) }, 9000)
  }
  const onhandleClickQueTercero = ()=>{
    setQueSelecion(3);
    setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio);
    setPointer("none")
    setOpacity1(0.4);
    setOpacity2(0.4);
    dispatchProgreso({type:"PROGRESO", selecionado:oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Oracion,Resul:oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta})
    setTimeout(() => { siguiente(window.id) }, 9000)
  }
  

  const SeleccionAdverbio = () => {
      if (QueSelecion === 1) { return (<h3>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio}</h3>) }
      if (QueSelecion === 2) { return (<h3>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio}</h3>) }
      if (QueSelecion === 3) { return (<h3>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio}</h3>) }
      if (QueSelecion === 0) { return (<></>) }
  }

   
   const MostrarQue  = ()=>{
    let verbo = "";
    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      verbo = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      verbo =oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      verbo = oraciondata.Juego1.Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen
    }
    return (<img src={verbo} width="170" alt='opcion que' />)
       }
       
  return (
    <>
      <Col className='mt-2' lg="4" sm="12" md="12" >
      {
      momento === "inicial" && <Preguntasecction id={id} window={window}/>
      }
      {
      momento ==="Respuesta" && <Respuestasecction id={id} window={window} />
      }
              </Col>
              <Col  lg="8">

              <Row lg="12" className='align-items-center'>
                  <Col  className="align-self-center" style={{ width: "95px" }}>
                    <img alt='que' src={Cantidad} width="75" />
                  </Col>
                  <Col className="align-self-center" style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity1 }}  onClick={onhandleClickQuePrimero}>
                    <h3>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio}</h3>
                  </Col>
                  <Col className="align-self-center" style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity2 }} onClick={onhandleClickQueSegundo}>
                  <h3>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio}</h3>
                  </Col>
                  <Col className="align-self-center" style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity3 }} onClick={onhandleClickQueTercero}>
                  <h3>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio}</h3>
                  </Col>
                </Row>
              </Col>
              <Col lg="8">
              <Row lg="8" className='align-items-center'>
                  <div style={{ width: "95px" }} className="mx-auto">
                    <img alt='que' src={Quien} width="75" />
                  </div>
                  <div style={{ width: "95px" }} className="mx-auto">
                    <img src={Verbo} alt='opcion1' width="75" />
                  </div>
                  {oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio
                    &&
                    (
                      <div style={{ width: "95px" }} className="mx-auto">
                        <img src={Cantidad} alt='opcion1' width="75" />
                      </div>)
                  }
                  <div style={{ width: "95px" }} className="mx-auto">
                    <img alt='que' src={Que} width="75" />
                  </div>
                </Row>
                <Row lg="8" className='align-items-center'>
                 
                 <div style={{ width: "95px" }} className='mx-auto'>
                    <VerSeleccionQuien id={id} oraciondata={oraciondata} window={window} />
                  </div>
                  <div style={{ width: "95px" }} className="mx-auto">
                    <VerVerboRespuesta  id={id} oraciondata={oraciondata} window={window} />
                  </div>
                  {
                    isAdverbio( id, window, oraciondata)
                    && (
                      <div style={{ width: "95px" }} className="mx-auto">
                     <SeleccionAdverbio/>
                      </div>
                    )
                  }
                  <div style={{ width: "95px" }} className="mx-auto">
                    <MostrarQue />
                  </div>
                </Row>
              </Col>
              <Col  lg="3" ><RespuestaImagen oraciondata={oraciondata} Queselec={Queselec} id={id} window={window} setMomento={setMomento}/></Col>
    </>
  )
}

export default Adverbio