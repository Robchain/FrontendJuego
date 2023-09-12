import { Api } from "../api";

export const BuscarPorCursoYParalelo = async ({Curso, Paralelo})=>{

    const data = await Api.post('/Perfiles/BuscarPorCursoYParalelo',{Curso:Curso, Paralelo:Paralelo});
    return data.data;
}


export const ReportesJugadorApi = async({Pregunta, id, Fecha})=>{
    const data = await Api.post('/Reporte/Jugador', {valorId:id,Pregunta:Pregunta,Fecha:Fecha})
    return data.data;
}
export const ReporteCurso= async({Pregunta,Curso,Paralelo, Fecha})=>{
    const data = await Api.post('/Reporte/Cursos', {Pregunta:Pregunta,Curso:Curso,Paralelo:Paralelo, Fecha:Fecha})
    return data.data;
}
export const ReporteJuegoApi = async({Pregunta, Fecha})=>{
    const data = await Api.post('/Reporte/Juego', {Pregunta:Pregunta, Fecha:Fecha})
    return data.data;
}