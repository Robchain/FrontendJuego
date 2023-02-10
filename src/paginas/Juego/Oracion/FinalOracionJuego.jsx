import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import { DooroutButton } from '../../../componentes/JuegoComponent/JuegoGeneral/DooroutButton'
import { RompecabezaFinalRespuesta } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabezaFinalRespuesta'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
export const FinalOracionJuego = () => {
  const { oraciondata, getresultado, getPuzzles,Oracionprogreso  } = useContext(JuecoContext);
  const {id}= useParams();
  const res = getresultado();
  const [points, setPoints] = useState(0);
  if(oraciondata===null){
    return <>Cargando...</>
  }
  
  
  const verifyEnd =()=>{
    let ad = Oracionprogreso.filter(obj => obj.Resultado==="CORRECTO").length;
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
    if(Oracionprogreso[5].PalabraAEvaluar){
    ActualizarJuego6();
    }
    verifyEnd();
  }, [])
  
  
  
  const ActualizarJuego1=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoOracion1",{ id:oraciondata[`Juego${id}`]._id,
    PalabraCorrecta:Oracionprogreso[0].PalabraAEvaluar,
    PalabraSeleccionada:Oracionprogreso[0].PalabraASeleccionada,
    Resultado:Oracionprogreso[0].Resultado,
    Terminado:Oracionprogreso[0].Terminado})
  }
  
  const ActualizarJuego2=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoOracion2",{ id:oraciondata[`Juego${id}`]._id,
    PalabraCorrecta:Oracionprogreso[1].PalabraAEvaluar,
    PalabraSeleccionada:Oracionprogreso[1].PalabraASeleccionada,
    Resultado:Oracionprogreso[1].Resultado,
    Terminado:Oracionprogreso[1].Terminado})
  }
  
  const ActualizarJuego3=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoOracion3",{ id:oraciondata[`Juego${id}`]._id,
    PalabraCorrecta:Oracionprogreso[2].PalabraAEvaluar,
    PalabraSeleccionada:Oracionprogreso[2].PalabraASeleccionada,
    Resultado:Oracionprogreso[2].Resultado,
    Terminado:Oracionprogreso[2].Terminado})
  }
  
  const ActualizarJuego4=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoOracion4",{ id:oraciondata[`Juego${id}`]._id,
    PalabraCorrecta:Oracionprogreso[3].PalabraAEvaluar,
    PalabraSeleccionada:Oracionprogreso[3].PalabraASeleccionada,
    Resultado:Oracionprogreso[3].Resultado,
    Terminado:Oracionprogreso[3].Terminado})
  }
  
  const ActualizarJuego5=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoOracion5",{ id:oraciondata[`Juego${id}`]._id,
    PalabraCorrecta:Oracionprogreso[4].PalabraAEvaluar,
    PalabraSeleccionada:Oracionprogreso[4].PalabraASeleccionada,
    Resultado:Oracionprogreso[4].Resultado,
    Terminado:Oracionprogreso[4].Terminado})
  }
  
  const ActualizarJuego6=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoOracion6",{ id:oraciondata[`Juego${id}`]._id,
    PalabraCorrecta:Oracionprogreso[5].PalabraAEvaluar,
    PalabraSeleccionada:Oracionprogreso[5].PalabraASeleccionada,
    Resultado:Oracionprogreso[5].Resultado,
    Terminado:Oracionprogreso[5].Terminado})
  }
  
  const ActualizarJuego7=()=>{
    axios.post("http://localhost:3002/api/auth/UpdateTerminadoOracion7",{ id:oraciondata[`Juego${id}`]._id,
    PalabraCorrecta:Oracionprogreso[6].PalabraAEvaluar,
    PalabraSeleccionada:Oracionprogreso[6].PalabraASeleccionada,
    Resultado:Oracionprogreso[6].Resultado,
    Terminado:Oracionprogreso[6].Terminado})
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
      <h1>{`${Oracionprogreso.filter(obj => obj.Resultado==="CORRECTO").length}/${oraciondata[`Juego${id}`].Partida.Rompecabeza.Pieza}`}</h1>
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
