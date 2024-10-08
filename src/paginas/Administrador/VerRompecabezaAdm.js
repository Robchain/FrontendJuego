import React, { useEffect, useState } from "react";
import {AdmiMenu} from "../../componentes/AdmiMenu";
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
  Input,
  Label,
} from "reactstrap";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { NavBar } from "../../componentes/NavBar";
import { ModalAgregarRompecabeza } from "../../componentes/Administrador/ModalAgregarRompecabeza";
import { desabilitarRompecabeza, HabilitarRompecabeza, llamadaGetRompecabezaActivos } from "../../service/Adminstrador/Rompecabeza";
import { ModalEditarRompecabeza } from "../../componentes/Administrador/ModalEditarRompecabeza";
import { responseformualrio } from "../../helpers";
const VerRompecabezaAdm = () => {
  const [cards, setCards] = useState([]);
  const MySwal = withReactContent(Swal)
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dataSeleccionada, setDataSeleccionada] = useState({});
  const [modaledtiar, setModalEditar] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const handleCheckboxChange = () => {
       setShowAll(!showAll);
     };
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const desabilitarTarjeta = async (objeto)=>{
    try {
      const data = await desabilitarRompecabeza({_id:objeto._id});   
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        showConfirmButton:data.titulo !== "Excelente",
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false}) 
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
        buttonsStyling: false})
    }
  }
  const HabilitarTarjeta = async (objeto)=>{
    try {
      const data = await HabilitarRompecabeza({_id:objeto._id});   
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        showConfirmButton:data.titulo !== "Excelente",
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false}) 
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
      <AdmiMenu toggle={toggle} isOpen={isOpen} />
      <ModalAgregarRompecabeza modal={modal} toggle={toggledos} />
      <ModalEditarRompecabeza dataBase={dataSeleccionada} modal={modaledtiar} toggle={toggleEdtiar}/>
      
      <Row className="match-height mb-2">
        <div className="rompecabeza-botones-superior my-2">
        <Button
          onClick={toggledos}
          className="px-4 mx-3"
          style={{
            borderRadius: "10px",
            backgroundColor: "#62259E",
            color: "#fff",
            borderColor: "#62259E",
          }}
        >
          Agregar
        </Button>
        <div>
        <Input
                        id="exampleCheck"
                        name="check"
                        type="checkbox"
                        checked={showAll}
                       onChange={handleCheckboxChange}
                    />&nbsp;&nbsp;
                    <Label
                        check
                        for="exampleCheck"
                        style={{color:'#8b8b8c',fontWeight:"700"}}
                    >
                        Mostar Todos
                    </Label>
        </div>
        </div>
      
        {showAll ? cards.map((i) => (
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
                        </span>&nbsp;&nbsp;
                        {i.Nombre}
                      </li>
                      <li>
                        <span
                          className="fw-bolder"
                          style={{ color: "#8cc5b0" }}
                        >
                          Número de piezas:
                        </span>&nbsp;&nbsp;
                        {i.Pieza}&nbsp;&nbsp;
                      </li>
                      <li>
                        <span
                          className="fw-bolder"
                          style={{ color: "#8cc5b0" }}
                        >
                          Estado:
                        </span>&nbsp;&nbsp;
                        {i.Estado}
                      </li>
                    </ul>
                  </CardText>
                </CardBody>
                <CardFooter>
                  <Button
                    style={{ color: "#592a98" }}
                    outline onClick={() => {i.Estado === "ACTIVO" ? desabilitarTarjeta(i): HabilitarTarjeta(i)}}
                  >
        {i.Estado === "ACTIVO" ? <span>Desactivar</span> : <span>Activar</span>}
                  </Button>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <Button
                    style={{ background: "#5b2998", color: "#fff" }}
                    outline onClick={() => {toggleEdtiar(); setDataSeleccionada(i); }}
                  >
                    Editar
                  </Button>
                </CardFooter>
              </Card>
            </CardGroup>
          </Col>
        )): cards.filter((item) => item.Estado === "ACTIVO").map((i) => (
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
                        </span>&nbsp;&nbsp;
                        {i.Nombre}
                      </li>
                      <li>
                        <span
                          className="fw-bolder"
                          style={{ color: "#8cc5b0" }}
                        >
                          Número de piezas:
                        </span>&nbsp;&nbsp;
                        {i.Pieza}&nbsp;&nbsp;
                      </li>
                      <li>
                        <span
                          className="fw-bolder"
                          style={{ color: "#8cc5b0" }}
                        >
                          Estado:
                        </span>&nbsp;&nbsp;
                        {i.Estado}
                      </li>
                    </ul>
                  </CardText>
                </CardBody>
                <CardFooter>
                  <Button
                    style={{ color: "#592a98" }}
                    outline onClick={() => {i.Estado === "ACTIVO" ? desabilitarTarjeta(i): HabilitarTarjeta(i)}}
                  >
                  {i.Estado === "ACTIVO" ? <span>Desactivar</span> : <span>Activar</span>}
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
        )) }
      </Row>
    </Container>
  );
};

export default VerRompecabezaAdm;
