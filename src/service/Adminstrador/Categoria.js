import { Api } from "../api";

export const llamadaDeLaApiCategoriaGet = async()=>{
  const data = await Api.get("/Categoria/mostrartodo");
return data.data;
}


export const CrearPostCategoria = async({Juego, NombreCategoria,})=>{
const data = await Api.post("/Categoria",{Juego:Juego, NombreCategoria:NombreCategoria});
return data.data;
}