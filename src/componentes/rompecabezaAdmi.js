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
    <label>NOMBRE</label>
    <input></input>
    <label>ARCHIVO</label>
    <input></input>
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