import { Api } from "../api";

export const llamadaRompecabezaGet =async ({id})=>{
    const data = await Api.post("/llamadaPartidaVocabulario",{ id: id});
    return data.data;
}


export const Juego1= async ({_id,Avance,end})=>{
    Api.post("/UpdateTerminadoVocabulario",{ id:_id,
    Avance:Avance, end:end
    })
  }
  


  export const TrofeoVocabulario =async({id})=>{
    const data = await Api.post('/llamadaPartidaVocabularioRompecabeza', {id:id});
    return data.data;
  }

  export const Medallas = async({label, value})=>{
    const data = await Api.post('/medallas',{value:value, label:label});
    return data.data
  }