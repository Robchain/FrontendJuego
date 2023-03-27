import { Api } from "../api";

export const llamadaDeLaApiCategoriaGet = async()=>{
  const data = await Api.get("/Categoria/mostrartodo");
return data.data;
}


export const CrearPostCategoria = async({Juego, NombreCategoria,})=>{
const data = await Api.post("/Categoria",{Juego:Juego, NombreCategoria:NombreCategoria});
return data.data;
}

export const llamadaGetApiCategoriaOracion = async ()=>{
const data = await Api.get("/Categoria/Mostartodos/Oracion");
return data.data;

}

export const DeleteApiCategoria = async ({_id})=>{

  const data = await Api.post("/Categoria/borrar",{_id:_id});
  return data.data;
}
export const DeleteApiCategoriaOracion = async ({_id})=>{
  const data = await Api.post("/Categoria/Borrar/OracionCategoria",{_id:_id});
  return data.data;
}

export const EditarApiCategoriaOracion = async ({_id, NombreCategoria, Estado})=>{
  const data = await Api.post("/Categoria/Editar/OracionCategoria", {_id:_id, NombreCategoria:NombreCategoria, Estado:Estado});
  return data.data;
}

export const EditarApiCategoriaVocabulario = async ({_id, NombreCategoria, Estado})=>{
  const data = await Api.post("/Categoria/Editar", {_id:_id, NombreCategoria:NombreCategoria, Estado:Estado});
  return data.data;
}