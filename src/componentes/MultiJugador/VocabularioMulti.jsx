import React, { useState, useEffect, useRef, useContext } from 'react'
import ReactPlayer from 'react-player';
import { Col, Row } from 'reactstrap'
import buentrabajo from '../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../assets/img/AssetsGame/Bad Jood.png'
import { JuecoContext } from '../../context/Juego/JuecoContext';
const ImagenDeCorrecto = ({ correcto, setPointerEvent, setMomento, setOpa1, setOpa2, setOpa3 }) => {
  const [imagenRes, setImagenRes] = useState("")
  useEffect(() => {
    if (correcto === "INCORRECTO") {
      setPointerEvent("none"); setMomento("respuesta");
      setImagenRes(malTrabajo)
    }
    if (correcto === "CORRECTO") {
      setPointerEvent("none"); setMomento("respuesta");
      setImagenRes(buentrabajo)
    }
    if (correcto === "INICIAL") {
      setOpa1(0.4)
      setOpa2(0.4)
      setOpa3(0.4)

      setPointerEvent("none"); setMomento("inicial");
    }
    if (correcto === "NADA") {
      /*  setOpa1(0.4)
        setOpa2(0.4)
        setOpa3(0.4)
         */
      setPointerEvent("auto"); setMomento("respuesta");

    }

  }, [correcto])
  return (
    <>
      {imagenRes.length > 2 && (<img src={imagenRes} width='100' alt='buen trabajo' />)}
    </>
  )
}

const VideosPreguntas = ({ window, id, data, videoActual, setPointerEvent, setOpa1, setOpa2, setOpa3, setVideoActual, playref }) => {
  let pregunta = "";
  const [videos, setVideos] = useState("")

  useEffect(() => {
    if (data.Juegos[id][`Juego${window.id}`].vocabulario.Palabra1.Respuesta === "CORRECTO") {
      pregunta = data.Juegos[id][`Juego${window.id}`].vocabulario.Palabra1.FilePregunta
    } else if (data.Juegos[id][`Juego${window.id}`].vocabulario.Palabra2.Respuesta === "CORRECTO") {
      pregunta = data.Juegos[id][`Juego${window.id}`].vocabulario.Palabra2.FilePregunta
    } else if (data.Juegos[id][`Juego${window.id}`].vocabulario.Palabra3.Respuesta === "CORRECTO") {
      pregunta = data.Juegos[id][`Juego${window.id}`].vocabulario.Palabra3.FilePregunta
    }
    setVideos([data.Juegos[id][`Juego${window.id}`].vocabulario.Palabra1.FileMuestra, data.Juegos[id][`Juego${window.id}`].vocabulario.Palabra2.FileMuestra, data.Juegos[id][`Juego${window.id}`].vocabulario.Palabra3.FileMuestra, pregunta])
    return () => {
      setVideos([]);
    }
  }, [data])

  return <ReactPlayer url={videos[videoActual]} playing ref={playref} width={450} onEnded={() => { if (3 === videoActual) { setPointerEvent("auto"); setOpa1(1); setOpa2(1); setOpa3(1) } else { setVideoActual(videoActual + 1); } }} />
}
const VideosRespuesta = ({ window, id, data, playref }) => {
  const [videos, setvideos] = useState("");
  useEffect(() => {
    if (data.Juegos[id][`Juego${window.id}`].vocabulario.Palabra1.Respuesta === "CORRECTO") {
      setvideos(data.Juegos[id][`Juego${window.id}`].vocabulario.Palabra1.FileMuestra)
    } else if (data.Juegos[id][`Juego${window.id}`].vocabulario.Palabra2.Respuesta === "CORRECTO") {
      setvideos(data.Juegos[id][`Juego${window.id}`].vocabulario.Palabra2.FileMuestra)
    } else if (data.Juegos[id][`Juego${window.id}`].vocabulario.Palabra3.Respuesta === "CORRECTO") {
      setvideos(data.Juegos[id][`Juego${window.id}`].vocabulario.Palabra3.FileMuestra)
    }
    return () => {
      setvideos("");
    }
  }, [data])
  return <ReactPlayer url={videos} playing={true} style={{ borderRadius: "20px" }} ref={playref} className="mb-1" width={450}
  />
}
export const VocabularioMulti = ({ id, siguiente, window, InfoEstudiaSituacion, dispatchMutli }) => {
  const {MultiProgreso} =  useContext(JuecoContext)
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
    <Row className="d-flex justify-content-around align-items-center">
      <Col lg="6">
        {
          momento === "inicial" && <VideosPreguntas window={window} data={InfoEstudiaSituacion} id={id} playref={playref} setOpa1={setOpa1} setOpa2={setOpa2} setOpa3={setOpa3} setPointerEvent={setPointerEvent} setVideoActual={setVideoActual} videoActual={videoActual} />
        }
        {
          momento === "respuesta" && <VideosRespuesta window={window} data={InfoEstudiaSituacion} id={id} playref={playref} />
        }
      </Col>
      <Col className='mt-1  align-items-end' lg="6">
        <div style={{ pointerEvents: pointerEvent, opacity: opa1 }} className='m-auto Mi-diseñodiv' onClick={() => { setCorrecto1(InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].vocabulario.Palabra1.Respuesta); dispatchMutli({type:"PROGRESO", PalabraCorrecta:"",PalabraSeleccionada:InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].vocabulario.Palabra1.Palabra, Resultado:InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].vocabulario.Palabra1.Respuesta}); setCorrecto2("NADA"); setCorrecto3("NADA");setOpa2(0.4); setOpa3(0.4);setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000); setVideoActual(0);}}>
          <div style={{ width: "77px" }}><p style={{ fontWeight: 'bold', fontSize: '2vw', color: '#8B8B8C' }}>{InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].vocabulario.Palabra1.Palabra}</p></div>
          <img style={{ borderRadius: "15px" }} src={InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].vocabulario.Palabra1.FileImagen} alt={InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].vocabulario.Palabra1.Palabra} width='200'/>
          <div style={{ width: 100, height: 130 }}><ImagenDeCorrecto correcto={correcto1} setMomento={setMomento} setPointerEvent={setPointerEvent}   setOpa1={setOpa1}  setOpa2={setOpa2} setOpa3={setOpa3}/></div>
        </div>
        <div style={{ pointerEvents: pointerEvent, opacity: opa2 }} className='m-auto Mi-diseñodiv' onClick={() => { setCorrecto2(InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].vocabulario.Palabra2.Respuesta); dispatchMutli({type:"PROGRESO", PalabraCorrecta:"",PalabraSeleccionada:InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].vocabulario.Palabra2.Palabra, Resultado:InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].vocabulario.Palabra2.Respuesta}); setCorrecto1("NADA"); setCorrecto3("NADA"); setOpa1(0.4); setOpa3(0.4);setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000); setVideoActual(0); }}>
          <div style={{ width: "77px" }}  ><p style={{ fontWeight: 'bold', fontSize: '2vw', color: '#8B8B8C' }}>{InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].vocabulario.Palabra2.Palabra}</p></div>
          <img style={{ borderRadius: "15px" }} src={InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].vocabulario.Palabra2.FileImagen} alt={InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].vocabulario.Palabra2.Palabra} width='200' />
          <div style={{ width: 100, height: 130 }}><ImagenDeCorrecto correcto={correcto2} setMomento={setMomento} setPointerEvent={setPointerEvent}   setOpa1={setOpa1}  setOpa2={setOpa2} setOpa3={setOpa3}/></div>
        </div>
        <div style={{ pointerEvents: pointerEvent, opacity: opa3 }} className='m-auto Mi-diseñodiv' onClick={() => { setCorrecto3(InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].vocabulario.Palabra3.Respuesta); dispatchMutli({type:"PROGRESO", PalabraCorrecta:"",PalabraSeleccionada:InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].vocabulario.Palabra3.Palabra, Resultado:InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].vocabulario.Palabra3.Respuesta}); setCorrecto2("NADA"); setCorrecto1("NADA"); setOpa1(0.4); setOpa2(0.4);setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000); setVideoActual(0); }}>
          <div style={{ width: "77px" }}><p style={{ fontWeight: 'bold', fontSize: '2vw', color: '#8B8B8C' }}>{InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].vocabulario.Palabra3.Palabra}</p></div>
          <img style={{ borderRadius: "15px" }} src={InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].vocabulario.Palabra3.FileImagen} alt={InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].vocabulario.Palabra3.Palabra} width='200' />
          <div style={{ width: 100, height: 130 }}><ImagenDeCorrecto correcto={correcto3} setMomento={setMomento} setPointerEvent={setPointerEvent}   setOpa1={setOpa1}  setOpa2={setOpa2} setOpa3={setOpa3}/></div>
        </div>
      </Col>
    </Row>
  )
}
