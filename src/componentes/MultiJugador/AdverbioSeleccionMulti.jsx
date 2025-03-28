import React, { useEffect, useState } from 'react'
import buentrajo from '../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../assets/img/AssetsGame/Bad Jood.png'
import Quien from '../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../assets/img/AssetsGame/ico_verbo.png";
import Cantidad from '../../assets/img/AssetsGame/ico_cantidad.png'
import ReactPlayer from 'react-player';
import { OracionRespuesta, analizarAdverbios, resultadoOracionAdverbio } from '../../helpers'

const MostrarQue = ({ data, indice, ...props }) => {
  const [verbo, setVerbo] = useState({ value: '', label: '' })
  useEffect(() => {
    if (data[`Juego${indice}`].Oraciones[0].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego${indice}`].Oraciones[0].Que)
    } else if (data[`Juego${indice}`].Oraciones[1].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego${indice}`].Oraciones[1].Que)
    } else if (data[`Juego${indice}`].Oraciones[2].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego${indice}`].Oraciones[2].Que)
    }
  }, [data, indice])


  return (<img src={verbo.value} alt='opcion que' {...props} />)
}
const SeleccionAdverbio = ({ Adverbios, QueSelecion, ...props }) => {
  if (QueSelecion === 1) { return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{Adverbios[0].Adverbio || ''}</span>) }
  if (QueSelecion === 2) { return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{Adverbios[1].Adverbio || ''}</span>) }
  if (QueSelecion === 3) { return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{Adverbios[2].Adverbio || ''}</span>) }
  if (QueSelecion === 0) { return (<span {...props}></span>) }
  return (<span {...props} ></span>)
}
const RespuestaImagen = ({ Progreso, data, setImagen, imagen, indice, Queselec, setMomento, momento, ...opc }) => {

  let AdjectivoRespuesta = ""

  useEffect(() => {
    adjetivoRespuesta();
    if (Queselec) {
      if (Queselec.length >= 0) {
        if (AdjectivoRespuesta === Queselec) {
          setMomento("Respuesta");
          setImagen(buentrajo);
          Progreso({ type: "PROGRESOORACION", PalabraCorrecta: resultadoOracionAdverbio({ objeto1: data[`Juego${indice}`].Oraciones[0], objeto2: data[`Juego${indice}`].Oraciones[1], objeto3: data[`Juego${indice}`].Oraciones[2] }), PalabraSeleccionada: `Se seleccionó: ${Queselec}`, Resultado: "CORRECTO", OracionCorrecta: OracionRespuesta({ objecto1: data[`Juego${indice}`].Oraciones[0], objecto2: data[`Juego${indice}`].Oraciones[1], objecto3: data[`Juego${indice}`].Oraciones[2] }) })
        } else if (AdjectivoRespuesta !== Queselec) {
          setMomento("Respuesta");
          setImagen(malTrabajo);
          Progreso({ type: "PROGRESOORACION", PalabraCorrecta: resultadoOracionAdverbio({ objeto1: data[`Juego${indice}`].Oraciones[0], objeto2: data[`Juego${indice}`].Oraciones[1], objeto3: data[`Juego${indice}`].Oraciones[2] }), PalabraSeleccionada: `Se seleccionó: ${Queselec}`, Resultado: "INCORRECTO", OracionCorrecta: OracionRespuesta({ objecto1: data[`Juego${indice}`].Oraciones[0], objecto2: data[`Juego${indice}`].Oraciones[1], objecto3: data[`Juego${indice}`].Oraciones[2] }) })
        }
      }
    } else {
      setImagen("");
    }
  }, [Queselec])


  const adjetivoRespuesta = () => {
    if (data[`Juego${indice}`].Oraciones[0].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego${indice}`].Oraciones[0].Adverbio;
    } else if (data[`Juego${indice}`].Oraciones[1].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego${indice}`].Oraciones[1].Adverbio
    } else if (data[`Juego${indice}`].Oraciones[2].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego${indice}`].Oraciones[2].Adverbio
    }

  }



  return (<>

    {momento === "Respuesta" && (
      <img src={imagen} alt='adverbioRespuesta' {...opc} />
    )}
  </>)
}
const Preguntasecction = ({ setcro, setOpacity1, setOpacity2, setOpacity3, setPointer, setVideoActual, videoActual, data, ...props }) => {
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
    setVideoseleccionado([respuesta, pregunta]);
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
            setcro("pregunta")
          } else { setVideoActual(videoActual + 1); }
        }}
        playing

        controls={true}
        {...props}
      />
    </div>
  )
};
const Respuestasecction = ({ setcro, siguiente, data, ...props }) => {
  const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    let pregunta = "";
    setcro('respuesta');
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
  if (data[`Juego${indice}`].Oraciones[2].Adverbio || data[`Juego${indice}`].Oraciones[1].Adverbio || data[`Juego${indice}`].Oraciones[3].Adverbio) {
    return true;
  } else {
    return false;
  }
}

const VerVerboRespuesta = ({ data, indice, ...props }) => {
  let verbo = "";
  if (data[`Juego${indice}`].Oraciones[0].Respuesta === "CORRECTO") {
    verbo = data[`Juego${indice}`].Oraciones[0].Verbo
  } else if (data[`Juego${indice}`].Oraciones[1].Respuesta === "CORRECTO") {
    verbo = data[`Juego${indice}`].Oraciones[1].Verbo
  } else if (data[`Juego${indice}`].Oraciones[2].Respuesta === "CORRECTO") {
    verbo = data[`Juego${indice}`].Oraciones[2].Verbo
  }
  return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{verbo}</span>)
}
const VerSeleccionQuien = ({ data, indice, ...props }) => {
  const [selecion, setSelecion] = useState({ label: '', value: '' });
  useEffect(() => {
    if (data[`Juego${indice}`].Oraciones[0].Respuesta === "CORRECTO") {
      setSelecion(data[`Juego${indice}`].Oraciones[0].Sujeto)
    } else if (data[`Juego${indice}`].Oraciones[1].Respuesta === "CORRECTO") {
      setSelecion(data[`Juego${indice}`].Oraciones[1].Sujeto)
    } else if (data[`Juego${indice}`].Oraciones[2].Respuesta === "CORRECTO") {
      setSelecion(data[`Juego${indice}`].Oraciones[2].Sujeto)
    }
  }, [data, indice])
  return (<>{selecion.value.length != 0 && (<img src={selecion.value} alt='opcion1' {...props} />)}</>)
}
export const AdverbioSeleccionMulti = ({ setcro, indice, siguiente, data, Progreso }) => {
  const [momento, setMomento] = useState("inicial");
  const [Queselec, setQueselec] = useState(undefined);
  const [imagen, setImagen] = useState("");
  const [videoActual, setVideoActual] = useState(0);
  const [Adverbios, setAdverbios] = useState([])
  const [QueSelecion, setQueSelecion] = useState(0);
  const [pointerEvent, setPointer] = useState("none")
  const [opacity1, setOpacity1] = useState(0.4);
  const [opacity2, setOpacity2] = useState(0.4);
  const [opacity3, setOpacity3] = useState(0.4);

  useEffect(() => {
    if (data != null) {
      const info = analizarAdverbios({ data: data, indice: indice });
      setAdverbios(info);
    }
  }, [indice])
  useEffect(() => {
    setcro("inicial")
    setMomento("inicial")
    setQueselec(undefined);
    setImagen('');
    setVideoActual(0)
    setQueSelecion(0)
    setPointer('none');
    setOpacity1(0.4);
    setOpacity2(0.4);
    setOpacity3(0.4);
  }, [indice])

  const onhandleClickQuePrimero = () => {
    setQueSelecion(1);
    setQueselec(Adverbios[0].Adverbio);
    setPointer("none")
    setOpacity2(0.4);
    setOpacity3(0.4);
  }
  const onhandleClickQueSegundo = () => {
    setQueSelecion(2);
    setQueselec(Adverbios[1].Adverbio);
    setPointer("none")
    setOpacity3(0.4);
    setOpacity1(0.4);
  }
  const onhandleClickQueTercero = () => {
    setQueSelecion(3);
    setQueselec(Adverbios[2].Adverbio);
    setPointer("none")
    setOpacity1(0.4);
    setOpacity2(0.4);
  }
  return (
    <div className='contenido-una-oracion'>
      <div className='up-side-oracion'>
        <div className='seccion-videos-oracion'>
          {
            momento === "inicial" && <Preguntasecction setcro={setcro} setOpacity1={setOpacity1} setOpacity2={setOpacity2} setOpacity3={setOpacity3} setPointer={setPointer} setVideoActual={setVideoActual} videoActual={videoActual} data={data[`Juego` + indice].Oraciones} className="video-pregunta-oracion-una" />
          }
          {
            momento === "Respuesta" && <Respuestasecction setcro={setcro} siguiente={siguiente} data={data[`Juego` + indice].Oraciones} className="video-respuesta-oracion-una" />
          }
        </div>
        {
          Adverbios.length > 0 ? <div className='seccion-opciones-oracion' >
            <div className='imagen-pregunta-una'  >
              <img alt='que' src={Cantidad} />
            </div>
            <div style={{ pointerEvents: pointerEvent, opacity: opacity1 }} onClick={onhandleClickQuePrimero}>
              <div className='opcion-una-letras'>
                <p>{Adverbios[0].Adverbio}</p>
              </div>
            </div>
            <div style={{ pointerEvents: pointerEvent, opacity: opacity2 }} onClick={onhandleClickQueSegundo}>
              <div className='opcion-una-letras'>
                <p>{Adverbios[1].Adverbio}</p>
              </div>
            </div>
            <div style={{ pointerEvents: pointerEvent, opacity: opacity3 }} onClick={onhandleClickQueTercero}>
              <div className='opcion-una-letras'>
                <p>{Adverbios[2].Adverbio}</p>
              </div>
            </div>
          </div> : <div className='seccion-opciones-oracion'></div>
        }
      </div>
      <div className='zonainteractiva'>
        <div className='pruebaDise' style={{ borderRadius: "10px", border: "#F8F7FD solid", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.13)", backgroundColor: "#F8F7FD" }}>
          <div className='opciones' >
            <div style={{ padding: '0px' }} >
              <img alt='que' src={Quien} className='imagenOpc' />
            </div>
            <div style={{ padding: '0px' }} >
              <img src={Verbo} alt='opcion1' className='imagenOpc' />
            </div>
            {isAdverbio(indice, data)
              &&
              (
                <div style={{ padding: '0px' }} >
                  <img src={Cantidad} alt='opcion1' className='imagenOpc' />
                </div>)
            }
            <div style={{ padding: '0px' }} >
              <img alt='que' src={Que} className='imagenOpc' />
            </div>
          </div>
          <div className='seleccion' >
            <div style={{ padding: '0px' }} >
              <VerSeleccionQuien data={data} indice={indice} className='opcionesSelec' />
            </div>
            <div style={{ padding: '0px' }} >
              <VerVerboRespuesta data={data} indice={indice} className='opcionesSelec' />
            </div>
            {
              // isAdverbio(indice, data)
              // && (
              //   <div style={{ padding: '0px' }} >
              //     <SeleccionAdverbio Adverbios={Adverbios} QueSelecion={QueSelecion} className='opcionesSelec' />
              //   </div>
              // )
              isAdverbio(indice, data) ? (
                <div style={{ padding: '0px' }}>
                  <SeleccionAdverbio Adverbios={Adverbios} QueSelecion={QueSelecion} className="opcionesSelec" />
                </div>
              ) : (
                <span class="opcionesSelec" style="font-weight: 700; color: rgb(133, 133, 140);">----</span>
              )
            }
            <div style={{ padding: '0px' }} >
              <MostrarQue data={data} indice={indice} className='opcionesSelec' />
            </div>
          </div>
        </div>
        <div className='respuesta-seccion'>
          <div>
            <RespuestaImagen Progreso={Progreso} imagen={imagen} setImagen={setImagen} data={data} Queselec={Queselec} indice={indice} setMomento={setMomento} momento={momento} className='imagen-respuesta-oracion' />
          </div>
        </div>
      </div>
    </div>
  )
}
