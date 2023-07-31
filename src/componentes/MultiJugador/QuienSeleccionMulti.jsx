import React, { /*useContext,*/ useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import buentrajo from '../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../assets/img/AssetsGame/Bad Jood.png'
import Quien from '../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../assets/img/AssetsGame/ico_verbo.png";
import Cantidad from '../../assets/img/AssetsGame/ico_cantidad.png'
import ReactPlayer from 'react-player';
import { resultadoMultiJu } from '../../helpers/contador'
const VerVerboRespuesta = ({data,  window})=>{
    const [selccionver, setSelccionver] = useState("")
  useEffect(() => {
    if (data[`Juego${window.id}`].Oraciones[0].Respuesta === "CORRECTO") {
      setSelccionver(data[`Juego${window.id}`].Oraciones[0].Verbo)
    } else if (data[`Juego${window.id}`].Oraciones[1].Respuesta === "CORRECTO") {
      setSelccionver(data[`Juego${window.id}`].Oraciones[1].Verbo)
    } else if (data[`Juego${window.id}`].Oraciones[2].Respuesta === "CORRECTO") {
      setSelccionver(data[`Juego${window.id}`].Oraciones[2].Verbo)
    }
  }, [data])
  
  return (<span style={{ fontWeight: 700, color: "#85858C" }}>{selccionver}</span>)
 }
const VerSeleccionqUE = ({data, window})=>{
 const [seleccionverbo, setSeleccionverbo] = useState("");
  useEffect(() => {
    if (data[`Juego${window.id}`].Oraciones[0].Respuesta === "CORRECTO") {
      setSeleccionverbo(data[`Juego${window.id}`].Oraciones[0].FileAdjetivoImagen)
    } else if (data[`Juego${window.id}`].Oraciones[1].Respuesta === "CORRECTO") {
      setSeleccionverbo(data[`Juego${window.id}`].Oraciones[1].FileAdjetivoImagen)
    } else if (data[`Juego${window.id}`].Oraciones[2].Respuesta === "CORRECTO") {
      setSeleccionverbo(data[`Juego${window.id}`].Oraciones[2].FileAdjetivoImagen)
    }
  }, [data])

  return (<img src={seleccionverbo} width="150" alt='opcion1' />)
  
     }
const SeleccionQUIEN = ({data, window, QueSelecion}) => {
  const [selcci, setSelcci] = useState("");
  useEffect(() => {
    if (QueSelecion === 1) {setSelcci(data[`Juego${window.id}`].Oraciones[0].FileSujetoImagen) }
    if (QueSelecion === 2) {setSelcci(data[`Juego${window.id}`].Oraciones[1].FileSujetoImagen) }
    if (QueSelecion === 3) {setSelcci(data[`Juego${window.id}`].Oraciones[2].FileSujetoImagen) }
  }, [QueSelecion])
 return (<>{
  QueSelecion!== 0 && (
    <img src={selcci} width="150" alt='opciones' />
  )
 }</>)
}
const VerCantidad = ({data, window})=>{
    const [verbo, setVerbo] = useState("")
  useEffect(() => {
    if (data[`Juego${window.id}`].Oraciones[0].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego${window.id}`].Oraciones[0].Adverbio)
    } else if (data[`Juego${window.id}`].Oraciones[1].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego${window.id}`].Oraciones[1].Adverbio)
    } else if (data[`Juego${window.id}`].Oraciones[2].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego${window.id}`].Oraciones[2].Adverbio)
    }
  }, [data])

  return (<span style={{ fontWeight: 700, color: "#85858C" }}>{verbo}</span>)
     }
const isAdverbio = ( window, data) => {
  if (data[`Juego${window.id}`].Oraciones[2].Adverbio || data[`Juego${window.id}`].Oraciones[1].Adverbio||data[`Juego${window.id}`].Oraciones[3].Adverbio) {
    return true;
  } else {
    return false;
  }
}
const Preguntasecction = ({ data }) => {
  
const [videoseleccionado, setVideoseleccionado] = useState("");
useEffect(() => {
  let pregunta = ""; 
  for(let i=0; i<data.length; i++){
    if(data[i].Respuesta === 'CORRECTO'){
      pregunta = data[i].FileVideoPreguntaQuien;
      break; // para salir del bucle una vez que se encuentra la respuesta correcta
    }
  }
  setVideoseleccionado(pregunta);
}, [data])
  return (
    <div>
      <ReactPlayer
        url={videoseleccionado}
        height={225}
        width={300}
        playing
      />
    </div>
  )
};
const Respuestasecction = ({ data}) => {
  const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    let pregunta = ""; 
    for(let i=0; i<data.length; i++){
      if(data[i].Respuesta === 'CORRECTO'){
        pregunta = data[i].FileVideoMuestra;
        break; // para salir del bucle una vez que se encuentra la respuesta correcta
      }
    }
    setVideoseleccionado(pregunta);
  }, [data])
  
  return (
    <div>
      <ReactPlayer
        url={videoseleccionado}
        height={225}
        width={300}
        playing
      />
    </div>
  )
};
const RespuestaImagen =({ momento, Queselec, data, window, setMomento})=>{
  const [imagense, setImagense] = useState("")
  let  AdjectivoRespuesta = "";
  useEffect(() => {
  
    if (data[`Juego${window.id}`].Oraciones[0].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego${window.id}`].Oraciones[0].FileSujetoImagen;
    } else if (data[`Juego${window.id}`].Oraciones[1].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego${window.id}`].Oraciones[1].FileSujetoImagen;
    } else if (data[`Juego${window.id}`].Oraciones[2].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego${window.id}`].Oraciones[2].FileSujetoImagen;
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

export const QuienSeleccionMulti = ({ window, siguiente, data,Progreso}) => {
    const [momento, setMomento] = useState("inicial");
    const [Queselec, setQueselec] = useState("");
    const [QueSelecion, setQueSelecion] = useState(0);
    const [pointerEvent, setPointer] = useState("auto");
    const [opacity1, setOpacity1] = useState(1);
    const [opacity2, setOpacity2] = useState(1);
    const [opacity3, setOpacity3] = useState(1);
    const onhandleClickQuePrimero = ()=>{
      setQueSelecion(1);
      setQueselec(data[`Juego${window.id}`].Oraciones[0].FileSujetoImagen);
      setPointer("none")
      setOpacity2(0.4);
      setOpacity3(0.4);
      Progreso({type:"PROGRESO", PalabraCorrecta:resultadoMultiJu({objeto1:data[`Juego${window.id}`].Oraciones[0],objeto2:data[`Juego${window.id}`].Oraciones[1],objeto3:data[`Juego${window.id}`].Oraciones[2]}),PalabraSeleccionada:data[`Juego${window.id}`].Oraciones[0].Oracion, Resultado:data[`Juego${window.id}`].Oraciones[0].Respuesta});
      setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000)
    }
    
    const onhandleClickQueSegundo =()=>{
      setQueSelecion(2);
      setQueselec(data[`Juego${window.id}`].Oraciones[1].FileSujetoImagen);
      setPointer("none")
      setOpacity3(0.4);
      setOpacity1(0.4);
      Progreso({type:"PROGRESO", PalabraCorrecta:resultadoMultiJu({objeto1:data[`Juego${window.id}`].Oraciones[0],objeto2:data[`Juego${window.id}`].Oraciones[1],objeto3:data[`Juego${window.id}`].Oraciones[2]}),PalabraSeleccionada:data[`Juego${window.id}`].Oraciones[1].Oracion, Resultado:data[`Juego${window.id}`].Oraciones[1].Respuesta});
      setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000)
    }
    const onhandleClickQueTercero = ()=>{
      setQueSelecion(3);
      setQueselec(data[`Juego${window.id}`].Oraciones[2].FileSujetoImagen);
      setPointer("none")
      setOpacity1(0.4);
      setOpacity2(0.4);
      Progreso({type:"PROGRESO", PalabraCorrecta:resultadoMultiJu({objeto1:data[`Juego${window.id}`].Oraciones[0],objeto2:data[`Juego${window.id}`].Oraciones[1],objeto3:data[`Juego${window.id}`].Oraciones[2]}),PalabraSeleccionada:data[`Juego${window.id}`].Oraciones[2].Oracion, Resultado:data[`Juego${window.id}`].Oraciones[2].Respuesta});
      setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000)
    }
   
    
  return (
    <>
        <Col className='mt-2' lg="4" sm="12" md="12" >
      {
                  momento === "inicial" && <Preguntasecction data={data[`Juego` + window.id].Oraciones} />
      }
      {
              momento ==="Respuesta" && <Respuestasecction data={data[`Juego` + window.id].Oraciones} />
      }
              </Col>
              <Col  lg="8" className='align-self-center'>
              <Row >
                  <Col  style={{ width: "95px" }}>
                    <img alt='que' src={Quien} width="75" />
                  </Col>
                  <Col style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity1 }}  onClick={onhandleClickQuePrimero}>
                    <img src={data[`Juego${window.id}`].Oraciones[0].FileSujetoImagen} width="150" alt='opcion1' />
                  </Col>
                  <Col style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity2 }} onClick={onhandleClickQueSegundo}>
                    <img src={data[`Juego${window.id}`].Oraciones[1].FileSujetoImagen} width="150" alt='opcion2' />
                  </Col>
                  <Col style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity3 }} onClick={onhandleClickQueTercero}>
                    <img src={data[`Juego${window.id}`].Oraciones[2].FileSujetoImagen} width="150" alt='opcion3' />
                  </Col>
                </Row>
              </Col>
              <div className='zonainteractiva'>
              <div className='pruebaDise' style={{ borderRadius: "10px", border: "#F8F7FD solid", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.13)", backgroundColor: "#F8F7FD" }}>
              <div className='opciones' >
                  <div style={{padding:'0px'}}>
                    <img alt='que' src={Quien} className='imagenOpc'/>
                  </div>
                  <div style={{padding:'0px'}}>
                    <img src={Verbo} alt='opcion1' className='imagenOpc' />
                  </div>
                  {  isAdverbio(  window, data)
                    &&
                    (
                      <div style={{padding:'0px'}} >
                        <img src={Cantidad} alt='opcion1' className='imagenOpc' />
                      </div>)
                  }
                  <div style={{padding:'0px'}} >
                    <img alt='que' src={Que} className='imagenOpc'/>
                  </div>
                </div>
                {/* parte de seleccion */}
                <div className='seleccion' >
                 <div style={{padding:'0px'}} >
                 <SeleccionQUIEN QueSelecion={QueSelecion}  data={data} window={window} className='opcionesSelec' />
                  </div>
                  <div style={{padding:'0px'}} >
                    <VerVerboRespuesta  data={data} window={window} className='opcionesSelec' />
                  </div>
                  {
                    isAdverbio( window, data)
                    && (
                      <div style={{padding:'0px'}} >
                        <VerCantidad   data={data} window={window}  className='opcionesSelec'/>
                      </div>
                    )
                  }
                  <div style={{padding:'0px'}} >
                  <VerSeleccionqUE data={data} window={window} className='opcionesSelec' />
                  </div>
                </div>
              </div>
              <div  ><RespuestaImagen momento={momento} Queselec={Queselec} setMomento={setMomento} data={data} window={window} /></div>
              </div>
    </>
  )
}
