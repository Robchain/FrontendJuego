

export const contador = (objecto, pieza)=>{
let correctoCount = 0

for (const juego in objecto) {
    if (objecto[juego].Resultado === "CORRECTO") {
      correctoCount++;
    }
  }
  if(correctoCount === pieza || correctoCount === 0){
    return correctoCount;
  }
    return correctoCount - 1;
}


export const resultado = ({objeto1, objeto2, objeto3})=>{
  if(objeto1.Respuesta === "CORRECTO"){
    return objeto1.Palabra
  }else if(objeto2.Respuesta === "CORRECTO"){
    return objeto2.Palabra
  }else if(objeto3.Respuesta === "CORRECTO"){
    return objeto3.Palabra
  }
}


export const resultadoOracion = ({objeto1, objeto2, objeto3})=>{
  if(objeto1.Respuesta === "CORRECTO"){
    return objeto1.Oracion
  }else if(objeto2.Respuesta === "CORRECTO"){
    return objeto2.Oracion
  }else if(objeto3.Respuesta === "CORRECTO"){
    return objeto3.Oracion
  }
}
export const resultadoMultiJu = ({objeto1, objeto2, objeto3})=>{
  if(objeto1.Respuesta === "CORRECTO"){
    return objeto1.Oracion
  }else if(objeto2.Respuesta === "CORRECTO"){
    return objeto2.Oracion
  }else if(objeto3.Respuesta === "CORRECTO"){
    return objeto3.Oracion
  }
}


export const filtradoCurso =({data})=>{
  const result = Object.values(data.reduce((acc, { Estudiante, Avance, createdAt, updatedAt }) => {
    const key = JSON.stringify(Estudiante);
    acc[key] = acc[key] || { Estudiante, Avance: [], createdAt, updatedAt };
    if (Array.isArray(Avance) && Avance.length > 0) {
      acc[key].Avance = acc[key].Avance.concat(Avance);
    }
    if (createdAt < acc[key].createdAt) {
      acc[key].createdAt = createdAt;
    }
    if (updatedAt > acc[key].updatedAt) {
      acc[key].updatedAt = updatedAt;
    }
    return acc;
  }, {}));
  return result;
}

export const fechaEcuador =(fecha)=>{
  const fechaUtc = new Date(fecha);
const fechaLocal = new Date(fechaUtc.getTime() - (fechaUtc.getTimezoneOffset() * 60000));
const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Guayaquil' };
const fechaFormateada = fechaLocal.toLocaleDateString('es-EC', options);
return fechaFormateada;
}
