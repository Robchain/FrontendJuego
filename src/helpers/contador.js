

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