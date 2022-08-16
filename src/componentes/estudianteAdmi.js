import React,{Component} from "react";
import MenuAdmi from "./menuAdmi";
import './estudianteAdmi.css';

class EstudianteAdmi extends Component{




    render(){
        return(
            <main>
                <MenuAdmi/>
               
                <form   className="formularioE">
                <div>
                    <h1>ESTUDIANTE</h1>
                    <label>NOMBRES</label><input  type="text"></input><br/>
                    <label>APELLIDOS</label><input  type="text"></input><br/>
                    <label>IDENTIFICACION</label><input  type="text"></input><br/>
                    <label>CORREO ELECTRONICO</label><input  type="email"></input><br/>
                    <label>USUARIO</label><input  type="text"></input><br/>
                    <label>CONTRASEÑA</label><input  type="password"></input><br/>
                    <label>TIPO USURIO</label><input  type=''></input><br/>
                    <label>FOTO DE PERFIL</label><input  type="file" className="input_foto"></input><br/>
                    <label>ESTADO</label><input  type="string"></input><br/>
                    <input  type="sudmit" className="botonU"    value="CREAR"></input><br/>
                    </div>
                    <img    src=""  alt="Foto de perfil"></img>
                </form>
            </main>
        )
    }
}

export default EstudianteAdmi;