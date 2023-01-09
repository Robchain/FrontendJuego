import React from 'react'
import RompecabezaIndividualColor from './RompecabezaIndividualColor'

export const RompecabezaFinalRespuesta = ({url, alt}) => {
  return (
    <div>
    <img src={url} alt={alt} width={600} style={{display:'hidden'}} className={''}/>
    </div>
  )
}
