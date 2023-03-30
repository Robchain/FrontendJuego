import { Api } from "./api";

export const MostrarEstudiante = async ()=>{
    try {
        const response = await Api.get("/Ver-Registrados-Activos");
        return response.data
    } catch (error) {
        return [];
    }


}