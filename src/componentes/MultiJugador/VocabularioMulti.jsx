import React,{useState, useEffect, useRef} from 'react'
import ReactPlayer from 'react-player';
import { Col, Row } from 'reactstrap'

const VideosPreguntas = ({window, id, data, videoActual, setPointerEvent,  setOpa1, setOpa2, setOpa3, setVideoActual, playref }) => {
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

  return <ReactPlayer url={videos[videoActual]}  playing ref={playref} width={450} onEnded={() => { if (3 === videoActual) { setPointerEvent("auto");setOpa1(1); setOpa2(1); setOpa3(1) }else{setVideoActual(videoActual + 1);}  }} />
}
const VideosRespuesta = ({window, id, data,playref  }) => {
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
export const VocabularioMulti = ({id, siguiente, window, InfoEstudiaSituacion}) => {
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
                      momento === "inicial" && <VideosPreguntas window={window} data={InfoEstudiaSituacion} id={id} playref={playref} setOpa1={setOpa1} setOpa2={setOpa2}  setOpa3={setOpa3} setPointerEvent={setPointerEvent} setVideoActual={setVideoActual} videoActual={videoActual} />
                    }
                    {
                      momento === "respuesta" && <VideosRespuesta window={window} data={InfoEstudiaSituacion} id={id} playref={playref} />
                    }
                  </Col>
                  <Col className='mt-1  align-items-end' lg="6">
                    <div style={{ pointerEvents: pointerEvent, opacity: opa1 }} className='m-auto Mi-diseñodiv' onClick={()=>{console.log("a")}}>

                    </div>
                    <div  style={{ pointerEvents: pointerEvent, opacity: opa2 }} className='m-auto Mi-diseñodiv' onClick={()=>{console.log("a")}}>

                    </div>
                    <div style={{ pointerEvents: pointerEvent, opacity: opa3 }} className='m-auto Mi-diseñodiv'  onClick={()=>{console.log("a")}}>

                    </div>
                  </Col>
    </Row>
  )
}
