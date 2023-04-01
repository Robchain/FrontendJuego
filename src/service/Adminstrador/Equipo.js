import { Api } from "../api"

export const llamadaGetActivo = async ()=>{
    const data = await Api.get('/Equipo/mostrartodo');
    return data.data
}

export const PostCrearEquipo = async ({Nombre, Imagen})=>{
    const data = await Api.post("/Equipo/Crear",{Nombre:Nombre, Imagen:Imagen});
    return data.data;
}

export const DesabilitarEquipo = async ({_id})=>{
    const data = await Api.post("/Equipo/Desibilitar", {_id:_id})
    return data.data;
}

export const HabilitarEquipo = async ({_id})=>{
    const data = await Api.post("/Equipo/Habiltar",{_id:_id});
    return data.data;
}

export const EditarsinImagen = async ({_id,Nombre})=>{
    const data = await Api.post("/Equipo/editarSinImagen",{_id:_id,Nombre:Nombre});
    return data.data;
}


export const EditarconImagen = async ({_id,Nombre,Imagen})=>{
    const data = await Api.post("/Equipo/editar",{_id:_id,Nombre:Nombre,Imagen:Imagen});
    return data.data;
}
