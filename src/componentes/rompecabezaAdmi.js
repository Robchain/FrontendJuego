import React, { useState,useRef } from 'react';
import MenuAdmi from './menuAdmi';
import './rompecabezaAdmi.css'
import axios from 'axios';


const rompecabezaAdmi  = ()  => {
    
    const [DatosR, SetDatosR]   =  useState({
        Nombre:'',    
        ArchivoC:'',
        ArchivoB:'',
        Estado:''
    })
    const archivoRef=useRef();

    const handleChange  =   (event)=>{
        const   {name, value}=event.target
        SetDatosR({...DatosR,   [name]:value})
        
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
//metodo post o get 
  const subirRompecabeza=   async   ()=>{
    try {
        const response  = await axios({
            url:"http://localhost:3002/api/auth/rompecabezaAdmi",
            method:'POST',
            data:DatosR
        })
    } catch (e) {
        console.log(e);
    }
}
subirRompecabeza();

    }
    return(
<main>
    <MenuAdmi/>
    
    <form   className='formularioR' onSubmit={handleSubmit}>
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
export default rompecabezaAdmi;