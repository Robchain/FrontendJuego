import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { JuecoContext } from './JuecoContext'

export const JuegoProvider = ({children}) => {
    const [respuesta, setRespuesta] = useState([])
  const [data, setData] = useState(null)    
  useEffect(() => {
    axios.get("http://192.168.1.16:3002/api/auth/partidaEstudiante").then(da =>{setData(da.data)})
  }, [])
  

  const resultados = (palabra="",respuestas="") =>{
    setRespuesta([...respuesta, {
        palabra:palabra,
        respuestar:respuestas
    }])

  }
const getresultado= ()=>{
   
   let  total = respuesta.map((solitario, i)=>{
        if(solitario.respuestar ==="CORRECTO"){
            return 1
        }
        if(solitario.respuestar ==="INCORRECTO"){
            return 0
        }  
    })
    return total;
}
 
  return (
    <JuecoContext.Provider value={{data, resultados, getresultado}}>
    {children}
    </JuecoContext.Provider>
  )
}
