import { Api } from "../api";


export const LoginAPI = async ({Password, Email})=>{
const data = await Api.post("/signin",{Email:Email, Password:Password});
return data.data;
}

const CrearUsuario = ()=>{

    Api.post("/signup",{ Nombre: "",
        Apellido: "",
         Identificacion: "",
         Email: "",
         Usuario: "",
         Password: "",
         TipoUsuario:"",
         FotoPerfil: "" })
}
export const MostrarEstudiante = async ()=>{
    const data = await Api.get("/Ver-Registrados-Activos");
    return data.data;
}

export const habilitarPersonasApi = async ({_id})=>{
    const data = await Api.post("/Perfiles/habilitar",{_id:_id});
    return data.data;
  }
  export const desabilitarPersonasApi = async ({_id})=>{
    const data = await Api.post("/Perfiles/desabilitar",{_id:_id});
    return data.data;
  }