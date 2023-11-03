import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import buentrajo from '../../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../../assets/img/AssetsGame/Bad Jood.png'
import Quien from '../../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../../assets/img/AssetsGame/ico_verbo.png";
import Cantidad from '../../../assets/img/AssetsGame/ico_cantidad.png'
import ReactPlayer from 'react-player';
import { OracionRespuesta, resultadoOracionQuien } from '../../../helpers'

const VerVerboRespuesta = ({ data,  window, ...props }) => {
  const [selccionver, setSelccionver] = useState("")
  useEffect(() => {
    if (data[`Juego` + window.id].Oraciones[0].Respuesta === "CORRECTO") {
      setSelccionver(data[`Juego` + window.id].Oraciones[0].Verbo)
    } else if (data[`Juego` + window.id].Oraciones[1].Respuesta === "CORRECTO") {
      setSelccionver(data[`Juego` + window.id].Oraciones[1].Verbo)
    } else if (data[`Juego` + window.id].Oraciones[2].Respuesta === "CORRECTO") {
      setSelccionver(data[`Juego` + window.id].Oraciones[2].Verbo)
    }
  }, [data])

  return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{selccionver}</span>)
}
const VerSeleccionqUE = ({ data,  window, ...props }) => {
  const [seleccionverbo, setSeleccionverbo] = useState({value:'', label:''});
  useEffect(() => {
    if (data[`Juego` + window.id].Oraciones[0].Respuesta === "CORRECTO") {
      setSeleccionverbo(data[`Juego` + window.id].Oraciones[0].Que)
    } else if (data[`Juego` + window.id].Oraciones[1].Respuesta === "CORRECTO") {
      setSeleccionverbo(data[`Juego` + window.id].Oraciones[1].Que)
    } else if (data[`Juego` + window.id].Oraciones[2].Respuesta === "CORRECTO") {
      setSeleccionverbo(data[`Juego` + window.id].Oraciones[2].Que)
    }
  }, [data])

  return (<img src={seleccionverbo.value} alt='opcion1' {...props} />)

}
const SeleccionQUIEN = ({ data,  window, QueSelecion, ...props }) => {
  const [selcci, setSelcci] = useState({value:'', label:''});
  useEffect(() => {
    if (QueSelecion === 1) { setSelcci(data[`Juego` + window.id].Oraciones[0].Sujeto) }
    if (QueSelecion === 2) { setSelcci(data[`Juego` + window.id].Oraciones[1].Sujeto) }
    if (QueSelecion === 3) { setSelcci(data[`Juego` + window.id].Oraciones[2].Sujeto) }
  }, [QueSelecion])

  return (<>{
   selcci.label.length !==0?  (
      <img src={selcci.value} alt='opcion1'  {...props}/>
    ):<div></div>
  }</>)
}
const VerCantidad = ({ data,  window, ...props }) => {
  const [verbo, setVerbo] = useState("")
  useEffect(() => {
    if (data[`Juego` + window.id].Oraciones[0].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego` + window.id].Oraciones[0].Adverbio)
    } else if (data[`Juego` + window.id].Oraciones[1].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego` + window.id].Oraciones[1].Adverbio)
    } else if (data[`Juego` + window.id].Oraciones[2].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego` + window.id].Oraciones[2].Adverbio)
    }
  }, [data])

  return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{verbo}</span>)
}
const isAdverbio = ( window, data) => {
  if (data[`Juego` + window.id].Oraciones[2].Adverbio || data[`Juego` + window.id].Oraciones[1].Adverbio|| data[`Juego` + window.id].Oraciones[0].Adverbio) {
    return true;
  } else {
    return false;
  }
}
const Preguntasecction = ({ data, ...props }) => {

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
        playing
        {...props}
        loop={true}
      />
    </div>
  )
};
const Respuestasecction = ({  data, ...props  }) => {
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
        loop={true}
        playing
        {...props}
      />
    </div>
  )
};
const RespuestaImagen = ({ momento, Queselec, data, window, setMomento }) => {
  const [imagense, setImagense] = useState({value:'', label:''})
  let AdjectivoRespuesta = {value:'', label:''};
  useEffect(() => {

    if (data[`Juego` + window.id].Oraciones[0].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego` + window.id].Oraciones[0].Sujeto;
    } else if (data[`Juego` + window.id].Oraciones[1].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego` + window.id].Oraciones[1].Sujeto;
    } else if (data[`Juego` + window.id].Oraciones[2].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego` + window.id].Oraciones[2].Sujeto;
    }

    if (Queselec.label.length != 0) {
      if (AdjectivoRespuesta.label === Queselec.label) {
        setMomento("Respuesta");
        setImagense(buentrajo);
      } else if (AdjectivoRespuesta.label !== Queselec.label) {
        setMomento("Respuesta");
        setImagense(malTrabajo);
      }
    } else {
      setImagense("");
    }

  }, [Queselec])

  return (<>
    {
      momento === "Respuesta" && (<img src={imagense} width="100" alt='incorrecto' />)
    }
  </>)
}
const QuienSeccion = ({  window, siguiente, dispatchProgreso, data }) => {
  const [momento, setMomento] = useState("inicial");
  const [Queselec, setQueselec] = useState({label:'', value:''});
  const [QueSelecion, setQueSelecion] = useState(0);
  const [pointerEvent, setPointer] = useState("auto");
  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(1);
  const [opacity3, setOpacity3] = useState(1);
 /* useEffect(() => {
    if(QueSelecion ===0){
    setTimeout(() => { dispatchProgreso({ type: "PROGRESO",PalabraCorrecta:resultadoOracion({objeto1:data[`Juego` + window.id].Oraciones[0], objeto2:data[`Juego` + window.id].Oraciones[1], objeto3:data[`Juego` + window.id].Oraciones[2]}) , selecionado: `SE PASO EL TIEMPO-NO HAY RESPUESTA`, Resul: "INCORRECTO" }); siguiente(window.id) }, 90000)
  }
  }, [QueSelecion])*/
  const onhandleClickQuePrimero = () => {
    setQueSelecion(1);
    setQueselec(data[`Juego` + window.id].Oraciones[0].Sujeto);
    setPointer("none")
    setOpacity2(0.4);
    setOpacity3(0.4);
    dispatchProgreso({ type: "PROGRESO", PalabraCorrecta:resultadoOracionQuien({objeto1:data[`Juego` + window.id].Oraciones[0], objeto2:data[`Juego` + window.id].Oraciones[1], objeto3:data[`Juego` + window.id].Oraciones[2]}) ,selecionado: `Se seleccionó: ${data[`Juego` + window.id].Oraciones[0].Sujeto.label}`, Resul: data[`Juego` + window.id].Oraciones[0].Respuesta, OracionCorrecta: OracionRespuesta({objecto1:data[`Juego` + window.id].Oraciones[0], objecto2:data[`Juego` + window.id].Oraciones[1], objecto3:data[`Juego` + window.id].Oraciones[2]}) })
    setTimeout(() => { siguiente(window.id) },  10000)
  }

  const onhandleClickQueSegundo = () => {
    setQueSelecion(2);
    setQueselec(data[`Juego` + window.id].Oraciones[1].Sujeto);
    setPointer("none")
    setOpacity3(0.4);
    setOpacity1(0.4);
    dispatchProgreso({ type: "PROGRESO",PalabraCorrecta:resultadoOracionQuien({objeto1:data[`Juego` + window.id].Oraciones[0], objeto2:data[`Juego` + window.id].Oraciones[1], objeto3:data[`Juego` + window.id].Oraciones[2]}) , selecionado: `Se seleccionó: ${data[`Juego` + window.id].Oraciones[1].Sujeto.label}`, Resul: data[`Juego` + window.id].Oraciones[1].Respuesta, OracionCorrecta: OracionRespuesta({objecto1:data[`Juego` + window.id].Oraciones[0], objecto2:data[`Juego` + window.id].Oraciones[1], objecto3:data[`Juego` + window.id].Oraciones[2]}) })
    setTimeout(() => { siguiente(window.id) },  10000)
  }
  const onhandleClickQueTercero = () => {
    setQueSelecion(3);
    setQueselec(data[`Juego` + window.id].Oraciones[2].Sujeto);
    setPointer("none")
    setOpacity1(0.4);
    setOpacity2(0.4);
    dispatchProgreso({ type: "PROGRESO",PalabraCorrecta:resultadoOracionQuien({objeto1:data[`Juego` + window.id].Oraciones[0], objeto2:data[`Juego` + window.id].Oraciones[1], objeto3:data[`Juego` + window.id].Oraciones[2]}) , selecionado: `Se seleccionó: ${data[`Juego` + window.id].Oraciones[2].Sujeto.label}`, Resul: data[`Juego` + window.id].Oraciones[2].Respuesta, OracionCorrecta: OracionRespuesta({objecto1:data[`Juego` + window.id].Oraciones[0], objecto2:data[`Juego` + window.id].Oraciones[1], objecto3:data[`Juego` + window.id].Oraciones[2]}) })
    setTimeout(() => { siguiente(window.id) },  10000)
  }






  return (
    <div className='contenido-una-oracion'>
      <div className='seccion-videos-oracion' >
        {
          momento === "inicial" && <Preguntasecction data={data[`Juego` + window.id].Oraciones} className="video-pregunta-oracion-una"  />
        }
        {
          momento === "Respuesta" && <Respuestasecction data={data[`Juego` + window.id].Oraciones}  className="video-respuesta-oracion-una"  />
        }
      </div>
      <div className='seccion-opciones-oracion'>
          <div className='imagen-pregunta-una'>
            <img alt='que' src={Quien} />
          </div>
          <div style={{pointerEvents: pointerEvent, opacity: opacity1 }} onClick={onhandleClickQuePrimero}>
            <div className='opcion-imagen-una'>
            <img src={data[`Juego` + window.id].Oraciones[0].Sujeto.value} alt='opcion1' className='opcion-imagen-neta' />
          </div></div>
          <div style={{pointerEvents: pointerEvent, opacity: opacity2 }} onClick={onhandleClickQueSegundo}>
            <div className='opcion-imagen-una'>
            <img src={data[`Juego` + window.id].Oraciones[1].Sujeto.value} alt='opcion2' className='opcion-imagen-neta' />
            </div>
          </div>
          <div style={{ pointerEvents: pointerEvent, opacity: opacity3 }} onClick={onhandleClickQueTercero}>
            <div className='opcion-imagen-una'>
            <img src={data[`Juego` + window.id].Oraciones[2].Sujeto.value} alt='opcion3' className='opcion-imagen-neta' />
            </div>
          </div>
        </div>
      <div className='zonainteractiva'>
      <div   className='pruebaDise' style={{ borderRadius: "10px", border: "#F8F7FD solid", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.13)", backgroundColor: "#F8F7FD" }}>
        <div className='opciones' >
          <div style={{padding:'0px'}}>
            <img alt='que' src={Quien} className='imagenOpc'  />
          </div>
          <div style={{padding:'0px'}} >
            <img src={Verbo} alt='opcion1' className='imagenOpc' />
          </div>
          {isAdverbio(window, data)
            &&
            (
              <div style={{padding:'0px'}} >
                <img src={Cantidad} alt='opcion1' className='imagenOpc'/>
              </div>)
          }
          <div style={{padding:'0px'}} >
            <img alt='que' src={Que} className='imagenOpc'  />
          </div>
        </div>
        {/* parte de seleccion */}
        <div className='seleccion'>
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
                <VerCantidad  data={data} window={window} className='opcionesSelec' />
              </div>
            )
          }
          <div style={{padding:'0px'}} >
            <VerSeleccionqUE  data={data} window={window} className='opcionesSelec'/>
          </div>
        </div>
      </div>
      <div  ><RespuestaImagen momento={momento} Queselec={Queselec} setMomento={setMomento} data={data}  window={window} /></div>
   </div>
    </div>
  )
}

export default QuienSeccion