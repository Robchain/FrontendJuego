import React, { useContext, useEffect, useState} from 'react'
import {  NavLink} from 'react-router-dom'
import { Container } from 'reactstrap'
import { PiCoinVerticalDuotone } from "react-icons/pi";
import { FaPuzzlePiece } from "react-icons/fa";
import {PiSquaresFourDuotone} from 'react-icons/pi'
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
    <NavBarJuego Seccion={"Oración"} urlBack={"/RompecabezaJO"} />
 <div className='contenido-final-vocabulario'>
 <div className='rompecabeza-final-vocabulario'>
 <RompecabaSolitaria principal={false} Avance={Oracionprogreso}  alt={dataRompecabeza.Nombre} url={dataRompecabeza.FileColor} piezas={dataRompecabeza.Pieza} terminado={isfinished}/>
 <div className='puntos-seccion'>
 <div className='puzzle-div'>
 <h1 className='puntuacion-final-puzzle'> <FaPuzzlePiece/>{`${Oracionprogreso.filter(obj => obj.Resultado==="CORRECTO").length}/${Oracionprogreso.length-1}`}</h1>
 </div>
 <div className='puntuacion-div'>
 <h1 className='puntuacion-final-coin'><PiCoinVerticalDuotone/>{`${Oracionprogreso.filter(obj => obj.Resultado==="CORRECTO").length}/${Oracionprogreso.length}`}</h1>
 </div>
 </div>
 </div>
 <div className='menu-final' >
    <NavLink to={"/MenuJuego"} className="navegacion-final-vocabuarlio" >
    <PiSquaresFourDuotone/>
  </NavLink>
 </div>
 </div>
 </Container>):(<><>Cargando...</></>)
    }</>
  )
}
