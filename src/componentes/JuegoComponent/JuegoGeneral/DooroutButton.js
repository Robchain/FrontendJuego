import React from 'react'
import Bloque9 from "../../../assets/img/AssetsGame/DoorOut1.png"//'../assets/images/AssetsGame/DoorOut1.png'
import { NavLink } from 'react-router-dom'
export const DooroutButton = ({Urlsalida}) => {

  return (
    <>
   <NavLink  to={Urlsalida}> <input type="image" alt="Boton Salir" src={Bloque9} width='90'  style={{display:'inline-block', margin:'auto'}} ></input></NavLink>
    </>
  )
}
