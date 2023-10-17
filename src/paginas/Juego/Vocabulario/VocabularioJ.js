import React, { useState, useEffect, useRef, useContext } from 'react';
import { Container, Row, Col } from 'reactstrap'
import ReactPlayer from 'react-player'
import buentrabajo from "../../../assets/img/AssetsGame/GOOD JOD.png"
import malTrabajo from "../../../assets/img/AssetsGame/Bad Jood.png"
import { useNavigate } from 'react-router-dom';
import { JuecoContext } from '../../../context/Juego/JuecoContext';
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego';
import { resultado } from '../../../helpers/contador';
const ImagenDeCorrecto = ({ correcto, setPointerEvent, setMomento, setOpa1, setOpa2, setOpa3}) => {
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
        setPointerEvent("auto"); setMomento("respuesta");
   
      }
    
  }, [correcto])
    return (
      <>
      {imagenRes.length >2 && (<img src={imagenRes} width='100' alt='buen trabajo' />)}
      </>
    )
}
const VideosPreguntas = ({ data, videoActual, setPointerEvent,  setOpa1, setOpa2, setOpa3, setVideoActual, playref }) => {
  const [videos, setVideos] = useState("")
  const navegar = useNavigate();
  /*useEffect(() => {
    if(pointerEvent === "auto"){
      setTimeout(() => { progreso({palabraCorrecta:resultado({objeto1:data.Partida[`Juego` + window.id].vocabulario.Palabra1,objeto2:data.Partida[`Juego` + window.id].vocabulario.Palabra2,objeto3:data.Partida[`Juego` + window.id].vocabulario.Palabra3}), selecionado:`SE PASO EL TIEMPO-NO HAY RESPUESTA`, Resul:"INCORRECTO"}); siguiente(window.id) }, 90000);
     }
  
  }, [pointerEvent])*/
  useEffect(() => {
    if(data.length === 3 ){
    let pregunta = ""; 
    for(let i=0; i<data.length; i++){
      if(data[i].Respuesta === 'CORRECTO'){
        pregunta = data[i].FilePregunta;
        break; // para salir del bucle una vez que se encuentra la respuesta correcta
      }
    }
    setVideos([data[0].FileMuestra,data[1].FileMuestra,data[2].FileMuestra, pregunta])
  }else if(data.length<3){
    navegar(`/MenuJuego`);
  }
    return () => {  
      setVideos([]);
    }
  }, [data])

  return (<>{data.length === 3  &&<ReactPlayer url={videos[videoActual]}  playing ref={playref} width={450} onEnded={() => { if (3 === videoActual) { setPointerEvent("auto");setOpa1(1); setOpa2(1); setOpa3(1) }else{setVideoActual(videoActual + 1);}  }} />
 }</>)}
const VideosRespuesta = ({ data,playref  }) => {
  const [videos, setvideos] = useState("");
  useEffect(() => {
    let pregunta = ""; 
    for(let i=0; i<data.length; i++){
      if(data[i].Respuesta === 'CORRECTO'){
        pregunta = data[i].FileMuestra
        break; // para salir del bucle una vez que se encuentra la respuesta correcta
      }
    }
    setvideos(pregunta)
    return () => {  
      setvideos("");
    }

  }, [data])
  return  <ReactPlayer url={videos} playing={true} style={{ borderRadius: "20px" }} ref={playref} className="mb-1" width={450}/>
}

const Vocabulario = () => {
  const {  resultados, avance0, progreso, dataJuegoVocabulario,piezaJuegoIndi } = useContext(JuecoContext);
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
    if(dataJuegoVocabulario === null){
      
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
    
    if( num === piezaJuegoIndi && avance0.filter(obj => obj.Resultado === "CORRECTO").length === piezaJuegoIndi){
      navegar(`/finalVocabulario`);
    }else if (num === piezaJuegoIndi + 1){
      navegar(`/finalVocabulario`);
    } else {
      toggleWindow(num + 1);
    }
  }
 

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



 

  return (
    <>
    {
      dataJuegoVocabulario !== null ? (
        <div>
        {windows.map(window => (
          <div key={window.id}>
            {window.show && (
              <Container  className='fondoImagenVocabulario vh-100'>
                <NavBarJuego Seccion={"Vocabulario"} urlBack={"/RompecabezaJV"} />
                <Row className="d-flex justify-content-around align-items-center">
                  <Col lg="12" className="d-flex justify-content-end "><h3 style={{fontWeight:700, color:"#85858C"}}>Puntos: {`${avance0.filter(obj => obj.Resultado === "CORRECTO").length}`}</h3></Col>
                  <Col lg="6">
                    {
                      momento === "inicial" && <VideosPreguntas pointerEvent={pointerEvent} progreso={progreso} siguiente={siguiente}  window={window} data={dataJuegoVocabulario[`Juego${window.id}`].Palabras}  playref={playref} setOpa1={setOpa1} setOpa2={setOpa2}  setOpa3={setOpa3} setPointerEvent={setPointerEvent} setVideoActual={setVideoActual} videoActual={videoActual} />
                    }
                    {
                      momento === "respuesta" && <VideosRespuesta window={window} data={dataJuegoVocabulario[`Juego${window.id}`].Palabras}   playref={playref} />
                    }
                  </Col>
                    <Col className='mt-1  align-items-end' lg="6">

                    <div style={{ pointerEvents: pointerEvent, opacity: opa1 }} className='m-auto Mi-diseñodiv' onClick={() => { setCorrecto1(dataJuegoVocabulario[`Juego` + window.id].Palabras[0].Respuesta); resultados(dataJuegoVocabulario[`Juego` + window.id].Palabras[0].Palabra, dataJuegoVocabulario[`Juego` + window.id].Palabras[0].Respuesta); setCorrecto2("NADA"); setCorrecto3("NADA");setOpa2(0.4); setOpa3(0.4); progreso({palabraCorrecta:resultado({objeto1:dataJuegoVocabulario[`Juego` + window.id].Palabras[0],objeto2:dataJuegoVocabulario[`Juego` + window.id].Palabras[1],objeto3:dataJuegoVocabulario[`Juego` + window.id].Palabras[2]}), selecionado:dataJuegoVocabulario[`Juego` + window.id].Palabras[0].Palabra, Resul:dataJuegoVocabulario[`Juego` + window.id].Palabras[0].Respuesta});  setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000); setVideoActual(0); }} >
                      <div style={{ width: "150px" }}><p style={{ fontWeight: 'bold', fontSize: '1.5vw', color: '#8B8B8C' }}>{dataJuegoVocabulario[`Juego` + window.id].Palabras[0].Palabra}</p></div>
                      <img style={{borderRadius:"15px"}} src={dataJuegoVocabulario[`Juego` + window.id].Palabras[0].FileImagen} alt={dataJuegoVocabulario[`Juego` + window.id].Palabras[0].Palabra} width='200' />
                      <div style={{ width: 100, height: 130 }}><ImagenDeCorrecto correcto={correcto1} setMomento={setMomento} setPointerEvent={setPointerEvent} setOpa1={setOpa1}  setOpa2={setOpa2} setOpa3={setOpa3}/></div>
                    </div>
                    <div style={{ pointerEvents: pointerEvent, opacity: opa2 }} className='m-auto Mi-diseñodiv' onClick={() => { setCorrecto2(dataJuegoVocabulario[`Juego` + window.id].Palabras[1].Respuesta); resultados(dataJuegoVocabulario[`Juego` + window.id].Palabras[1].Palabra, dataJuegoVocabulario[`Juego` + window.id].Palabras[1].Respuesta); setCorrecto1("NADA"); setCorrecto3("NADA"); setOpa1(0.4); setOpa3(0.4); progreso({palabraCorrecta: resultado({objeto1:dataJuegoVocabulario[`Juego` + window.id].Palabras[0],objeto2:dataJuegoVocabulario[`Juego` + window.id].Palabras[1],objeto3:dataJuegoVocabulario[`Juego` + window.id].Palabras[2]}), selecionado:dataJuegoVocabulario[`Juego` + window.id].Palabras[1].Palabra, Resul:dataJuegoVocabulario[`Juego` + window.id].Palabras[1].Respuesta}); setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000); setVideoActual(0); }}>
                      <div style={{ width: "150px" }}> <p style={{ fontWeight: 'bold', fontSize: '1.5vw', color: '#8B8B8C' }}>{dataJuegoVocabulario[`Juego` + window.id].Palabras[1].Palabra}</p></div>
                      <img style={{borderRadius:"15px"}} src={dataJuegoVocabulario[`Juego` + window.id].Palabras[1].FileImagen} alt={dataJuegoVocabulario[`Juego` + window.id].Palabras[1].Palabra} width='200' />
                      <div style={{ width: 100, height: 130 }}><ImagenDeCorrecto correcto={correcto2} setMomento={setMomento} setPointerEvent={setPointerEvent}   setOpa1={setOpa1}  setOpa2={setOpa2} setOpa3={setOpa3}/></div>
                    </div>
                    <div style={{ pointerEvents: pointerEvent, opacity: opa3 }} className='m-auto Mi-diseñodiv' onClick={() => { setCorrecto3(dataJuegoVocabulario[`Juego` + window.id].Palabras[2].Respuesta); resultados(dataJuegoVocabulario[`Juego` + window.id].Palabras[2].Palabra, dataJuegoVocabulario[`Juego` + window.id].Palabras[2].Respuesta); setCorrecto2("NADA"); setCorrecto1("NADA"); setOpa1(0.4); setOpa2(0.4); progreso({ palabraCorrecta:resultado({objeto1:dataJuegoVocabulario[`Juego` + window.id].Palabras[0],objeto2:dataJuegoVocabulario[`Juego` + window.id].Palabras[1],objeto3:dataJuegoVocabulario[`Juego` + window.id].Palabras[2]}), selecionado:dataJuegoVocabulario[`Juego` + window.id].Palabras[2].Palabra,Resul: dataJuegoVocabulario[`Juego` + window.id].Palabras[2].Respuesta}); setTimeout(() => { siguiente(window.id) },/*playref.current.getDuration()*1900*/ 9000); setVideoActual(0); }}>
                      <div style={{ width: "150px" }}> <p style={{ fontWeight: 'bold', fontSize: '1.5vw', color: '#8B8B8C' }}>{dataJuegoVocabulario[`Juego` + window.id].Palabras[2].Palabra}</p></div>
                      <img style={{borderRadius:"15px"}} src={dataJuegoVocabulario[`Juego` + window.id].Palabras[2].FileImagen} alt={dataJuegoVocabulario[`Juego` + window.id].Palabras[2].Palabra} width='200' />
                      <div style={{ width: 100, height: 130 }}><ImagenDeCorrecto correcto={correcto3} setMomento={setMomento} setPointerEvent={setPointerEvent} setOpa1={setOpa1}  setOpa2={setOpa2} setOpa3={setOpa3} /></div>
                    </div>
                     </Col>
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
