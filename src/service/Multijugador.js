import { Api } from "./api";

export const crearMultiJugador = async ({NombreDeEquipo, NumeroDeGrupos, NumeroDeIntegrantes, Segundo, picker,TipoDeJuego}) => {
    const data = await Api.post('/MultiJugador', {NombreDeEquipo:NombreDeEquipo, NumeroDeGrupos:NumeroDeGrupos, NumeroDeIntegrantes:NumeroDeIntegrantes, Segundo:Segundo, picker:picker,TipoDeJuego:TipoDeJuego})
    return data.data
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
// actualizacion del juego al final

export const ActualizarJuego1 = async ({indice,idOutput,PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado})=>{
    try {
        const data = await Api.post("/actualizarJuegoUno", {indice,idOutput,PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado});
        return data
    } catch (error) {
        return null;
    }
}
export const ActualizarJuego2 = async ({indice,idOutput,PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado})=>{
    try {
        const data = await Api.post("/actualizarJuegoDos", {indice,idOutput,PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado});
        return data
    } catch (error) {
        return null;
    }
}
export const ActualizarJuego3 = async ({indice,idOutput,PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado})=>{
    try {
        const data = await Api.post("/actualizarJuegoTres", {indice,idOutput,PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado});
        return data
    } catch (error) {
        return null;
    }
}
export const ActualizarJuego4 = async ({indice,idOutput,PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado})=>{
    try {
        const data = await Api.post("/actualizarJuegoCuatro", {indice,idOutput,PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado});
        return data
    } catch (error) {
        return null;
    }
}
export const ActualizarJuego5 = async ({indice,idOutput,PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado})=>{
    try {
        const data = await Api.post("/actualizarJuegoCinco", {indice,idOutput,PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado});
        return data
    } catch (error) {
        return null;
    }
}
export const ActualizarJuegoFinal = async ({indice,idOutput,Terminado})=>{
    try {
        const data = await Api.post("/actualizarJuegoTerminadoMulti", {indice,idOutput,Terminado});
        return data
    } catch (error) {
        return null;
    }
}