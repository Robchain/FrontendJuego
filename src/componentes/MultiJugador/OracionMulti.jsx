import React from 'react'
import { Row } from 'reactstrap'
import { AdverbioSeleccionMulti } from './AdverbioSeleccionMulti'
import { QueSeleccionMulti } from './QueSeleccionMulti'
import { QuienSeleccionMulti } from './QuienSeleccionMulti'
import { TODOSSeccionMulti } from './TODOSSeccionMulti'

export const OracionMulti = ({window, id, siguiente, InfoEstudiaSituacion}) => {
  return (
    <Row>
      {
        (InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].TipoPregunta === 'TODOS') && (<TODOSSeccionMulti data={InfoEstudiaSituacion}  id={id} siguiente={siguiente} window={window} />) 
      } 
      {
         (InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].TipoPregunta === 'QUE') && (<QueSeleccionMulti data={InfoEstudiaSituacion} id={id} siguiente={siguiente} window={window} />)
      } 
      {
        (InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].TipoPregunta === 'QUIEN') && (<QuienSeleccionMulti data={InfoEstudiaSituacion} id={id} siguiente={siguiente} window={window} />)
      }
      {
        (InfoEstudiaSituacion.Juegos[id][`Juego${window.id}`].TipoPregunta === 'ADVERBIO') && (<AdverbioSeleccionMulti data={InfoEstudiaSituacion} id={id} siguiente={siguiente} window={window} />)
      }
    </Row>
  )
}
