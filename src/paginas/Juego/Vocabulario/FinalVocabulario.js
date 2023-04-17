import React, { useContext, useEffect } from 'react'
import {  NavLink, Navigate } from 'react-router-dom'
import cuadros from '../../../assets/img/Cuadros.png'
import { Col, Container, Row } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { RompecabezaFinalRespuesta } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabezaFinalRespuesta'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import { Juego1 } from '../../../service/Juego/Vocabulario'

export const FinalVocabulario = () => {
  const { avance0,dataJuegoVocabulario,idRompecabeza,dataRompecabeza} = useContext(JuecoContext);

  const ActualizarJuego1= async ()=>{
    await  Juego1({_id:idRompecabeza,Avance:avance0})
    }


  useEffect(() => {
    ActualizarJuego1();
  }, [])
   
 

const Pantalla =()=>{
  if(dataJuegoVocabulario===null){
    return (<Navigate to={"/MenuJuego"} replace={true}/>)
  }else {
    return(
      <Container className='fondoMC img-fluid vh-100' >
    <NavBarJuego Seccion={"Vocabulario"} urlBack={"/RompecabezaJV"} />
 <Row className='justify-content-center'>
 <Col lg="6" md="6" sm="8" xs="8">
 <RompecabezaFinalRespuesta url={dataRompecabeza.FileColor} alt={dataRompecabeza.Nombre}  pieza={dataRompecabeza.Pieza} resultado={avance0.filter(obj => obj.Resultado==="CORRECTO").length} />
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
