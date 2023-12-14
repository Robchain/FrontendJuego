import React, { useEffect, useState } from 'react'
import { ordenarPorResultado } from '../../../helpers'
export const RompecabaSolitaria = ({ Avance,piezas=4, url, alt, principal=true, terminado=false}) => {
const [piezastraida, setpiezas] = useState([])

useEffect(() => {
  if(Avance!==null){
    const finalPiezas = ordenarPorResultado(Avance);
    setpiezas(finalPiezas);
  }
}, [Avance])




  return (  
   <div  className="minicuadrito">
   {
    terminado===false&&  <div className={ principal ?'encima position-absolute':'encimados position-absolute'}>
   {
    (piezas === 4) && (<>
    {
      Avance !==null ? piezastraida.map( (i,index)=>(
        index < 4 &&
        <div    className={principal ? 'a':'c'}  style={{visibility:i.Resultado==="CORRECTO" &&'hidden' }}>
    </div>
      )
      ): rompe4.map( i=>(
        <div    className={principal ? 'a':'c'}  style={{visibility:false &&'hidden' }}>
    </div> 
      )
      )
    }
    </> ) 
     }{
    (piezas === 6) && (<>
      {
      Avance !==null ? piezastraida.map( (i,index)=>(
        index < 6 &&
        <div    className={principal ? 'b':'d'}  style={{visibility:i.Resultado==="CORRECTO" &&'hidden' }}>
    </div>
      )
      ): rompe6.map( i=>(
        <div    className={principal ? 'b':'d'}  style={{visibility:false &&'hidden' }}>
    </div>
      )
      )
    }
    </> 
    )  
   }
    </div>
   }
    <img src={url} alt={alt} id={principal ? "imagenRompecabeza":"imagenFinal"} style={{ borderRadius:10,boxShadow: " 5px 5px #d7d7d7"}}/>
    </div> 
  )
}

const rompe4=[
  {
    pieza:1,
    visibility:"hidden"
  },
  {
    pieza:2,
    visibility:"hidden"
  },{
    pieza:3,
    visibility:"hidden"
  },{
    pieza:4,
    visibility:"hidden"
  }
  ,{
    pieza:5,
    visibility:"hidden"
  }
]
const rompe6=[
  {
    pieza:1,
    visibility:"hidden"
  },
  {
    pieza:2,
    visibility:"hidden"
  },{
    pieza:3,
    visibility:"hidden"
  },{
    pieza:4,
    visibility:"hidden"
  },{
    pieza:5,
    visibility:"hidden"
  },{
    pieza:6,
    visibility:"hidden"
  },{
    pieza:7,
    visibility:"hidden"
  }
]