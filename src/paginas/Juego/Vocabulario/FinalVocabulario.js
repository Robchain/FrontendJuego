import React, { useContext, useEffect, useState } from 'react'
import {  NavLink, Navigate } from 'react-router-dom'
import {PiSquaresFourDuotone} from 'react-icons/pi'
import {  Container } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import { Juego1 } from '../../../service/Juego/Vocabulario'
import { PiCoinVerticalDuotone } from "react-icons/pi";
import { FaPuzzlePiece } from "react-icons/fa";
import { RompecabaSolitaria } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabaSolitaria'

export const FinalVocabulario = () => {
  const { avance0,dataJuegoVocabulario,idRompecabeza,dataRompecabeza,prevAvance} = useContext(JuecoContext);
const [isfinished, setisfinished] = useState(false)

  const ActualizarJuego1= async ()=>{
      if(avance0!==undefined && dataRompecabeza.Pieza){
       if ((prevAvance.concat(avance0).filter(obj => obj.Resultado==="CORRECTO").length / dataRompecabeza.Pieza) >= 1 ){
        setisfinished(true)
       }
      }
    await  Juego1({_id:idRompecabeza,Avance:avance0})
    }

  useEffect(() => {
    ActualizarJuego1();
  }, [])
   
  // useEffect(() => {
  //   setfinalAvance( prevAvance.concat(avance0))
  // }, [])
  
 

const Pantalla =()=>{
  if(dataJuegoVocabulario===null){
    return (<Navigate to={"/MenuJuego"} replace={true}/>)
  }else {
    return(
      <Container className='fondoMC img-fluid vh-100' >
    <NavBarJuego Seccion={"Vocabulario"} urlBack={"/RompecabezaJV"} />
 <div className='contenido-final-vocabulario'>
 <div className='rompecabeza-final-vocabulario'>
 <RompecabaSolitaria principal={false} Avance={prevAvance.concat(avance0)} alt={dataRompecabeza.Nombre}  url={dataRompecabeza.FileColor} piezas={dataRompecabeza.Pieza} terminado={isfinished}/>
 <div className='puntos-seccion'>
 <div className='puzzle-div'>
 <h1 className='puntuacion-final-puzzle'><FaPuzzlePiece/> {`${prevAvance.concat(avance0).filter(obj => obj.Resultado==="CORRECTO").length}/${dataRompecabeza.Pieza}`}  </h1>
 </div>
 <div className='puntuacion-div'>
 <h1 className='puntuacion-final-coin'><PiCoinVerticalDuotone/> {`${prevAvance.concat(avance0).filter(obj => obj.Resultado==="CORRECTO").length}/${dataRompecabeza.Pieza}`}</h1>
 </div>
 </div>
 </div>
  <div className='menu-final'>
    <NavLink to={"/MenuJuego"} className="navegacion-final-vocabuarlio">
    <PiSquaresFourDuotone/>
    </NavLink>
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
