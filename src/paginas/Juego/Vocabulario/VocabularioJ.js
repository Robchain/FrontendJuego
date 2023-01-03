import React, { useState,useEffect, useRef } from 'react';
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { BackButton } from '../../../componentes/JuegoComponent/JuegoGeneral/BackButton'
import buentrabajo from  "../../../assets/img/AssetsGame/GOOD JOD.png"
import malTrabajo from "../../../assets/img/AssetsGame/Bad Jood.png"
import { DooroutButton } from '../../../componentes/JuegoComponent/JuegoGeneral/DooroutButton'
import { useNavigate } from 'react-router-dom';



const datasimulada =  {
    juego1:{
    Palabra1:{
      palabra:'PAN',
      Imagen:'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
      Respuesta:"INCORRECTO"
    },
    Palabra2:{
      palabra:'PAN',
      Imagen: 'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
      Respuesta:"INCORRECTO"
    },
    Palabra3:{
      palabra:'PAN',
      Imagen: 'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
      Respuesta:"CORRECTO"
    }},juego2:{
        Palabra1:{
          palabra:'PAN',
          Imagen:'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
          Respuesta:"CORRECTO"
        },
        Palabra2:{
          palabra:'PAN',
          Imagen: 'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
          Respuesta:"INCORRECTO"
        },
        Palabra3:{
          palabra:'PAN',
          Imagen: 'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
          Respuesta:"INCORRECTO"
        }},juego3:{
            Palabra1:{
              palabra:'PAN',
              Imagen:'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
              Respuesta:"CORRECTO"
            },
            Palabra2:{
              palabra:'PAN',
              Imagen: 'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
              Respuesta:"INCORRECTO"
            },
            Palabra3:{
              palabra:'PAN',
              Imagen: 'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
              Respuesta:"INCORRECTO"
            }},
            juego4:{
                Palabra1:{
                  palabra:'PAN',
                  Imagen:'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
                  Respuesta:"INCORRECTO"
                },
                Palabra2:{
                  palabra:'PAN',
                  Imagen: 'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
                  Respuesta:"CORRECTO"
                },
                Palabra3:{
                  palabra:'PAN',
                  Imagen: 'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
                  Respuesta:"INCORRECTO"
                }},
                juego5:{
                    Palabra1:{
                      palabra:'PAN',
                      Imagen:'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
                      Respuesta:"INCORRECTO"
                    },
                    Palabra2:{
                      palabra:'PAN',
                      Imagen: 'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
                      Respuesta:"CORRECTO"
                    },
                    Palabra3:{
                      palabra:'PAN',
                      Imagen: 'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
                      Respuesta:"INCORRECTO"
                    }},
                        juego6:{
                            Palabra1:{
                              palabra:'PAN',
                              Imagen:'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
                              Respuesta:"INCORRECTO"
                            },
                            Palabra2:{
                              palabra:'PAN',
                              Imagen: 'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
                              Respuesta:"CORRECTO"
                            },
                            Palabra3:{
                              palabra:'PAN',
                              Imagen: 'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
                              Respuesta:"INCORRECTO"
                            }},
                            juego7:{
                                Palabra1:{
                                  palabra:'PAN',
                                  Imagen:'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
                                  Respuesta:"INCORRECTO"
                                },
                                Palabra2:{
                                  palabra:'PAN',
                                  Imagen: 'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
                                  Respuesta:"CORRECTO"
                                },
                                Palabra3:{
                                  palabra:'PAN',
                                  Imagen: 'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
                                  Respuesta:"INCORRECTO"
                                }},
                    
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

  const [dato, setDato] = useState(datasimulada)
  const [opa1, setOpa1] = useState(1)
const [opa2, setOpa2] = useState(1)
const [opa3, setOpa3] = useState(1)

const playref = useRef(null);
const [dataInicial, setDataInicial] = useState(null)

const [correcto1, setCorrecto1] = useState(null)
const [correcto2, setCorrecto2] = useState(null)
const [correcto3, setCorrecto3] = useState(null)
const [pointerEvent, setPointerEvent] = useState("auto")
const [momento, setMomento] = useState("inicial");
const [duration, setDuration] = useState(0);
const [carga, setcarga]=useState(true);
const llamada  = async () =>{
  const data  = await  axios.get('http://localhost:3002/api/auth/RecibidoPrueba')
    setDataInicial(data.data)
    setcarga(false);
}

  useEffect(() => {
      llamada();
      toggleWindow(1);
  }, [])

 /*useEffect(() => {
    setTimeout(() => {
        toggleWindow(1)
    }, 1000);
  }, [])*/
 
  const siguiente = (num) => {
    setCorrecto1("INICIAL");
    setCorrecto2("INICIAL");setCorrecto3("INICIAL"); 
    setOpa2(1);   
    setOpa3(1);
    setOpa1(1);
    toggleWindow(num); 
    if(num === 5){
      navegar("/finalVocabulario")
    }else{
   toggleWindow(num+1);
         }

  }

  const VideosControl = ({momento}) =>{
    switch (momento) {
      case "inicial":
      return  <ReactPlayer url={dataInicial[`juego`+2].vocabulario.correcto.FilePregunta}  playing={true} style={{border:"solid"}} ref={playref}  className="mb-1"/*controls*/ />
        break;
      case "respuesta":
        return <ReactPlayer url={dataInicial[`juego`+2].vocabulario.correcto.FileMuestra} style={{border:"solid"}}  playing={true} onDuration={tiempo =>setDuration(tiempo)} className="mb-1"/*controls*/ /> 
        break;
      default:
        return  <ReactPlayer url={dataInicial[`juego`+2].vocabulario.incorrecto1.FilePregunta}  playing={true} style={{border:"solid"}} className="mb-1"/*controls*/ />
        break;
    }
}

const ImagenDeCorrecto = ({correcto}) =>{
  switch (correcto) {
      case "INCORRECTO":
              setPointerEvent("none"); setMomento("respuesta");
        return  <img  src={malTrabajo} width='100' alt='Mal trabajo'/>
        break;
        case "CORRECTO":
          setPointerEvent("none"); setMomento("respuesta");
         return   <img  src={buentrabajo} width='100' alt='buen trabajo'/>
          break;
          case "NADA":
          setPointerEvent("none"); setMomento("respuesta");
         return   null;
          break;
          case "INICIAL":
          setPointerEvent("auto"); setMomento("inicial");
         return   null;
          break;
      default:
        return null
        break;
  }
}
 const Pantalla = ()=>{
  if(carga){
    return <div>Cargando...</div>;
  }
    return(
<div>
      {windows.map(window => (
        <div key={window.id}>
          {window.show && (
            <div className="window" >
            <Container   style={{zIndex:1,position:"fixed", display:''}}>
   <Row className="d-flex justify-content-around"> 
   <Col lg="12" className="d-flex justify-content-evenly"><h1>Vocabulario {window.id}</h1></Col>
    <Col  className='mt-2' lg="6">
        <VideosControl momento={momento} />
      <div style={{width:300, height:180, borderRadius:100}} className='m-auto'>
      </div>
    </Col>
    <Col   className='mt-2  align-items-end' lg="6">
    <div style={{pointerEvents:pointerEvent, opacity:opa1}} className='m-auto Mi-diseñodiv' onClick={() =>  {setCorrecto1(dataInicial[`juego`+2].vocabulario.correcto.Respuesta);setCorrecto2("NADA");setCorrecto3("NADA"); setOpa2(0.4); setOpa3(0.4); console.log(playref.current.getDuration()*1900);setTimeout(() => {siguiente(window.id)}, playref.current.getDuration()*1900);}} >
    <p style={{fontWeight:'bold', fontSize:'2vw', color:'#F6AF65'}}>{dataInicial[`juego`+2].vocabulario.correcto.Palabra}</p>
    <img  src={dataInicial[`juego`+2].vocabulario.correcto.FileImagen} alt={dataInicial[`juego`+2].vocabulario.correcto.Palabra} width='200'/>
    <div  style={{width:100, height:151}}><ImagenDeCorrecto correcto={correcto1} /></div>
    </div>
    <div style={{pointerEvents:pointerEvent,  opacity:opa2}} className='m-auto Mi-diseñodiv'  onClick={() =>  {setCorrecto2(dataInicial[`juego`+2].vocabulario.incorrecto1.Respuesta); setCorrecto1("NADA"); setCorrecto3("NADA");setOpa1(0.4); setOpa3(0.4); setTimeout(() => {siguiente(window.id)}, playref.current.getDuration()*1500);} }>
    <p  style={{fontWeight:'bold', fontSize:'2vw', color:'#F6AF65'}}>{dataInicial[`juego`+2].vocabulario.incorrecto1.Palabra}</p>
    <img src={dataInicial[`juego`+2].vocabulario.incorrecto1.FileImagen} alt={dataInicial[`juego`+2].vocabulario.incorrecto1.Palabra} width='200'/>
    <div  style={{width:100, height:151}}><ImagenDeCorrecto correcto={correcto2}/></div>
    </div>
    <div  style={{pointerEvents:pointerEvent, opacity:opa3}} className='m-auto Mi-diseñodiv' onClick={() =>  {setCorrecto3(dataInicial[`juego`+2].vocabulario.incorrecto2.Respuesta);setCorrecto2("NADA");setCorrecto1("NADA");setOpa1(0.4); setOpa2(0.4); setTimeout(() => {siguiente(window.id)},playref.current.getDuration()*1500);} }>
    <p style={{fontWeight:'bold', fontSize:'2vw', color:'#F6AF65'}}>{dataInicial[`juego`+2].vocabulario.incorrecto2.Palabra}</p>
    <img  src={dataInicial[`juego`+2].vocabulario.incorrecto2.FileImagen} alt={dataInicial[`juego`+2].vocabulario.incorrecto2.Palabra} width='200'/>
    <div   style={{width:100, height:151}}><ImagenDeCorrecto correcto={correcto3}/></div>
    </div>
    </Col>
    <Col  lg="6">
    <BackButton/> 
    </Col>
    <Col  lg="6"  className="d-flex justify-content-end">
    <DooroutButton  Urlsalida={"/MenuJuego"}/>
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
    <Pantalla/>
  )
}

export default Vocabulario;