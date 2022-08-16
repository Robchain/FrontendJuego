import React, { Component } from 'react';
import MenuAdmi from './menuAdmi';
import './rompecabezaAdmi.css'
import BotonAdmin from './botonAdmi';
class rompecabezaAdmi extends Component{
render(){
    return(
<main>
    <MenuAdmi/>
    
    <form   className='formularioR'>
    <div>
    <h1>ROMPECABEZA</h1>
    <label>NOMBRE</label>
    <input></input>
    <label>ARCHIVOS COLOR </label>
    <input  type="file" className='input_archivo'></input>
    <label>ARCHIVOS BLANCO/NEGRO</label>
    <input  type="file" className='input_archivo'></input>
    <label>ESTADO</label>
    <input></input>
    <input className='boton' type="sudmit"  value="guardar"></input>
    </div>
    <img src="" alt='Rompecabeza'></img>
    </form>
</main>
    )
    }
}
export default rompecabezaAdmi;