import { Api } from "../api";

export const LoginAPI = async ({ Password, Email }) => {
  const data = await Api.post("/signin", { Email: Email, Password: Password });
  return data.data;
};

export const CrearUsuario = async ({
  Nombre,
  Apellido,
  Identificacion,
  Email,
  Usuario,
  Password,
  TipoUsuario,
  FotoPerfil,
  Curso,
  Paralelo,
}) => {
  const data = await Api.post("/signup", {
    Nombre: Nombre,
    Apellido: Apellido,
    Identificacion: Identificacion,
    Email: Email,
    Usuario: Usuario,
    Password: Password,
    TipoUsuario: TipoUsuario,
    FotoPerfil: FotoPerfil,
    Curso: Curso,
    Paralelo: Paralelo,
  });
  return data.data;
};
export const signupsinfoto = async({
  Nombre,
  Apellido,
  Identificacion,
  Email,
  Usuario,
  Password,
  TipoUsuario,
  Curso,
  Paralelo,
})=>{
  const data = await Api.post('/signupsinfoto',{   Nombre: Nombre,
    Apellido: Apellido,
    Identificacion: Identificacion,
    Email: Email,
    Usuario: Usuario,
    Password: Password,
    TipoUsuario: TipoUsuario,
    Curso: Curso,
    Paralelo: Paralelo,})
    return data.data;
}
export const MostrarEstudiante = async () => {
  const data = await Api.get("/Ver-Registrados-Activos");
  return data.data;
};

export const habilitarPersonasApi = async ({ _id }) => {
  const data = await Api.post("/Perfiles/habilitar", { _id: _id });
  return data.data;
};
export const desabilitarPersonasApi = async ({ _id }) => {
  const data = await Api.post("/Perfiles/desabilitar", { _id: _id });
  return data.data;
};

export const editarPersonaconImagen = async ({_id,Nombre,
  Apellido,
  Identificacion,
  Email,
  Usuario,
  TipoUsuario,
  FotoPerfil,
  Curso,
  Paralelo,}) =>{
    const data = await Api.post("/Perfiles/EditarconImagen",{_id:_id,Nombre: Nombre,
      Apellido: Apellido,
      Identificacion: Identificacion,
      Email: Email,
      Usuario: Usuario,
      TipoUsuario: TipoUsuario,
      FotoPerfil: FotoPerfil, 
      Curso: Curso,
      Paralelo: Paralelo,})
      return data.data;
  }

  export const editarPersonasinImagen = async ({_id,Nombre,
    Apellido,
    Identificacion,
    Email,
    TipoUsuario,
    Usuario,
    Curso,
    Paralelo,}) =>{
      const data = await Api.post("/Perfiles/EditarSinImagen",{_id:_id,Nombre: Nombre,
        Apellido: Apellido,
        Identificacion: Identificacion,
        Email: Email,
        Usuario: Usuario,
        TipoUsuario: TipoUsuario,
        Curso: Curso,
        Paralelo: Paralelo,})
        return data.data;
    }


    export const listadoProfesores = async ()=>{
      const data = await Api.get("/perfilesActivosMaestros");
      return data.data;
    }

    export const ActulizarContraseña = async ({_id,Password})=>{
      const data = await Api.post("/Perfiles/ActualizarContrasenia",{_id:_id,Password:Password});
      return data.data;
    }