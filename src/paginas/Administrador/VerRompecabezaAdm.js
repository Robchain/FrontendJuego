import React, { useEffect, useState } from "react";
import MenuAdmi from "../../componentes/MenuAdmi";
import {
  Button,
  Container,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  Col,
  Row,
  CardGroup,
} from "reactstrap";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { NavBar } from "../../componentes/NavBar";
import { ModalAgregarRompecabeza } from "../../componentes/Administrador/ModalAgregarRompecabeza";
import { ElimnarDataRompecabeza, llamadaGetRompecabezaActivos } from "../../service/Adminstrador/Rompecabeza";
import { ModalEditarRompecabeza } from "../../componentes/Administrador/ModalEditarRompecabeza";
const VerRompecabezaAdm = () => {
  const [cards, setCards] = useState([]);
  const MySwal = withReactContent(Swal)
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dataSeleccionada, setDataSeleccionada] = useState({});
  const [modaledtiar, setModalEditar] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const ondeleteTarjeta = async (objeto)=>{
    try {
      const data = await ElimnarDataRompecabeza({_id:objeto._id});   
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false}) 
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: "Falto un campo",
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false})
    }
  }
  const mostrar = async () => {
    const data = await llamadaGetRompecabezaActivos();
    setCards(data);
  };
  useEffect(() => {
    mostrar();
  }, []);
  const toggledos = () => {
    setModal(!modal);
  };
  const toggleEdtiar = ()=>{
    setModalEditar(!modaledtiar);
  }
  return (
    <Container>
      <NavBar toggle={toggle} Seccion={"Rompecabezas"} />
      <MenuAdmi toggle={toggle} isOpen={isOpen} />
      <Col xl="11" lg="11" className="ms-5 d-flex justify-content-end">
        <Button
          onClick={toggledos}
          className="px-4"
          style={{
            borderRadius: "10px",
            backgroundColor: "#62259E",
            color: "#fff",
            borderColor: "#62259E",
          }}
        >
          Agregar
        </Button>
        <ModalAgregarRompecabeza modal={modal} toggle={toggledos} />
        <ModalEditarRompecabeza dataBase={dataSeleccionada} modal={modaledtiar} toggle={toggleEdtiar}/>
      </Col>
      <Row className="match-height mb-2">
        {cards.map((i) => (
          <Col lg="4" md="6" className="my-2">
            <CardGroup>
              <Card>
                <CardImg top src={i.FileColor} alt={i.Nombre} />
                <CardBody>
                  <CardTitle tag="h4">{i.Nombre}</CardTitle>
                  <CardText>
                    <ul>
                      <li>
                        <span
                          className="fw-bolder"
                          style={{ color: "#8cc5b0" }}
                        >
                          Nombre:
                        </span>{" "}
                        {i.Nombre}
                      </li>
                      <li>
                        <span
                          className="fw-bolder"
                          style={{ color: "#8cc5b0" }}
                        >
                          Numero de piezas:
                        </span>{" "}
                        {i.Pieza}{" "}
                      </li>
                      <li>
                        <span
                          className="fw-bolder"
                          style={{ color: "#8cc5b0" }}
                        >
                          Estado:
                        </span>{" "}
                        {i.Estado}
                      </li>
                    </ul>
                  </CardText>
                </CardBody>
                <CardFooter>
                  <Button
                    style={{ color: "#592a98" }}
                    outline onClick={() => ondeleteTarjeta(i)}
                  >
                    Eliminar
                  </Button>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <Button
                    style={{ background: "#5b2998", color: "#fff" }}
                    outline onClick={() => {setDataSeleccionada(i); toggleEdtiar(); }}
                  >
                    Editar
                  </Button>
                </CardFooter>
              </Card>
            </CardGroup>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default VerRompecabezaAdm;
