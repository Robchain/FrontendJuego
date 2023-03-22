import { Api } from "../api";

const CrearUsuario = ()=>{

    Api.post("/signup",{ Nombre: "",
        Apellido: "",
         Identificacion: "",
         Email: "",
         Usuario: "",
         Password: "",
         TipoUsuario:"",
         FotoPerfil: "",
         Estado:"" })
}