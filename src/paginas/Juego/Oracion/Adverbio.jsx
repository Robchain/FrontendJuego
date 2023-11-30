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


const MostrarQue = ({ data, indice, ...props }) => {
  const [verbo, setVerbo] = useState({ value: '', label: '' })
  useEffect(() => {
    if (data[`Juego` + indice].Oraciones[0].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego` + indice].Oraciones[0].Que)
    } else if (data[`Juego` + indice].Oraciones[1].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego` + indice].Oraciones[1].Que)
    } else if (data[`Juego` + indice].Oraciones[2].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego` + indice].Oraciones[2].Que)
    }
  }, [data])


  return (<img src={verbo.value} alt='opcion que' {...props} />)
}
const RespuestaImagen = ({ data, answer, dispatchProgreso, setImagen, imagen, indice, Queselec, setMomento, momento, ...opc }) => {

  let AdjectivoRespuesta = ""

  useEffect(() => {
    adjetivoRespuesta();
    if (Queselec) {
      if (Queselec.length >= 0) {
        if (AdjectivoRespuesta === Queselec) {
          dispatchProgreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracionAdverbio({ objeto1: data[`Juego` + indice].Oraciones[0], objeto2: data[`Juego` + indice].Oraciones[1], objeto3: data[`Juego` + indice].Oraciones[2] }), selecionado: `Se seleccionó: ${Queselec}`, Resul: `${answer}`, OracionCorrecta: OracionRespuesta({ objecto1: data[`Juego` + indice].Oraciones[0], objecto2: data[`Juego` + indice].Oraciones[1], objecto3: data[`Juego` + indice].Oraciones[2] }) })
          setMomento("Respuesta");
          setImagen(buentrajo);
        } else if (AdjectivoRespuesta !== Queselec) {
          dispatchProgreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracionAdverbio({ objeto1: data[`Juego` + indice].Oraciones[0], objeto2: data[`Juego` + indice].Oraciones[1], objeto3: data[`Juego` + indice].Oraciones[2] }), selecionado: `Se seleccionó: ${Queselec}`, Resul: `${answer}`, OracionCorrecta: OracionRespuesta({ objecto1: data[`Juego` + indice].Oraciones[0], objecto2: data[`Juego` + indice].Oraciones[1], objecto3: data[`Juego` + indice].Oraciones[2] }) })
          setMomento("Respuesta");
          setImagen(malTrabajo);
        }
      }
    } else {
      setImagen("");
    }

  }, [Queselec])

  const adjetivoRespuesta = () => {
    if (data[`Juego` + indice].Oraciones[0].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego` + indice].Oraciones[0].Adverbio;
    } else if (data[`Juego` + indice].Oraciones[1].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego` + indice].Oraciones[1].Adverbio
    } else if (data[`Juego` + indice].Oraciones[2].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego` + indice].Oraciones[2].Adverbio
    }

  }



  return (<>

    {momento === "Respuesta" && (
      <img src={imagen} alt='adverbioRespuesta' {...opc} />
    )}
  </>)
}
const Preguntasecction = ({ setOpacity1, setOpacity2, setOpacity3, setPointer, setVideoActual, videoActual, data, ...props }) => {
  const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    let pregunta = "";
    let respuesta = '';
    for (let i = 0; i < data.length; i++) {
      if (data[i].Respuesta === 'CORRECTO') {
        respuesta = data[i].FileVideoMuestra
        pregunta = data[i].FileVideoPreguntaQue;
        break; // para salir del bucle una vez que se encuentra la respuesta correcta
      }
    }
    setVideoseleccionado([respuesta,pregunta]);
  }, [data])
  return (
    <div>
      <ReactPlayer
        url={videoseleccionado[videoActual]}
        onEnded={() => {
          if (1 === videoActual) {
            setPointer('auto');
            setOpacity1(1);
            setOpacity2(1);
            setOpacity3(1);
          } else { setVideoActual(videoActual + 1); }
        }}
        playing

        controls={true}
        {...props}
      />
    </div>
  )
};
const Respuestasecction = ({ siguiente, data, ...props }) => {
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
        playing={true}
        controls={true}
        onEnded={siguiente}
        {...props}
      />
    </div>
  )
};
const isAdverbio = (indice, data) => {
  if (data[`Juego` + indice].Oraciones[2].Adverbio || data[`Juego` + indice].Oraciones[1].Adverbio || data[`Juego` + indice].Oraciones[0].Adverbio) {
    return true;
  } else {
    return false;
  }
}
const SeleccionAdverbioO = ({ QueSelecion, data, indice, ...props }) => {
  const [seleccionpal, setSeleccionpal] = useState("");
  useEffect(() => {
    if (QueSelecion === 1) { setSeleccionpal(data[`Juego` + indice].Oraciones[0].Adverbio || '') }
    if (QueSelecion === 2) { setSeleccionpal(data[`Juego` + indice].Oraciones[1].Adverbio || '') }
    if (QueSelecion === 3) { setSeleccionpal(data[`Juego` + indice].Oraciones[2].Adverbio || '') }
  }, [QueSelecion])

  useEffect(() => {
    if (QueSelecion === null) {
      setSeleccionpal("");
    }

  }, [indice])


  return (<>
    <span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{seleccionpal}</span>
  </>
  )
}
const SeleccionAdverbio = ({ QueSelecion, data, indice, ...props }) => {
  if (QueSelecion === 1) { return(<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{data[`Juego` + indice].Oraciones[0].Adverbio || ''}</span>) }
    if (QueSelecion === 2) { return(<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{data[`Juego` + indice].Oraciones[1].Adverbio || ''}</span>) }
    if (QueSelecion === 3) { return(<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{data[`Juego` + indice].Oraciones[2].Adverbio || ''}</span>) }
    if (QueSelecion === 0   ) { return(<span {...props}></span>) }
  return (<span {...props} ></span>)
}
const VerVerboRespuesta = ({ data, indice, ...props }) => {
  let verbo = "";
  if (data[`Juego` + indice].Oraciones[0].Respuesta === "CORRECTO") {
    verbo = data[`Juego` + indice].Oraciones[0].Verbo
  } else if (data[`Juego` + indice].Oraciones[1].Respuesta === "CORRECTO") {
    verbo = data[`Juego` + indice].Oraciones[1].Verbo
  } else if (data[`Juego` + indice].Oraciones[2].Respuesta === "CORRECTO") {
    verbo = data[`Juego` + indice].Oraciones[2].Verbo
  }
  return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{verbo}</span>)
}
const VerSeleccionQuien = ({ data, indice, ...props }) => {
  const [selecion, setSelecion] = useState({ label: '', value: '' });
  useEffect(() => {
    if (data[`Juego` + indice].Oraciones[0].Respuesta === "CORRECTO") {
      setSelecion(data[`Juego` + indice].Oraciones[0].Sujeto)
    } else if (data[`Juego` + indice].Oraciones[1].Respuesta === "CORRECTO") {
      setSelecion(data[`Juego` + indice].Oraciones[1].Sujeto)
    } else if (data[`Juego` + indice].Oraciones[2].Respuesta === "CORRECTO") {
      setSelecion(data[`Juego` + indice].Oraciones[2].Sujeto)
    }
  }, [data])
  return (<>{selecion.value.length != 0 && (<img src={selecion.value} alt='opcion1' {...props} />)}</>)
}
const Adverbio = ({ indice, siguiente, dispatchProgreso, data }) => {
  const [momento, setMomento] = useState("inicial");
  const [Queselec, setQueselec] = useState(undefined);
  const [imagen, setImagen] = useState("");
  const [videoActual, setVideoActual] = useState(0);
  const [QueSelecion, setQueSelecion] = useState(0);
  const [pointerEvent, setPointer] = useState("auto")
  const [answer, setAnswer] = useState("")
  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(1);
  const [opacity3, setOpacity3] = useState(1);

  useEffect(() => {
    setMomento("inicial")
    setQueselec(undefined);
    setImagen('');
    setQueSelecion(0)
    setPointer('none');
    setOpacity1(0.4);
    setOpacity2(0.4);
    setOpacity3(0.4);
  }, [indice])
  const onhandleClickQuePrimero = () => {
    // dispatchProgreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracionAdverbio({ objeto1: data[`Juego` + indice].Oraciones[0], objeto2: data[`Juego` + indice].Oraciones[1], objeto3: data[`Juego` + indice].Oraciones[2] }), selecionado: `Se seleccionó: ${data[`Juego` + indice].Oraciones[0].Adverbio}`, Resul: data[`Juego` + indice].Oraciones[0].Respuesta, OracionCorrecta: OracionRespuesta({objecto1:data[`Juego` + indice].Oraciones[0], objecto2:data[`Juego` + indice].Oraciones[1], objecto3:data[`Juego` + indice].Oraciones[2]}) });

    setQueSelecion(1);
    setQueselec(data[`Juego` + indice].Oraciones[0].Adverbio);
    setAnswer(data[`Juego` + indice].Oraciones[0].Respuesta)
    setPointer("none")
    setOpacity2(0.4);
    setOpacity3(0.4);
  }


  const onhandleClickQueSegundo = () => {
    // dispatchProgreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracionAdverbio({ objeto1: data[`Juego` + indice].Oraciones[0], objeto2: data[`Juego` + indice].Oraciones[1], objeto3: data[`Juego` + indice].Oraciones[2] }), selecionado: `Se seleccionó: ${data[`Juego` + indice].Oraciones[1].Adverbio}`, Resul: data[`Juego` + indice].Oraciones[1].Respuesta, OracionCorrecta: OracionRespuesta({objecto1:data[`Juego` + indice].Oraciones[0], objecto2:data[`Juego` + indice].Oraciones[1], objecto3:data[`Juego` + indice].Oraciones[2]}) })
    setQueSelecion(2);
    setAnswer(data[`Juego` + indice].Oraciones[1].Respuesta)
    setQueselec(data[`Juego` + indice].Oraciones[1].Adverbio);
    setPointer("none")
    setOpacity3(0.4);
    setOpacity1(0.4);
  }

  const onhandleClickQueTercero = () => {
    // dispatchProgreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracionAdverbio({ objeto1: data[`Juego` + indice].Oraciones[0], objeto2: data[`Juego` + indice].Oraciones[1], objeto3: data[`Juego` + indice].Oraciones[2] }), selecionado: `Se seleccionó: ${data[`Juego` + indice].Oraciones[2].Adverbio}`, Resul: data[`Juego` + indice].Oraciones[2].Respuesta, OracionCorrecta: OracionRespuesta({objecto1:data[`Juego` + indice].Oraciones[0], objecto2:data[`Juego` + indice].Oraciones[1], objecto3:data[`Juego` + indice].Oraciones[2]}) })
    setQueSelecion(3);
    setAnswer(data[`Juego` + indice].Oraciones[2].Respuesta)
    setQueselec(data[`Juego` + indice].Oraciones[2].Adverbio);
    setPointer("none")
    setOpacity1(0.4);
    setOpacity2(0.4);
  }


  return (
    <div className='contenido-una-oracion'>
      <div className='up-side-oracion'>
        <div className='seccion-videos-oracion' >
          {
            momento === "inicial" && <Preguntasecction setOpacity1={setOpacity1} setOpacity2={setOpacity2} setOpacity3={setOpacity3} setPointer={setPointer} setVideoActual={setVideoActual} videoActual={videoActual} data={data[`Juego` + indice].Oraciones} className="video-pregunta-oracion-una" />
          }
          {
            momento === "Respuesta" && <Respuestasecction siguiente={siguiente} data={data[`Juego` + indice].Oraciones} className="video-respuesta-oracion-una" />
          }
        </div>
        <div className='seccion-opciones-oracion'>
          <div className='imagen-pregunta-una'>
            <img alt='que' src={Cantidad} />
          </div>
          <div style={{ pointerEvents: pointerEvent, opacity: opacity1 }} onClick={onhandleClickQuePrimero}>
            <div className='opcion-una-letras' >
              <p>{data[`Juego` + indice].Oraciones[0].Adverbio}</p>
            </div>
          </div>
          <div style={{ pointerEvents: pointerEvent, opacity: opacity2 }} onClick={onhandleClickQueSegundo}>
            <div className='opcion-una-letras'>
              <p>{data[`Juego` + indice].Oraciones[1].Adverbio}</p>
            </div>
          </div>
          <div style={{ pointerEvents: pointerEvent, opacity: opacity3 }} onClick={onhandleClickQueTercero}>
            <div className='opcion-una-letras'>
              <p>{data[`Juego` + indice].Oraciones[2].Adverbio}</p>
            </div>
          </div>

        </div>
      </div>
      <div className='zonainteractiva'>
        <div className='pruebaDise' style={{ borderRadius: "10px", border: "#F8F7FD solid", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.13)", backgroundColor: "#F8F7FD" }}>
          <div className='opciones'>
            <div style={{ padding: '0px' }} >
              <img alt='que' src={Quien} className='imagenOpc' />
            </div>
            <div style={{ padding: '0px' }} >
              <img src={Verbo} alt='opcion1' className='imagenOpc' />
            </div>
            {isAdverbio(indice, data) && (
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
              <VerSeleccionQuien data={data} indice={indice} className='opcionesSelec' />
            </div>
            <div style={{ padding: '0px' }} >
              <VerVerboRespuesta data={data} indice={indice} className='opcionesSelec' />
            </div>
            {
              isAdverbio(indice, data) && (
                <div style={{ padding: '0px' }}>
                  <SeleccionAdverbio QueSelecion={QueSelecion} data={data} indice={indice} className='opcionesSelec' />
                </div>
              )
            }
            <div style={{ padding: '0px' }} >
              <MostrarQue data={data} indice={indice} className='opcionesSelec' />
            </div>
          </div>
        </div>
        <div className='respuesta-seccion'>
          <div>
            <RespuestaImagen answer={answer} dispatchProgreso={dispatchProgreso} imagen={imagen} setImagen={setImagen} data={data} Queselec={Queselec} indice={indice} setMomento={setMomento} momento={momento} className='imagen-respuesta-oracion' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Adverbio