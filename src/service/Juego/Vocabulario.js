import { Api } from "../api";

export const llamadaRompecabezaGet =async ({user})=>{
    const data = await Api.post("/llamadaPartidaVocabulario",{ Usuario: user});
    return data.data;
}


export const Juego1= async ({_id,Avance})=>{
    Api.post("/UpdateTerminadoVocabulario",{ id:_id,
    Avance:Avance
    })
  }
  


  export const TrofeoVocabulario =async({id})=>{
    const data = await Api.post('/llamadaPartidaVocabularioRompecabeza', {id:id});
    return data.data;
  }