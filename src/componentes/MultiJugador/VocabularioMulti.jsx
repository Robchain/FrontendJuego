import React, { useState, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player';
import { Col, Row } from 'reactstrap'
import buentrabajo from '../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../assets/img/AssetsGame/Bad Jood.png'
import { resultadoVocaMulti } from '../../helpers/contador';
const ImagenDeCorrecto = ({ correcto, setPointerEvent, setMomento, setOpa1, setOpa2, setOpa3, ...props }) => {
  const [imagenRes, setImagenRes] = useState("")
  useEffect(() => {
    if (correcto === "INCORRECTO") {
      setPointerEvent("none"); 
      setMomento("respuesta");
      setImagenRes(malTrabajo)
    }
    if (correcto === "CORRECTO") {
      setPointerEvent("none"); 
      setMomento("respuesta");
      setImagenRes(buentrabajo)
    }
    if (correcto === "INICIAL") {
      setOpa1(0.4)
      setOpa2(0.4)
      setOpa3(0.4)
      setImagenRes("")
      setPointerEvent("none"); 
      setMomento("inicial");
    }
    if (correcto === "NADA") {
      setPointerEvent("auto"); setMomento("respuesta");

    }

  }, [correcto])
  return (
    <>
      {imagenRes.length > 2 && (<img src={imagenRes} alt='buen trabajo' {...props} />)}
    </>
  )
}

const VideosPreguntas = ({setcro, indice, data, videoActual, setPointerEvent, setOpa1, setOpa2, setOpa3, setVideoActual, playref, ...props }) => {
  let pregunta = "";
  const [videos, setVideos] = useState("")

  useEffect(() => {
    if (data[`Juego${indice}`].Palabras[0].Respuesta === "CORRECTO") {
      pregunta = data[`Juego${indice}`].Palabras[0].FilePregunta
    } else if (data[`Juego${indice}`].Palabras[1].Respuesta === "CORRECTO") {
      pregunta = data[`Juego${indice}`].Palabras[1].FilePregunta
    } else if (data[`Juego${indice}`].Palabras[2].Respuesta === "CORRECTO") {
      pregunta = data[`Juego${indice}`].Palabras[2].FilePregunta
    }
    setVideos([data[`Juego${indice}`].Palabras[0].FileMuestra, data[`Juego${indice}`].Palabras[1].FileMuestra, data[`Juego${indice}`].Palabras[2].FileMuestra, pregunta])
    return () => {
      setVideos([]);
    }
  }, [data])

  return <ReactPlayer 
  url={videos[videoActual]} 
  playing={true} 
  controls={true}
  onEnded={() => { if (3 === videoActual) { setPointerEvent("auto"); setOpa1(1); setOpa2(1); setOpa3(1);setcro("pregunta") } else { setVideoActual(videoActual + 1); } }} 
  {...props}
  />
}
const VideosRespuesta = ({setcro, siguiente,indice, data, playref, ...props }) => {
  const [videos, setvideos] = useState("");
  useEffect(() => {
    setcro('respuesta');
    if (data[`Juego${indice}`].Palabras[0].Respuesta === "CORRECTO") {
      setvideos(data[`Juego${indice}`].Palabras[0].FileMuestra)
    } else if (data[`Juego${indice}`].Palabras[1].Respuesta === "CORRECTO") {
      setvideos(data[`Juego${indice}`].Palabras[1].FileMuestra)
    } else if (data[`Juego${indice}`].Palabras[2].Respuesta === "CORRECTO") {
      setvideos(data[`Juego${indice}`].Palabras[2].FileMuestra)
    }
    return () => {
      setvideos("");
    }
  }, [data])
  return <ReactPlayer 
  url={videos} 
  playing={true} 
  controls={true}
  onEnded={siguiente}
  style={{ borderRadius: "20px" }}
   ref={playref}
    className="mb-1" 
   {...props}
  />
}
export const VocabularioMulti = ({ setcro, siguiente, indice, dataMultiJu, dispatchMutli }) => {
  const [opa1, setOpa1] = useState(0.4)
  const [opa2, setOpa2] = useState(0.4)
  const [opa3, setOpa3] = useState(0.4)
  const [videoActual, setVideoActual] = useState(0);
  const playref = useRef(null);
  const [correcto1, setCorrecto1] = useState(null)
  const [correcto2, setCorrecto2] = useState(null)
  const [correcto3, setCorrecto3] = useState(null)
  const [pointerEvent, setPointerEvent] = useState("none")
  const [momento, setMomento] = useState("inicial");

  return (
    <div className='contenedor-juego'>
    <div className='contenedor-juego'>
      <div className='video-juego-vocabulario'>
        {
          momento === "inicial" && <VideosPreguntas setcro={setcro} indice={indice} data={dataMultiJu} playref={playref} setOpa1={setOpa1} setOpa2={setOpa2} setOpa3={setOpa3} setPointerEvent={setPointerEvent} setVideoActual={setVideoActual} videoActual={videoActual} className='video-pregunta-vocabulario' />
        }
        {
          momento === "respuesta" && <VideosRespuesta setcro={setcro} siguiente={siguiente} indice={indice} data={dataMultiJu} playref={playref}  className='video-respuesta-vocabulario'/>
        }
      </div>
      <div className='opciones-juego-vocabulario' >
        <div style={{ pointerEvents: pointerEvent, opacity: opa1 }} onClick={() => { setCorrecto1(dataMultiJu[`Juego${indice}`].Palabras[0].Respuesta); dispatchMutli({ type: "PROGRESOVOCABULARIO", PalabraCorrecta: resultadoVocaMulti({ objeto1: dataMultiJu[`Juego${indice}`].Palabras[0], objeto2: dataMultiJu[`Juego${indice}`].Palabras[1], objeto3: dataMultiJu[`Juego${indice}`].Palabras[2] }), PalabraSeleccionada: dataMultiJu[`Juego${indice}`].Palabras[0].Palabra, Resultado: dataMultiJu[`Juego${indice}`].Palabras[0].Respuesta }); setCorrecto2("NADA"); setCorrecto3("NADA"); setOpa2(0.4); setOpa3(0.4); setVideoActual(0); }}>
          <div className='Mi-diseñodiv'>
            <div className='palabra'>
              <p>{dataMultiJu[`Juego${indice}`].Palabras[0].Palabra}</p>
            </div>
            <img className='juego-imagen-vocabulario' src={dataMultiJu[`Juego${indice}`].Palabras[0].FileImagen} alt={dataMultiJu[`Juego${indice}`].Palabras[0].Palabra} />
            <div >
              <ImagenDeCorrecto correcto={correcto1} setMomento={setMomento} setPointerEvent={setPointerEvent} setOpa1={setOpa1} setOpa2={setOpa2} setOpa3={setOpa3} className='imagen-respuesta' />
            </div>
          </div>
        </div>
        <div style={{ pointerEvents: pointerEvent, opacity: opa2 }} onClick={() => { setCorrecto2(dataMultiJu[`Juego${indice}`].Palabras[1].Respuesta); dispatchMutli({ type: "PROGRESOVOCABULARIO", PalabraCorrecta: resultadoVocaMulti({ objeto1: dataMultiJu[`Juego${indice}`].Palabras[0], objeto2: dataMultiJu[`Juego${indice}`].Palabras[1], objeto3: dataMultiJu[`Juego${indice}`].Palabras[2] }), PalabraSeleccionada: dataMultiJu[`Juego${indice}`].Palabras[1].Palabra, Resultado: dataMultiJu[`Juego${indice}`].Palabras[1].Respuesta }); setCorrecto1("NADA"); setCorrecto3("NADA"); setOpa1(0.4); setOpa3(0.4); setVideoActual(0); }}>
          <div className='Mi-diseñodiv'>
            <div className='palabra'>
              <p>{dataMultiJu[`Juego${indice}`].Palabras[1].Palabra}</p>
            </div>
            <img className='juego-imagen-vocabulario' src={dataMultiJu[`Juego${indice}`].Palabras[1].FileImagen} alt={dataMultiJu[`Juego${indice}`].Palabras[1].Palabra}  />
            <div >
              <ImagenDeCorrecto correcto={correcto2} setMomento={setMomento} setPointerEvent={setPointerEvent} setOpa1={setOpa1} setOpa2={setOpa2} setOpa3={setOpa3} className='imagen-respuesta' />
            </div>
          </div>
        </div>
        <div style={{ pointerEvents: pointerEvent, opacity: opa3 }} onClick={() => { setCorrecto3(dataMultiJu[`Juego${indice}`].Palabras[2].Respuesta); dispatchMutli({ type: "PROGRESOVOCABULARIO", PalabraCorrecta: resultadoVocaMulti({ objeto1: dataMultiJu[`Juego${indice}`].Palabras[0], objeto2: dataMultiJu[`Juego${indice}`].Palabras[1], objeto3: dataMultiJu[`Juego${indice}`].Palabras[2] }), PalabraSeleccionada: dataMultiJu[`Juego${indice}`].Palabras[2].Palabra, Resultado: dataMultiJu[`Juego${indice}`].Palabras[2].Respuesta }); setCorrecto2("NADA"); setCorrecto1("NADA"); setOpa1(0.4); setOpa2(0.4); setVideoActual(0); }}>
          <div className='Mi-diseñodiv'>
            <div className='palabra' >
              <p>{dataMultiJu[`Juego${indice}`].Palabras[2].Palabra}</p>
            </div>
            <img className='juego-imagen-vocabulario' src={dataMultiJu[`Juego${indice}`].Palabras[2].FileImagen} alt={dataMultiJu[`Juego${indice}`].Palabras[2].Palabra} />
            <div>
              <ImagenDeCorrecto correcto={correcto3} setMomento={setMomento} setPointerEvent={setPointerEvent} setOpa1={setOpa1} setOpa2={setOpa2} setOpa3={setOpa3} className='imagen-respuesta'/>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
