import { Api } from "./api";

export const MostrarEstudiante = async ()=>{
    try {
        const response = await Api.get("http://192.168.10.115:3002/api/auth/Ver-Registrados-Activos");
        return response.data
    } catch (error) {
        return error;
    }


}