import axios from "axios";

export const MostrarEstudiante = async ()=>{
    try {
        const response = await axios.get("http://192.168.10.115:3002/api/auth/Ver-Registrados-Activos");
        return response.data
    } catch (error) {
        return error;
    }


}