

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
    return `Quien: ${objeto1.Sujeto.label} ${objeto1.Adverbio ?  `- Adverbio: ${objeto1.Adverbio}` : '' } - Que: ${objeto1.Sujeto.label}`
  }else if(objeto2.Respuesta === "CORRECTO"){
    return `Quien: ${objeto2.Sujeto.label} ${objeto2.Adverbio ?  `- Adverbio: ${objeto2.Adverbio}` : '' }  - Que: ${objeto2.Sujeto.label}`
  }else if(objeto3.Respuesta === "CORRECTO"){
    return `Quien: ${objeto3.Sujeto.label} ${objeto3.Adverbio ?  `- Adverbio: ${objeto3.Adverbio}` : '' }  - Que:${objeto3.Sujeto.label}`
  }
}
export const resultadoOracionAdverbio = ({objeto1, objeto2, objeto3})=>{
  if(objeto1.Respuesta === "CORRECTO"){
    return `Adverbio: ${ objeto1.Adverbio}`
  }else if(objeto2.Respuesta === "CORRECTO"){
    return `Adverbio: ${ objeto2.Adverbio}`
  }else if(objeto3.Respuesta === "CORRECTO"){
    return `Adverbio: ${ objeto3.Adverbio}`
  }
}
export const resultadoOracionQuien = ({objeto1, objeto2, objeto3})=>{
  if(objeto1.Respuesta === "CORRECTO"){
    return `Quien: ${ objeto1.Sujeto.label}`
  }else if(objeto2.Respuesta === "CORRECTO"){
    return `Quien: ${ objeto1.Sujeto.label}`
  }else if(objeto3.Respuesta === "CORRECTO"){
    return `Quien: ${ objeto1.Sujeto.label}`
  }
}
export const resultadoOracionQue = ({objeto1, objeto2, objeto3})=>{
  if(objeto1.Respuesta === "CORRECTO"){
    return `Que: ${objeto1.Que.label}`
  }else if(objeto2.Respuesta === "CORRECTO"){
    return `Que: ${objeto2.Que.label}`
  }else if(objeto3.Respuesta === "CORRECTO"){
    return `Que: ${objeto3.Que.label}`
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
export const resultadoVocaMulti = ({objeto1, objeto2, objeto3})=>{
  if(objeto1.Respuesta === "CORRECTO"){
    return objeto1.Palabra
  }else if(objeto2.Respuesta === "CORRECTO"){
    return objeto2.Palabra
  }else if(objeto3.Respuesta === "CORRECTO"){
    return objeto3.Palabra
  }
}


export const filtradoCurso = ({ data }) => {
  const result = Object.values(
    data.reduce(
      (acc, { Estudiante, Avance, createdAt, updatedAt, Equipo,Integrantes,FechaDeFin }) => {
        const key = JSON.stringify(Estudiante);
        acc[key] = acc[key] || {
          Estudiante,
          Avance: [],
          createdAt,
          updatedAt,
          FechaDeFin:null,
          Equipo: null,
          Integrantes:null
        };
        if (Array.isArray(Avance) && Avance.length > 0) {
          acc[key].Avance = acc[key].Avance.concat(Avance);
        }
        if (createdAt < acc[key].createdAt) {
          acc[key].createdAt = createdAt;
        }
        if (updatedAt > acc[key].updatedAt) {
          acc[key].updatedAt = updatedAt;
        }
        if (Equipo) {
          acc[key].Equipo = Equipo;
        }
        if (Integrantes) {
          acc[key].Integrantes = Integrantes;
        }
        if(FechaDeFin){
          acc[key].FechaDeFin = FechaDeFin;
        }
        return acc;
      },
      {}
    )
  );
  
  // Mover los objetos con el campo "Equipo" al final del array
  const conEquipo = result.filter(objeto => objeto.Equipo);
  const sinEquipo = result.filter(objeto => !objeto.Equipo);
  return [...sinEquipo, ...conEquipo];
};

export const fechaEcuador =(fecha)=>{
  const fechaUtc = new Date(fecha);
const fechaLocal = new Date(fechaUtc.getTime() - (fechaUtc.getTimezoneOffset() * 60000));
const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Guayaquil' };
const fechaFormateada = fechaLocal.toLocaleDateString('es-EC', options);
return fechaFormateada;
}

export const fechaEcuadoracutal =(fecha)=>{
  let resultado = false;
 // Obtener la fecha actual en formato ISO8601 sin la hora
 const fechaActual = new Date();

 // Extraer el día de la fecha actual y la fecha proporcionada
 
 const diaFecha = new Date(fecha)
 
 // Comparar los días y devolver el resultado
 resultado = fechaActual > diaFecha;
 return resultado;
}


export const actividadCaducadaBool=(fecha)=>{
  const fechaActual = new Date();
  const fechaInput = new Date(fecha);
  if(fechaActual > fechaInput){
    return true
  }else if(fechaActual < fechaInput){
    return false
  }
}




function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


export function ordenarYagrupar(arrayDeObjetos, numeroDeGrupos, numeroDeIntegrantes) {
  // Paso 1: Desordenar el array de objetos
  const arrayDesordenado = shuffle(arrayDeObjetos);

  // Paso 2: Calcular la cantidad total de elementos y el número máximo de integrantes por grupo
  const cantidadTotal = arrayDesordenado.length;

  // Validar que el número de integrantes por grupo sea menor o igual a la cantidad total
  numeroDeIntegrantes = Math.min(numeroDeIntegrantes, cantidadTotal);

  const maxIntegrantesPorGrupo = Math.ceil(cantidadTotal / numeroDeGrupos);

  // Paso 3: Crear un nuevo objeto de grupos vacío
  const grupos = {};

  // Paso 4: Recorrer el array desordenado y asignar elementos a los grupos
  let grupoActual = [];
  let grupoIndex = 0;

  for (let i = 0; i < cantidadTotal; i++) {
    grupoActual.push(arrayDesordenado[i]);

    // Verificar si se alcanzó el número máximo de integrantes por grupo
    if (grupoActual.length === numeroDeIntegrantes || i === cantidadTotal - 1) {
      grupos[`Equipo ${grupoIndex + 1}`] = grupoActual;

      // Reiniciar el grupo actual
      grupoActual = [];
      grupoIndex++;
    }
  }

  // Validar que todos los grupos tengan al menos dos integrantes
  for (let key in grupos) {
    const grupoActual = grupos[key];
    if (grupoActual && grupoActual.length === 1 && Object.keys(grupos).length > 1) {
      // Si un grupo tiene un integrante, moverlo al grupo anterior
      const grupoAnteriorIndex = parseInt(key.split(' ')[1]) - 1;
      const grupoAnterior = grupos[`Equipo ${grupoAnteriorIndex}`];
      if (grupoAnterior) {
        grupoAnterior.push(grupoActual.pop());
        // Eliminar el grupo actual si queda vacío
        if (grupoActual.length === 0) {
          delete grupos[key];
        }
      }
    }
  }

  return grupos;
}





// export const nombre = ({objecto})=>{
// if(objecto!== undefined){
//   if(objecto.Avance!== null){
//     let num = objecto.Avance.length /5;
//     return objecto.Integrantes[num].label;
//   }else if(objecto.Avance===null){

//     return objecto.Integrantes[0].label;
//   }
// }
// }

export function nombre({array}) {
  const primerNoTerminado = array.find(item => !item.Terminado);

  return primerNoTerminado ? primerNoTerminado.label : null;
}


export function nombre2({array}) {
  const posicionPrimerNoTerminado = array.Integrantes.findIndex(objeto => !objeto.Terminado);
  console.log(posicionPrimerNoTerminado)
  return Number.isInteger(posicionPrimerNoTerminado) && posicionPrimerNoTerminado != -1 ? array.Integrantes[posicionPrimerNoTerminado].label : 'error'
  
}
export function buscarValor(array, valor) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].value === valor) {
      return {
        value: array[i].value,
        label: array[i].label
      };
    }
  }
  return null;
}



export const Piezacalcular = ({objecto,piezatotales})=>{
  console.log('objecto',objecto)
  console.log(piezatotales)
  if(objecto===null || objecto===undefined || objecto.length===0){
    return 0;
  }
  if(objecto!==null || objecto!==undefined){
  const count = objecto.reduce((acc, obj) => {
    if (obj.Resultado === "CORRECTO") {
      acc++;
    }
    return acc;
  }, 0);
  const ultimoObjeto = objecto[objecto.length - 1];
  const esCorrecto = ultimoObjeto.Resultado === "CORRECTO";
  if(piezatotales===4){
    if(!esCorrecto){
      if(count===0){
        return 0;
      }else if(count===1){
        return 1;
      }else if(count===2){
        return 2;
      }else if(count===3){
        return 3;
      }else if(count===4){
        return 4;
      }else if(count===5){
        return 4;
      }else if(count===6){
        return 4;
      }else if(count > 6){
        return 4;
      }
  }else if(esCorrecto){
    if(count===0){
      return 0;
    }else if(count===1){
      return 1;
    }else if(count===2){
      return 2;
    }else if(count===3){
      return 3;
    }else if(count===4){
      return 4;
    }else if(count===5){
      return 4;
    }else if(count===6){
      return 4;
    }else if(count > 6){
      return 4;
    }
  }
 
  }else if(piezatotales===6){
    if(!esCorrecto){
      if(count===0){
        return 0;
      }else if(count===1){
        return 1;
      }else if(count===2){
        return 2;
      }else if(count===3){
        return 3;
      }else if(count===4){
        return 4;
      }else if(count===5){
        return 5;
      }else if(count==6){
        return 6;
      }else if(count==7){
        return 6;
      }else if(count==8){
        return 6;
      }else if(count >8){
        return 6;
      }
  }else if(esCorrecto){
    if(count===0){
      return 0;
    }else if(count===1){
      return 1;
    }else if(count===2){
      return 2;
    }else if(count===3){
      return 3;
    }else if(count===4){
      return 4;
    }else if(count===5){
      return 5;
    }else if(count===6){
      return 6;
    }else if(count===7){
      return 6;
    }else if(count==8){
      return 6;
    }else if(count >8){
      return 6;
    }
  }
  }}else{
    return 0;
  }
}