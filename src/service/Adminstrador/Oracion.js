import { Api } from "../api";
export const MetodoGetDellamadaOracionActivas = async () => {

    const data = await Api.get("/OracionAdmi/mostrartodo");
    return data.data;
}

export const GuardadodeOracionPost = async ({  Sujeto, Que,Categoria, Oracion, Verbo, Adverbio, FileSujetoImagen, FileAdjetivoImagen, FileVideoPreguntaQue, FileVideoPreguntaQuien, FileVideoMuestra }) => {
    const data = await Api.post("/OracionAdmi", { Sujeto: Sujeto, Que: Que, Categoria: Categoria, Oracion: Oracion, Verbo: Verbo, Adverbio: Adverbio, FileSujetoImagen: FileSujetoImagen, FileAdjetivoImagen: FileAdjetivoImagen, FileVideoPreguntaQue: FileVideoPreguntaQue, FileVideoPreguntaQuien: FileVideoPreguntaQuien, FileVideoMuestra: FileVideoMuestra });
    return data.data;
}

export const HabilitarOracion = async ({ _id }) => {
    const data = await Api.post("/OracionAdmi/Habilitar", { _id: _id })
    return data.data;
}

export const DesabilitarOracion = async ({ _id }) => {
    const data = await Api.post("/OracionAdmi/Desabilitar", { _id: _id })
    return data.data;
}

export const EdtiarOracionSinImagen = async ({ _id, Categoria, Oracion, Verbo, Adverbio }) => {
    const data = await Api.post("/OracionAdmi/EditarSinImagenes", { _id: _id, Categoria: Categoria, Oracion: Oracion, Verbo: Verbo, Adverbio: Adverbio });
    return data.data;
}

export const EdtiarOracion = async ({ _id, Categoria, Oracion, Verbo, Adverbio, FileSujetoImagen, FileAdjetivoImagen, FileVideoPreguntaQue, FileVideoPreguntaQuien, FileVideoMuestra }) => {
    const data = await Api.post("/OracionAdmi/Editar", { _id: _id, Categoria: Categoria, Oracion: Oracion, Verbo: Verbo, Adverbio: Adverbio, FileSujetoImagen: FileSujetoImagen, FileAdjetivoImagen: FileAdjetivoImagen, FileVideoPreguntaQue: FileVideoPreguntaQue, FileVideoPreguntaQuien: FileVideoPreguntaQuien, FileVideoMuestra: FileVideoMuestra });
    return data.data;
}
export const ActivarJuegoPorCursoParaleloOracion = async ({Curso,Paralelo})=>{
    const data = await Api.post("/OracionAdmi/ActivarJuegoPorCursoParalelo",{Curso:Curso, Paralelo:Paralelo});
    return data.data
}

export const armandoJuegosOracionesPorPiezas = async ({num})=>{
    const data = await Api.get(`/armandoJuegosOracionesPorPiezas/${num}`);
    return data.data
}



export const JuegosActivosOracion=async ()=>{
    const data = await Api.get('/OracionAdmi/JuegosActivosOracion');
    return data.data
}
// quien
export const listadoQuienImagen = async()=>{
    const data = await Api.get("/OracionAdmi/ImagenQuienMostrar");
    return data.data;
}
export const CrearQuienImagen = async({Nombre, Imagen})=>{
    const data = await Api.post("/OracionAdmi/ImagenQuienCrear", {Nombre:Nombre, Imagen:Imagen});
    return data.data;
}

export const ImagenQuienDesibilitar = async({_id})=>{
    const data = await Api.post("/OracionAdmi/ImagenQuienDesibilitar",{_id:_id});
    return data.data;
}
export const ImagenQuienHabilitar = async({_id})=>{
    const data = await Api.post("/OracionAdmi/ImagenQuienHabilitar",{_id:_id});
    return data.data;
}
export const ImagenEditarQuien = async({_id,Nombre, Imagen})=>{
    const data = await Api.post("/OracionAdmi/editarQuien", {_id:_id,Nombre:Nombre, Imagen:Imagen});
    return data.data;
}
export const ImagenEditarQuienSinImagen = async({_id,Nombre})=>{
    const data = await Api.post("/OracionAdmi/editarQuienSinImagen", {_id:_id,Nombre:Nombre});
    return data.data;
}