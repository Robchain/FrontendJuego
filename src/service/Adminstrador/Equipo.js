import { Api } from "../api"

export const llamadaGetActivo = async ()=>{
    const data = await Api.get('/Equipo/mostrartodo');
    return data.data
}

export const PostCrearEquipo = async ({Nombre, Imagen})=>{
    const data = await Api.post("/Equipo/Crear",{Nombre:Nombre, Imagen:Imagen});
    return data.data;
}

export const ElimnarDataDeEquipo = async ({_id})=>{
    const data = await Api.post("/Equipo/Desibilitar", {_id:_id})
    return data.data;
}
