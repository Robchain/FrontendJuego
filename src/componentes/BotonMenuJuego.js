import React from 'react'
import { NavLink } from "react-router-dom";

const botonMenuJuego = ({url, menu,imagen}) => {


   return (
    <>
       <NavLink to={url}><button  className='BotonMenuJuego'><p>{menu}</p>  <img  src={imagen}   alt="imagen_menu"/></button></NavLink>
    </>
  )
}

export default botonMenuJuego