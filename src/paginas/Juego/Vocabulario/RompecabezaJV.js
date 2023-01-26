import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Col, Container, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { BackButton } from '../../../componentes/JuegoComponent/JuegoGeneral/BackButton'
import { RompecabaSolitaria } from '../../../componentes/JuegoComponent/JuegoGeneral/RompecabaSolitaria'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
const RompecabezaJV = () => {

  const { data, setavance, setData } = useContext(JuecoContext);
  const [modal, setModal] = useState(false);
  const datoVocabulario = (user) => {
    axios.post("http://localhost:3002/api/auth/llamadaPartidaVocabulario", { Usuario: user }).then(da => { setData(da.data) })
  }

  useEffect(() => {
    setavance([]);
    datoVocabulario(localStorage.getItem("Usuario"));
  }, [])

  const clickHandle = (event, condicional) => {
    if (condicional) {
      event.preventDefault();
      setModal(!modal);
    }
  }
  const Pantalla = () => {

    if (data === null) {
      return (<div>Cargando...</div>)
    } else {
      return (
        <div className="a fondoMC img-fluid vh-100">
          <Container>
            <Row>
              <Col className="" lg='9'> {/*"d-flex justify-content-evenly"*/}
                <h1 style={{ color: '#000', fontWeight: 'bold' }}>Vocabulario</h1>
              </Col>
              <Col lg="3">
               { //<h2>Puntos:0</h2>
              }              </Col>
              <Modalaqui descripcion={data.Juego1.Partida.Rompecabeza.Nombre} url={data.Juego1.Partida.Rompecabeza.FileColor} clickHandle={clickHandle} modal={modal} setModal={setModal} />
              <Col className="d-flex justify-content-evenly  mt-2 mb-5">
                <Col>
                  <Link to={`/VocabularioJuego/${1}`} onClick={(e) => clickHandle(e, data.Juego1.Avance.Terminado)}><RompecabaSolitaria a={(data.Juego1.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(data.Juego1.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(data.Juego1.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(data.Juego1.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(data.Juego1.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(data.Juego1.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(data.Juego1.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(data.Juego1.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} i={(data.Juego1.Avance.Juego5.Resultado === "CORRECTO") && "hidden"} j={(data.Juego1.Avance.Juego6.Resultado === "CORRECTO") && "hidden"} piezas={data.Juego1.Partida.Rompecabeza.Pieza} url={data.Juego1.Partida.Rompecabeza.FileColor} alt={data.Juego1.Partida.Rompecabeza.Nombre} /> </Link><span>{`${data.Juego1.Partida.Rompecabeza.Pieza}`}</span>
                </Col>
                <Col>
                  <Link to={`/VocabularioJuego/${2}`} onClick={(e) => clickHandle(e, data.Juego2.Avance.Terminado)}> <RompecabaSolitaria a={(data.Juego2.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(data.Juego2.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(data.Juego2.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(data.Juego2.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(data.Juego2.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(data.Juego2.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(data.Juego2.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(data.Juego2.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} i={(data.Juego2.Avance.Juego5.Resultado === "CORRECTO") && "hidden"} j={(data.Juego2.Avance.Juego6.Resultado === "CORRECTO") && "hidden"} piezas={data.Juego2.Partida.Rompecabeza.Pieza} url={data.Juego2.Partida.Rompecabeza.FileColor} alt={data.Juego2.Partida.Rompecabeza.Nombre} /></Link><span>{`${data.Juego2.Partida.Rompecabeza.Pieza}`}</span>
                </Col>
                <Col>
                  <Link to={`/VocabularioJuego/${3}`} onClick={(e) => clickHandle(e, data.Juego3.Avance.Terminado)}>     <RompecabaSolitaria a={(data.Juego3.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(data.Juego3.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(data.Juego3.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(data.Juego3.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(data.Juego3.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(data.Juego3.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(data.Juego3.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(data.Juego3.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} i={(data.Juego3.Avance.Juego5.Resultado === "CORRECTO") && "hidden"} j={(data.Juego3.Avance.Juego6.Resultado === "CORRECTO") && "hidden"} piezas={data.Juego3.Partida.Rompecabeza.Pieza} url={data.Juego3.Partida.Rompecabeza.FileColor} alt={data.Juego3.Partida.Rompecabeza.Nombre} /> </Link><span>{`${data.Juego3.Partida.Rompecabeza.Pieza}`}</span>
                </Col>
              </Col>
              <Col className="d-flex justify-content-evenly mt-2">
                <Col>
                  <Link to={`/VocabularioJuego/${4}`} onClick={(e) => clickHandle(e, data.Juego4.Avance.Terminado)}>    <RompecabaSolitaria a={(data.Juego4.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(data.Juego4.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(data.Juego4.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(data.Juego1.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(data.Juego4.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(data.Juego4.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(data.Juego4.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(data.Juego1.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} i={(data.Juego4.Avance.Juego5.Resultado === "CORRECTO") && "hidden"} j={(data.Juego4.Avance.Juego6.Resultado === "CORRECTO") && "hidden"} piezas={data.Juego4.Partida.Rompecabeza.Pieza} url={data.Juego4.Partida.Rompecabeza.FileColor} alt={data.Juego4.Partida.Rompecabeza.Nombre} /></Link><span>{`${data.Juego4.Partida.Rompecabeza.Pieza}`}</span>
                </Col>
                <Col>
                  <Link to={`/VocabularioJuego/${5}`} onClick={(e) => clickHandle(e, data.Juego5.Avance.Terminado)}>   <RompecabaSolitaria a={(data.Juego5.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(data.Juego5.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(data.Juego5.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(data.Juego5.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(data.Juego5.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(data.Juego5.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(data.Juego5.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(data.Juego5.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} i={(data.Juego5.Avance.Juego5.Resultado === "CORRECTO") && "hidden"} j={(data.Juego5.Avance.Juego6.Resultado === "CORRECTO") && "hidden"} piezas={data.Juego5.Partida.Rompecabeza.Pieza} url={data.Juego5.Partida.Rompecabeza.FileColor} alt={data.Juego5.Partida.Rompecabeza.Nombre} /></Link><span>{`${data.Juego5.Partida.Rompecabeza.Pieza}`}</span>
                </Col>
                <Col>
                  <Link to={`/VocabularioJuego/${6}`} onClick={(e) => clickHandle(e, data.Juego6.Avance.Terminado)}>   <RompecabaSolitaria a={(data.Juego6.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} d={(data.Juego6.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} b={(data.Juego6.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} c={(data.Juego6.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} e={(data.Juego6.Avance.Juego1.Resultado === "CORRECTO") && "hidden"} f={(data.Juego6.Avance.Juego2.Resultado === "CORRECTO") && "hidden"} g={(data.Juego6.Avance.Juego3.Resultado === "CORRECTO") && "hidden"} h={(data.Juego6.Avance.Juego4.Resultado === "CORRECTO") && "hidden"} i={(data.Juego6.Avance.Juego5.Resultado === "CORRECTO") && "hidden"} j={(data.Juego6.Avance.Juego6.Resultado === "CORRECTO") && "hidden"} piezas={data.Juego6.Partida.Rompecabeza.Pieza} url={data.Juego6.Partida.Rompecabeza.FileColor} alt={data.Juego6.Partida.Rompecabeza.Nombre} /></Link><span>{`${data.Juego6.Partida.Rompecabeza.Pieza}`}</span>
                </Col>
              </Col>
              <Col lg='12'>
                <BackButton ruta='/MenuJuego' />
              </Col>
            </Row>
          </Container>
        </div>
      )
    }
  }

  return (
    <>
      <Pantalla />
    </>
  )
}
const Modalaqui = ({ url, descripcion, modal, clickHandle, setModal }) => {
  const toggle = () => setModal(!modal)
  const impresion = () => {
    document.querySelector(".print").classList.add("print-image");
    document.querySelector(".bot").classList.add("desaparecer");
    document.querySelector(".a").classList.add("desaparecer");
    window.print();
    document.querySelector(".print").classList.remove("print-image");
    document.querySelector(".bot").classList.remove("desaparecer");
    document.querySelector(".a").classList.remove("desaparecer");
  }
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} backdrop={false} fullscreen="sm">
        <ModalHeader toggle={clickHandle}>ROMPECABEZA COMPLETADA</ModalHeader>
        <ModalBody>
          <img className='print' src={url} alt={descripcion} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className='bot' onClick={() => { impresion() }}>
            Imprimir
          </Button>{' '}
          <Button color="secondary" className='bot' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
export default RompecabezaJV;