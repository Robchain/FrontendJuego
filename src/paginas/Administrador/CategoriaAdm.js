import React,{useState} from "react";
import MenuAdmi from "../../componentes/MenuAdmi";

import axios from 'axios';
import { NavLink } from "react-router-dom";
const OracionAdm    =   ()  =>{
    const [FormValue, setFormValue] = useState({
        NombreCategoria:'',
        Estado:'Activo'

    })


    const handlechange  =   (event)  =>{
        const {name, value}=event.target;

    setFormValue({...FormValue,[name]:value})   
    }

    const handlesubmit =    e=>{
        e.preventDefault();
        //metodos post y get
        const postCategoria    =   async ()    =>{
            try {
                const response  = await axios({
                    url:"http://localhost:3002/api/auth/Categoria",
                    method:'POST',
                    data:FormValue
                })
            } catch (e) {
                console.log(e);
            }
        }
        postCategoria();
        setFormValue({NombreCategoria:''})
    }

    return(
        <main>
        <MenuAdmi/>
       <NavLink to={'/VerCategoria'}> <button className="Listado">Ver Listado</button></NavLink>
        <form onSubmit={handlesubmit}  className="formularioO">
        <div>
        <h1>Categoria</h1>
        <label>CATEGORIA</label>
        <input
            name='NombreCategoria'
            value={FormValue.NombreCategoria}
            onChange={handlechange}
        ></input>
        <label>ESTADO</label>
        <label> <input  
            type='radio'
            name="Estado"
            value="Activo"
            checked={FormValue.Estado==="Activo"}
            onChange={handlechange}
        />Activo</label> 
        <label>
        <input  
            type='radio'
            name="Estado"
            value="Inactivo"
            checked={FormValue.Estado==="Inactivo"}
            onChange={handlechange}
        />Inactivo
        </label>
        <button className="botonU">GUARDAR</button>
        </div>
        </form>        
        </main>
    )
}
export default OracionAdm;