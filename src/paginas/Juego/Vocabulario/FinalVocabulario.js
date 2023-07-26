import React, { useContext, useEffect, useState } from 'react'
import {  NavLink, Navigate } from 'react-router-dom'
import cuadros from '../../../assets/img/Cuadros.png'
import { Col, Container, Row } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { RompecabezaFinalRespuesta } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabezaFinalRespuesta'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import { Juego1 } from '../../../service/Juego/Vocabulario'
import { RompecabaSolitaria } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabaSolitaria'

export const FinalVocabulario = () => {
  const { avance0,dataJuegoVocabulario,idRompecabeza,dataRompecabeza} = useContext(JuecoContext);
const [isfinished, setisfinished] = useState(false)

  const ActualizarJuego1= async ()=>{
      if(avance0!==undefined && dataRompecabeza.Pieza){
       if ((avance0.filter(obj => obj.Resultado==="CORRECTO").length / dataRompecabeza.Pieza) >= 1 ){
        setisfinished(true)
       }
      }
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
 <RompecabaSolitaria principal={false} Avance={avance0} alt={dataRompecabeza.Nombre}  url={dataRompecabeza.FileColor} piezas={dataRompecabeza.Pieza} terminado={isfinished}/>
 <h1 className='mx-auto'>{`${avance0.filter(obj => obj.Resultado==="CORRECTO").length}/${avance0.length}`}</h1>
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
