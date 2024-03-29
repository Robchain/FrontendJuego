import React, { useState, useEffect, useRef, useContext } from 'react';
import { Container } from 'reactstrap'
import ReactPlayer from 'react-player'
import buentrabajo from "../../../assets/img/AssetsGame/GOOD JOD.png"
import malTrabajo from "../../../assets/img/AssetsGame/Bad Jood.png"
import { useNavigate } from 'react-router-dom';
import { JuecoContext } from '../../../context/Juego/JuecoContext';
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego';
import { resultado } from '../../../helpers/contador';
const ImagenDeCorrecto = ({ correcto, setPointerEvent, setMomento, setOpa1, setOpa2, setOpa3, ...props }) => {
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
      setPointerEvent("auto"); setMomento("respuesta");
    }

  }, [correcto])
  return (
    <>
      {imagenRes.length > 2 && (<img src={imagenRes} alt='buen trabajo' {...props} />)}
    </>
  )
}
const VideosPreguntas = ({ data, videoActual, setPointerEvent, setOpa1, setOpa2, setOpa3, setVideoActual, playref , ...props}) => {
  const [videos, setVideos] = useState("")
  const navegar = useNavigate();

  useEffect(() => {
    if (data.length === 3) {
      let pregunta = "";
      for (let i = 0; i < data.length; i++) {
        if (data[i].Respuesta === 'CORRECTO') {
          pregunta = data[i].FilePregunta;
          break;
        }
      }
      setVideos([data[0].FileMuestra, data[1].FileMuestra, data[2].FileMuestra, pregunta])
    } else if (data.length < 3) {
      navegar(`/MenuJuego`);
    }
    return () => {
      setVideos([]);
    }
  }, [data])

  return (<>{data.length === 3 && <ReactPlayer url={videos[videoActual]} playing ref={playref}  onEnded={() => { if (3 === videoActual) { setPointerEvent("auto"); setOpa1(1); setOpa2(1); setOpa3(1) } else { setVideoActual(videoActual + 1); } }} {...props} />
  }</>)
}
const VideosRespuesta = ({ data, playref, ...props }) => {
  const [videos, setvideos] = useState("");
  useEffect(() => {
    let pregunta = "";
    for (let i = 0; i < data.length; i++) {
      if (data[i].Respuesta === 'CORRECTO') {
        pregunta = data[i].FileMuestra
        break;
      }
    }
    setvideos(pregunta)
    return () => {
      setvideos("");
    }

  }, [data])
  return <ReactPlayer url={videos} playing={true} style={{ borderRadius: "20px" }} ref={playref} className="mb-1" {...props} />
}

const Vocabulario = () => {
  const { resultados, avance0, progreso, dataJuegoVocabulario, piezaJuegoIndi } = useContext(JuecoContext);
  const [opa1, setOpa1] = useState(0.4)
  const [opa2, setOpa2] = useState(0.4)
  const [opa3, setOpa3] = useState(0.4)
  const playref = useRef(null);
  const navegar = useNavigate();
  const [correcto1, setCorrecto1] = useState(null)
  const [correcto2, setCorrecto2] = useState(null)
  const [correcto3, setCorrecto3] = useState(null)
  const [videoActual, setVideoActual] = useState(0);
  const [pointerEvent, setPointerEvent] = useState("none")
  const [momento, setMomento] = useState("inicial");
  const [windows, setWindows] = useState([
    { id: 1, show: false },
    { id: 2, show: false },
    { id: 3, show: false },
    { id: 4, show: false },
    { id: 5, show: false },
    { id: 6, show: false },
    { id: 7, show: false },
  ]);
  useEffect(() => {
    if (dataJuegoVocabulario === null) {

      navegar(`/MenuJuego`);
    }
  }, [])


  useEffect(() => {
    toggleWindow(1);
  }, [])




  const siguiente = (num) => {
    setCorrecto1("INICIAL");
    setCorrecto2("INICIAL");
    setCorrecto3("INICIAL");
    toggleWindow(num);

    if (num === piezaJuegoIndi && avance0.filter(obj => obj.Resultado === "CORRECTO").length === piezaJuegoIndi) {
      navegar(`/finalVocabulario`);
    } else if (num === piezaJuegoIndi + 1) {
      navegar(`/finalVocabulario`);
    } else {
      toggleWindow(num + 1);
    }
  }


  const toggleWindow = (id) => {
    let newWindows = [...windows];
    let window = newWindows.find(w => w.id === id);
    window.show = !window.show;
    setWindows(newWindows);
  }





  return (
    <>
      {
        dataJuegoVocabulario !== null ? (
          <div>
            {windows.map(window => (
              <div key={window.id}>
                {window.show && (
                  <Container className='fondoImagenVocabulario vh-100'>
                    <NavBarJuego Seccion={"Vocabulario"} urlBack={"/RompecabezaJV"} />
                    <div className="contenedor-juego">
                      <div className="puntaje-juego">
                        <p >Puntos: {`${avance0.filter(obj => obj.Resultado === "CORRECTO").length}`}</p>
                      </div> 
                      <div className='contenedor-juego'>
                      <div className='video-juego-vocabulario'>
                        {
                          momento === "inicial" && <VideosPreguntas pointerEvent={pointerEvent} progreso={progreso} siguiente={siguiente} window={window} data={dataJuegoVocabulario[`Juego${window.id}`].Palabras} playref={playref} setOpa1={setOpa1} setOpa2={setOpa2} setOpa3={setOpa3} setPointerEvent={setPointerEvent} setVideoActual={setVideoActual} videoActual={videoActual}  className='video-pregunta-vocabulario'/>
                        }
                        {
                          momento === "respuesta" && <VideosRespuesta window={window} data={dataJuegoVocabulario[`Juego${window.id}`].Palabras} playref={playref} className='video-respuesta-vocabulario' />
                        }
                      </div>
                      <div className='opciones-juego-vocabulario' >
                        <div style={{ pointerEvents: pointerEvent, opacity: opa1 }} onClick={() => { setCorrecto1(dataJuegoVocabulario[`Juego` + window.id].Palabras[0].Respuesta); resultados(dataJuegoVocabulario[`Juego` + window.id].Palabras[0].Palabra, dataJuegoVocabulario[`Juego` + window.id].Palabras[0].Respuesta); setCorrecto2("NADA"); setCorrecto3("NADA"); setOpa2(0.4); setOpa3(0.4); progreso({ palabraCorrecta: resultado({ objeto1: dataJuegoVocabulario[`Juego` + window.id].Palabras[0], objeto2: dataJuegoVocabulario[`Juego` + window.id].Palabras[1], objeto3: dataJuegoVocabulario[`Juego` + window.id].Palabras[2] }), selecionado: dataJuegoVocabulario[`Juego` + window.id].Palabras[0].Palabra, Resul: dataJuegoVocabulario[`Juego` + window.id].Palabras[0].Respuesta }); setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000); setVideoActual(0); }} >
                          <div className='Mi-diseñodiv'>
                            <div className='palabra'>
                              <p>{dataJuegoVocabulario[`Juego` + window.id].Palabras[0].Palabra}</p>
                            </div>
                            <img className='juego-imagen-vocabulario' src={dataJuegoVocabulario[`Juego` + window.id].Palabras[0].FileImagen} alt={dataJuegoVocabulario[`Juego` + window.id].Palabras[0].Palabra} />
                            <div>
                              <ImagenDeCorrecto correcto={correcto1} setMomento={setMomento} setPointerEvent={setPointerEvent} setOpa1={setOpa1} setOpa2={setOpa2} setOpa3={setOpa3} className='imagen-respuesta' />
                            </div>
                          </div>
                        </div>
                        <div style={{ pointerEvents: pointerEvent, opacity: opa2 }} onClick={() => { setCorrecto2(dataJuegoVocabulario[`Juego` + window.id].Palabras[1].Respuesta); resultados(dataJuegoVocabulario[`Juego` + window.id].Palabras[1].Palabra, dataJuegoVocabulario[`Juego` + window.id].Palabras[1].Respuesta); setCorrecto1("NADA"); setCorrecto3("NADA"); setOpa1(0.4); setOpa3(0.4); progreso({ palabraCorrecta: resultado({ objeto1: dataJuegoVocabulario[`Juego` + window.id].Palabras[0], objeto2: dataJuegoVocabulario[`Juego` + window.id].Palabras[1], objeto3: dataJuegoVocabulario[`Juego` + window.id].Palabras[2] }), selecionado: dataJuegoVocabulario[`Juego` + window.id].Palabras[1].Palabra, Resul: dataJuegoVocabulario[`Juego` + window.id].Palabras[1].Respuesta }); setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000); setVideoActual(0); }}>
                          <div className='Mi-diseñodiv'>
                            <div className='palabra'>
                              <p>{dataJuegoVocabulario[`Juego` + window.id].Palabras[1].Palabra}</p>
                            </div>
                            <img className='juego-imagen-vocabulario' src={dataJuegoVocabulario[`Juego` + window.id].Palabras[1].FileImagen} alt={dataJuegoVocabulario[`Juego` + window.id].Palabras[1].Palabra} width='200' />
                            <div>
                              <ImagenDeCorrecto correcto={correcto2} setMomento={setMomento} setPointerEvent={setPointerEvent} setOpa1={setOpa1} setOpa2={setOpa2} setOpa3={setOpa3} className='imagen-respuesta' />
                            </div>
                          </div>
                        </div>
                        <div style={{ pointerEvents: pointerEvent, opacity: opa3 }} onClick={() => { setCorrecto3(dataJuegoVocabulario[`Juego` + window.id].Palabras[2].Respuesta); resultados(dataJuegoVocabulario[`Juego` + window.id].Palabras[2].Palabra, dataJuegoVocabulario[`Juego` + window.id].Palabras[2].Respuesta); setCorrecto2("NADA"); setCorrecto1("NADA"); setOpa1(0.4); setOpa2(0.4); progreso({ palabraCorrecta: resultado({ objeto1: dataJuegoVocabulario[`Juego` + window.id].Palabras[0], objeto2: dataJuegoVocabulario[`Juego` + window.id].Palabras[1], objeto3: dataJuegoVocabulario[`Juego` + window.id].Palabras[2] }), selecionado: dataJuegoVocabulario[`Juego` + window.id].Palabras[2].Palabra, Resul: dataJuegoVocabulario[`Juego` + window.id].Palabras[2].Respuesta }); setTimeout(() => { siguiente(window.id) },/*playref.current.getDuration()*1900*/ 9000); setVideoActual(0); }}>
                          <div className='Mi-diseñodiv'>
                            <div className='palabra'>
                              <p>{dataJuegoVocabulario[`Juego` + window.id].Palabras[2].Palabra}</p>
                            </div>
                            <img className='juego-imagen-vocabulario' src={dataJuegoVocabulario[`Juego` + window.id].Palabras[2].FileImagen} alt={dataJuegoVocabulario[`Juego` + window.id].Palabras[2].Palabra} width='200' />
                            <div>
                              <ImagenDeCorrecto correcto={correcto3} setMomento={setMomento} setPointerEvent={setPointerEvent} setOpa1={setOpa1} setOpa2={setOpa2} setOpa3={setOpa3} className='imagen-respuesta' />
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
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
