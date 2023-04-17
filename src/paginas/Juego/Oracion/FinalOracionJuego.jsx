import React, { useContext, useEffect} from 'react'
import {  NavLink} from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import cuadros from '../../../assets/img/Cuadros.png'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { RompecabezaFinalRespuesta } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabezaFinalRespuesta'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import { Juego1Oracion} from '../../../service/Juego/Oracion'
export const FinalOracionJuego = () => {
  const { Oracionprogreso, dataOracionJuego,idRompecabeza,dataRompecabeza } = useContext(JuecoContext);
  const ActualizarJuego1= async ()=>{
    await Juego1Oracion({_id:idRompecabeza,Avance:Oracionprogreso})
   }
   
  
  useEffect(() => {
    ActualizarJuego1();
  }, [])
  
  
  

  return (
    <>{
      dataOracionJuego !== null ? 
      (<Container className='fondoMC'>
    <NavBarJuego Seccion={"Oracion"} urlBack={"/RompecabezaJO"} />
 <Row className='justify-content-center'>
 <Col lg="6" md="6" sm="8" xs="8">
 <RompecabezaFinalRespuesta url={dataRompecabeza.FileColor} alt={dataRompecabeza.Nombre} pieza={dataRompecabeza.Pieza} resultado={Oracionprogreso.filter(obj => obj.Resultado==="CORRECTO").length} />
 </Col>
 <Col lg="7" md="6" sm="8" xs="8" >
  <div><NavLink to={"/MenuJuego"} className="mx-auto" ><img width={75} src={cuadros} alt='al inicio'/></NavLink></div>
 </Col>
 </Row>
 </Container>):(<><>Cargando...</></>)
    }</>
  )
}
