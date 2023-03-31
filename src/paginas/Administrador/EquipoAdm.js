import React, { useEffect, useState } from 'react'
import MenuAdmi from '../../componentes/MenuAdmi';
import { Button, Card, CardBody, CardFooter, CardGroup, CardImg, CardText, CardTitle, Col, Container, Input, Label, Row } from 'reactstrap';
import { NavBar } from '../../componentes/NavBar';
import { ModalAgregarEquipo } from '../../componentes/Administrador/ModalAgregarEquipo';
import { DesabilitarEquipo, HabilitarEquipo, llamadaGetActivo } from '../../service/Adminstrador/Equipo';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

const EquipoAdm = () => {
  const MySwal = withReactContent(Swal)
  const [card, setCard] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [modal, setModal] = useState(false)
  const [showAll, setShowAll] = useState(true);
  const toggledos = () => { setModal(!modal) }
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
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: "Falto un campo",
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
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: "Falto un campo",
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
      <MenuAdmi toggle={toggle} isOpen={isOpen} />
      <Col xl='11' lg="11" className='ms-5 d-flex justify-content-end'>
        <Button onClick={toggledos} className='px-4' style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
          Agregar
        </Button>
        <ModalAgregarEquipo modal={modal} toggle={toggledos} />
      </Col>
      <Row className='match-height mb-2'>
        <Col lg="12">
          <Input
            id="exampleCheck"
            name="check"
            type="checkbox"
            checked={showAll}
            onChange={handleCheckboxChange}
          />{" "}
          <Label
            check
            for="exampleCheck"
            style={{ color: '#8b8b8c', fontWeight: "700" }}
          >
            Mostar Todos
          </Label>
        </Col>
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
                    <Button style={{ background: '#5b2998', color: '#fff' }} outline /*onClick={() => Editar(i)}*/ >
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
                    <Button style={{ background: '#5b2998', color: '#fff' }} outline /*onClick={() => Editar(i)}*/ >
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