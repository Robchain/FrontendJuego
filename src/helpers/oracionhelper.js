export const OracionRespuesta = ({objecto1, objecto2, objecto3}) => {
    if (objecto1.Respuesta === "CORRECTO") {
        return objecto1.Oracion;
    } else if (objecto2.Respuesta === "CORRECTO") {
       return objecto2.Oracion
    } else if (objecto3.Respuesta === "CORRECTO") {
      return  objecto3.Oracion
    }

  }