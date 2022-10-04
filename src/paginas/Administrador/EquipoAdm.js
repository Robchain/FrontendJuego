import React,{useEffect,useState}from 'react'
import MenuAdmi from "../../componentes/MenuAdmi";
import axios from 'axios';

const EquipoAdm   =   ()  =>{
    const [Data, setData] = useState([])
    useEffect(() => {
      const mostrar=  async()=>{
        const data=await  axios.get('http://localhost:3002/api/auth/rompecabezaAdmi/mostrartodo');
        setData(data.data);
      }
      mostrar()
    }, [])
   
    return (
      <main>
      <MenuAdmi/>
      <h1>Administrador de equipos</h1>
      </main>
    )
  }
export default EquipoAdm;