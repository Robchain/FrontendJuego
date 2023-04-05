import { Api } from "../api";

export const BuscarPorCursoYParalelo = async ({Curso, Paralelo})=>{

    const data = await Api.post('/Perfiles/BuscarPorCursoYParalelo',{Curso:Curso, Paralelo:Paralelo});
    return data.data;
}