
import './App.css';
import { Component, useState } from 'react';
import axios from 'axios';
import React from 'react';
import Niño from './img/LoginB.png';
import Niña from './img/LoginN.png';
import Logo from './img/logo tiempo.png';
const url = "http://localhost:3002/api/auth/signin";

class App extends Component{
/*state={
  data:[]
}
peticionGet=()=>{
axios.get(url).then(response=>{
  console.log(response.data);
})
}
  componentDidMount(){
this.peticionGet();
}*/
  render(){
return(
 <main>
  <div  className='Niño'>
    <img  className='Niñoimagen' src={Niño} alt='Niño'></img>
  </div>
  <form>
  <img  className='LogoColegio' src={Logo} alt="logo del colegio" ></img>
    <label>CORRE ELECTRONICO</label><br/>
    <input  type="text" ></input><br/>  
    <label>CONTRASEÑA</label><br/>
    <input  type="password" ></input><br/>
    <input  className='boton' type='submit' value='ENTRAR'></input><br/>
    <a href='wwww.google.com' >INSCRIBIRSE</a><br/>
    <a href='wwww.google.com'>OLVIDE MI CONTRASEÑA</a>
  </form>
  <div  className='Niña'>
    <img  className='Niñaimagen'  src={Niña} alt="Niña"></img>
    </div>
 </main>


)
}
}
export default App;
