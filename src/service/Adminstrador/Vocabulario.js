import { Api } from "../api";
export const llamadaDeDataTodosActivos = async () => {
    const data = await Api.get('/VocabularioAdmi/mostrartodo');
    return data.data
}

export const GuardadoDeVocabulario = async ({ Categoria, Palabra, Silaba, FileMuestra, FilePregunta, FileImagen }) => {
    const data = await Api.post("/vocabularioAdmi", { Categoria: Categoria, Palabra: Palabra, Silaba: Silaba, FileMuestra: FileMuestra, FilePregunta: FilePregunta, FileImagen: FileImagen });
    return data.data
}

export const EditarVocabularioSinArchivos = async ({ Categoria, Palabra, Silaba, _id }) => {
    const data = await Api.post("/vacabulario/EditarSinArchivo", { Categoria: Categoria, Palabra: Palabra, Silaba: Silaba, _id: _id });
    return data.data
}

export const EditarVocabulario = async ({ Categoria, Palabra, Silaba, FileMuestra, FilePregunta, FileImagen, _id }) => {
    const data = await Api.post("/vocabulario/Editar", { Categoria: Categoria, Palabra: Palabra, Silaba: Silaba, FileMuestra: FileMuestra, FilePregunta: FilePregunta, FileImagen: FileImagen, _id: _id });
    return data.data
}
export const  HabilitarVocabulario = async ({_id})=>{
    const data = await Api.post("/vocabulario/Habilitar",{_id:_id});
    return data.data
}
export const  desabilitarVocabulario = async ({_id})=>{
    const data = await Api.post("/vocabulario/Desabilitar",{_id:_id});
    return data.data
}