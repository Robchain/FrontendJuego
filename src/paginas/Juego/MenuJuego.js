import React from 'react'
import BotonMenuJuego from '../../componentes/BotonMenuJuego'

const handlechange =(e)=>{
  e.preventDefault()
}
const MenuJuego = () => {
  return (
    <div>
      <form onSubmit={handlechange}>
     <BotonMenuJuego  url={'/RompecabezaJV'} menu={'VOCABULARIO'} imagen={'#'}/>
     <BotonMenuJuego  url={'/RompecabezaJV'} menu={'ROMPECABEZA'} imagen={'#'}/>
     <BotonMenuJuego  url={'/RompecabezaJV'} menu={'CARRERA'} imagen={'#'}/>
     <BotonMenuJuego  url={'/RompecabezaJV'} menu={'TROFEOS'} imagen={'#'}/>
      </form>
    </div>
  )
}

export default MenuJuego