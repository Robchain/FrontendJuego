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
const VerVerboRespuesta = ({oraciondata, window, id })=>{
  const [palabra, setPalabra] = useState("");
  useEffect(() => {
    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      setPalabra(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Verbo)
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      setPalabra(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Verbo)
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      setPalabra(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Verbo)
    }
  }, [oraciondata])
  
  return (<h3>{palabra}</h3>)
 }
const isAdverbio = (id, window, oraciondata) => {
  if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio || oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio) {
    return true;
  } else {
    return false;
  }
}
const Preguntasecction = ({id, window, oraciondata}) => {

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

const Respuestasecction = ({oraciondata,id, window}) => {
  const [videoseleccionado2, setVideoseleccionado2] = useState("");
  useEffect(() => {
    setVideoseleccionado2(preguntavideo);
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
        url={videoseleccionado2}
        width={300}
        playing
        loop={true}
      />
    </div>
  )
};
const VerSeleccionQuien = ({oraciondata, id, window })=>{
  const [queselec, setQueselec] = useState("")
  useEffect(() => {
    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen)
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen)
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen)
    }
  }, [oraciondata])

  return (<>
    {
      queselec.length > 2 && (<img src={queselec} width="170" alt='opcion1' />) 
  }
  </>)
  
     }
       
   const VerCantidad = ({oraciondata, id, window})=>{
   const [seleccion, setSeleccion] = useState("")
   useEffect(() => {
    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      setSeleccion(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio)
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      setSeleccion(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio)
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      setSeleccion(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio)
    }
   }, [oraciondata])
   
    return (<h3>{seleccion}</h3>)
       }
       const SeleccionQue = ({QueSelecion,oraciondata, id, window }) => {
        const [seleccionPal, setSeleccionPal] = useState("");
        useEffect(() => {
          if (QueSelecion === 1) { setSeleccionPal(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen) }
          if (QueSelecion === 2) { setSeleccionPal(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen) }
          if (QueSelecion === 3) { setSeleccionPal(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen) }
        }, [QueSelecion])
        
        return(<>{
          seleccionPal.length > 2 && (
            <img src={seleccionPal} width="170" alt='opcion1' />
          )
        }
        </>)
    }
    const RespuestaImagen =({Queselec, oraciondata, id , window, setMomento, momento })=>{
      const [imagense, setImagense] = useState("")
      let  AdjectivoRespuesta = "";
     useEffect(() => {
      if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
       AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen;
      } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
       AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen;
      } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
       AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen;
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
   
      return(<>{
        momento === "Respuesta" &&(<img src={imagense} width="100" alt='imagen'/>)}
        <></>
      </>)
    }
 
const QueSeccion = ({id, window, siguiente, dispatchProgreso }) => {
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
    setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen);
    setPointer("none")
    setOpacity2(0.4);
    setOpacity3(0.4);
    dispatchProgreso({type:"PROGRESO", selecionado:oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Oracion,Resul:oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta })
    setTimeout(() => { siguiente(window.id) },  9000)
  }

  const onhandleClickQueSegundo =()=>{
    setQueSelecion(2);
    setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen);
    setPointer("none")
    setOpacity3(0.4);
    setOpacity1(0.4);
    dispatchProgreso({type:"PROGRESO", selecionado:oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Oracion,Resul:oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta })
    setTimeout(() => { siguiente(window.id) }, 9000)
  }
  const onhandleClickQueTercero = ()=>{
    setQueSelecion(3);
    setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen);
    setPointer("none")
    setOpacity1(0.4);
    setOpacity2(0.4);
    dispatchProgreso({type:"PROGRESO", selecionado:oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Oracion,Resul:oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta })
    setTimeout(() => { siguiente(window.id) }, 9000)
  }
 
 
 

  return (
    <>
      <Col className='mt-2' lg="4" sm="12" md="12" >
      {
                  momento === "inicial" && <Preguntasecction id={id}  window={window} oraciondata={oraciondata}/>
      }
      {
              momento ==="Respuesta" && <Respuestasecction oraciondata={oraciondata} id={id} window={window} />
      }
              </Col>
              <Col  lg="8">

              <Row lg="12" className='align-items-center'>
                  <Col  className="align-self-center" style={{ width: "95px" }}>
                    <img alt='que' src={Que} width="75" />
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
                  {  isAdverbio( id, window, oraciondata)
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
                    <VerSeleccionQuien id={id} oraciondata={oraciondata} window={window}/>
                  </div>
                  <div style={{ width: "95px" }} className="mx-auto">
                    <VerVerboRespuesta  id={id} oraciondata={oraciondata} window={window}  />
                  </div>
                  {
                    isAdverbio( id, window, oraciondata)
                    && (
                      <div style={{ width: "95px" }} className="mx-auto">
                        <VerCantidad id={id} oraciondata={oraciondata} window={window} />
                      </div>
                    )
                  }
                  <div style={{ width: "95px" }} className="mx-auto">
                    <SeleccionQue  QueSelecion={QueSelecion} id={id} oraciondata={oraciondata} window={window} />
                  </div>
                </Row>
              </Col>
              <Col  lg="3" ><RespuestaImagen momento={momento} setMomento={setMomento} Queselec={Queselec} oraciondata={oraciondata}  id={id} window={window}/></Col>
    </>
  )
}
export default QueSeccion