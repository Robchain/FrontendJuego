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


  export const analizaradentro = ({quienlist, data, indice})=>{

    let salida =[]
    let nombreExcluir;
    let imagenExcluir;
    if(data[`Juego` + indice].Oraciones[0].Respuesta ==="CORRECTO"){
      nombreExcluir =data[`Juego` + indice].Oraciones[0].Sujeto.label
      imagenExcluir =data[`Juego` + indice].Oraciones[0].Sujeto.value
    }
    if(data[`Juego` + indice].Oraciones[1].Respuesta==="CORRECTO"){
      nombreExcluir =data[`Juego` + indice].Oraciones[1].Sujeto.label
      imagenExcluir =data[`Juego` + indice].Oraciones[1].Sujeto.value
    }
    if(data[`Juego` + indice].Oraciones[2].Respuesta==="CORRECTO"){
      nombreExcluir =data[`Juego` + indice].Oraciones[2].Sujeto.label
      imagenExcluir =data[`Juego` + indice].Oraciones[2].Sujeto.value
    }
    const elementosActivos = quienlist.filter(objeto => objeto.Estado === "ACTIVO");
    const resultadosFiltrados = elementosActivos.filter(objeto => {
      return (
        objeto.Nombre !== nombreExcluir &&
        objeto.Imagen !== imagenExcluir &&
        objeto.Estado === "ACTIVO"
      );
    }).sort(() => Math.random() - 0.5).slice(0, 2);
    
    // Organizar los resultados en un formato de etiquetas y valores
    const etiquetasYValores = resultadosFiltrados.map(objeto => ({
      label: objeto.Nombre,
      value: objeto.Imagen
    }));
    debugger
    if(data[`Juego` + indice].Oraciones[0].Respuesta ==="CORRECTO"){
      salida =[{label: data[`Juego` + indice].Oraciones[0].Sujeto.label, value: data[`Juego` + indice].Oraciones[0].Sujeto.value },{ label: etiquetasYValores[0].label, value: etiquetasYValores[0].value },{ label: etiquetasYValores[1].label, value: etiquetasYValores[1].value  }]
    }
    if(data[`Juego` + indice].Oraciones[1].Respuesta==="CORRECTO"){
      salida =[{label: etiquetasYValores[0].label, value: etiquetasYValores[0].value },{label: data[`Juego` + indice].Oraciones[1].Sujeto.label, value: data[`Juego` + indice].Oraciones[1].Sujeto.value },{ label: etiquetasYValores[1].label, value: etiquetasYValores[1].value  }]
    }
    if(data[`Juego` + indice].Oraciones[2].Respuesta==="CORRECTO"){
      salida =[{ label: etiquetasYValores[0].label, value: etiquetasYValores[0].value },{ label: etiquetasYValores[1].label, value: etiquetasYValores[1].value  },{label: data[`Juego` + indice].Oraciones[2].Sujeto.label, value: data[`Juego` + indice].Oraciones[2].Sujeto.value }]
    }


      return salida;
  }