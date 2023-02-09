import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { DooroutButton } from '../../../componentes/JuegoComponent/JuegoGeneral/DooroutButton'
import { RompecabezaFinalRespuesta } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabezaFinalRespuesta'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
export const FinalOracionJuego = () => {
  const { oraciondata, getresultado, getPuzzles, avance0,  } = useContext(JuecoContext);
  const {id}= useParams();
  const res = getresultado();
  const [points, setPoints] = useState(0);
  if(oraciondata===null){
    return <>Cargando...</>
  }
  
  
  const verifyEnd =()=>{
    let ad = avance0.filter(obj => obj.Resultado==="CORRECTO").length;
    setPoints(ad);
    if(oraciondata[`Juego${id}`].Partida.Rompecabeza.Pieza===6){
      if(ad>=7){
        ActualizarJuegoFinal(true);
      }
    }else if(oraciondata[`Juego${id}`].Partida.Rompecabeza.Pieza===4){
  if(ad>=5){
  ActualizarJuegoFinal(true);
}
    }

  }
  const finalGuardado = ()=>{ 
    getPuzzles(id, res )
  }
  
  useEffect(() => {
    finalGuardado();
    ActualizarJuego1();
    ActualizarJuego2();
    ActualizarJuego3();
    ActualizarJuego4();
    ActualizarJuego5();
    if(avance0[5].PalabraAEvaluar){
    ActualizarJuego6();
    }
    verifyEnd();
  }, [])
  
  
  
  const ActualizarJuego1=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoOracion1",{ id:oraciondata[`Juego${id}`]._id,
    PalabraCorrecta:avance0[0].PalabraAEvaluar,
    PalabraSeleccionada:avance0[0].PalabraASeleccionada,
    Resultado:avance0[0].Resultado,
    Terminado:avance0[0].Terminado})
  }
  
  const ActualizarJuego2=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoOracion2",{ id:oraciondata[`Juego${id}`]._id,
    PalabraCorrecta:avance0[1].PalabraAEvaluar,
    PalabraSeleccionada:avance0[1].PalabraASeleccionada,
    Resultado:avance0[1].Resultado,
    Terminado:avance0[1].Terminado})
  }
  
  const ActualizarJuego3=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoOracion3",{ id:oraciondata[`Juego${id}`]._id,
    PalabraCorrecta:avance0[2].PalabraAEvaluar,
    PalabraSeleccionada:avance0[2].PalabraASeleccionada,
    Resultado:avance0[2].Resultado,
    Terminado:avance0[2].Terminado})
  }
  
  const ActualizarJuego4=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoOracion4",{ id:oraciondata[`Juego${id}`]._id,
    PalabraCorrecta:avance0[3].PalabraAEvaluar,
    PalabraSeleccionada:avance0[3].PalabraASeleccionada,
    Resultado:avance0[3].Resultado,
    Terminado:avance0[3].Terminado})
  }
  
  const ActualizarJuego5=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoOracion5",{ id:oraciondata[`Juego${id}`]._id,
    PalabraCorrecta:avance0[4].PalabraAEvaluar,
    PalabraSeleccionada:avance0[4].PalabraASeleccionada,
    Resultado:avance0[4].Resultado,
    Terminado:avance0[4].Terminado})
  }
  
  const ActualizarJuego6=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoOracion6",{ id:oraciondata[`Juego${id}`]._id,
    PalabraCorrecta:avance0[5].PalabraAEvaluar,
    PalabraSeleccionada:avance0[5].PalabraASeleccionada,
    Resultado:avance0[5].Resultado,
    Terminado:avance0[5].Terminado})
  }
  
  const ActualizarJuego7=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoOracion7",{ id:oraciondata[`Juego${id}`]._id,
    PalabraCorrecta:avance0[6].PalabraAEvaluar,
    PalabraSeleccionada:avance0[6].PalabraASeleccionada,
    Resultado:avance0[6].Resultado,
    Terminado:avance0[6].Terminado})
  }

  const ActualizarJuegoFinal=(isEnd)=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoOracionFinal",{ id:oraciondata[`Juego${id}`]._id,
    Terminado:isEnd})
  }

  return (
    <div className="fondoMC img-fluid vh-100">
    <Container>
 <Row>
 <Col lg="12" className="d-flex justify-content-evenly"><h1>Oracion </h1></Col>
 <Col lg='12'>
 <Col  className='mt-2' lg="6">
 <Col>
 <RompecabezaFinalRespuesta url={oraciondata[`Juego${id}`].Partida.Rompecabeza.FileColor} alt={oraciondata[`Juego${id}`].Partida.Rompecabeza.Nombre}/>
 </Col>
 <Col className='mt-5'>
      <div style={{width:300, height:180, borderRadius:100}} className='m-auto'>
      <h1>{`${avance0.filter(obj => obj.Resultado==="CORRECTO").length}/${0}`}</h1>
      </div>  
    </Col>
    </Col>

 <DooroutButton Urlsalida={"/RompecabezaJO"}/>
 </Col>
 </Row>
 </Container>
     </div>
  )
}
