import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { JuecoContext } from './JuecoContext'

export const JuegoProvider = ({children}) => {
  const [respuesta, setRespuesta] = useState([])
  const [user, setUser] = useState("")
  const [data, setData] = useState(null)
  const [oraciondata, setOraciondata] = useState(null);   
  const [rompecabeza1, setRompecabeza1] = useState(0)
  const [rompecabeza2, setRompecabeza2] = useState(0)
  const [rompecabeza3, setRompecabeza3] = useState(0)
  const [rompecabeza4, setRompecabeza4] = useState(0)
  const [rompecabeza5, setRompecabeza5] = useState(0)
  const [rompecabeza6, setRompecabeza6] = useState(0)


  const [avance0, setavance] = useState([])


  const progreso = (selecionado, Resul,)=>{
   
       setavance([...avance0,{ PalabraAEvaluar:"",PalabraASeleccionada:selecionado, Resultado:Resul, Terminado:false
       }])
     }



  const datoVocabulario = (user)=>{
  axios.post("http://localhost:3002/api/auth/llamadaPartidaVocabulario",{Usuario:user}).then(da =>{setData(da.data)})
  }  

  const dataOracion= (user)=>{
    axios.post("http://localhost:3002/api/auth/llamadaPartidaOracion",{Usuario:user}).then(response =>{setOraciondata(response.data)})
  }

  const resultados = (palabra="",respuestas="") =>{
    setRespuesta([...respuesta, {
        palabra:palabra,
        respuestar:respuestas
    }])

  }

  const getPuzzles =(rompe=0, respuesta)=>{
    if(rompe===1){
      setRompecabeza1(respuesta)
    }
    if(rompe===2){
      setRompecabeza2(respuesta)
    }
    if(rompe===3){
      setRompecabeza3(respuesta)
    }
    if(rompe===4){
      setRompecabeza4(respuesta)
    }
    if(rompe===5){
      setRompecabeza5(respuesta)
    }
    if(rompe===6){
      setRompecabeza6(respuesta)
    }
  }
  
  const getresultado= ()=>{
   let final = 0

   let  total = respuesta.map((solitario, i)=>{
        if(solitario.respuestar ==="CORRECTO"){
            return final++
        }
        if(solitario.respuestar ==="INCORRECTO"){
            return 0
        }  
    })
    return final;
}

  return (
    <JuecoContext.Provider value={{data,setavance,dataOracion,setOraciondata,oraciondata,progreso, datoVocabulario,setUser, resultados, getresultado, getPuzzles, rompecabeza1, rompecabeza2, rompecabeza3, rompecabeza4, rompecabeza5, rompecabeza6, avance0,setData}}>
    {children}
    </JuecoContext.Provider>
  )
}
