import React, { useContext, useEffect, useState } from 'react'
import {  NavLink, Navigate } from 'react-router-dom'
import {PiSquaresFourDuotone} from 'react-icons/pi'
import {  Container } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
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
 <div className='contenido-final-vocabulario'>
 <div className='rompecabeza-final-vocabulario'>
 <RompecabaSolitaria principal={false} Avance={avance0} alt={dataRompecabeza.Nombre}  url={dataRompecabeza.FileColor} piezas={dataRompecabeza.Pieza} terminado={isfinished}/>
 <h1 className='puntuacion-final'>{`${avance0.filter(obj => obj.Resultado==="CORRECTO").length}/${avance0.length}`}</h1>
 </div>
 <div>
  <div className='menu-final'>
    <NavLink to={"/MenuJuego"} className="navegacion-final-vocabuarlio">
    <PiSquaresFourDuotone/>
    </NavLink>
  </div>
 </div>
 </div>
 </Container>
    )
  }
}
  return (
   <Pantalla/>
  )
}
