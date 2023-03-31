import React, {useReducer, useState } from 'react'
import { llamadaInicialDelosEquiposSinAsignar, llamadoIncialDePosiciondelUsuario } from '../../service/Multijugador'
import { JuecoContext } from './JuecoContext'
import { llamadaPartidaOracion } from '../../service/Juego/Oracion'
import { llamadaRompecabezaGet } from '../../service/Juego/Vocabulario'

export const JuegoProvider = ({children}) => {
  const [respuesta, setRespuesta] = useState([])
const [cardEquipo, setCardEquipo] = useState([]);
  const [data, setData] = useState(null)
  
  const [oraciondata, setOraciondata] = useState(null);   
  const [rompecabeza1, setRompecabeza1] = useState(0)
  const [rompecabeza2, setRompecabeza2] = useState(0)
  const [rompecabeza3, setRompecabeza3] = useState(0)
  const [rompecabeza4, setRompecabeza4] = useState(0)
  const [rompecabeza5, setRompecabeza5] = useState(0)
  const [rompecabeza6, setRompecabeza6] = useState(0)

  
  const [InfoEstudiaSituacion, setInfoEstudiaSituacion] = useState(null)

  const LLamadaIncial = async()=>{
   try {
    let nombre = localStorage.getItem("Nombre");
   let apellido = localStorage.getItem("Apellido");
  let completo =  `${nombre} ${apellido}`
  let value = localStorage.getItem("Id");
  if(completo.length>5 && value.length>3){
   const data  = await  llamadoIncialDePosiciondelUsuario(completo,value );
   if(data === null){
    disparodeAcciones({ type: "cambio", field: "MultiJugador", value: true })
   }else if(data !==null){ 
    setInfoEstudiaSituacion(data);
  }}
   } catch (error) {
    disparodeAcciones({ type: "cambio", field: "MultiJugador", value: true })
   }
   }
  const llamadaDos =async(IdDeLaAsignacion)=>{
    const data = await  llamadaInicialDelosEquiposSinAsignar(IdDeLaAsignacion, );
    setCardEquipo(data);
  }


  const [avance0, setavance] = useState([])
  const EstadoDeLosBotones = {Vocabulario:false, Oraciones:false, MultiJugador:false };

  const controladordelosBotones = (state, action) => {
    switch (action.type) {
      case 'cambio':
        return {...state, [action.field]: action.value};
        case "RESETEAR":
          return EstadoDeLosBotones;
      default:
        return state;
    }
  };

const [{Vocabulario, Oraciones, MultiJugador}, disparodeAcciones] = useReducer(controladordelosBotones, EstadoDeLosBotones)

  const initialState = [];

  const progresoOraciom = (state, action) => {
    switch (action.type) {
      case 'PROGRESO':
        return [
          ...state,
          { 
            PalabraAEvaluar: "",
            PalabraASeleccionada: action.selecionado, 
            Resultado: action.Resul, 
            Terminado: false
          }
        ];
        case "RESETEAR":
          return initialState;
      default:
        return state;
    }
  };
  const initialStateMulti = [];

  const progresoMulti = (state, action) => {
    switch (action.type) {
      case 'PROGRESO':
        return [
          ...state,
          { 
            PalabraCorrecta: action.PalabraCorrecta,
            PalabraSeleccionada: action.PalabraSeleccionada, 
            Resultado: action.Resultado, 
            Terminado: true
          }
        ];
        case "RESETEAR":
          return initialStateMulti;
      default:
        return state;
    }
  };

  const progreso = (selecionado, Resul)=>{
   
       setavance([...avance0,{ PalabraAEvaluar:"",PalabraASeleccionada:selecionado, Resultado:Resul, Terminado:false
       }])
     }



  const datoVocabulario = async (user)=>{
    try {
    const data = await llamadaRompecabezaGet({user:user});
    if(data !== null){
      setData(data); 
    }else if(data === null){
      disparodeAcciones({ type: "cambio", field: "Vocabulario", value: true })
    }
    } catch (error) {
      disparodeAcciones({ type: "cambio", field: "Vocabulario", value: true })
    }
  }  

  const dataOracion = async (user)=>{
    try {
    const data = await llamadaPartidaOracion({Usuario:user});
    if(data !== null){
      setOraciondata(data); 
    }else if(data === null){
      disparodeAcciones({ type: "cambio", field: "Oraciones", value: true })
    }
    } catch (error) {
      disparodeAcciones({ type: "cambio", field: "Oraciones", value: true })
    }
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
  const [Oracionprogreso, dispatchProgreso] = useReducer(progresoOraciom, initialState)
  const [MultiProgreso, dispatchMutli] = useReducer(progresoMulti, initialStateMulti);
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
    <JuecoContext.Provider value={{Vocabulario, Oraciones, MultiJugador,data,InfoEstudiaSituacion,MultiProgreso, dispatchMutli,LLamadaIncial,setInfoEstudiaSituacion,cardEquipo,llamadaDos,setavance,dataOracion,initialState,progresoOraciom,Oracionprogreso, dispatchProgreso,setOraciondata,oraciondata,progreso, datoVocabulario, resultados, getresultado, getPuzzles, rompecabeza1, rompecabeza2, rompecabeza3, rompecabeza4, rompecabeza5, rompecabeza6, avance0,setData}}>
    {children}
    </JuecoContext.Provider>
  )
}
