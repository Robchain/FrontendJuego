import { Api } from "../api";

export const BuscarPorCursoYParalelo = async ({Curso, Paralelo})=>{

    const data = await Api.post('/Perfiles/BuscarPorCursoYParalelo',{Curso:Curso, Paralelo:Paralelo});
    return data.data;
}


export const ReporteVocabulario = async({Usuario})=>{
    const data = await Api.post('/ReporteVocabulario', {Usuario:Usuario})
    return data.data;
}
export const ReporteOracion = async({Usuario})=>{
    const data = await Api.post('/ReporteOracion', {Usuario:Usuario})
    return data.data;
}
export const ReporteMultiJugador = async({_id})=>{
    const data = await Api.post('/ReporteMultiJugador', {_id:_id})
    return data.data;
}