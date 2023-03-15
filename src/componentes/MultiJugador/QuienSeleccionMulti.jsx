import React, { /*useContext,*/ useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
//import { JuecoContext } from '../../../context/Juego/JuecoContext';
import buentrajo from '../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../assets/img/AssetsGame/Bad Jood.png'
import Quien from '../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../assets/img/AssetsGame/ico_verbo.png";
import Cantidad from '../../assets/img/AssetsGame/ico_cantidad.png'
import ReactPlayer from 'react-player';
const VerVerboRespuesta = ({data, id, window})=>{
    const [selccionver, setSelccionver] = useState("")
  useEffect(() => {
    if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      setSelccionver(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Verbo)
    } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      setSelccionver(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Verbo)
    } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      setSelccionver(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Verbo)
    }
  }, [data])
  
  return (<h3>{selccionver}</h3>)
 }
const VerSeleccionqUE = ({data, id, window})=>{
 const [seleccionverbo, setSeleccionverbo] = useState("");
  useEffect(() => {
    if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      setSeleccionverbo(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileAdjetivoImagen)
    } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      setSeleccionverbo(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileAdjetivoImagen)
    } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      setSeleccionverbo(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileAdjetivoImagen)
    }
  }, [data])

  return (<img src={seleccionverbo} width="170" alt='opcion1' />)
  
     }
const SeleccionQUIEN = ({data, id, window, QueSelecion}) => {
  const [selcci, setSelcci] = useState("");
  useEffect(() => {
    if (QueSelecion === 1) {setSelcci(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileSujetoImagen) }
    if (QueSelecion === 2) {setSelcci(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileSujetoImagen) }
    if (QueSelecion === 3) {setSelcci(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileSujetoImagen) }
  }, [QueSelecion])
  
 return (<>{
  QueSelecion.length>2 && (
    <img src={selcci} width="170" alt='opcion1' />
  )
 }</>)
}
const VerCantidad = ({data, id, window})=>{
    const [verbo, setVerbo] = useState("")
  useEffect(() => {
    if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      setVerbo(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Adverbio)
    } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      setVerbo(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Adverbio)
    } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      setVerbo(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Adverbio)
    }
  }, [data])

  return (<h3>{verbo}</h3>)
     }
const isAdverbio = (id, window, data) => {
  if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Adverbio || data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Adverbio) {
    return true;
  } else {
    return false;
  }
}
const Preguntasecction = ({id, window, data }) => {
  
const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    setVideoseleccionado(preguntavideo);
  }, [])
  const preguntavideo =()=>{
    if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      return data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileVideoPreguntaQuien
    } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      return data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileVideoPreguntaQuien
    } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      return data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileVideoPreguntaQuien
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
const Respuestasecction = ({id, window, data}) => {
  const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    setVideoseleccionado(preguntavideo);
  }, [])
  
   const preguntavideo = ()=>{
    if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      return data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileVideoMuestra
    } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      return data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileVideoMuestra
    } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      return data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileVideoMuestra
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
const RespuestaImagen =({ momento, Queselec, data, id, window, setMomento})=>{
  const [imagense, setImagense] = useState("")
  let  AdjectivoRespuesta = "";
  useEffect(() => {
  
    if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileSujetoImagen;
    } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileSujetoImagen;
    } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileSujetoImagen;
    }
  
    if(Queselec.length >2 ){
      if(AdjectivoRespuesta === Queselec) {
        setMomento("Respuesta");
        setImagense(buentrajo);
      }else if(AdjectivoRespuesta !== Queselec){
        setMomento("Respuesta");
        setImagense(malTrabajo);
      }
    }else{
      setImagense("");
    }
  
  }, [Queselec])
  
  return(<>
    {
      momento === "Respuesta" && (<img src={imagense} width="100" alt='incorrecto'/>)
    }
  </>)
}

export const QuienSeleccionMulti = ({id, window, siguiente, data,Progreso}) => {
    const [momento, setMomento] = useState("inicial");
   // const { oraciondata } = useContext(JuecoContext);
    const [Queselec, setQueselec] = useState("");
    const [QueSelecion, setQueSelecion] = useState(0);
    const [pointerEvent, setPointer] = useState("auto");
    const [opacity1, setOpacity1] = useState(1);
    const [opacity2, setOpacity2] = useState(1);
    const [opacity3, setOpacity3] = useState(1);
    const onhandleClickQuePrimero = ()=>{
      setQueSelecion(1);
      setQueselec(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileSujetoImagen);
      setPointer("none")
      setOpacity2(0.4);
      setOpacity3(0.4);
      //dispatchProgreso({type:"PROGRESO", selecionado:oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Oracion,Resul:oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta })
      setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000)
    }
    
    const onhandleClickQueSegundo =()=>{
      setQueSelecion(2);
      setQueselec(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileSujetoImagen);
      setPointer("none")
      setOpacity3(0.4);
      setOpacity1(0.4);
      //dispatchProgreso({type:"PROGRESO", selecionado:oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Oracion,Resul:oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta})
      setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000)
    }
    const onhandleClickQueTercero = ()=>{
      setQueSelecion(3);
      setQueselec(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileSujetoImagen);
      setPointer("none")
      setOpacity1(0.4);
      setOpacity2(0.4);
      //dispatchProgreso({type:"PROGRESO", selecionado:oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Oracion,Resul:oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta})
      setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000)
    }
   
    
  return (
    <>
        <Col className='mt-2' lg="4" sm="12" md="12" >
      {
                  momento === "inicial" && <Preguntasecction data={data}  id={id} window={window}/>
      }
      {
              momento ==="Respuesta" && <Respuestasecction data={data} id={id} window={window}/>
      }
              </Col>
              <Col  lg="8">
              <Row lg="12" className='align-items-center'>
                  <Col  className="align-self-center" style={{ width: "95px" }}>
                    <img alt='que' src={Quien} width="75" />
                  </Col>
                  <Col className="align-self-center" style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity1 }}  onClick={onhandleClickQuePrimero}>
                    <img src={data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileSujetoImagen} width="170" alt='opcion1' />
                  </Col>
                  <Col className="align-self-center" style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity2 }} onClick={onhandleClickQueSegundo}>
                    <img src={data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileSujetoImagen} width="170" alt='opcion2' />
                  </Col>
                  <Col className="align-self-center" style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity3 }} onClick={onhandleClickQueTercero}>
                    <img src={data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileSujetoImagen} width="170" alt='opcion3' />
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
                  {  isAdverbio( id, window, data)
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
                {/* parte de seleccion */}
                <Row lg="8" className='align-items-center'>
                 <div style={{ width: "95px" }} className='mx-auto'>
                 <SeleccionQUIEN QueSelecion={QueSelecion} id={id} data={data} window={window}/>
                  </div>
                  <div style={{ width: "95px" }} className="mx-auto">
                    <VerVerboRespuesta id={id} data={data} window={window} />
                  </div>
                  {
                    isAdverbio( id, window, data)
                    && (
                      <div style={{ width: "95px" }} className="mx-auto">
                        <VerCantidad  id={id} data={data} window={window} />
                      </div>
                    )
                  }
                  <div style={{ width: "95px" }} className="mx-auto">
                  <VerSeleccionqUE id={id} data={data} window={window} />
                  </div>
                </Row>
              </Col>
              <Col  lg="3" ><RespuestaImagen momento={momento} Queselec={Queselec} setMomento={setMomento} data={data} id={id} window={window} /></Col>
    </>
  )
}
