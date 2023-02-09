import React, { useContext, useEffect, useState } from 'react'
import { JuecoContext } from '../../context/Juego/JuecoContext';

export const RespuestaImagenTODOSeccion = ({id, window, siguiente, setMomento, verificacionGuardadoBase, Queselec, QuienSelec }) => {
    const { oraciondata} = useContext(JuecoContext);
    const [opcionRes, setopcionRes] = useState("Nada");
    const [imagenbase,] = useState(second)
    useEffect(() => {
      
    }, [])
    
     if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      oracion = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Oracion;
       sujetoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen;
       AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen;
     } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
       sujetoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen;
       oracion = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Oracion;
       AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen;
     } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
       sujetoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen;
       oracion = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Oracion;
       AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen;
     }
     if(QuienSelec ==="" ||  Queselec === "" ){
       base = "Nada"
     }
     if(QuienSelec.length > 2 && Queselec.length > 2){
       if((sujetoRespuesta === QuienSelec) &&  (AdjectivoRespuesta === Queselec)  ){
         base ="Correcto"
         setTimeout(() => { siguiente(window.id) }, 9000)
       }else if(sujetoRespuesta !== QuienSelec ||  AdjectivoRespuesta !== Queselec){
         base = "Incorrecto"
         setTimeout(() => { siguiente(window.id) }, 9000)
       }else if(QuienSelec ==="" ||  AdjectivoRespuesta !== Queselec){
         base = "Incorrecto"
setTimeout(() => { siguiente(window.id) }, 9000)
       }
     }
     verificacionGuardadoBase();
     setopcionRes(base);
     switch (opcionRes) {
       case "Correcto":
         setMomento("Respuesta");
         return(<><img src={buentrajo} width="100" alt="buen trabajo"/></>);
       case "Incorrecto":
         setMomento("Respuesta");
           return(<><img src={malTrabajo} width="100" alt='mal trabajo'/></>);
       case "Nada":
       return(<></>)
       default:
        return(<></>);
     }
}
