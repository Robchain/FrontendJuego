import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import buentrajo from '../../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../../assets/img/AssetsGame/Bad Jood.png'
import Quien from '../../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../../assets/img/AssetsGame/ico_verbo.png";
import Cantidad from '../../../assets/img/AssetsGame/ico_cantidad.png'
import ReactPlayer from 'react-player';
import { OracionRespuesta, resultadoOracionAdverbio } from '../../../helpers'


const MostrarQue = ({ data, window, ...props }) => {
  const [verbo, setVerbo] = useState({value:'', label:''})
  useEffect(() => {
    if (data[`Juego` + window.id].Oraciones[0].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego` + window.id].Oraciones[0].Que)
    } else if (data[`Juego` + window.id].Oraciones[1].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego` + window.id].Oraciones[1].Que)
    } else if (data[`Juego` + window.id].Oraciones[2].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego` + window.id].Oraciones[2].Que)
    }
  }, [data])


  return (<img src={verbo.value} alt='opcion que' {...props} />)
}
const RespuestaImagen = ({ data, setImagen, imagen, window, Queselec, setMomento, momento }) => {

  let AdjectivoRespuesta = ""

  useEffect(() => {
    adjetivoRespuesta();
    if(Queselec){
      if (Queselec.length >= 0) {
        if (AdjectivoRespuesta === Queselec) {
          setMomento("Respuesta");
          setImagen(buentrajo);
        } else if (AdjectivoRespuesta !== Queselec) {
          setMomento("Respuesta");
          setImagen(malTrabajo);
        }
      }
    } else {
      setImagen("");
    }
    
  }, [Queselec])

  const adjetivoRespuesta = () => {
    if (data[`Juego` + window.id].Oraciones[0].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego` + window.id].Oraciones[0].Adverbio;
    } else if (data[`Juego` + window.id].Oraciones[1].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego` + window.id].Oraciones[1].Adverbio
    } else if (data[`Juego` + window.id].Oraciones[2].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego` + window.id].Oraciones[2].Adverbio
    }

  }



  return (<>

    {momento === "Respuesta" && (
      <img src={imagen} width="100" alt='adverbioRespuesta' />
    )}
  </>)
}
const Preguntasecction = ({ data, ...props }) => {
  const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    let pregunta = "";
    for (let i = 0; i < data.length; i++) {
      if (data[i].Respuesta === 'CORRECTO') {
        pregunta = data[i].FileVideoPreguntaQue;
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
        loop={true}
        {...props}
      />
    </div>
  )
};
const Respuestasecction = ({ data, ...props }) => {
  const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    let pregunta = "";
    for (let i = 0; i < data.length; i++) {
      if (data[i].Respuesta === 'CORRECTO') {
        pregunta = data[i].FileVideoMuestra
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
        loop={true}
        {...props}
      />
    </div>
  )
};
const isAdverbio = (window, data) => {
  if (data[`Juego` + window.id].Oraciones[2].Adverbio || data[`Juego` + window.id].Oraciones[1].Adverbio || data[`Juego` + window.id].Oraciones[0].Adverbio) {
    return true;
  } else {
    return false;
  }
}
const SeleccionAdverbio = ({ QueSelecion, data, window, ...props }) => {
  const [seleccionpal, setSeleccionpal] = useState("");
  useEffect(() => {
    if (QueSelecion === 1) { setSeleccionpal(data[`Juego` + window.id].Oraciones[0].Adverbio) }
    if (QueSelecion === 2) { setSeleccionpal(data[`Juego` + window.id].Oraciones[1].Adverbio) }
    if (QueSelecion === 3) { setSeleccionpal(data[`Juego` + window.id].Oraciones[2].Adverbio) }
  }, [QueSelecion])


  return (<>
    <span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{seleccionpal}</span> 
  </>
  )
}
const VerVerboRespuesta = ({ data, window, ...props }) => {
  let verbo = "";
  if (data[`Juego` + window.id].Oraciones[0].Respuesta === "CORRECTO") {
    verbo = data[`Juego` + window.id].Oraciones[0].Verbo
  } else if (data[`Juego` + window.id].Oraciones[1].Respuesta === "CORRECTO") {
    verbo = data[`Juego` + window.id].Oraciones[1].Verbo
  } else if (data[`Juego` + window.id].Oraciones[2].Respuesta === "CORRECTO") {
    verbo = data[`Juego` + window.id].Oraciones[2].Verbo
  }
  return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{verbo}</span>)
}
const VerSeleccionQuien = ({ data, window, ...props }) => {
  const [selecion, setSelecion] = useState({label:'', value:''});
  useEffect(() => {
    if (data[`Juego` + window.id].Oraciones[0].Respuesta === "CORRECTO") {
      setSelecion(data[`Juego` + window.id].Oraciones[0].Sujeto)
    } else if (data[`Juego` + window.id].Oraciones[1].Respuesta === "CORRECTO") {
      setSelecion(data[`Juego` + window.id].Oraciones[1].Sujeto)
    } else if (data[`Juego` + window.id].Oraciones[2].Respuesta === "CORRECTO") {
      setSelecion(data[`Juego` + window.id].Oraciones[2].Sujeto)
    }
  }, [data])
  return (<>{selecion.value.length  != 0  && (<img src={selecion.value} alt='opcion1' {...props} />)}</>)
}
const Adverbio = ({ window, siguiente, dispatchProgreso, data }) => {
  const [momento, setMomento] = useState("inicial");
  const [Queselec, setQueselec] = useState(undefined);
  const [imagen, setImagen] = useState("");
  const [QueSelecion, setQueSelecion] = useState(0);
  const [pointerEvent, setPointer] = useState("auto")
  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(1);
  const [opacity3, setOpacity3] = useState(1);

  const onhandleClickQuePrimero = () => {
    setQueSelecion(1);
    setQueselec(data[`Juego` + window.id].Oraciones[0].Adverbio);
    setPointer("none")
    setOpacity2(0.4);
    setOpacity3(0.4);
    dispatchProgreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracionAdverbio({ objeto1: data[`Juego` + window.id].Oraciones[0], objeto2: data[`Juego` + window.id].Oraciones[1], objeto3: data[`Juego` + window.id].Oraciones[2] }), selecionado: `Se seleccionó: ${data[`Juego` + window.id].Oraciones[0].Adverbio}`, Resul: data[`Juego` + window.id].Oraciones[0].Respuesta, OracionCorrecta: OracionRespuesta({objecto1:data[`Juego` + window.id].Oraciones[0], objecto2:data[`Juego` + window.id].Oraciones[1], objecto3:data[`Juego` + window.id].Oraciones[2]}) });
    setTimeout(() => { siguiente(window.id) }, 11000)
  }


  const onhandleClickQueSegundo = () => {
    setQueSelecion(2);
    setQueselec(data[`Juego` + window.id].Oraciones[1].Adverbio);
    setPointer("none")
    setOpacity3(0.4);
    setOpacity1(0.4);
    dispatchProgreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracionAdverbio({ objeto1: data[`Juego` + window.id].Oraciones[0], objeto2: data[`Juego` + window.id].Oraciones[1], objeto3: data[`Juego` + window.id].Oraciones[2] }), selecionado: `Se seleccionó: ${data[`Juego` + window.id].Oraciones[1].Adverbio}`, Resul: data[`Juego` + window.id].Oraciones[1].Respuesta, OracionCorrecta: OracionRespuesta({objecto1:data[`Juego` + window.id].Oraciones[0], objecto2:data[`Juego` + window.id].Oraciones[1], objecto3:data[`Juego` + window.id].Oraciones[2]}) })
    setTimeout(() => { siguiente(window.id) }, 11000)
  }

  const onhandleClickQueTercero = () => {
    setQueSelecion(3);
    setQueselec(data[`Juego` + window.id].Oraciones[2].Adverbio);
    setPointer("none")
    setOpacity1(0.4);
    setOpacity2(0.4);
    dispatchProgreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracionAdverbio({ objeto1: data[`Juego` + window.id].Oraciones[0], objeto2: data[`Juego` + window.id].Oraciones[1], objeto3: data[`Juego` + window.id].Oraciones[2] }), selecionado: `Se seleccionó: ${data[`Juego` + window.id].Oraciones[2].Adverbio}`, Resul: data[`Juego` + window.id].Oraciones[2].Respuesta, OracionCorrecta: OracionRespuesta({objecto1:data[`Juego` + window.id].Oraciones[0], objecto2:data[`Juego` + window.id].Oraciones[1], objecto3:data[`Juego` + window.id].Oraciones[2]}) })
    setTimeout(() => { siguiente(window.id) },11000)
  }


  return (
    <div className='contenido-una-oracion'>
      <div className='seccion-videos-oracion' >
        {
          momento === "inicial" && <Preguntasecction data={data[`Juego` + window.id].Oraciones} className="video-pregunta-oracion-una"/>
        }
        {
          momento === "Respuesta" && <Respuestasecction data={data[`Juego` + window.id].Oraciones}  className="video-respuesta-oracion-una" />
        }
      </div>
      <div className='seccion-opciones-oracion'>
          <div className='imagen-pregunta-una'>
            <img alt='que' src={Cantidad} />
          </div>
          <div style={{ pointerEvents: pointerEvent, opacity: opacity1 }} onClick={onhandleClickQuePrimero}>
            <div className='opcion-una-letras' >
            <span className=''>{data[`Juego` + window.id].Oraciones[0].Adverbio}</span>
            </div>
          </div>
          <div style={{  pointerEvents: pointerEvent, opacity: opacity2 }} onClick={onhandleClickQueSegundo}>
            <div className='opcion-una-letras'>
            <span style={{ fontWeight: 700, color: "#85858C" }}>{data[`Juego` + window.id].Oraciones[1].Adverbio}</span>
            </div>
          </div>
          <div style={{  pointerEvents: pointerEvent, opacity: opacity3 }} onClick={onhandleClickQueTercero}>
            <div className='opcion-una-letras'>
            <span style={{ fontWeight: 700, color: "#85858C" }}>{data[`Juego` + window.id].Oraciones[2].Adverbio}</span>
            </div>
          </div>

      </div>
      <div className='zonainteractiva'>
      <div  className='pruebaDise' style={{ borderRadius: "10px", border: "#F8F7FD solid", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.13)", backgroundColor: "#F8F7FD" }}>
        <div className='opciones'>
          <div style={{ padding: '0px' }} >
            <img alt='que' src={Quien} className='imagenOpc' />
          </div>
          <div style={{ padding: '0px' }} >
            <img src={Verbo} alt='opcion1' className='imagenOpc' />
          </div>
          {isAdverbio(window, data) && (
            <div style={{ padding: '0px' }} >
              <img src={Cantidad} alt='opcion1' className='imagenOpc' />
            </div>)
          }
          <div style={{ padding: '0px' }} >
            <img alt='que' src={Que} className='imagenOpc' />
          </div>
        </div>
        <div lg="5" className='seleccion' >
          <div style={{ padding: '0px' }} >
            <VerSeleccionQuien data={data} window={window} className='opcionesSelec' />
          </div>
          <div style={{ padding: '0px' }} >
            <VerVerboRespuesta data={data} window={window} className='opcionesSelec' />
          </div>
          {
            isAdverbio(window, data) && (
              <div style={{ padding: '0px' }}>
                <SeleccionAdverbio QueSelecion={QueSelecion} data={data} window={window} className='opcionesSelec' />
              </div>
            )
          }
          <div style={{ padding: '0px' }} >
            <MostrarQue data={data} window={window} className='opcionesSelec' />
          </div>
        </div>
      </div>
      <div ><RespuestaImagen imagen={imagen} setImagen={setImagen} data={data} Queselec={Queselec} window={window} setMomento={setMomento} momento={momento} /></div>
      </div>
    </div>
  )
}

export default Adverbio