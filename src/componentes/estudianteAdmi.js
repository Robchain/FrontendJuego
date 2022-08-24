import React,{useState, useRef}from "react";
import MenuAdmi from "./menuAdmi";
import './estudianteAdmi.css';
import { postEstudiante } from "../service/api";

const EstudianteAdmi =  ()=>{
    //hooks de useState
    const [formValues,  SetFormValues]   =  useState({
        Nombre: '',
        Apellido:   '',
        Identificacion:'',
        Email:'',
        Usuario:'',
        Password:'',
        TipoUsuario:'',
        FotoPerfil:'',
        Estado:'',
    })
const InputFileRef  =  useRef();
// estados
    const   handleChange    =   (event)  =>{
        const   {name, value}= event.target // el "name" debe ser generico y no ser igual a los valores que dan en el name del hook o el name del jsx
        SetFormValues({...formValues,    [name]:value})     

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
               
                <form   className="formularioE" onSubmit={handleSudmit}>
                <div>
                    <h1>ESTUDIANTE</h1>
                    <label>NOMBRES</label><br/><input  name="Nombre" value={formValues.Nombre}    onChange={handleChange}></input>
                    <label>APELLIDOS</label><br/><input  name="Apellido"  value={formValues.Apellido}  onChange={handleChange}></input>
                    <label>IDENTIFICACION</label><br/><input name="Identificacion"  value={formValues.Identificacion}    onChange={handleChange}></input>
                    <label>CORREO ELECTRONICO</label><br/><input name="Email" type="email"  value={formValues.Email}    onChange={handleChange}></input>
                    <label>USUARIO</label><br/><input  name='Usuario' value={formValues.Usuario}  onChange={handleChange}></input><br/>
                    <label>CONTRASEÑA</label><br/><input name="Password" type="password"   value={formValues.Password}   onChange={handleChange}></input><br/>
                    <label>TIPO USUARIO</label><br/><input name="TipoUsuario" value={formValues.TipoUsuario}  onChange={handleChange}></input><br/>
                    <label>FOTO DE PERFIL</label><br/><input name="FotoPerfil" type="file" className="input_foto"    ref={InputFileRef}></input><br/>
                    <label>ESTADO</label><br/><input    name="Estado" value={formValues.Estado}   onChange={handleChange}></input><br/>
                    <button type="sudmit"   className="botonU">CREAR</button>
                    </div>
                    <img    src=""  alt="Foto de perfil"></img>
                </form>
            </main>
    );
}

export default EstudianteAdmi;