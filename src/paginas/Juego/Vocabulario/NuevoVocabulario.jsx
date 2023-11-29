import React, { useState, useEffect, useRef, useContext } from 'react';
import { Container } from 'reactstrap'
import ReactPlayer from 'react-player'
import buentrabajo from "../../../assets/img/AssetsGame/GOOD JOD.png"
import malTrabajo from "../../../assets/img/AssetsGame/Bad Jood.png"
import { useNavigate } from 'react-router-dom';
import { JuecoContext } from '../../../context/Juego/JuecoContext';
import { PiCoinVerticalDuotone } from "react-icons/pi";
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego';
import { resultado } from '../../../helpers/contador';
import Cronometro from '../../../componentes/JuegoComponent/JuegoGeneral/Cronometro';
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
        setPointerEvent("none"); setMomento("respuesta");
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
  
    return (<>{data.length === 3 && <ReactPlayer url={videos[videoActual]} controls={true} playing={true}  onEnded={() => { if (3 === videoActual) { setPointerEvent("auto"); setOpa1(1); setOpa2(1); setOpa3(1) } else { setVideoActual(videoActual + 1); } }} {...props} />
    }</>)
  }
  const VideosRespuesta = ({ data, playref,siguienteObjeto, ...props }) => {
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
    return <ReactPlayer url={videos} playing={true} controls={true} onEnded={siguienteObjeto} style={{ borderRadius: "20px" }} ref={playref} className="mb-1" {...props} />
  }
export const NuevoVocabulario = () => {
    const {  avance0, progreso, dataJuegoVocabulario, piezaJuegoIndi } = useContext(JuecoContext);
    const [opa1, setOpa1] = useState(0.4)
  const [opa2, setOpa2] = useState(0.4)
  const [opa3, setOpa3] = useState(0.4)
  const [rango, setRango] = useState(piezaJuegoIndi+1);
  const playref = useRef(null);
  const navegar = useNavigate();
  const [correcto1, setCorrecto1] = useState(null)
  const [correcto2, setCorrecto2] = useState(null)
  const [correcto3, setCorrecto3] = useState(null)
  const [videoActual, setVideoActual] = useState(0);
  const [pointerEvent, setPointerEvent] = useState("none")
  const [momento, setMomento] = useState("inicial");
  
  const [indice, setIndice] = useState(1);

  // Función para avanzar al siguiente objeto en el array
  const siguienteObjeto = () => {
    if(indice === rango){
        navegar(`/finalVocabulario`);
    }
    setOpa1(0.4)
    setOpa2(0.4)
    setOpa3(0.4)
    setPointerEvent("none"); 
    setMomento("inicial");   
    setCorrecto1("INICIAL")
    setCorrecto2("INICIAL")
    setCorrecto3("INICIAL")
    setIndice((prevIndice) => (prevIndice % rango) + 1);
        
  };

  // Función para manejar la transición automática al siguiente objeto después de un tiempo
  const avanzarAutomaticamente = () => {
    if(dataJuegoVocabulario!=null){
      progreso({ palabraCorrecta: resultado({ objeto1: dataJuegoVocabulario[`Juego` + indice].Palabras[0], objeto2: dataJuegoVocabulario[`Juego` + indice].Palabras[1], objeto3: dataJuegoVocabulario[`Juego` + indice].Palabras[2] }), selecionado: "---", Resul: "NO CONTESTO" });
    }
    if(indice === rango){
      navegar(`/finalVocabulario`);
  }
    setOpa1(0.4)
    setOpa2(0.4)
    setOpa3(0.4)
    setPointerEvent("none"); 
    setMomento("inicial");
    setCorrecto1("INICIAL")
    setCorrecto2("INICIAL")
    setCorrecto3("INICIAL")
    setVideoActual(0);

    setIndice((prevIndice) => (prevIndice % rango) + 1);
  };

  // Establecer un temporizador para avanzar automáticamente después de un tiempo
  useEffect(() => {
    const temporizador = setTimeout(avanzarAutomaticamente, /*60000*/ 120000); // 5000 milisegundos (5 segundos)
    // Limpiar el temporizador al desmontar el componente o cambiar de objeto manualmente
    return () => clearTimeout(temporizador);
  }, [indice, rango]);

  useEffect(() => {
    if (dataJuegoVocabulario === null) {

      navegar(`/MenuJuego`);
    }
  }, [])


  return (
    <>
      {
        (dataJuegoVocabulario !== null ) && indice !== NaN ? (
          <div>
              <div key={'dasd'}>
                  <Container className='fondoImagenVocabulario vh-100'>
                    <NavBarJuego Seccion={"Vocabulario"} urlBack={"/RompecabezaJV"} />
                    <div className="contenedor-juego">
                      <div className="puntaje-cronometro">
                      <div className='cronometro-juego'>
                      <Cronometro minutosInicio={2} reiniciarCronometro={indice}/>
                      </div>
                      <div className="puntaje-juego">
                        <p>Puntos: {`${avance0.filter(obj => obj.Resultado === "CORRECTO").length}`}<PiCoinVerticalDuotone /> </p>
                      </div>
                      </div>
                      <div className='contenedor-juego'>
                      <div className='video-juego-vocabulario'>
                        {
                          momento === "inicial" && <VideosPreguntas pointerEvent={pointerEvent} progreso={progreso} data={dataJuegoVocabulario[`Juego${indice}`].Palabras} playref={playref} setOpa1={setOpa1} setOpa2={setOpa2} setOpa3={setOpa3} setPointerEvent={setPointerEvent} setVideoActual={setVideoActual} videoActual={videoActual}  className='video-pregunta-vocabulario'/>
                        }
                        {
                          momento === "respuesta" && <VideosRespuesta data={dataJuegoVocabulario[`Juego${indice}`].Palabras} playref={playref} siguienteObjeto={siguienteObjeto} className='video-respuesta-vocabulario'  />
                        }
                      </div>

                      <div className='opciones-juego-vocabulario' >
                        <div style={{ pointerEvents: pointerEvent, opacity: opa1 }} onClick={() => { setCorrecto1(dataJuegoVocabulario[`Juego` + indice].Palabras[0].Respuesta);  setCorrecto2("NADA"); setCorrecto3("NADA"); setOpa2(0.4); setOpa3(0.4); progreso({ palabraCorrecta: resultado({ objeto1: dataJuegoVocabulario[`Juego` + indice].Palabras[0], objeto2: dataJuegoVocabulario[`Juego` + indice].Palabras[1], objeto3: dataJuegoVocabulario[`Juego` + indice].Palabras[2] }), selecionado: dataJuegoVocabulario[`Juego` + indice].Palabras[0].Palabra, Resul: dataJuegoVocabulario[`Juego` + indice].Palabras[0].Respuesta }); setVideoActual(0); }} >
                          <div className='Mi-diseñodiv'>
                            <div className='palabra'>
                              <p>{dataJuegoVocabulario[`Juego` + indice].Palabras[0].Palabra}</p>
                            </div>
                            <img className='juego-imagen-vocabulario' src={dataJuegoVocabulario[`Juego` + indice].Palabras[0].FileImagen} alt={dataJuegoVocabulario[`Juego` + indice].Palabras[0].Palabra} />
                            <div>
                              <ImagenDeCorrecto correcto={correcto1} setMomento={setMomento} setPointerEvent={setPointerEvent} setOpa1={setOpa1} setOpa2={setOpa2} setOpa3={setOpa3} className='imagen-respuesta' />
                            </div>
                          </div>
                        </div>
                        <div style={{ pointerEvents: pointerEvent, opacity: opa2 }} onClick={() => { setCorrecto2(dataJuegoVocabulario[`Juego` + indice].Palabras[1].Respuesta);  setCorrecto1("NADA"); setCorrecto3("NADA"); setOpa1(0.4); setOpa3(0.4); progreso({ palabraCorrecta: resultado({ objeto1: dataJuegoVocabulario[`Juego` + indice].Palabras[0], objeto2: dataJuegoVocabulario[`Juego` + indice].Palabras[1], objeto3: dataJuegoVocabulario[`Juego` + indice].Palabras[2] }), selecionado: dataJuegoVocabulario[`Juego` + indice].Palabras[1].Palabra, Resul: dataJuegoVocabulario[`Juego` + indice].Palabras[1].Respuesta }); setVideoActual(0); }}>
                          <div className='Mi-diseñodiv'>
                            <div className='palabra'>
                              <p>{dataJuegoVocabulario[`Juego` + indice].Palabras[1].Palabra}</p>
                            </div>
                            <img className='juego-imagen-vocabulario' src={dataJuegoVocabulario[`Juego` + indice].Palabras[1].FileImagen} alt={dataJuegoVocabulario[`Juego` + indice].Palabras[1].Palabra} width='200' />
                            <div>
                              <ImagenDeCorrecto correcto={correcto2} setMomento={setMomento} setPointerEvent={setPointerEvent} setOpa1={setOpa1} setOpa2={setOpa2} setOpa3={setOpa3} className='imagen-respuesta' />
                            </div>
                          </div>
                        </div>
                        <div style={{ pointerEvents: pointerEvent, opacity: opa3 }} onClick={() => { setCorrecto3(dataJuegoVocabulario[`Juego` + indice].Palabras[2].Respuesta); setCorrecto2("NADA"); setCorrecto1("NADA"); setOpa1(0.4); setOpa2(0.4); progreso({ palabraCorrecta: resultado({ objeto1: dataJuegoVocabulario[`Juego` + indice].Palabras[0], objeto2: dataJuegoVocabulario[`Juego` + indice].Palabras[1], objeto3: dataJuegoVocabulario[`Juego` + indice].Palabras[2] }), selecionado: dataJuegoVocabulario[`Juego` + indice].Palabras[2].Palabra, Resul: dataJuegoVocabulario[`Juego` + indice].Palabras[2].Respuesta });  setVideoActual(0); }}>
                          <div className='Mi-diseñodiv'>
                            <div className='palabra'>
                              <p>{dataJuegoVocabulario[`Juego` + indice].Palabras[2].Palabra}</p>
                            </div>
                            <img className='juego-imagen-vocabulario' src={dataJuegoVocabulario[`Juego` + indice].Palabras[2].FileImagen} alt={dataJuegoVocabulario[`Juego` + indice].Palabras[2].Palabra} width='200' />
                            <div>
                              <ImagenDeCorrecto correcto={correcto3} setMomento={setMomento} setPointerEvent={setPointerEvent} setOpa1={setOpa1} setOpa2={setOpa2} setOpa3={setOpa3} className='imagen-respuesta' />
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </Container>
                
              </div>
          </div>
        ) : <><>Cargando...</></>
      }
    </>)

}




