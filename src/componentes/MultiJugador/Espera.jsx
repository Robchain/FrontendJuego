import React from 'react'
import gifDeEspera from "../../assets/img/AssetsGame/101088-kids-studying-from-home (1)a.gif"
import { CarreraStepBar } from '../Administrador/CarreraStepBar'
import { nombre2 } from '../../helpers/contador'
  
export const Espera = ({InfoEstudiaSituacion}) => {
  return (
    <div className='Sala-espera'>
    <div className='imagen-espera-div' >
      <img src={gifDeEspera} alt="esperando" className='imagen-espera'/>
      </div>
      <div className='contenido-espera'>
        <span>Espera...</span>
        {
          InfoEstudiaSituacion.Equipo===null ? 
          <p><b>{nombre2({array:InfoEstudiaSituacion})}</b>, aun no selecciona un equipo</p> :
        <p><b>{nombre2({array:InfoEstudiaSituacion})}</b> le toca jugar</p>
        }
</div>
<div >
{
 InfoEstudiaSituacion.Equipo !== null && (<CarreraStepBar steps={InfoEstudiaSituacion.Avance!==null ? (InfoEstudiaSituacion.Integrantes.filter(elemento => elemento.Terminado).length+0.5) : 0} InfoEstudiaSituacion={InfoEstudiaSituacion} />)
}
</div>
    </div>
  )
}
