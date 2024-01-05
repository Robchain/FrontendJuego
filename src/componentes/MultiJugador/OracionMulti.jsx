import React from 'react'
import { Row } from 'reactstrap'
import { AdverbioSeleccionMulti } from './AdverbioSeleccionMulti'
import { QueSeleccionMulti } from './QueSeleccionMulti'
import { QuienSeleccionMulti } from './QuienSeleccionMulti'
import { TODOSSeccionMulti } from './TODOSSeccionMulti'

export const OracionMulti = ({indice, siguiente, dataMultiJu, dispatchMutli, setcro}) => {
  return (
    <Row>
      {
        (dataMultiJu[`Juego${indice}`].TipoPregunta === 'TODOS') && (<TODOSSeccionMulti data={dataMultiJu} setcro={setcro}  siguiente={siguiente} indice={indice} Progreso={dispatchMutli} />) 
      } 
      {
         (dataMultiJu[`Juego${indice}`].TipoPregunta === 'QUE') && (<QueSeleccionMulti data={dataMultiJu} setcro={setcro}  siguiente={siguiente} indice={indice} Progreso={dispatchMutli} />)
      } 
      {
        (dataMultiJu[`Juego${indice}`].TipoPregunta === 'QUIEN') && (<QuienSeleccionMulti data={dataMultiJu} setcro={setcro} Progreso={dispatchMutli}  siguiente={siguiente} indice={indice} />)
      }
      {
        (dataMultiJu[`Juego${indice}`].TipoPregunta === 'ADVERBIO') && (<AdverbioSeleccionMulti data={dataMultiJu} setcro={setcro}  siguiente={siguiente} indice={indice} Progreso={dispatchMutli} />)
      }
    </Row>
  )
}
