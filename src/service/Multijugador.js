import { Api } from "./api";

export const crearMultiJugador = async ({NombreDeEquipo, NumeroDeGrupos, NumeroDeIntegrantes, Segundo, picker,TipoDeJuego, Curso, Paralelo, picker2}) => {
    const data = await Api.post('/MultiJugador', {NombreDeEquipo:NombreDeEquipo, NumeroDeGrupos:NumeroDeGrupos, NumeroDeIntegrantes:NumeroDeIntegrantes, Segundo:Segundo,Curso:Curso,Paralelo:Paralelo, picker:picker,picker2:picker2,TipoDeJuego:TipoDeJuego})
    return data.data
}

export const LlamadaDeLLenadoDeEstudianteMultiJugador = async ({Curso,Paralelo})=>{
    const data = await Api.post("/MultiJugador/BuscarPorCurso",{Curso:Curso,Paralelo:Paralelo});
    if(data.status === 200){
        return data.data
    }else{
        return data.data;
    }
}


export const llamadoIncialDePosiciondelUsuario = async (label, value)=>{
        const data = await Api.post("/LlamadainicalDelJugagor",{label, value});
        return data.data;
    }

export const llamadaInicialDelosEquiposSinAsignar = async(IdDeLaAsignacion)=>{
try {
    const data = await Api.post("/LlamadaDeJuegosBasesPorAsignar",{IdDeLaAsignacion});
    return data.data;
} catch (error) {
    return null;
}
}

export const AcciondeAsignarGruposConJuegos = async (idDeBase,BaseUno)=>{

try {
    const data  = await Api.post("/UneIntegrantesConJuegos",{idDeBase,BaseUno});
    return data.data;
} catch (error) {
    return null
}
}
// actualización del juego al final

export const ActualizarJuegoFinal = async ({idOutput,Avance,pos})=>{
    try {
        const data = await Api.post("/actualizarJuegoTerminadoMulti", {idOutput:idOutput,Avance:Avance,pos:pos});
        return data
    } catch (error) {
        return null;
    }
}


export const CreaJuegoMulti = async ({num})=>{
    const data = await Api.get(`/CreaJuegoMulti/${num}`);
    return data.data
}

export const historialJuego = async ({Curso, Paralelo})=>{
const data = await Api.post('/historialJuego',{Curso:Curso, Paralelo:Paralelo});
return data.data;
}

export const DesactivarCoolaborativo = async ({_id})=>{
    const data = await Api.post('/DesactivarCoolaborativo', {_id:_id});
    return data.data;
}
export const ActivarCoolaborativo = async ({_id})=>{
    const data = await Api.post('/ActivarCoolaborativo', {_id:_id});
    return data.data;
}


export const ActualizarCoolaborativo = async ({_id, picker, TipoDeJuego, picker2})=>{
    const data = await Api.post('/ActualizarCoolaborativo', {_id:_id, picker:picker, TipoDeJuego:TipoDeJuego,picker2:picker2 });
    return data.data;
}