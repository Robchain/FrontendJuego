import React, {useEffect, useState} from 'react'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { BackButton } from '../../../componentes/JuegoComponent/JuegoGeneral/BackButton'
import buentrabajo from  "../../../assets/img/AssetsGame/GOOD JOD.png"
import malTrabajo from "../../../assets/img/AssetsGame/Bad Jood.png"
import { DooroutButton } from '../../../componentes/JuegoComponent/JuegoGeneral/DooroutButton'

const dataSimulada =  {
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
  }
}

const VocabularioJ = () => {
const [{FileMuestra}, setVideo] = useState({})
const [correcto1, setCorrecto1] = useState(null)
const [correcto2, setCorrecto2] = useState(null)
const [correcto3, setCorrecto3] = useState(null)
const [pointerEvent, setPointerEvent] = useState("auto")
const [momento, setMomento] = useState("inicial");
const [opa1, setOpa1] = useState(1)
const [opa2, setOpa2] = useState(1)
const [opa3, setOpa3] = useState(1)

  useEffect(() => {
    axios.get('http://localhost:3002/api/auth/testa')
    .then(res => setVideo(res.data))
  }, [])

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
        default:
          return null
          break;
    }
  }


  return (
    <div className=" fondoCM img-fluid vh-100">
    <Container>
   <Row className="d-flex justify-content-around"> 
   <Col lg="12" className="d-flex justify-content-evenly"><h1>Vocabulario</h1></Col>
    <Col  className='mt-2' lg="6">
        <VideosControl momento={momento} />
      <div style={{width:300, height:180, borderRadius:100}} className='m-auto'>
      </div>
    </Col>
    <Col   className='mt-2  align-items-end' lg="6">
    <div style={{pointerEvents:pointerEvent, opacity:opa1}} className='m-auto Mi-diseñodiv' onClick={() =>  {setCorrecto1(dataSimulada.Palabra1.Respuesta);setCorrecto2("NADA");setCorrecto3("NADA"); setOpa2(0.4); setOpa3(0.4)} } >
  
    <p style={{fontWeight:'bold', fontSize:'2vw', color:'#F6AF65'}}>{dataSimulada.Palabra1.palabra}</p>
    <img  src={dataSimulada.Palabra1.Imagen} alt={dataSimulada.Palabra1.palabra} width='200'/>
    <div  style={{width:100, height:151}}><ImagenDeCorrecto correcto={correcto1} /></div>
    </div>
    <div style={{pointerEvents:pointerEvent,  opacity:opa2}} className='m-auto Mi-diseñodiv'  onClick={() =>  {setCorrecto2(dataSimulada.Palabra2.Respuesta); setCorrecto1("NADA"); setCorrecto3("NADA");setOpa1(0.4); setOpa3(0.4)} }>
    <p  style={{fontWeight:'bold', fontSize:'2vw', color:'#F6AF65'}}>{dataSimulada.Palabra2.palabra}</p>
    <img src={dataSimulada.Palabra2.Imagen} alt={dataSimulada.Palabra2.palabra} width='200'/>
    <div  style={{width:100, height:151}}><ImagenDeCorrecto correcto={correcto2}/></div>
    </div>
    <div  style={{pointerEvents:pointerEvent, opacity:opa3}} className='m-auto Mi-diseñodiv' onClick={() =>  {setCorrecto3(dataSimulada.Palabra3.Respuesta);setCorrecto2("NADA");setCorrecto1("NADA");setOpa1(0.4); setOpa2(0.4)} }>
    <p style={{fontWeight:'bold', fontSize:'2vw', color:'#F6AF65'}}>{dataSimulada.Palabra3.palabra}</p>
    <img  src={dataSimulada.Palabra3.Imagen} alt={dataSimulada.Palabra3.palabra} width='200'/>
    <div   style={{width:100, height:151}}><ImagenDeCorrecto correcto={correcto3}/></div>
    </div>
    </Col>
    <Col  lg="6" className="">
    <BackButton/>
    </Col>
    <Col  lg="6"  className="d-flex justify-content-end">
    <DooroutButton  Urlsalida={"/MenuJuego"}/>
    </Col>
   </Row>
   </Container>
   </div>
  )
}

export default VocabularioJ

 
