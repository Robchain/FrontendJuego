
import axios from "axios";

export const crearMultiJugador = async (NombreDeEquipo, NumeroDeGrupos, NumeroDeIntegrantes, Segundo, picker, Estado) => {
    const data = await axios.post('http://localhost:3002/api/auth/MultiJugador', {NombreDeEquipo, NumeroDeGrupos, NumeroDeIntegrantes, Segundo, picker, Estado})
    return data.data
}