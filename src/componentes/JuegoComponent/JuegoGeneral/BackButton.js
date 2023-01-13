import React from 'react'
import Bloque9 from '../../../assets/img/AssetsGame/BackButton.png'
import { useNavigate } from 'react-router-dom'
export const BackButton = ({ruta=""}) => {
  const navigate = useNavigate()
  return (
    <>
    <input type="image" alt="Boton Atras" src={Bloque9} width='75'  style={{display:'inline-block', margin:'auto'}}  onClick={() => navigate(ruta)} ></input>
    </>
  )
}
