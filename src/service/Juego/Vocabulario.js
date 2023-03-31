import { Api } from "../api";

export const llamadaRompecabezaGet =async ({user})=>{
    const data = await Api.post("/llamadaPartidaVocabulario",{ Usuario: user});
    return data.data;
}


export const Juego1= async ({PalabraAEvaluar,_id,PalabraASeleccionada,Resultado,Terminado})=>{
    Api.post("/UpdateTerminadoVocabulario1",{ id:_id,
    PalabraCorrecta:PalabraAEvaluar,
    PalabraSeleccionada:PalabraASeleccionada,
    Resultado:Resultado,
    Terminado:Terminado})
  }
  export const Juego2= async ({PalabraAEvaluar,_id,PalabraASeleccionada,Resultado,Terminado})=>{
    Api.post("/UpdateTerminadoVocabulario1",{ id:_id,
    PalabraCorrecta:PalabraAEvaluar,
    PalabraSeleccionada:PalabraASeleccionada,
    Resultado:Resultado,
    Terminado:Terminado})
  }
  export const Juego3= async ({PalabraAEvaluar,_id,PalabraASeleccionada,Resultado,Terminado})=>{
    Api.post("/UpdateTerminadoVocabulario1",{ id:_id,
    PalabraCorrecta:PalabraAEvaluar,
    PalabraSeleccionada:PalabraASeleccionada,
    Resultado:Resultado,
    Terminado:Terminado})
  }
  export const Juego4= async ({PalabraAEvaluar,_id,PalabraASeleccionada,Resultado,Terminado})=>{
    Api.post("/UpdateTerminadoVocabulario1",{ id:_id,
    PalabraCorrecta:PalabraAEvaluar,
    PalabraSeleccionada:PalabraASeleccionada,
    Resultado:Resultado,
    Terminado:Terminado})
  }
  export const Juego5= async ({PalabraAEvaluar,_id,PalabraASeleccionada,Resultado,Terminado})=>{
    Api.post("/UpdateTerminadoVocabulario1",{ id:_id,
    PalabraCorrecta:PalabraAEvaluar,
    PalabraSeleccionada:PalabraASeleccionada,
    Resultado:Resultado,
    Terminado:Terminado})
  }
  export const Juego6= async ({PalabraAEvaluar,_id,PalabraASeleccionada,Resultado,Terminado})=>{
    Api.post("/UpdateTerminadoVocabulario1",{ id:_id,
    PalabraCorrecta:PalabraAEvaluar,
    PalabraSeleccionada:PalabraASeleccionada,
    Resultado:Resultado,
    Terminado:Terminado})
  }
  export const Juego7= async ({PalabraAEvaluar,_id,PalabraASeleccionada,Resultado,Terminado})=>{
    Api.post("/UpdateTerminadoVocabulario1",{ id:_id,
    PalabraCorrecta:PalabraAEvaluar,
    PalabraSeleccionada:PalabraASeleccionada,
    Resultado:Resultado,
    Terminado:Terminado})
  }
  
  export const JuegoFinal= async ({isEnd,_id})=>{
    Api.post("/UpdateTerminadoVocabularioFinal",{ id:_id,
    Terminado:isEnd})
  }


