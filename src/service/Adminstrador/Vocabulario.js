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
export const  HabilitarVocabularioApi = async ({_id})=>{
    const data = await Api.post("/vocabulario/Habilitar",{_id:_id});
    return data.data
}
export const  desabilitarVocabularioApi = async ({_id})=>{
    const data = await Api.post("/vocabulario/Desabilitar",{_id:_id});
    return data.data
}
export const ActivarJuegoPorCursoParaleloVocabulario = async ({Curso,Paralelo})=>{
    const data = await Api.post("/vocabulario/activarJuegoPorCursoParalelo",{Curso:Curso, Paralelo:Paralelo});
    return data.data
}

export const CrearJuegoVocabularioIndividual = async ({num})=>{
    const data = await Api.get(`/CrearJuegoVocabularioIndividual/${num}`);
    return data.data
}

export const JuegosActivos=async ()=>{
    const data = await Api.get('/vocabulario/JuegosActivos');
    return data.data
}

export const MostrarHabilitarJuego=async ()=>{
    const data =await Api.get('/MostrarHabilitarJuego');
    return data.data
}


export const  HabilitarHabilitarJuego = async ({_id})=>{
    const data = await Api.post("/HabilitarHabilitarJuego",{_id:_id});
    return data.data
}
export const  DesibilitarHabilitarJuego = async ({_id})=>{
    const data = await Api.post("/DesibilitarHabilitarJuego",{_id:_id});
    return data.data
}