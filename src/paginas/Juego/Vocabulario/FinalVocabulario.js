import React, { useContext, useEffect, useState } from 'react'
import {  NavLink, Navigate } from 'react-router-dom'
import cuadros from '../../../assets/img/Cuadros.png'
import { Col, Container, Row } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { RompecabezaFinalRespuesta } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabezaFinalRespuesta'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import { Juego1, Juego2, Juego3, Juego4, Juego5, Juego6, Juego7, JuegoFinal } from '../../../service/Juego/Vocabulario'

export const FinalVocabulario = () => {
  const { avance0,dataJuegoVocabulario} = useContext(JuecoContext);
  const [points, setPoints] = useState(0);

  const verifyEnd =()=>{
    let ad = avance0.filter(obj => obj.Resultado==="CORRECTO").length;
    setPoints(ad);
    if(dataJuegoVocabulario.Partida.Rompecabeza.Pieza===6){
      if(ad>=7){
        ActualizarJuegoFinal(true);
      }
    }
    if(dataJuegoVocabulario.Partida.Rompecabeza.Pieza===4){
if(ad>=5){
  ActualizarJuegoFinal(true);
}
    }
  }


  useEffect(() => {
    if(avance0.length > 2){
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
   
  const ActualizarJuego1= async ()=>{
  await  Juego1({_id:dataJuegoVocabulario._id,PalabraAEvaluar:avance0[0].PalabraAEvaluar,PalabraASeleccionada:avance0[0].PalabraASeleccionada,Resultado:avance0[0].Resultado,Terminado:avance0[0].Terminado})
  }
  
  const ActualizarJuego2= async ()=>{
 await   Juego2({_id:dataJuegoVocabulario._id,PalabraAEvaluar:avance0[1].PalabraAEvaluar,PalabraASeleccionada:avance0[1].PalabraASeleccionada,Resultado:avance0[1].Resultado,Terminado:avance0[1].Terminado})
  }
  
  const ActualizarJuego3= async ()=>{
  await  Juego3({_id:dataJuegoVocabulario._id,PalabraAEvaluar:avance0[2].PalabraAEvaluar,PalabraASeleccionada:avance0[2].PalabraASeleccionada,Resultado:avance0[2].Resultado,Terminado:avance0[2].Terminado})
  }
  
  const ActualizarJuego4= async ()=>{
  await  Juego4({_id:dataJuegoVocabulario._id,PalabraAEvaluar:avance0[4].PalabraAEvaluar,PalabraASeleccionada:avance0[4].PalabraASeleccionada,Resultado:avance0[4].Resultado,Terminado:avance0[4].Terminado})
  }
  
  const ActualizarJuego5= async ()=>{
 await   Juego5({_id:dataJuegoVocabulario._id,PalabraAEvaluar:avance0[3].PalabraAEvaluar,PalabraASeleccionada:avance0[3].PalabraASeleccionada,Resultado:avance0[3].Resultado,Terminado:avance0[3].Terminado})
  }
  
  const ActualizarJuego6= async ()=>{
 await   Juego6({_id:dataJuegoVocabulario._id,PalabraAEvaluar:avance0[5].PalabraAEvaluar,PalabraASeleccionada:avance0[5].PalabraASeleccionada,Resultado:avance0[5].Resultado,Terminado:avance0[5].Terminado})
  }
  
  const ActualizarJuego7= async ()=>{
   await  Juego7({_id:dataJuegoVocabulario._id,PalabraAEvaluar:avance0[6].PalabraAEvaluar,PalabraASeleccionada:avance0[6].PalabraASeleccionada,Resultado:avance0[6].Resultado,Terminado:avance0[6].Terminado})
  }

  const ActualizarJuegoFinal= async (isEnd)=>{
   await  JuegoFinal({_id:dataJuegoVocabulario._id, isEnd:isEnd});
  }

const Pantalla =()=>{
  if(dataJuegoVocabulario===null){
    return (<Navigate to={"/MenuJuego"} replace={true}/>)
  }else {
    return(
      <Container className='fondoMC img-fluid vh-100' >
    <NavBarJuego Seccion={"Vocabulario"} urlBack={"/RompecabezaJV"} />
 <Row className='justify-content-center'>
 <Col lg="6" md="6" sm="8" xs="8">
 <RompecabezaFinalRespuesta url={dataJuegoVocabulario.Partida.Rompecabeza.FileColor} alt={dataJuegoVocabulario.Partida.Rompecabeza.Nombre}  pieza={dataJuegoVocabulario.Partida.Rompecabeza.Pieza} resultado={points} />
 </Col>
 <Col lg="7" md="6" sm="8" xs="8" >
  <div><NavLink to={"/MenuJuego"} className="mx-auto" ><img width={75} src={cuadros} alt='al inicio'/></NavLink></div>
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
