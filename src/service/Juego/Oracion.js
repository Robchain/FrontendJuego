import { Api } from "../api";

export const llamadaPartidaOracion = async ({Usuario})=>{
    const data = await Api.post("/llamadaPartidaOracion",{Usuario:Usuario});
    return data.data
}

export const Juego1Oracion= async ({_id,PalabraAEvaluar,PalabraASeleccionada,Resultado,Terminado})=>{
  await  Api.post("/UpdateTerminadoOracion1",{ id:_id,
    PalabraCorrecta:PalabraAEvaluar,
    PalabraSeleccionada:PalabraASeleccionada,
    Resultado:Resultado,
    Terminado:Terminado})
  }
  
  export   const Juego2Oracion= async ({_id,PalabraAEvaluar,PalabraASeleccionada,Resultado,Terminado})=>{
    await   Api.post("/UpdateTerminadoOracion2",{ id:_id,
    PalabraCorrecta:PalabraAEvaluar,
    PalabraSeleccionada:PalabraASeleccionada,
    Resultado:Resultado,
    Terminado:Terminado})
  }
  
  export   const Juego3Oracion= async ({_id,PalabraAEvaluar,PalabraASeleccionada,Resultado,Terminado})=>{
    await Api.post("/UpdateTerminadoOracion3",{ id:_id,
    PalabraCorrecta:PalabraAEvaluar,
    PalabraSeleccionada:PalabraASeleccionada,
    Resultado:Resultado,
    Terminado:Terminado})
  }
  
  export  const Juego4Oracion= async ({_id,PalabraAEvaluar,PalabraASeleccionada,Resultado,Terminado})=>{
    await  Api.post("/UpdateTerminadoOracion4",{ id:_id,
    PalabraCorrecta:PalabraAEvaluar,
    PalabraSeleccionada:PalabraASeleccionada,
    Resultado:Resultado,
    Terminado:Terminado})
  }
  
  export   const Juego5Oracion= async ({_id,PalabraAEvaluar,PalabraASeleccionada,Resultado,Terminado})=>{
    await  Api.post("/UpdateTerminadoOracion5",{ id:_id,
    PalabraCorrecta:PalabraAEvaluar,
    PalabraSeleccionada:PalabraASeleccionada,
    Resultado:Resultado,
    Terminado:Terminado})
  }
  
  export  const Juego6Oracion= async ({_id,PalabraAEvaluar,PalabraASeleccionada,Resultado,Terminado})=>{
    await Api.post("/UpdateTerminadoOracion6",{ id:_id,
    PalabraCorrecta:PalabraAEvaluar,
    PalabraSeleccionada:PalabraASeleccionada,
    Resultado:Resultado,
    Terminado:Terminado})
  }
  
  export  const Juego7Oracion= async({_id,PalabraAEvaluar,PalabraASeleccionada,Resultado,Terminado})=>{
    await  Api.post("/UpdateTerminadoOracion7",{ id:_id,
    PalabraCorrecta:PalabraAEvaluar,
    PalabraSeleccionada:PalabraASeleccionada,
    Resultado:Resultado,
    Terminado:Terminado})
  }


  export  const JuegoFinalOracion= async({isEnd,_id})=>{
    await  Api.post("/UpdateTerminadoOracionFinal",{ id:_id,
    Terminado:isEnd})
  }