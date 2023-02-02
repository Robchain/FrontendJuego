import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import { DooroutButton } from '../../../componentes/JuegoComponent/JuegoGeneral/DooroutButton'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import Adverbio from './Adverbio'
import QueSeccion from './QueSeccion'
import QuienSeccion from './QuienSeccion'
import TODOSSeccion from './TODOSSeccion'

const OracionJ = () => {
  const [windows, setWindows] = useState([
    { id: 1, show: false },
    { id: 2, show: false },
    { id: 3, show: false },
    { id: 4, show: false },
    { id: 5, show: false },
    { id: 6, show: false },
    { id: 7, show: false },
  ]);
  const navegar = useNavigate();
  const { id } = useParams();

  const siguiente = (num) => {
    toggleWindow(num);
    if (num === oraciondata[`Juego${id}`].Partida.Rompecabeza.Pieza + 1) {
      navegar(`/finalOracionJuego/${id}`);
    } else {
      toggleWindow(num + 1);
    }

  }
  const toggleWindow = (id) => {
    // Crear una copia del arreglo de ventanas
    let newWindows = [...windows];
    // Encontrar la ventana con el id especificado
    let window = newWindows.find(w => w.id === id);
    // Invertir el valor de show
    window.show = !window.show;
    // Actualizar el arreglo de ventanas
    setWindows(newWindows);
  }
  const { oraciondata, dataOracion } = useContext(JuecoContext);
  useEffect(() => {
    
    dataOracion(localStorage.getItem("Usuario"));
  }, [])
  useEffect(() => {
    toggleWindow(1);
  }, [])
  return (
    <>{
      oraciondata !== null ? (
        <>
        { windows.map(window =>(
          <div  key={1}>
            {
              window.show &&(
                <div className='window'>
          <Container style={{ zIndex: 1, position: "fixed", }} className="fluid">
            <Row className="d-flex justify-content-around">
              <Col className="d-flex justify-content-evenly" lg="8"  >
                <h1>Oraciones</h1>
              </Col>
              <Col  lg="4"><h3>Puntos:{`${0}`}</h3></Col>
              {
                //EN CASO DE TODOS 
                (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].TipoPregunta === "TODOS") && (<TODOSSeccion id={id} siguiente={siguiente} window={window} />)
              }
              {
                  // EN CASO DE QUE
                (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].TipoPregunta === "QUE") && (<QueSeccion id={id} siguiente={siguiente} window={window}/>)
              }
              {
                  // EN CASO DE QUIEN
                (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].TipoPregunta === "QUIEN") && (<QuienSeccion id={id} siguiente={siguiente} window={window}/>)
              }
              {
                  // EN CASO DE ADVERBIO
                (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].TipoPregunta === "ADVERBIO") && (<Adverbio id={id} siguiente={siguiente} window={window}/>)
              }
              <Col lg="12" className="d-flex justify-content-end">
                <DooroutButton Urlsalida={"/RompecabezaJO"} />
              </Col>
            </Row>
          </Container>
        </div>
              )
            }
          </div>
        ))
        }
        </>
      ) : <> <>Cargando...</></>
    }
    </>
  )
}

export default OracionJ