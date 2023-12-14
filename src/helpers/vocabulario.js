export const  cantidadDePartidas =({piezasinicial, piezasfaltantes})=>{
    let output ;
    if(piezasfaltantes === 0){
    output = piezasinicial;
    }else if(piezasfaltantes>0){
        output = piezasinicial-piezasfaltantes;
    }
return output;
}

export const sumadordePunto =({puntosDeRompecabeza, PuntosNuevos})=>{
return   puntosDeRompecabeza+PuntosNuevos ;
}


export const ordenarPorResultado = (array) => {
    // Utilizamos la función de comparación en Array.sort()
    array.sort((a, b) => {
      // Si a.Resultado es "CORRECTO" y b.Resultado no lo es, a va antes que b
      if (a.Resultado === "CORRECTO" && b.Resultado !== "CORRECTO") {
        return -1;
      }
      // Si b.Resultado es "CORRECTO" y a.Resultado no lo es, b va antes que a
      else if (b.Resultado === "CORRECTO" && a.Resultado !== "CORRECTO") {
        return 1;
      }
      // En cualquier otro caso, no se cambia el orden relativo
      else {
        return 0;
      }
    });
  
    return array;
  };