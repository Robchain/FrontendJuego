import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { JuecoContext } from '../../../context/Juego/JuecoContext';
import buentrajo from '../../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../../assets/img/AssetsGame/Bad Jood.png'
import Quien from '../../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../../assets/img/AssetsGame/ico_verbo.png";
import Cantidad from '../../../assets/img/AssetsGame/ico_cantidad.png'
import ReactPlayer from 'react-player';
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
        loop={true}
      />
    </div>
  )
};
const Adverbio = ({id, window, siguiente }) => {
  const [momento, setMomento] = useState("inicial");
  const { oraciondata } = useContext(JuecoContext);
  const [Queselec, setQueselec] = useState("");
  const [QueSelecion, setQueSelecion] = useState(0);
  const [opcionRes, setopcionRes] = useState("Nada");
  const [pointerEvent, setPointer] = useState("auto")
  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(1);
  const [opacity3, setOpacity3] = useState(1);
  const onhandleClickQuePrimero = ()=>{
    setQueSelecion(1);
    setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen);
    setPointer("none")
    setOpacity2(0.4);
    setOpacity3(0.4);
    setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000)
  }

  useEffect(() => {
    
    return () => {
      setMomento("inicial")
     }
  }, [])
  
  const onhandleClickQueSegundo =()=>{
    setQueSelecion(2);
    setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen);
    setPointer("none")
    setOpacity3(0.4);
    setOpacity1(0.4);
    setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000)
  }
  const onhandleClickQueTercero = ()=>{
    setQueSelecion(3);
    setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen);
    setPointer("none")
    setOpacity1(0.4);
    setOpacity2(0.4);
    setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000)
  }
  
  const SeleccionQue = () => {
    let opc = QueSelecion;
    const result = useMemo(() => {
      if (opc === 1) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen} width="170" alt='opcion1' />) }
      if (opc === 2) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen} width="170" alt='opcion2' />) }
      if (opc === 3) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen} width="170" alt='opcion3' />) }
      if (opc === 0) { return (<></>) }
    }, [QueSelecion])
    return result;
  }
  const RespuestaImagen =({oraciondata})=>{
     let  AdjectivoRespuesta = "";
    let base = "Nada";
     if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
       AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen;
     } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
       AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen;
     } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
       AdjectivoRespuesta = oraciondata.Juego1.Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen;
     }
   
     if( Queselec === ""){
       base = "Nada"
     }
     if(Queselec.length >2 ){
       if(AdjectivoRespuesta === Queselec) {
         base ="Correcto"
       }else if(AdjectivoRespuesta !== Queselec){
         base = "Incorrecto"
       }
     }
     
     setopcionRes(base);
   
     switch (base) {
       case "Correcto":
         setMomento("Respuesta");
         return(<><img src={buentrajo} width="100"/></>);
       case "Incorrecto":
         setMomento("Respuesta");
           return(<><img src={malTrabajo} width="100"/></>);
       case "Nada":
       return(<></>)
       default:
         break;
     }
   }
   const VerVerboRespuesta = ()=>{
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
   const VerCantidad = ()=>{
    let verbo = "";
    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      verbo = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      verbo =oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      verbo = oraciondata.Juego1.Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio
    }
    return (<h3>{verbo}</h3>)
       }
       const VerSeleccionQuien = ()=>{
        let verbo = "";
        if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
          verbo = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen
        } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
          verbo = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen
        } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
          verbo = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen
        }
        return (<img src={verbo} width="170" alt='opcion1' />)
        
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
                    <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen} width="170" alt='opcion1' />
                  </Col>
                  <Col className="align-self-center" style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity2 }} onClick={onhandleClickQueSegundo}>
                    <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen} width="170" alt='opcion2' />
                  </Col>
                  <Col className="align-self-center" style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity3 }} onClick={onhandleClickQueTercero}>
                    <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen} width="170" alt='opcion3' />
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
                    <VerSeleccionQuien />
                  </div>
                  <div style={{ width: "95px" }} className="mx-auto">
                    <VerVerboRespuesta />
                  </div>
                  {
                    oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio
                    && (
                      <div style={{ width: "95px" }} className="mx-auto">
                        <VerCantidad />
                      </div>
                    )
                  }
                  <div style={{ width: "95px" }} className="mx-auto">
                    <SeleccionQue />
                  </div>
                  
                </Row>
              </Col>
              <Col  lg="3" ><RespuestaImagen oraciondata={oraciondata}/></Col>
    </>
  )
}

export default Adverbio