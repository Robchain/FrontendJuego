import React, { useEffect, useState } from 'react'
import {AdmiMenu} from "../../componentes/AdmiMenu";
import { Button, Card, CardBody, CardFooter, CardGroup, CardImg, CardText, CardTitle, Col, Container, Input, Label, Row } from 'reactstrap';
import { NavBar } from '../../componentes/NavBar';
import { ModalAgregarEquipo } from '../../componentes/Administrador/ModalAgregarEquipo';
import { DesabilitarEquipo, HabilitarEquipo, llamadaGetActivo } from '../../service/Adminstrador/Equipo';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { ModalEditarEquipo } from '../../componentes/Administrador/ModalEditarEquipo';
import { responseformualrio } from '../../helpers';

const EquipoAdm = () => {
  const MySwal = withReactContent(Swal)
  const [dataSeleccionada, setDataSeleccionada] = useState({})
  const [modaleditar, setModaleditar] = useState(false);
  const [card, setCard] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [modal, setModal] = useState(false)
  const [showAll, setShowAll] = useState(true);
  const toggledos = () => { setModal(!modal) }
  const toogleeditar = ()=>{ setModaleditar(!modaleditar)}
  const toggle = () => { setIsOpen(!isOpen) }
  const mostrar = async () => {
    const data = await llamadaGetActivo();
    setCard(data);
  }
  useEffect(() => {
    mostrar()
  }, [])

  const handleCheckboxChange = () => {
    setShowAll(!showAll);
  };

  const desabilitarEquipo = async (objecto) => {
    try {
      const data = await DesabilitarEquipo({ _id: objecto._id });
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        showConfirmButton:data.titulo !== "Excelente",
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
      if(data.titulo ==="Excelente"){
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        } 
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: responseformualrio.Desactivar.NoDesactivar,
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
    }
  }
  const habilitarEquipo = async (objecto) => {
    try {
      const data = await HabilitarEquipo({ _id: objecto._id });
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        showConfirmButton:data.titulo !== "Excelente",
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
      if(data.titulo ==="Excelente"){
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        } 
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: responseformualrio.Activar.NoActivar,
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
    }
  }
  return (
    <Container>
      <NavBar toggle={toggle} Seccion={"Administrador de equipos"} />
      <AdmiMenu toggle={toggle} isOpen={isOpen} />
      <ModalAgregarEquipo modal={modal} toggle={toggledos} />
      <ModalEditarEquipo baseData={dataSeleccionada} modal={modaleditar} toggle={toogleeditar} />
      <Row className='match-height mb-2'>
      <div className='rompecabeza-botones-superior'>
      <Button onClick={toggledos} className='px-4 mx-3' style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
          Agregar
        </Button>
<div>
<Input
            id="exampleCheck"
            name="check"
            type="checkbox"
            checked={showAll}
            onChange={handleCheckboxChange}
          />&nbsp;
          <Label
            check
            for="exampleCheck"
            style={{ color: '#8b8b8c', fontWeight: "700" }}
          >
            Mostar Todos
          </Label>
</div>
      </div>
      
        {showAll ?
          card.map(i => (
            <Col lg='4' md='6' className='my-2'>
              <CardGroup>
                <Card>
                  <CardImg top src={i.Imagen} alt={i.Nombre} />
                  <CardBody>
                    <CardTitle tag='h4'>{i.Nombre}</CardTitle>
                    <CardText>
                      <ul className='list-unstyled'>
                        <li> <span className="fw-bolder" style={{ color: '#8cc5b0' }}>Nombre:</span> {i.Nombre}</li>
                        <li> <span className="fw-bolder" style={{ color: '#8cc5b0' }}>Estado:</span> {i.Estado}</li>
                      </ul>
                    </CardText>
                  </CardBody>
                  <CardFooter>
                    <Button style={{ color: '#592a98' }} outline onClick={() => { i.Estado === "ACTIVO" ? desabilitarEquipo(i) : habilitarEquipo(i) }} >
                      {i.Estado === "ACTIVO" ? <span>Desactivar</span> : <span>Activar</span>}
                    </Button>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <Button style={{ background: '#5b2998', color: '#fff' }} outline onClick={() => {setDataSeleccionada(i); toogleeditar();}} >
                      Editar
                    </Button>
                  </CardFooter>
                </Card>
              </CardGroup>
            </Col>
          ))
          : card.filter((item) => item.Estado === "ACTIVO").map(i => (
            <Col lg='4' md='6' className='my-2'>
              <CardGroup>
                <Card>
                  <CardImg top src={i.Imagen} alt={i.Nombre} />
                  <CardBody>
                    <CardTitle tag='h4'>{i.Nombre}</CardTitle>
                    <CardText>
                      <ul className='list-unstyled'>
                        <li> <span className="fw-bolder" style={{ color: '#8cc5b0' }}>Nombre:</span> {i.Nombre}</li>
                        <li> <span className="fw-bolder" style={{ color: '#8cc5b0' }}>Estado:</span> {i.Estado}</li>
                      </ul>
                    </CardText>
                  </CardBody>
                  <CardFooter>
                    <Button style={{ color: '#592a98' }} outline onClick={() => { i.Estado === "ACTIVO" ? desabilitarEquipo(i) : habilitarEquipo(i) }} >
                      {i.Estado === "ACTIVO" ? <span>Desactivar</span> : <span>Activar</span>}
                    </Button>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <Button style={{ background: '#5b2998', color: '#fff' }} outline onClick={() => {setDataSeleccionada(i); toogleeditar();}} >
                      Editar
                    </Button>
                  </CardFooter>
                </Card>
              </CardGroup>
            </Col>
          ))}
      </Row>
    </Container>
  )
}
export default EquipoAdm;