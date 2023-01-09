import React from 'react'
//import RompecabezaIndividualColor from './RompecabezaIndividualColor'

export const RompecabaSolitaria = ({a, b, c, d, url, alt}) => {

  return (  
    <>
   <div  className="minicuadrito">
   <div className='encima'> 
   <div    className='a'  style={{visibility:a }}>
    </div>
    <div    className='b'   style={{visibility:b }}>
      </div>
      <div  className='c'  style={{visibility:c }}>
      </div>
       <div className='d' style={{visibility:d }}>
    </div></div>
    <img src={url} alt={alt} width={300} style={{display:'hidden'}} className={''}/>
    </div> 
    </>
  )
}