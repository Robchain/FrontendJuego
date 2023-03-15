
import axios from "axios";

export const crearMultiJugador = async (NombreDeEquipo, NumeroDeGrupos, NumeroDeIntegrantes, Segundo, picker, Estado) => {
    const data = await axios.post('http://192.168.10.115:3002/api/auth/MultiJugador', {NombreDeEquipo, NumeroDeGrupos, NumeroDeIntegrantes, Segundo, picker, Estado})
    return data.data
}


export const llamadoIncialDePosiciondelUsuario = async (label, value)=>{

    try {
        const data = await axios.post("http://192.168.10.115:3002/api/auth/LlamadainicalDelJugagor",{label, value});
        return data.data;
    } catch (error) {
        return null;
    }
    }

export const llamadaInicialDelosEquiposSinAsignar = async(IdDeLaAsignacion)=>{
try {
    const data = await axios.post("http://192.168.10.115:3002/api/auth/LlamadaDeJuegosBasesPorAsignar",{IdDeLaAsignacion});
    return data.data;
} catch (error) {
    return null;
}
}

export const AcciondeAsignarGruposConJuegos = async (idDeBase,BaseUno)=>{

try {
    const data  = await axios.post("http://localhost:3002/api/auth/UneIntegrantesConJuegos",{idDeBase,BaseUno});
    return data.data;
} catch (error) {
    return null
}
}
// actualizacion del juego al final

export const ActualizarJuego1 = async (PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado )=>{
    try {
        const data = await axios.post("http://localhost:3002/api/auth/actualizarJuegoUno", {PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado});
        return data
    } catch (error) {
        return null;
    }
}
export const ActualizarJuego2 = async (PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado)=>{
    try {
        const data = await axios.post("http://localhost:3002/api/auth/actualizarJuegoDos", {PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado});
        return data
    } catch (error) {
        return null;
    }
}
export const ActualizarJuego3 = async (PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado)=>{
    try {
        const data = await axios.post("http://localhost:3002/api/auth/actualizarJuegoTres", {PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado});
        return data
    } catch (error) {
        return null;
    }
}
export const ActualizarJuego4 = async (PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado)=>{
    try {
        const data = await axios.post("http://localhost:3002/api/auth/actualizarJuegoCuatro", {PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado});
        return data
    } catch (error) {
        return null;
    }
}
export const ActualizarJuego5 = async (PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado)=>{
    try {
        const data = await axios.post("http://localhost:3002/api/auth/actualizarJuegoCinco", {PalabraCorrecta, PalabraSeleccionada,Resultado,Terminado});
        return data
    } catch (error) {
        return null;
    }
}
export const ActualizarJuegoFinal = async (Terminado)=>{
    try {
        const data = await axios.post("http://localhost:3002/api/auth/actualizarJuegoTerminadoMulti", {Terminado});
        return data
    } catch (error) {
        return null;
    }
}