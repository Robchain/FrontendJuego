import React,{useState, useRef}from "react";
import MenuAdmi from "../../componentes/MenuAdmi";

import { postEstudiante } from "../../service/api";
import { NavLink } from "react-router-dom";


const EstudianteAdmi =  ()=>{
    //hooks de useState
    const [formValues,  SetFormValues]   =  useState({
        Nombre: '',
        Apellido:   '',
        Identificacion:'',
        Email:'',
        Usuario:'',
        Password:'',
        TipoUsuario:'Estudiante',
        FotoPerfil:'FotoPerfil',
        Estado:'Activo',
    })
const InputFileRef  =  useRef();
// estados
    const   handleChange    =   (event)  =>{
        const   {name, value}= event.target // el "name" debe ser generico y no ser igual a los valores que dan en el name del hook o el name del jsx
        SetFormValues({...formValues,    [name]:value})     
console.log(formValues)
    }
//estados para el archivo
const handleSudmit =    (e)  =>{
   e.preventDefault();//no envia la informacion por default del navegador
    //console.log(formValues)
    //console.log(InputFileRef.current.files)
    //postEstudiante(...formValues,InputFileRef.current.files[0]);
    postEstudiante(formValues);

}

    return(
        <main>
                <MenuAdmi/>
               <NavLink to={'/VerEstudiante'}> <button className="Listado">Ver Listado</button></NavLink>
                <form   className="formularioE" onSubmit={handleSudmit}>
                <div>
                    <h1>ESTUDIANTE</h1>
                    <label>NOMBRES</label><br/><input  name="Nombre" value={formValues.Nombre}    onChange={handleChange}></input>
                    <label>APELLIDOS</label><br/><input  name="Apellido"  value={formValues.Apellido}  onChange={handleChange}></input>
                    <label>IDENTIFICACION</label><br/><input name="Identificacion"  value={formValues.Identificacion}    onChange={handleChange}></input>
                    <label>CORREO ELECTRONICO</label><br/><input name="Email" type="email"  value={formValues.Email}    onChange={handleChange}></input>
                    <label>USUARIO</label><br/><input  name='Usuario' value={formValues.Usuario}  onChange={handleChange}></input><br/>
                    <label>CONTRASEÑA</label><br/><input name="Password" type="password"   value={formValues.Password}   onChange={handleChange}></input><br/>
                    <label>TIPO USUARIO</label><br/>
                    <label> <input  
            type='radio'
            name="TipoUsuario"
            value="Estudiante"
            checked={formValues.TipoUsuario==="Estudiante"}
            onChange={handleChange}
        />Estudiante</label> 
        <label>
        <input  
            type='radio'
            name="TipoUsuario"
            value="Maestro"
            checked={formValues.TipoUsuario==="Maestro"}
            onChange={handleChange}
        />Maestro
        </label>
                    <br/>
                    <label>FOTO DE PERFIL</label><br/><input name="FotoPerfil" type="file" className="input_foto"    ref={InputFileRef}></input><br/>
                    <label> <input  
            type='radio'
            name="Estado"
            value="Activo"
            checked={formValues.Estado==="Activo"}
            onChange={handleChange}
        />Activo</label> 
        <label>
        <input  
            type='radio'
            name="Estado"
            value="Inactivo"
            checked={formValues.Estado==="Inactivo"}
            onChange={handleChange}
        />Inactivo
        </label>
                    <button type="sudmit"   className="botonU">CREAR</button>
                    </div>
                    <img    src=""  alt="Foto de perfil"></img>
                </form>
            </main>
    );
}

export default EstudianteAdmi;