import React from 'react'

export const RompecabezaFinalRespuesta = ({url, alt, resultado, pieza}) => {
  return (
    <div className='' >
    <img src={url} alt={alt} id="imagenFinal" style={{ borderRadius:10,boxShadow: "5px 5px 5px 5px #d7d7d7"}}/>
    <h1 className='mx-auto'>{`${resultado}/${pieza+1}`}</h1>
    </div>
  )
}
