import React, { useState, useEffect, useRef, useContext } from 'react';
import { Container, Row, Col } from 'reactstrap'
import ReactPlayer from 'react-player'
import buentrabajo from "../../../assets/img/AssetsGame/GOOD JOD.png"
import malTrabajo from "../../../assets/img/AssetsGame/Bad Jood.png"
import { useNavigate, useParams } from 'react-router-dom';
import { JuecoContext } from '../../../context/Juego/JuecoContext';
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego';
const ImagenDeCorrecto = ({ correcto, setPointerEvent, setMomento, setOpa1, setOpa2, setOpa3    }) => {
  const [imagenRes, setImagenRes] = useState("")
  useEffect(() => {
    if(correcto === "INCORRECTO" ){
      setPointerEvent("none"); setMomento("respuesta");
      setImagenRes(malTrabajo)
    }
    if(correcto === "CORRECTO" ){
      setPointerEvent("none"); setMomento("respuesta");
      setImagenRes(buentrabajo)
    }
    if(correcto === "INICIAL" ){
    setOpa1(0.4)
      setOpa2(0.4)
      setOpa3(0.4)
    
    setPointerEvent("none"); setMomento("inicial");
    }
    if(correcto === "NADA" ){
      /*  setOpa1(0.4)
        setOpa2(0.4)
        setOpa3(0.4)
         */
        setPointerEvent("auto"); setMomento("respuesta");
   
      }
    
  }, [correcto])
    return (
      <>
      {imagenRes.length >2 && (<img src={imagenRes} width='100' alt='buen trabajo' />)}
      </>
    )
}
const VideosPreguntas = ({window, id, data, videoActual, setPointerEvent,  setOpa1, setOpa2, setOpa3, setVideoActual, playref }) => {
  let pregunta = "";
  const [videos, setVideos] = useState("")
  
  useEffect(() => {
    if (data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra1.Respuesta === "CORRECTO") {
      pregunta = data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra1.FilePregunta
    } else if (data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra2.Respuesta === "CORRECTO") {
      pregunta = data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra2.FilePregunta
    } else if (data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra3.Respuesta === "CORRECTO") {
      pregunta = data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra3.FilePregunta
    }
    setVideos([data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra1.FileMuestra, data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra2.FileMuestra, data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra3.FileMuestra, pregunta])
    return () => {  
      setVideos([]);
    }
  }, [data])

  return <ReactPlayer url={videos[videoActual]}  playing ref={playref} width={450} onEnded={() => { if (3 === videoActual) { setPointerEvent("auto");setOpa1(1); setOpa2(1); setOpa3(1) }else{setVideoActual(videoActual + 1);}  }} />
}

const Vocabulario = () => {
  const [windows, setWindows] = useState([
    { id: 1, show: false },
    { id: 2, show: false },
    { id: 3, show: false },
    { id: 4, show: false },
    { id: 5, show: false },
    { id: 6, show: false },
    { id: 7, show: false },
  ]);
  const navegar = useNavigate();
  const [videoActual, setVideoActual] = useState(0);
  const toggleWindow = (id) => {
    // Crear una copia del arreglo de ventanas
    let newWindows = [...windows];
    // Encontrar la ventana con el id especificado
    let window = newWindows.find(w => w.id === id);
    // Invertir el valor de show
    window.show = !window.show;
    // Actualizar el arreglo de ventanas
    setWindows(newWindows);
  }
  const { id } = useParams();
  const { data, resultados, datoVocabulario, avance0, progreso } = useContext(JuecoContext);
  const [opa1, setOpa1] = useState(0.4)
  const [opa2, setOpa2] = useState(0.4)
  const [opa3, setOpa3] = useState(0.4)
  const playref = useRef(null);
  const [correcto1, setCorrecto1] = useState(null)
  const [correcto2, setCorrecto2] = useState(null)
  const [correcto3, setCorrecto3] = useState(null)
  const [pointerEvent, setPointerEvent] = useState("none")
  const [momento, setMomento] = useState("inicial");
  useEffect(() => {
    datoVocabulario(localStorage.getItem("Usuario"))
  }, [])


  useEffect(() => {
    toggleWindow(1);
  }, [])



  const siguiente = (num) => {
    setCorrecto1("INICIAL");
    setCorrecto2("INICIAL");
    setCorrecto3("INICIAL");
    toggleWindow(num);
    if (num === data[`Juego${id}`].Partida.Rompecabeza.Pieza + 1) {
      navegar(`/finalVocabulario/${id}`);
    } else {
      toggleWindow(num + 1);
    }
  }
  const videosRespuesta = (window) => {
    let videos;
    if (data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra1.Respuesta === "CORRECTO") {
      videos = data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra1.FileMuestra
    } else if (data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra2.Respuesta === "CORRECTO") {
      videos = data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra2.FileMuestra
    } else if (data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra3.Respuesta === "CORRECTO") {
      videos = data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra3.FileMuestra
    }
    return <ReactPlayer url={videos} playing={true} style={{ borderRadius: "20px" }} ref={playref} className="mb-1" width={450}
    />
  }

 

 


  return (
    <>
    {
      data !== null ? (
        <div>
        {windows.map(window => (
          <div key={1}>
            {window.show && (
              <Container className='fondoImagenVocabulario vh-100'>
                <NavBarJuego Seccion={"Vocabulario"} urlBack={"/RompecabezaJV"} />
                <Row className="d-flex justify-content-around align-items-center">
                  <Col lg="12" className="d-flex justify-content-end "><h3>Puntos: {`${avance0.filter(obj => obj.Resultado === "CORRECTO").length}`}</h3></Col>
                  <Col lg="6">
                    {
                      momento === "inicial" && <VideosPreguntas window={window} data={data} id={id} playref={playref} setOpa1={setOpa1} setOpa2={setOpa2}  setOpa3={setOpa3} setPointerEvent={setPointerEvent} setVideoActual={setVideoActual} videoActual={videoActual} />
                    }
                    {
                      momento === "respuesta" && videosRespuesta(window)
                    }
                  </Col>{
                    <Col className='mt-1  align-items-end' lg="6">
                    <div style={{ pointerEvents: pointerEvent, opacity: opa1 }} className='m-auto Mi-diseñodiv' onClick={() => { setCorrecto1(data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra1.Respuesta); resultados(data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra1.Palabra, data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra1.Respuesta); setCorrecto2("NADA"); setCorrecto3("NADA");setOpa2(0.4); setOpa3(0.4); progreso(data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra1.Palabra, data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra1.Respuesta, window);  setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000); setVideoActual(0); }} >
                      <div style={{ width: "77px" }}><p style={{ fontWeight: 'bold', fontSize: '2vw', color: '#8B8B8C' }}>{data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra1.Palabra}</p></div>
                      <img style={{borderRadius:"15px"}} src={data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra1.FileImagen} alt={data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra1.Palabra} width='200' />
                      <div style={{ width: 100, height: 130 }}><ImagenDeCorrecto correcto={correcto1} setMomento={setMomento} setPointerEvent={setPointerEvent} setOpa1={setOpa1}  setOpa2={setOpa2} setOpa3={setOpa3}/></div>
                    </div>
                    <div style={{ pointerEvents: pointerEvent, opacity: opa2 }} className='m-auto Mi-diseñodiv' onClick={() => { setCorrecto2(data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra2.Respuesta); resultados(data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra2.Palabra, data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra2.Respuesta); setCorrecto1("NADA"); setCorrecto3("NADA"); setOpa1(0.4); setOpa3(0.4); progreso(data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra2.Palabra, data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra2.Respuesta, window); setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000); setVideoActual(0); }}>
                      <div style={{ width: "77px" }}> <p style={{ fontWeight: 'bold', fontSize: '2vw', color: '#8B8B8C' }}>{data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra2.Palabra}</p></div>
                      <img style={{borderRadius:"15px"}} src={data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra2.FileImagen} alt={data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra2.Palabra} width='200' />
                      <div style={{ width: 100, height: 130 }}><ImagenDeCorrecto correcto={correcto2} setMomento={setMomento} setPointerEvent={setPointerEvent}   setOpa1={setOpa1}  setOpa2={setOpa2} setOpa3={setOpa3}/></div>
                    </div>
                    <div style={{ pointerEvents: pointerEvent, opacity: opa3 }} className='m-auto Mi-diseñodiv' onClick={() => { setCorrecto3(data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra3.Respuesta); resultados(data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra3.Palabra, data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra3.Respuesta); setCorrecto2("NADA"); setCorrecto1("NADA"); setOpa1(0.4); setOpa2(0.4); progreso(data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra3.Palabra, data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra3.Respuesta, window); setTimeout(() => { siguiente(window.id) },/*playref.current.getDuration()*1900*/ 9000); setVideoActual(0); }}>
                      <div style={{ width: "77px" }}> <p style={{ fontWeight: 'bold', fontSize: '2vw', color: '#8B8B8C' }}>{data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra3.Palabra}</p></div>
                      <img style={{borderRadius:"15px"}} src={data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra3.FileImagen} alt={data[`Juego${id}`].Partida[`Juego` + window.id].vocabulario.Palabra3.Palabra} width='200' />
                      <div style={{ width: 100, height: 130 }}><ImagenDeCorrecto correcto={correcto3} setMomento={setMomento} setPointerEvent={setPointerEvent} setOpa1={setOpa1}  setOpa2={setOpa2} setOpa3={setOpa3} /></div>
                    </div>
                  </Col>
                  }
                </Row>
              </Container>
            )}
          </div>
        ))
        }
      </div>
      ) : <><>Cargando...</></>
    }
    </>)
}

export default Vocabulario;