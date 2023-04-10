

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

export const parte6 = (data)=>{

  const resultado1 =  data.Avance.Juego6 && data.Avance.Juego6.Resultado;
const isCorrect1 = resultado1 === "CORRECTO";
  return isCorrect1;
}


export const resultado = ({objeto1, objeto2, objeto3})=>{
  if(objeto1.Respuesta){
    return objeto1.Palabra
  }else if(objeto2.Respuesta){
    return objeto2.Palabra
  }else if(objeto3.Respuesta){
    return objeto3.Palabra
  }
}