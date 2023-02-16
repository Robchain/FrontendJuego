import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { RompecabezaFinalRespuesta } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabezaFinalRespuesta'
import { JuecoContext } from '../../../context/Juego/JuecoContext'

export const FinalVocabulario = () => {
  const {getresultado, data, getPuzzles, avance0} = useContext(JuecoContext);
  const res = getresultado();
  const [points, setPoints] = useState(0);
  const {id}= useParams();
  let totalPiezas = data[`Juego${id}`].Partida.Rompecabeza.Pieza
  const verifyEnd =()=>{
    let ad = avance0.filter(obj => obj.Resultado==="CORRECTO").length;
    setPoints(ad);
    if(totalPiezas===6){
      if(ad>=7){
        ActualizarJuegoFinal(true);
      }
    }
    if(totalPiezas===4){
if(ad>=5){
  ActualizarJuegoFinal(true);
}
    }

  }
  const finalGuardado = ()=>{
    getPuzzles(id, res )
  }
  useEffect(() => {
    if(avance0.length > 2){
    finalGuardado();
    ActualizarJuego1();
    ActualizarJuego2();
    ActualizarJuego3();
    ActualizarJuego4();
    ActualizarJuego5();
    if(avance0[5]){
      ActualizarJuego6();
    }
    if(avance0[6]){
      ActualizarJuego7();
    }
    verifyEnd();
  }
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

const Pantalla =()=>{
  if(data===null){
    return <>Cargando...</>
  }else {
    return(
      <Container className='fondoMC img-fluid vh-100' >
    <NavBarJuego Seccion={"Vocabulario"} urlBack={"/RompecabezaJV"} />
 <Row className='justify-content-center'>
 <Col lg="6" md="6" sm="8" xs="8">
 <RompecabezaFinalRespuesta url={data[`Juego${id}`].Partida.Rompecabeza.FileColor} alt={data[`Juego${id}`].Partida.Rompecabeza.Nombre}  pieza={totalPiezas} resultado={points} />
 </Col>
 </Row>
 </Container>
    )
  }
}
  return (
   <Pantalla/>
  )
}
