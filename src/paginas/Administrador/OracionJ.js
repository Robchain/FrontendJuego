import React,{useState,useRef} from 'react'
import MenuAdmi from '../../componentes/MenuAdmi'
const OracionJ = () => {
  const handleSubmit =(e)=>{
    e.preventDefault();
  }
  return (
    <main>
    <MenuAdmi/>
    <form   className='formularioO' onSubmit={handleSubmit}>
    <div>
    <h1>Rompecabeza</h1>
    <label>Nombre</label><input name='Nombre'   value={DatosR.Nombre}   onChange={handleChange}></input>
    <label>Archivo Color</label><input  type="file" className='input_Color'   name='ArchivoC'  ref={archivoRef}></input>
    <label>Archivo Blanco/Color</label><input  type="file" className='input_Blanco'   name='ArchivoB'  ref={archivoRef}></input>
    <label>Estado</label><input name='Estado'   value={DatosR.Estado}   onChange={handleChange}></input>
    <button className='boton' type="sudmit"  value="guardar" >Subir</button>
    </div>
    <img src="" alt='Rompecabeza'></img>
    </form>
</main>
  )
}

export default OracionJ