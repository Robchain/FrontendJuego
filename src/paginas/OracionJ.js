import React,{useState,useRef} from 'react'
import MenuAdmi from '../componentes/menuAdmi'

const OracionJ = () => {
  




  const handleSubmit =(e)=>{
    e.preventDefault();
  }
  return (
    <main>
    <MenuAdmi/>
    <form   className='formularioO' onSubmit={handleSubmit}>
    <div>
    <h1>ROMPECABEZA</h1>
    <label>NOMBRE</label><input name='Nombre'   value={DatosR.Nombre}   onChange={handleChange}></input>
    <label>ARCHIVOS COLOR </label><input  type="file" className='input_Color'   name='ArchivoC'  ref={archivoRef}></input>
    <label>ARCHIVOS BLANCO/NEGRO</label><input  type="file" className='input_Blanco'   name='ArchivoB'  ref={archivoRef}></input>
    <label>ESTADO</label><input name='Estado'   value={DatosR.Estado}   onChange={handleChange}></input>
    <button className='boton' type="sudmit"  value="guardar" >SUBIR</button>
    </div>
    <img src="" alt='Rompecabeza'></img>
    </form>
</main>
  )
}

export default OracionJ