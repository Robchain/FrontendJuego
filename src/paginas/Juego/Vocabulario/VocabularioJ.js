import React, {useEffect, useState} from 'react'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { BackButton } from '../../../componentes/JuegoComponent/JuegoGeneral/BackButton'
import buentrabajo from  "../../../assets/img/AssetsGame/GOOD JOD.png"
import malTrabajo from "../../../assets/img/AssetsGame/Bad Jood.png"

const dataSimulada =  {
  Palabra1:{
    palabra:'PAN',
    Imagen:'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
    Respuesta:true
  },
  Palabra2:{
    palabra:'PAN',
    Imagen: 'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
    Respuesta:false
  },
  Palabra3:{
    palabra:'PAN',
    Imagen: 'https://firebasestorage.googleapis.com/v0/b/didacticobb.appspot.com/o/vocabulario%2FpanImagen.jpg?alt=media&token=0a297504-b06e-4c91-bf14-426467b1f837',
    Respuesta:false
  }
}

const VocabularioJ = () => {
const [{FileMuestra}, setVideo] = useState({})
const [correcto, setCorrecto] = useState(null)
const [pointerEvent, setPointerEvent] = useState("auto")
const [momento, setMomento] = useState("inicial");

  useEffect(() => {
    axios.get('http://localhost:3002/api/auth/testa')
    .then(res => setVideo(res.data))
  }, [])

  const VideosControl = ({momento}) =>{
      switch (momento) {
        case "inicial":
        return  <ReactPlayer url={FileMuestra}  playing   className="mb-1"/*controls*/ />
          break;
        case "respuesta":
          return <div ><h1>Retro Alimentacion</h1></div>
          break;
        default:
          return  <ReactPlayer url={FileMuestra}  playing   className="mb-1"/*controls*/ /> 
          break;
      }
  }


  const ImagenDeCorrecto = ({correcto}) =>{
      switch (correcto) {
        case false:
                setPointerEvent("none"); setMomento("respuesta");
          return  <img  src={malTrabajo} width='200' alt='Mal trabajo'/>
          break;
          case true:
            setPointerEvent("none"); setMomento("respuesta");
           return   <img  src={buentrabajo} width='200' alt='buen trabajo'/>
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
    <Col  className='mt-2' lg="6">
        <VideosControl momento={momento} />
        {//<ReactPlayer url={FileMuestra}  playing   className="mb-1"/*controls*/ />
        }
      <div style={{width:300, height:180, borderRadius:100}} className='m-auto'>
       <ImagenDeCorrecto correcto={correcto}/>
      </div>
    </Col>
    <Col   className='mt-2  align-items-end' lg="6">
    <div style={{width:300, height:180, borderRadius:100, display:'flex', justifyContent:'space-evenly', alignItems:'center', pointerEvents:pointerEvent}} className='m-auto' onClick={() =>  setCorrecto(dataSimulada.Palabra1.Respuesta) } >
    <p style={{fontWeight:'bold', fontSize:'2vw', color:'#F6AF65'}}>{dataSimulada.Palabra1.palabra}</p>
    <img  src={dataSimulada.Palabra1.Imagen} alt={dataSimulada.Palabra1.palabra} width='200'/>
    </div>
    <div style={{width:300, height:180, borderRadius:100, display:'flex', justifyContent:'space-evenly', alignItems:'center', pointerEvents:pointerEvent}} className='m-auto'  onClick={() =>  setCorrecto(dataSimulada.Palabra2.Respuesta) }>
    <p  style={{fontWeight:'bold', fontSize:'2vw', color:'#F6AF65'}}>{dataSimulada.Palabra2.palabra}</p>
    <img src={dataSimulada.Palabra2.Imagen} alt={dataSimulada.Palabra2.palabra} width='200'/>
    </div>
    <div  style={{width:300, height:180, borderRadius:100, display:'flex', justifyContent:'space-evenly', alignItems:'center', pointerEvents:pointerEvent}} className='m-auto' onClick={() =>  setCorrecto(dataSimulada.Palabra3.Respuesta) }>
    <p style={{fontWeight:'bold', fontSize:'2vw', color:'#F6AF65'}}>{dataSimulada.Palabra3.palabra}</p>
    <img  src={dataSimulada.Palabra3.Imagen} alt={dataSimulada.Palabra3.palabra} width='200'/>
    </div>
    </Col>
    <Col  lg="12">
    <BackButton/>
    </Col>
   </Row>
   </Container>
   </div>
  )
}

export default VocabularioJ

 
