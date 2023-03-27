import { Api } from "../api";
export const llamadaDeDataTodosActivos = async ()=>{
    const data = await Api.get('/VocabularioAdmi/mostrartodo');
return data.data
}

