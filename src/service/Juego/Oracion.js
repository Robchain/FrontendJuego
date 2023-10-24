import { Api } from "../api";

export const llamadaPartidaOracion = async ({Usuario})=>{
    const data = await Api.post("/llamadaPartidaOracion",{Usuario:Usuario});
    return data.data
}

export const Juego1Oracion= async ({_id,Avance})=>{
  await  Api.post("/UpdateTerminadoOracion",{ id:_id,
    Avance:Avance
    })
  }
  

  export const TrofeoOracion =async({id})=>{
    const data = await Api.post('/llamarJuegoterminados', {id:id});
    return data.data;
  }