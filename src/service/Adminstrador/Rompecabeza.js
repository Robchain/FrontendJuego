import { Api } from "../api"

export const llamadaGetRompecabezaActivos = async ()=>{
    const data = await  Api.get("/rompecabezaAdmi/mostrartodo");
    return data.data;
}

export const CrearRompecabeza  =  async ({Nombre, Pieza, FileBlanco, FileColor})=>{
    const data = await Api.post("/rompecabezaAdmi",{Nombre:Nombre, Pieza:Pieza, FileBlanco:FileBlanco, FileColor:FileColor});
    return data.data;
}


export const ElimnarDataRompecabeza = async ({_id})=>{
    const data = await Api.post("/rompecabezaAdmi/borrar", {_id:_id});
    return data.data;
}
export const HabilitarRompecabeza = async ({_id})=>{
    const data = await Api.post("/rompecabeza/habilitar",{_id:_id});
    return data.data;
}

export const desabilitarRompecabeza = async ({_id})=>{
    const data = await Api.post("/rompecabeza/Desabilitar",{_id:_id});
    return data.data;
}
export const EditarDataRompecabeza = async ({Nombre,FileBlanco, FileColor, Pieza, _id})=>{
    const data = await Api.post("/rompecabeza/Editar",{Nombre:Nombre, FileBlanco:FileBlanco, FileColor:FileColor, Pieza:Pieza, _id:_id});
    return data.data;
}

export const EditarDataRompecabezaSinArchivo = async ({Nombre, Pieza,  _id})=>{
    const data  = await Api.post("/rompecabeza/EditarSinArchivo",{Nombre:Nombre, Pieza:Pieza,  _id:_id});
    return data.data;
}