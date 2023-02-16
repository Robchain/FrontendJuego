import React from 'react'
export const RompecabaSolitaria = ({a, b, c, d,e, f,g,h, i, j,piezas=4, url, alt}) => {

  return (  
   <div  className="minicuadrito position-relative">
   <div className='encima position-absolute'>
   {
    (piezas === 4) && (<>
   <div    className='a'  style={{visibility:a }}>
    </div>
    <div    className='b'   style={{visibility:b }}>
      </div>
      <div  className='c'  style={{visibility:c }}>
      </div>
       <div className='d' style={{visibility:d }}>
    </div>
    </> ) 
     }{
    (piezas === 6) && (<>
   <div    className='e'  style={{visibility:e }}></div>
    <div    className='f'   style={{visibility:f }}></div>
      <div  className='g'  style={{visibility:g }}></div>
       <div className='h' style={{visibility:h }}></div>
    <div className='i' style={{visibility:i }}></div>
    <div className='j' style={{visibility:j }}></div>
    </> 
    )  
   }
    </div>
    <img src={url} alt={alt} id="imagenRompecabeza" style={{ borderRadius:10,boxShadow: " 5px 5px #d7d7d7"}}/>
    </div> 
  )
}