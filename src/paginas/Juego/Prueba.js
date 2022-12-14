import React, { useState,useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { BackButton } from '../../componentes/JuegoComponent/JuegoGeneral/BackButton'
import buentrabajo from  "../../assets/img/AssetsGame/GOOD JOD.png"
import malTrabajo from "../../assets/img/AssetsGame/Bad Jood.png"
import { DooroutButton } from '../../componentes/JuegoComponent/JuegoGeneral/DooroutButton'


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
const Prueba = () => {

  const [windows, setWindows] = useState([
    { id: 1, show: false },
    { id: 2, show: false },
    { id: 3, show: false },
    { id: 4, show: false },
    { id: 5, show: false },
    { id: 6, show: false },
    { id: 7, show: false }
  ]);

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
const [{FileMuestra}, setVideo] = useState({})

const [correcto1, setCorrecto1] = useState(null)
const [correcto2, setCorrecto2] = useState(null)
const [correcto3, setCorrecto3] = useState(null)
const [pointerEvent, setPointerEvent] = useState("auto")
const [momento, setMomento] = useState("inicial");


  useEffect(() => {
    axios.get('http://localhost:3002/api/auth/testa')
    .then(res => setVideo(res.data));
    
  }, [])

 useEffect(() => {
    setTimeout(() => {
        toggleWindow(1)
    }, 1000);
  }, [])
 
  const siguiente = (num) => {

    setCorrecto1("INICIAL");
    setCorrecto2("INICIAL");setCorrecto3("INICIAL"); 
    setOpa2(1); 
    setOpa3(1);
    setOpa1(1);
    toggleWindow(num); 
    toggleWindow(num+1)

  }

  const VideosControl = ({momento}) =>{
    switch (momento) {
      case "inicial":
      return  <ReactPlayer url={FileMuestra}  playing  style={{border:"solid"}} className="mb-1"/*controls*/ />
        break;
      case "respuesta":
        return <div style={{width:640, height:360, border:"solid"}} ><h1>Retro Alimentacion</h1></div>
        break;
      default:
        return  <ReactPlayer url={FileMuestra} style={{border:"solid"}}  playing   className="mb-1"/*controls*/ /> 
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

  return (
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
    <div style={{pointerEvents:pointerEvent, opacity:opa1}} className='m-auto Mi-dise??odiv' onClick={() =>  {setCorrecto1(dato[`juego`+window.id].Palabra1.Respuesta);setCorrecto2("NADA");setCorrecto3("NADA"); setOpa2(0.4); setOpa3(0.4);  setTimeout(() => {siguiente(window.id)}, 3000);}} >
  
    <p style={{fontWeight:'bold', fontSize:'2vw', color:'#F6AF65'}}>{dato[`juego`+window.id].Palabra1.palabra}</p>
    <img  src={dato[`juego`+window.id].Palabra1.Imagen} alt={dato[`juego`+window.id].Palabra1.palabra} width='200'/>
    <div  style={{width:100, height:151}}><ImagenDeCorrecto correcto={correcto1} /></div>
    </div>
    <div style={{pointerEvents:pointerEvent,  opacity:opa2}} className='m-auto Mi-dise??odiv'  onClick={() =>  {setCorrecto2(dato[`juego`+window.id].Palabra2.Respuesta); setCorrecto1("NADA"); setCorrecto3("NADA");setOpa1(0.4); setOpa3(0.4); setTimeout(() => {siguiente(window.id)}, 3000);} }>
    <p  style={{fontWeight:'bold', fontSize:'2vw', color:'#F6AF65'}}>{dato[`juego`+window.id].Palabra2.palabra}</p>
    <img src={dato[`juego`+window.id].Palabra2.Imagen} alt={dato[`juego`+window.id].Palabra2.palabra} width='200'/>
    <div  style={{width:100, height:151}}><ImagenDeCorrecto correcto={correcto2}/></div>
    </div>
    <div  style={{pointerEvents:pointerEvent, opacity:opa3}} className='m-auto Mi-dise??odiv' onClick={() =>  {setCorrecto3(dato[`juego`+window.id].Palabra3.Respuesta);setCorrecto2("NADA");setCorrecto1("NADA");setOpa1(0.4); setOpa2(0.4); setTimeout(() => {siguiente(window.id)}, 3000);} }>
    <p style={{fontWeight:'bold', fontSize:'2vw', color:'#F6AF65'}}>{dato[`juego`+window.id].Palabra3.palabra}</p>
    <img  src={dato[`juego`+window.id].Palabra3.Imagen} alt={dato[`juego`+window.id].Palabra3.palabra} width='200'/>
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

export default Prueba;