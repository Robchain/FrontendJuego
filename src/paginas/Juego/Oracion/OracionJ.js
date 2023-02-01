import React, { useContext, useEffect, useState, useMemo, useCallback, memo } from 'react'
import ReactPlayer from 'react-player'
import { Container, Row, Col } from 'reactstrap'
import { DooroutButton } from '../../../componentes/JuegoComponent/JuegoGeneral/DooroutButton'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import Adverbio from './Adverbio'
import QueSeccion from './QueSeccion'
import QuienSeccion from './QuienSeccion'
import TODOSSeccion from './TODOSSeccion'

const OracionJ = () => {
 
  const { oraciondata, dataOracion } = useContext(JuecoContext);
  useEffect(() => {
    dataOracion(localStorage.getItem("Usuario"));
  }, [])

  return (
    <>{
      oraciondata !== null ? (
        <div className='window'>
          <Container style={{ zIndex: 1, position: "fixed", }} className="fluid">
            <Row className="d-flex justify-content-around">
              <Col className="d-flex justify-content-evenly" lg="8"  >
                <h1>Oraciones</h1>
              </Col>
              <Col  lg="4"><h3>Puntos:{`${0}`}</h3></Col>
              {
                //EN CASO DE TODOS 
                (oraciondata.Juego1.Partida.Juego1.TipoPregunta === "TODOS") && (<TODOSSeccion/>)
              }
              
              {
                  // EN CASO DE QUE
                (oraciondata.Juego1.Partida.Juego1.TipoPregunta === "QUE") && (<QueSeccion/>)
              }
              {
                  // EN CASO DE QUIEN
                (oraciondata.Juego1.Partida.Juego1.TipoPregunta === "QUIEN") && (<QuienSeccion/>)
              }
              {
                  // EN CASO DE ADVERBIO
                (oraciondata.Juego1.Partida.Juego1.TipoPregunta === "ADVERBIO") && (<Adverbio/>)
              }
              <Col lg="12" className="d-flex justify-content-end">
                <DooroutButton Urlsalida={"/RompecabezaJO"} />
              </Col>
            </Row>
          </Container>
        </div>
      ) : <> <>Cargando...</></>
    }
    </>
  )
}

export default OracionJ