import React, { useContext, useEffect, useState} from 'react'
import {  NavLink} from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import cuadros from '../../../assets/img/Cuadros.png'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import { Juego1Oracion} from '../../../service/Juego/Oracion'
import { RompecabaSolitaria } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabaSolitaria'
export const FinalOracionJuego = () => {
  const { Oracionprogreso, dataOracionJuego,idRompecabeza,dataRompecabeza } = useContext(JuecoContext);
  const [isfinished, setisfinished] = useState(false)
  const ActualizarJuego1= async ()=>{
    if(Oracionprogreso!==undefined && dataRompecabeza.Pieza){
      if ((Oracionprogreso.filter(obj => obj.Resultado==="CORRECTO").length / dataRompecabeza.Pieza) >= 1 ){
       setisfinished(true)
      }
     }
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
 <RompecabaSolitaria principal={false} Avance={Oracionprogreso}  alt={dataRompecabeza.Nombre} url={dataRompecabeza.FileColor} piezas={dataRompecabeza.Pieza} terminado={isfinished}/>
 <h1 className='mx-auto'>{`${Oracionprogreso.filter(obj => obj.Resultado==="CORRECTO").length}/${Oracionprogreso.length}`}</h1>
 </Col>
 <Col lg="7" md="6" sm="8" xs="8" >
  <div><NavLink to={"/MenuJuego"} className="mx-auto" ><img width={75} src={cuadros} alt='al inicio'/></NavLink></div>
 </Col>
 </Row>
 </Container>):(<><>Cargando...</></>)
    }</>
  )
}
