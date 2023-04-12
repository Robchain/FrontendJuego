import React, { useContext, useEffect} from 'react'
import {  NavLink, useNavigate} from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import cuadros from '../../../assets/img/Cuadros.png'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { RompecabezaFinalRespuesta } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabezaFinalRespuesta'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import { Juego1Oracion, Juego2Oracion, Juego3Oracion, Juego4Oracion, Juego5Oracion, Juego6Oracion, Juego7Oracion, JuegoFinalOracion } from '../../../service/Juego/Oracion'
export const FinalOracionJuego = () => {
  const { Oracionprogreso, dataOracionJuego } = useContext(JuecoContext);
  const verifyEnd =()=>{
    if(dataOracionJuego.Partida.Rompecabeza.Pieza===6){
      if(Oracionprogreso.filter(obj => obj.Resultado==="CORRECTO").length>=7){
        ActualizarJuegoFinal(true);
      }
    }else if(dataOracionJuego.Partida.Rompecabeza.Pieza===4){
  if(Oracionprogreso.filter(obj => obj.Resultado==="CORRECTO").length>=5){
  ActualizarJuegoFinal(true);
}
    }

  }
  const navegar = useNavigate();
  useEffect(() => {
    if(dataOracionJuego ===null){
      navegar(`/MenuJuego`);
    }

    if(Oracionprogreso.length>=5 ){
    ActualizarJuego1();
    ActualizarJuego2();
    ActualizarJuego3();
    ActualizarJuego4();
    ActualizarJuego5();
    if(Oracionprogreso[5]){
    ActualizarJuego6();
    }
    if(Oracionprogreso[6]){
      ActualizarJuego7();
    }
    verifyEnd();}
  }, [])
  
  
  const ActualizarJuego1= async ()=>{
   await Juego1Oracion({_id:dataOracionJuego._id,PalabraAEvaluar:Oracionprogreso[0].PalabraAEvaluar,PalabraASeleccionada:Oracionprogreso[0].PalabraASeleccionada,Resultado:Oracionprogreso[0].Resultado,Terminado:Oracionprogreso[0].Terminado})
  }
  
  const ActualizarJuego2=async ()=>{
   await Juego2Oracion({_id:dataOracionJuego._id,PalabraAEvaluar:Oracionprogreso[1].PalabraAEvaluar,PalabraASeleccionada:Oracionprogreso[1].PalabraASeleccionada,Resultado:Oracionprogreso[1].Resultado,Terminado:Oracionprogreso[1].Terminado})
  }
  
  const ActualizarJuego3=async()=>{
    await Juego3Oracion({_id:dataOracionJuego._id,PalabraAEvaluar:Oracionprogreso[2].PalabraAEvaluar,PalabraASeleccionada:Oracionprogreso[2].PalabraASeleccionada,Resultado:Oracionprogreso[2].Resultado,Terminado:Oracionprogreso[2].Terminado})
  }
  
  const ActualizarJuego4=async()=>{
   await Juego4Oracion({_id:dataOracionJuego._id,PalabraAEvaluar:Oracionprogreso[3].PalabraAEvaluar,PalabraASeleccionada:Oracionprogreso[3].PalabraASeleccionada,Resultado:Oracionprogreso[3].Resultado,Terminado:Oracionprogreso[3].Terminado})
  }
  
  const ActualizarJuego5=async()=>{
    await Juego5Oracion({_id:dataOracionJuego._id,PalabraAEvaluar:Oracionprogreso[4].PalabraAEvaluar,PalabraASeleccionada:Oracionprogreso[4].PalabraASeleccionada,Resultado:Oracionprogreso[4].Resultado,Terminado:Oracionprogreso[4].Terminado})
  }
  
  const ActualizarJuego6= async()=>{
    await Juego6Oracion({_id:dataOracionJuego._id,PalabraAEvaluar:Oracionprogreso[5].PalabraAEvaluar,PalabraASeleccionada:Oracionprogreso[5].PalabraASeleccionada,Resultado:Oracionprogreso[5].Resultado,Terminado:Oracionprogreso[5].Terminado})
  }
  
  const ActualizarJuego7=async()=>{
   await Juego7Oracion({_id:dataOracionJuego._id,PalabraAEvaluar:Oracionprogreso[6].PalabraAEvaluar,PalabraASeleccionada:Oracionprogreso[6].PalabraASeleccionada,Resultado:Oracionprogreso[6].Resultado,Terminado:Oracionprogreso[6].Terminado})
  }


  const ActualizarJuegoFinal=async(isEnd)=>{
    await JuegoFinalOracion({_id:dataOracionJuego._id,isEnd:isEnd})
  }

  return (
    <>{
      dataOracionJuego !== null ? 
      (<Container className='fondoMC'>
    <NavBarJuego Seccion={"Oracion"} urlBack={"/RompecabezaJO"} />
 <Row className='justify-content-center'>
 <Col lg="6" md="6" sm="8" xs="8">
 <RompecabezaFinalRespuesta url={dataOracionJuego.Partida.Rompecabeza.FileColor} alt={dataOracionJuego.Partida.Rompecabeza.Nombre} pieza={dataOracionJuego.Partida.Rompecabeza.Pieza} resultado={Oracionprogreso.filter(obj => obj.Resultado==="CORRECTO").length} />
 </Col>
 <Col lg="7" md="6" sm="8" xs="8" >
  <div><NavLink to={"/MenuJuego"} className="mx-auto" ><img width={75} src={cuadros} alt='al inicio'/></NavLink></div>
 </Col>
 </Row>
 </Container>):(<><>Cargando...</></>)
    }</>
  )
}
