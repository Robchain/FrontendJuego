import { Api } from "../api";

export const llamadaRompecabezaGet =async ({id})=>{
    const data = await Api.post("/llamadaPartidaVocabulario",{ id: id});
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