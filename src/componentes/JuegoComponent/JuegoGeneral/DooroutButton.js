import React from 'react'
import Bloque9 from "../../../assets/img/AssetsGame/DoorOut1.png"//'../assets/images/AssetsGame/DoorOut1.png'
import { NavLink } from 'react-router-dom'
export const DooroutButton = () => {

  return (
    <>
   <NavLink  to={'/Login'}> <input type="image" alt="Boton Salir" src={Bloque9} width='120'  style={{display:'inline-block', margin:'auto'}} ></input></NavLink>
    </>
  )
}
