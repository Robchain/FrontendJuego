import React from 'react'
import { Row } from 'reactstrap'
import { AdverbioSeleccionMulti } from './AdverbioSeleccionMulti'
import { QueSeleccionMulti } from './QueSeleccionMulti'
import { QuienSeleccionMulti } from './QuienSeleccionMulti'
import { TODOSSeccionMulti } from './TODOSSeccionMulti'

export const OracionMulti = ({window, siguiente, dataMultiJu, dispatchMutli}) => {
  return (
    <Row>
      {
        (dataMultiJu[`Juego${window.id}`].TipoPregunta === 'TODOS') && (<TODOSSeccionMulti data={dataMultiJu}   siguiente={siguiente} window={window} Progreso={dispatchMutli} />) 
      } 
      {
         (dataMultiJu[`Juego${window.id}`].TipoPregunta === 'QUE') && (<QueSeleccionMulti data={dataMultiJu}  siguiente={siguiente} window={window} Progreso={dispatchMutli} />)
      } 
      {
        (dataMultiJu[`Juego${window.id}`].TipoPregunta === 'QUIEN') && (<QuienSeleccionMulti data={dataMultiJu} Progreso={dispatchMutli}  siguiente={siguiente} window={window} />)
      }
      {
        (dataMultiJu[`Juego${window.id}`].TipoPregunta === 'ADVERBIO') && (<AdverbioSeleccionMulti data={dataMultiJu}  siguiente={siguiente} window={window} Progreso={dispatchMutli} />)
      }
    </Row>
  )
}
