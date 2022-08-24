import React,{useState} from "react";
import Niño from '../img/LoginB.png';
import Niña from '../img/LoginN.png';
import Logo from '../img/logo tiempo.png';
import '../App.css';
import axios from 'axios';
import { postUsurio } from "../service/api";
import { useNavigate } from "react-router-dom"; //!!arreglar la navegacion con rutas protegidas!!



const Index =()=>{
    let entrar = useNavigate();
    const [Datos, SetDatos]=useState({
        Email:'',
        Password:'',
    });
    // 
     const [valores,setValores ]=useState({
        error:false,
        mensajeError:'Contraseña incorrecta',
        color:'red'
    })
    let mensajeErrora=''

    const   handleChange    =   (event)  =>{
        const   {name, value}=event.target  // el "name" debe ser generico y no ser igual a los valores que dan en el name del hook o el name del jsx
        SetDatos({...Datos,    [name]:value})     

    }
const handleSudmit= (e)=>{
    e.preventDefault();
const postUsurio    =   async ()    =>{
        try {
            const response  = await axios({
                url:"http://localhost:3002/api/auth/signin",
                method:'POST',
                data:Datos
            }).then(response=>{
                if(response.data.respuesta !== 'Contraseña incorrecta'  &&  response.data.respuesta!=='falta correo y contraseña'   &&  response.data.respuesta!=='Correo o contraseña incorrecta'){
                    if(response.data.TipoUsuario    === 'Maestro'){
                    localStorage.setItem('token',response.data.token)
                   entrar('/Administrador');
                console.log(response.data.TipoUsuario);
                    }else{
                       entrar('/MenuJuego');
                        console.log(response.data.TipoUsuario);
                    }
                }else{
                   mensajeErrora=response.data.respuesta;
                    console.log(response.data.respuesta);
                }
            })
        } catch (e) {
            console.log(e);
        }
    }
    postUsurio();
    
    
}
    return(
        <main>
  <div  className='Niño'>
    <img  className='Niñoimagen' src={Niño} alt='Niño'></img>
  </div>
  <form onSubmit={handleSudmit}>    
  <img  className='LogoColegio' src={Logo} alt="logo del colegio" ></img>
    <label>CORRE ELECTRONICO</label><br/>
    <input  type="text" name="Email"    value={Datos.Email} onChange={handleChange}></input><br/>
    <label>CONTRASEÑA</label><br/><input  type="password" name="Password"   value={Datos.Password} onChange={handleChange}></input><br/>
    <br/><input  className='boton' type='submit' value='ENTRAR'  ></input><br/>
    <a href='wwww.google.com' >INSCRIBIRSE</a><br/>
    <a href='wwww.google.com'>OLVIDE MI CONTRASEÑA</a>
  </form>
  <div  className='Niña'>
    <img  className='Niñaimagen'  src={Niña} alt="Niña"></img>
    </div>
 </main>
    );
}
export default  Index;