import { Api } from "../api";

export const llamadaRompecabezaGet =async ({user})=>{
    const data = await Api.post("/llamadaPartidaVocabulario",{ Usuario: user});
    return data.data;
}



