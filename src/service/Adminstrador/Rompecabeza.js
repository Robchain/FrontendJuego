import { Api } from "../api"

export const llamadaGetRompecabezaActivos = async ()=>{
    const data = await  Api.get("/rompecabezaAdmi/mostrartodo");
    return data.data
}