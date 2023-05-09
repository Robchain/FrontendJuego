import { Api } from "../api";

export const BuscarPorCursoYParalelo = async ({Curso, Paralelo})=>{

    const data = await Api.post('/Perfiles/BuscarPorCursoYParalelo',{Curso:Curso, Paralelo:Paralelo});
    return data.data;
}


export const ReportesJugadorApi = async({Pregunta, id})=>{
    const data = await Api.post('/Reporte/Jugador', {valorId:id,Pregunta:Pregunta})
    return data.data;
}
export const ReporteCurso= async({Pregunta,Curso,Paralelo})=>{
    const data = await Api.post('/Reporte/Cursos', {Pregunta:Pregunta,Curso:Curso,Paralelo:Paralelo})
    return data.data;
}
export const ReporteJuegoApi = async({Pregunta})=>{
    const data = await Api.post('/Reporte/Juego', {Pregunta:Pregunta})
    return data.data;
}