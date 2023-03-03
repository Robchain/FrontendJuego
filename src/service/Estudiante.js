import axios from "axios";

export const MostrarEstudiante = async ()=>{
    try {
        const response = await axios.get("http://localhost:3002/api/auth/Ver-Registrados-Activos");
        return response.data
    } catch (error) {
        return error;
    }


}