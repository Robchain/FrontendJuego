export const OracionRespuesta = ({objecto1, objecto2, objecto3}) => {
    if (objecto1.Respuesta === "CORRECTO") {
        return objecto1.Oracion;
    } else if (objecto2.Respuesta === "CORRECTO") {
       return objecto2.Oracion
    } else if (objecto3.Respuesta === "CORRECTO") {
      return  objecto3.Oracion
    }

  }


  export const SinRepeticiones = ({input})=>{
    // const palabras = ["manzana", "banana", "manzana", "uva", "naranja", "banana"];

// Crear un conjunto para almacenar palabras únicas
const palabrasUnicas = new Set(input);

// Convertir el conjunto en un array
const palabrasSinRepetir = Array.from(palabrasUnicas);

return  palabrasSinRepetir; // Esto mostrará ["manzana", "banana", "uva", "naranja"]

  }