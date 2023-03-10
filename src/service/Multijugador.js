
import axios from "axios";

export const crearMultiJugador = async (NombreDeEquipo, NumeroDeGrupos, NumeroDeIntegrantes, Segundo, picker, Estado) => {
    const data = await axios.post('http://localhost:3002/api/auth/MultiJugador', {NombreDeEquipo, NumeroDeGrupos, NumeroDeIntegrantes, Segundo, picker, Estado})
    return data.data
}


export const llamadoIncialDePosiciondelUsuario = async (label, value)=>{

    try {
        const data = await axios.post("http://localhost:3002/api/auth/LlamadainicalDelJugagor",{label, value});
        return data.data;
    } catch (error) {
        return null;
    }
    }

export const llamadaInicialDelosEquiposSinAsignar = async(IdDeLaAsignacion)=>{
try {
    const data = await axios.post("http://localhost:3002/api/auth/LlamadaDeJuegosBasesPorAsignar",{IdDeLaAsignacion});
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