import { Api } from "../api";

export const BuscarPorCursoYParalelo = async ({Curso, Paralelo})=>{

    const data = await Api.post('/Perfiles/BuscarPorCursoYParalelo',{Curso:Curso, Paralelo:Paralelo});
    return data.data;
}


export const ReportesJugadorApi = async({Pregunta, id,FechaInicio,FechaFin, datosPer})=>{
    const data = await Api.post('/Reporte/Jugador', {valorId:id,Pregunta:Pregunta,FechaInicio: FechaInicio, FechaFin: FechaFin, datosPer:datosPer})
    return data.data;
}

export const ReporteCurso= async({Pregunta,Curso,Paralelo,FechaInicio,FechaFin})=>{
    const data = await Api.post('/Reporte/Cursos', {Pregunta:Pregunta,Curso:Curso,Paralelo:Paralelo,FechaInicio: FechaInicio, FechaFin: FechaFin})
    return data.data;
}

export const ReporteJuegoApi = async({Pregunta, FechaInicio,FechaFin, Curso, Paralelo})=>{
    const data = await Api.post('/Reporte/Juego', {Pregunta:Pregunta, FechaInicio: FechaInicio, FechaFin: FechaFin, Curso:Curso, Paralelo:Paralelo})
    return data.data;
}

export const ReportePrimero = async({Curso, Paralelo,FechaInicio, FechaFin})=>{
    const data = await Api.post('/reporte/primero',{Curso:Curso, Paralelo:Paralelo,FechaInicio:FechaInicio, FechaFin:FechaFin});
    return data.data
}