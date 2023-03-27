import { Api } from "../api"

export const llamadaGetActivo = async ()=>{
    const data = await Api.get('/Equipo/mostrartodo');
    return data.data
}