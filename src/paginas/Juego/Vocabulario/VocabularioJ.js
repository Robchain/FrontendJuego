import React, { useState,useEffect, useRef, useContext } from 'react';
import { Container, Row, Col } from 'reactstrap'
import ReactPlayer from 'react-player'
import buentrabajo from  "../../../assets/img/AssetsGame/GOOD JOD.png"
import malTrabajo from "../../../assets/img/AssetsGame/Bad Jood.png"
import { DooroutButton } from '../../../componentes/JuegoComponent/JuegoGeneral/DooroutButton'
import { useNavigate, useParams } from 'react-router-dom';
import { JuecoContext } from '../../../context/Juego/JuecoContext';
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
  const {id}=useParams();
  const [term, setTerm] = useState(false);
  const {data, resultados,setavance, avance0 } = useContext(JuecoContext); 
  const [opa1, setOpa1] = useState(1)
  const [progresojuegoActual, setProgresojuegoActual] = useState([])
  const [PEvaluar, setPEvaluar] = useState("")
const [opa2, setOpa2] = useState(1)
const [opa3, setOpa3] = useState(1)

let arregloDeVideos=[];
const playref = useRef(null);
const [correcto1, setCorrecto1] = useState(null)
const [correcto2, setCorrecto2] = useState(null)
const [correcto3, setCorrecto3] = useState(null)
const [pointerEvent, setPointerEvent] = useState("auto")
const [momento, setMomento] = useState("inicial");

/*const progresoJuegoA =(evaluar, selecionado, Resul, terminado)=>{
  setProgresojuegoActual([...progresojuegoActual,{ PalabraAEvaluar:evaluar,PalabraASeleccionada:selecionado, Resultado:Resul, Terminado:terminado
  }])
}*/

  useEffect(() => { 
         
      toggleWindow(1);
  }, [])



  const siguiente = (num) => {
    setCorrecto1("INICIAL");
    setCorrecto2("INICIAL");
    setCorrecto3("INICIAL"); 
    setOpa2(1);   
    setOpa3(1);
    setOpa1(1);
    toggleWindow(num); 
    debugger
    if(num === data[`Juego${id}`].Partida.Rompecabeza.Pieza+1){
      setavance(progresojuegoActual);
      navegar(`/finalVocabulario/${id}`);
    }else{
   toggleWindow(num+1);
         }

  }
  const videosRespuesta = (window)=>{
    if(data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra1.Respuesta==="CORRECTO"){
    
      return  <ReactPlayer url={[{src:data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra1.FileMuestra, type:'video/mp4'}]}  playing={true} style={{border:"solid"}} ref={playref}  className="mb-1" />
    }else if(data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra2.Respuesta==="CORRECTO"){
    
      return  <ReactPlayer  url={[{src:data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra2.FileMuestra, type:'video/mp4'}]}  playing={true} style={{border:"solid"}} ref={playref}  className="mb-1"  />
    }else if(data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra2.Respuesta==="CORRECTO"){
     
      return  <ReactPlayer url={[{src:data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra2.FileMuestra, type:'video/mp4'}]}  playing={true} style={{border:"solid"}} ref={playref}  className="mb-1"/>
    }

  }

  const VideosPreguntas = (window)=>{
    let pregunta ="";
    if(data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra1.Respuesta==="CORRECTO"){
         pregunta = data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra1.FilePregunta
    }else if(data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra2.Respuesta==="CORRECTO"){
       pregunta =  data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra2.FilePregunta
    }else if(data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra3.Respuesta==="CORRECTO"){
       pregunta = data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra3.FilePregunta
    }
    
    arregloDeVideos =  [data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra1.FileMuestra, data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra2.FileMuestra, data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra3.FileMuestra, pregunta]
    return(<div>
      {
        <ReactPlayer  
        url={arregloDeVideos[videoActual]}
        playing
        ref={playref}
        style={{border:"solid"}}
        onEnded={() => { if(arregloDeVideos.length === videoActual){setVideoActual(3);}setVideoActual(videoActual + 1);}}/>
        
     } </div>)
  }
  const progreso = (selecionado, Resul, window)=>{
   let  palabraE = "";
   let terminado = false;
    if(data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra1.Respuesta==="CORRECTO"){
      palabraE = data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra1.Palabra;
    }else if(data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra2.Respuesta==="CORRECTO"){
      palabraE =  data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra2.Palabra;
    }else if(data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra2.Respuesta==="CORRECTO"){
      palabraE =data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra3.Palabra
    }
    if(palabraE ===selecionado){ terminado =true}else {terminado = false} 
      setavance([...avance0,{ PalabraAEvaluar:palabraE,PalabraASeleccionada:selecionado, Resultado:Resul, Terminado:terminado
      }])
    }
const ImagenDeCorrecto = ({correcto}) =>{
  switch (correcto) {
      case "INCORRECTO":
              setPointerEvent("none"); setMomento("respuesta");
        return  <img  src={malTrabajo} width='100' alt='Mal trabajo'/>
        case "CORRECTO":
          setPointerEvent("none"); setMomento("respuesta");
         return   <img  src={buentrabajo} width='100' alt='buen trabajo'/>
          case "NADA":
          setPointerEvent("none"); setMomento("respuesta");
         return   null;
          case "INICIAL":
          setPointerEvent("auto"); setMomento("inicial");
         return   null;
      default:
        return null
  }
}
 const Pantalla = ()=>{
  if(data === null){
    return <div>Cargando...</div>;
  }
    return(
<div>
      {windows.map(window => (
        <div key={1}>
          {window.show && (
            <div className="window" >
            <Container   style={{zIndex:1,position:"fixed"}}>
   <Row className="d-flex justify-content-around"> 
   <Col lg="12" className="d-flex justify-content-evenly"><h1>Vocabulario</h1></Col>
    <Col  className='mt-2' lg="6">
    {
      momento ==="inicial" && VideosPreguntas(window)
    }
    {
      momento === "respuesta" && videosRespuesta(window)
    }
      <div style={{width:300, height:180, borderRadius:100}} className='m-auto'>
      </div>
    </Col>
    <Col   className='mt-2  align-items-end' lg="6">
    <div style={{pointerEvents:pointerEvent, opacity:opa1}} className='m-auto Mi-diseñodiv' onClick={() =>  {setCorrecto1(data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra1.Respuesta) ;resultados(data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra1.Palabra,data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra1.Respuesta);setCorrecto2("NADA");setCorrecto3("NADA");progreso(data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra1.Palabra ,data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra1.Respuesta, window); setOpa2(0.4); setOpa3(0.4);setTimeout(() => {siguiente(window.id)}, /*playref.current.getDuration()*1900*/ 9000);setVideoActual(0);}} >
    <p style={{fontWeight:'bold', fontSize:'2vw', color:'#F6AF65'}}>{data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra1.Palabra}</p>
    <img  src={data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra1.FileImagen} alt={data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra1.Palabra} width='200'/>
    <div  style={{width:100, height:151}}><ImagenDeCorrecto correcto={correcto1} /></div>
    </div>
    <div style={{pointerEvents:pointerEvent,  opacity:opa2}} className='m-auto Mi-diseñodiv'  onClick={() =>  {setCorrecto2(data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra2.Respuesta);resultados(data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra2.Palabra,data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra2.Respuesta); setCorrecto1("NADA"); setCorrecto3("NADA");setOpa1(0.4); setOpa3(0.4);progreso(data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra2.Palabra,data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra2.Respuesta,window);  setTimeout(() => {siguiente(window.id)}, /*playref.current.getDuration()*1900*/ 9000);setVideoActual(0);} }>
    <p  style={{fontWeight:'bold', fontSize:'2vw', color:'#F6AF65'}}>{data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra2.Palabra}</p>
    <img src={data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra2.FileImagen} alt={data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra2.Palabra} width='200'/>
    <div  style={{width:100, height:151}}><ImagenDeCorrecto correcto={correcto2}/></div>
    </div>
    <div  style={{pointerEvents:pointerEvent, opacity:opa3}} className='m-auto Mi-diseñodiv' onClick={() =>  {setCorrecto3(data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra3.Respuesta);resultados(data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra3.Palabra,data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra3.Respuesta);setCorrecto2("NADA");setCorrecto1("NADA");setOpa1(0.4); setOpa2(0.4); progreso(data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra3.Palabra,data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra3.Respuesta,window);setTimeout(() => {siguiente(window.id)},/*playref.current.getDuration()*1900*/ 9000);setVideoActual(0);} }>
    <p style={{fontWeight:'bold', fontSize:'2vw', color:'#F6AF65'}}>{data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra3.Palabra}</p>
    <img  src={data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra3.FileImagen} alt={data[`Juego${id}`].Partida[`Juego`+window.id].vocabulario.Palabra3.Palabra} width='200'/>
    <div   style={{width:100, height:151}}><ImagenDeCorrecto correcto={correcto3}/></div>
    </div>
    </Col>
    <Col  lg="6"  className="d-flex justify-content-end">
    <DooroutButton  Urlsalida={"/RompecabezaJV"}/>
    {JSON.stringify(avance0)}
    </Col>
   </Row>
   </Container>
            </div>
          )}
        </div>
      ))
    }
    </div>
    )

 }
 
  return (
    <>
    <Pantalla/>
    </>)
}

export default Vocabulario;