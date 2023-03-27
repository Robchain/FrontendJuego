import { Api } from "../api";
export const MetodoGetDellamadaOracionActivas = async ()=>{

    const data = await  Api.get("/OracionAdmi/mostrartodo");
    return data.data;
}
