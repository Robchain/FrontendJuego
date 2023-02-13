import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { DooroutButton } from '../../../componentes/JuegoComponent/JuegoGeneral/DooroutButton'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { RompecabezaFinalRespuesta } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabezaFinalRespuesta'
import { JuecoContext } from '../../../context/Juego/JuecoContext'

export const FinalVocabulario = () => {
  const {getresultado, data, getPuzzles, avance0, datoVocabulario} = useContext(JuecoContext);
  const res = getresultado();
  const [points, setPoints] = useState(0);
  const {id}= useParams();
  let totalPiezas = data[`Juego${id}`].Partida.Rompecabeza.Pieza
  if(data===null){
    return <>Cargando...</>
  }
  const verifyEnd =()=>{
    let ad = avance0.filter(obj => obj.Resultado==="CORRECTO").length;
    setPoints(ad);
    if(totalPiezas===6){
      if(ad>=7){
        ActualizarJuegoFinal(true);
      }
    }
    if(totalPiezas==4){
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
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoVocabulario1",{ id:data[`Juego${id}`]._id,
    PalabraCorrecta:avance0[0].PalabraAEvaluar,
    PalabraSeleccionada:avance0[0].PalabraASeleccionada,
    Resultado:avance0[0].Resultado,
    Terminado:avance0[0].Terminado})
  }
  
  const ActualizarJuego2=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoVocabulario2",{ id:data[`Juego${id}`]._id,
    PalabraCorrecta:avance0[1].PalabraAEvaluar,
    PalabraSeleccionada:avance0[1].PalabraASeleccionada,
    Resultado:avance0[1].Resultado,
    Terminado:avance0[1].Terminado})
  }
  
  const ActualizarJuego3=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoVocabulario3",{ id:data[`Juego${id}`]._id,
    PalabraCorrecta:avance0[2].PalabraAEvaluar,
    PalabraSeleccionada:avance0[2].PalabraASeleccionada,
    Resultado:avance0[2].Resultado,
    Terminado:avance0[2].Terminado})
  }
  
  const ActualizarJuego4=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoVocabulario4",{ id:data[`Juego${id}`]._id,
    PalabraCorrecta:avance0[3].PalabraAEvaluar,
    PalabraSeleccionada:avance0[3].PalabraASeleccionada,
    Resultado:avance0[3].Resultado,
    Terminado:avance0[3].Terminado})
  }
  
  const ActualizarJuego5=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoVocabulario5",{ id:data[`Juego${id}`]._id,
    PalabraCorrecta:avance0[4].PalabraAEvaluar,
    PalabraSeleccionada:avance0[4].PalabraASeleccionada,
    Resultado:avance0[4].Resultado,
    Terminado:avance0[4].Terminado})
  }
  
  const ActualizarJuego6=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoVocabulario6",{ id:data[`Juego${id}`]._id,
    PalabraCorrecta:avance0[5].PalabraAEvaluar,
    PalabraSeleccionada:avance0[5].PalabraASeleccionada,
    Resultado:avance0[5].Resultado,
    Terminado:avance0[5].Terminado})
  }
  
  const ActualizarJuego7=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoVocabulario7",{ id:data[`Juego${id}`]._id,
    PalabraCorrecta:avance0[6].PalabraAEvaluar,
    PalabraSeleccionada:avance0[6].PalabraASeleccionada,
    Resultado:avance0[6].Resultado,
    Terminado:avance0[6].Terminado})
  }

  const ActualizarJuegoFinal=(isEnd)=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoVocabularioFinal",{ id:data[`Juego${id}`]._id,
    Terminado:isEnd})
  }



  return (
    <Container className='fondoMC img-fluid vh-100' >
    <NavBarJuego Seccion={"Vocabulario"} urlBack={"/RompecabezaJV"} />
 <Row>
 <Col lg='12'>
 <Col  className='mt-2' lg="6">
 <Col>
 <RompecabezaFinalRespuesta url={data[`Juego${id}`].Partida.Rompecabeza.FileColor} alt={data[`Juego${id}`].Partida.Rompecabeza.Nombre}/>
 </Col>
 <Col className='mt-5'>
      <div style={{width:300, height:180, borderRadius:100}} className='m-auto'>
      <h1>{`${points}/${totalPiezas}`}</h1>
      </div>  
    </Col>
    </Col>
 </Col>
 </Row>
 </Container>
  )
}
