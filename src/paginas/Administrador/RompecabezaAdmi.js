import React, { useState,useRef } from 'react';
import MenuAdmi from '../../componentes/MenuAdmi';
import axios from 'axios';
import { NavLink } from 'react-router-dom';



const rompecabezaAdmi  = ()  => {
    
    const [DatosR, SetDatosR]   =  useState({
        Nombre:'',    
        FileBlanco:'FileBlanco',
        FileColor:'FileColor',
        Estado:'Activo'
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
    <NavLink    to={'/VerRompecabeza'}><button className="Listado">Ver Listado</button></NavLink>
    <form   className='formularioR' onSubmit={handleSubmit}>
    <div>
    <h1>ROMPECABEZA</h1>
    <label>NOMBRE</label><input name='Nombre'   value={DatosR.Nombre}   onChange={handleChange}></input>
    <label>ARCHIVOS COLOR </label><input  type="file" className='input_Color'   name='FileColor'  ref={archivoRef}></input>
    <label>ARCHIVOS BLANCO/NEGRO</label><input  type="file" className='input_Blanco'   name='FileBlanco'  ref={archivoRef}></input>
    <label>ESTADO</label><label> <input  
            type='radio'
            name="Estado"
            value="Activo"
            checked={DatosR.Estado==="Activo"}
            onChange={handleChange}
        />Activo</label> 
        <label>
        <input  
            type='radio'
            name="Estado"
            value="Inactivo"
            checked={DatosR.Estado==="Inactivo"}
            onChange={handleChange}
        />Inactivo
        </label>
    <button className='boton' type="sudmit"  value="guardar" >SUBIR</button>
    </div>
    <img src="" alt='Rompecabeza'></img>
    </form>
</main>
    )
}
export default rompecabezaAdmi;