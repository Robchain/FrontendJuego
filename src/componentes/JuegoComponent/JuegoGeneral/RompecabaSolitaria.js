import React from 'react'
export const RompecabaSolitaria = ({a="", b="", c="", d="",e="", f="",g="",h="", i="", j="" ,Avance,piezas=4, url, alt}) => {

  return (  
   <div  className="minicuadrito position-relative">
   <div className='encima position-absolute'>
   {
    (piezas === 4) && (<>
    {
      Avance !==null ? Avance.map( (i,index)=>(
        index < 4 &&
        <div    className='a'  style={{visibility:i.Resultado==="CORRECTO" &&'hidden' }}>
    </div>
      )
      ): rompe4.map( i=>(
        <div    className='a'  style={{visibility:false &&'hidden' }}>
    </div>
      )
      )
    }
    </> ) 
     }{
    (piezas === 6) && (<>
      {
      Avance !==null ? Avance.map( (i,index)=>(
        index < 6 &&
        <div    className='b'  style={{visibility:i.Resultado==="CORRECTO" &&'hidden' }}>
    </div>
      )
      ): rompe6.map( i=>(
        <div    className='b'  style={{visibility:false &&'hidden' }}>
    </div>
      )
      )
    }
    </> 
    )  
   }
    </div>
    <img src={url} alt={alt} id="imagenRompecabeza" style={{ borderRadius:10,boxShadow: " 5px 5px #d7d7d7"}}/>
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
  }
]