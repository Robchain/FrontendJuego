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