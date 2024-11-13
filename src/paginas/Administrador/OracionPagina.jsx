import React, { useEffect, useState, useReducer } from 'react'
import { Button, Card, CardBody, CardFooter, CardGroup, CardImg, CardText, CardTitle, Col, Container, Input, Label, Nav, NavItem, NavLink, Row, Spinner, TabContent, TabPane } from 'reactstrap'
import { ModalAgregarOracion } from '../../componentes/Administrador/ModalAgregarOracion'
import { AdmiMenu } from "../../componentes/AdmiMenu";
import Swal from 'sweetalert2'
import Select from 'react-select';
import withReactContent from 'sweetalert2-react-content';
import { NavBar } from '../../componentes/NavBar'
import { ActivarJuegoPorCursoParaleloOracion, CrearQuienImagen, DesabilitarOracion, HabilitarOracion, MetodoGetDellamadaOracionActivas } from '../../service/Adminstrador/Oracion'
import { ModalEditarOracion } from '../../componentes/Administrador/ModalEditarOracion'
import { ListadoJuegoActivosOracion } from '../../componentes/Administrador/ListadoJuegoActivosOracion';
import { subidaQuienImagen } from '../../firebase/config';
import { ListadoQuienAdministrador } from '../../componentes/Administrador/ListadoQuienAdministrador';
import { MostrarCurso, MostrarParalelo } from '../../service/Adminstrador/Usuarios';
import { responseformualrio } from '../../helpers';
const BaseInicialFormulario = { Curso: "", Paralelo: "" }
function llenadodeFormulario(state, action) {
  switch (action.type) {
    case 'onchange':
      return { ...state, [action.field]: action.value };
    case "reset":
      return BaseInicialFormulario;
    default:
      throw new Error();
  }
}
const BaseInicialQuien = { Nombre: undefined, Imagen: undefined }
function llenadodeQuien(state, action) {
  switch (action.type) {
    case 'onchange':
      return { ...state, [action.field]: action.value };
    case "reset":
      return BaseInicialQuien;
    default:
      throw new Error();
  }
}
export const OracionPagina = () => {
  const [{ Curso, Paralelo }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario)
  const [{ Nombre, Imagen }, disparodeAccionQuien] = useReducer(llenadodeQuien, BaseInicialQuien)
  const MySwal = withReactContent(Swal)
  const [tabs, setTabs] = useState("1")
  const [cards, setCards] = useState([])
  const [bloqueo, setBloqueo] = useState(true);
  const [bloqueoAgregar, setBloqueoAgregar] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingAgregar, setLoadingAgregar] = useState(false);
  const [modal, setModal] = useState(false)
  const [cursoData, setcursoData] = useState([]);
  const [paraleloData, setparaleloData] = useState([])
  const [dataSeleccionada, setDataSeleccionada] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [modalEdicion, setModalEdicion] = useState(false)
  const toggle = () => { setIsOpen(!isOpen) }
  const [showAll, setShowAll] = useState(true);
  const handleCheckboxChange = () => {
    setShowAll(!showAll);
  };
  const llamdainicial = async () => {
    const data = await MetodoGetDellamadaOracionActivas();
    setCards(data);
  }
  useEffect(() => {
    if (Curso !== "" && Paralelo !== "") {
      setBloqueo(false);
    }
  }, [Curso, Paralelo])

  const dataCurso = async () => {
    const data = await MostrarCurso();
    setcursoData(data);
  }
  const dataParalelo = async () => {
    const data = await MostrarParalelo();
    setparaleloData(data)
  }
  useEffect(() => {
    dataCurso();
    dataParalelo();
  }, [])
  useEffect(() => {
    if (Nombre !== undefined && Imagen !== undefined) {
      setBloqueoAgregar(false);
    }
  }, [Nombre, Imagen])

  useEffect(() => {
    llamdainicial();
  }, [])
  const toggledos = () => { setModal(!modal) }
  const Desabilitar = async (objecto) => {
    try {
      const data = await DesabilitarOracion({ _id: objecto._id });
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        showConfirmButton: data.titulo !== "Excelente",
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
      if (data.titulo === "Excelente") {
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
  const Habilitar = async (objecto) => {
    try {
      const data = await HabilitarOracion({ _id: objecto._id });
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        showConfirmButton: data.titulo !== "Excelente",
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
      if (data.titulo === "Excelente") {
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
  const toggleEdicion = () => { setModalEdicion(!modalEdicion) }
  const onsubmit = async () => {
    try {
      setBloqueo(true);
      setLoading(true);
      const data = await ActivarJuegoPorCursoParaleloOracion({ Curso: Curso, Paralelo: Paralelo })
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        showConfirmButton: data.titulo !== "Excelente",
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
      setBloqueo(true);
      setLoading(false);
      if (data.titulo === "Excelente") {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: responseformualrio.Creado.NoCreado,
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
      setBloqueo(false);
      setLoading(false);
    }
  }
  const onsubmitAgregarOpcion = async () => {
    try {
      setBloqueoAgregar(true);
      setLoadingAgregar(true);
      const fileVideoMuestra = await subidaQuienImagen(Imagen)
      const data = await CrearQuienImagen({ Nombre: Nombre, Imagen: fileVideoMuestra })
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        showConfirmButton: data.titulo !== "Excelente",
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
      setBloqueoAgregar(true);
      setLoadingAgregar(false);
      if (data.titulo === "Excelente") {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: responseformualrio.Creado.NoCreado,
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
      setBloqueoAgregar(false);
      setLoadingAgregar(false);
    }
  }

  const handleChange = ({ event, field }) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Verificar la extensión del archivo
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const fileNameParts = selectedFile.name.split('.');
      const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        console.log("entro validacion");

        // El archivo no tiene una extensión de imagen válida, puedes manejar el error aquí
        alert('Por favor, seleccione un archivo de imagen válido (jpg, jpeg, png, o gif).');
        event.target.value = ''; // Limpia el input para eliminar el archivo no válido
        return;
      }

      // Si llegamos aquí, el archivo es una imagen válida, puedes realizar la acción deseada
      // disparodeAccion({ type: "onchange", field: "FileBlanco", value: selectedFile });
      disparodeAccionQuien({ type: "onchange", field: field, value: selectedFile });
    }
  };

  return (
    <Container>
      <NavBar toggle={toggle} Seccion={"Oraciones"} />
      <AdmiMenu toggle={toggle} isOpen={isOpen} />
      <ModalAgregarOracion modal={modal} toggle={toggledos} />
      <ModalEditarOracion dataBase={dataSeleccionada} modal={modalEdicion} toggle={toggleEdicion} />
      <div className='fuenteDoce'>
        <div className='navegacion-interna-menu-administador'>
          <Nav tabs style={{ fontSize: 14 }} >
            <NavItem>
              <NavLink
                style={{ color: "#62259E" }}
                onClick={() => { setTabs("1") }}
              >
                Oraciones
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ color: "#62259E" }}
                onClick={() => { setTabs("2") }}
              >
                Habilitar Juego
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ color: "#62259E" }}
                onClick={() => { setTabs("3") }}
              >
                Opciones Quién
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </div>
      <TabContent activeTab={tabs} className="tabvs">
        <TabPane tabId="1" >
          <Row className='match-height mb-2'>
            <div className='my-3'>
              <h3 style={{ color: "#9696D3" }}> Tarjetas de Oraciones</h3>
            </div>
            <div className='rompecabeza-botones-superior'>
              <Button onClick={toggledos} className='px-4 mx-3' style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
                Agregar
              </Button>
              <div>
                <Input id="exampleCheck" name="check" type="checkbox" checked={showAll} onChange={handleCheckboxChange} />&nbsp;
                <Label check for="exampleCheck" style={{ color: '#8b8b8c', fontWeight: "700" }}> Mostar Todos</Label>
              </div>
            </div>
            {showAll ?
              cards.map(i => (
                <Col lg='4' md='6' className='my-2'>
                  <CardGroup>
                    <Card>
                      <CardImg top src={i.Que.value} alt={i.Oracion} />
                      <CardBody>
                        <CardTitle tag='h4'>{i.Oracion}</CardTitle>
                        <CardText>
                          <ul className='list-unstyled'>
                            <li><span className="fw-bolder" style={{ color: '#8cc5b0' }}>Categoría:</span> {i.Categoria}</li>
                            <li><span className="fw-bolder" style={{ color: '#8cc5b0' }}>Verbo:</span> {i.Verbo}</li>
                            <li><span className="fw-bolder" style={{ color: '#8cc5b0' }}>Estado:</span> {i.Estado}</li>
                          </ul>
                        </CardText>
                      </CardBody>
                      <CardFooter>
                        <Button style={{ color: '#592a98' }} outline onClick={() => i.Estado === "ACTIVO" ? Desabilitar(i) : Habilitar(i)} >
                          {i.Estado === "ACTIVO" ? <span>Desactivar</span> : <span>Activar</span>}
                        </Button>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        <Button style={{ background: '#5b2998', color: '#fff' }} outline onClick={() => { setDataSeleccionada(i); toggleEdicion(); }} >
                          Editar
                        </Button>
                      </CardFooter>
                    </Card>
                  </CardGroup>
                </Col>
              )) :
              cards.filter((item) => item.Estado === "ACTIVO").map(i => (
                <Col lg='4' md='6' className='my-2'>
                  <CardGroup>
                    <Card>
                      <CardImg top src={i.Que.value} alt={i.Oracion} />
                      <CardBody>
                        <CardTitle tag='h4'>{i.Oracion}</CardTitle>
                        <CardText>
                          <ul className='list-unstyled'>
                            <li><span className="fw-bolder" style={{ color: '#8cc5b0' }}>Categoría:</span> {i.Categoria}</li>
                            <li><span className="fw-bolder" style={{ color: '#8cc5b0' }}>Verbo:</span> {i.Verbo}</li>
                            <li><span className="fw-bolder" style={{ color: '#8cc5b0' }}>Estado:</span> {i.Estado}</li>
                          </ul>
                        </CardText>
                      </CardBody>
                      <CardFooter>
                        <Button style={{ color: '#592a98' }} outline onClick={() => i.Estado === "ACTIVO" ? Desabilitar(i) : Habilitar(i)} >
                          {i.Estado === "ACTIVO" ? <span>Desactivar</span> : <span>Activar</span>}
                        </Button>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        <Button style={{ background: '#5b2998', color: '#fff' }} outline onClick={() => { setDataSeleccionada(i); toggleEdicion(); }} >
                          Editar
                        </Button>
                      </CardFooter>
                    </Card>
                  </CardGroup>
                </Col>
              ))
            }
          </Row>
        </TabPane>
        <TabPane tabId="2" >
          <Row>
            <Col xl='12' lg="12" className='d-xl p-0 mt-2'>
              <h3 className='mt-3' style={{ color: "#9696D3" }}>Habilitar Juegos</h3>
              <Col md='6' sm='12' className='mb-1'>
                <div className='mb-3'>
                  <Label className='form-label' for='Curso'>
                    Curso
                  </Label>
                  <Select name="Curso" isSearchable={false} onChange={e => disparodeAccion({ type: "onchange", field: 'Curso', value: e.value })} options={cursoData.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Nombre, value: i.Nombre } })} />
                </div>
                <div className='mb-3'>
                  <Label className='form-label' for='Paralelo'>
                    Paralelo
                  </Label>
                  <Select name="Paralelo" isSearchable={false} onChange={e => disparodeAccion({ type: "onchange", field: 'Paralelo', value: e.value })} options={paraleloData.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Nombre, value: i.Nombre } })} />
                </div>
              </Col>
              <Button disabled={bloqueo} onClick={() => { onsubmit() }} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
                {loading && <Spinner size="sm">
                  Loading...
                </Spinner>}
                &nbsp;&nbsp; Agregar
              </Button>
            </Col>
            <ListadoJuegoActivosOracion />
          </Row>
        </TabPane>
        <TabPane tabId="3" >
          <Row>
            <h3 className='mt-3' style={{ color: "#9696D3" }}>Administrador de opciones para el Quién</h3>
            <Col xl='6' lg="6" className='d-xl p-0 mt-2'>
              <Col md='6' sm='12' className='mb-1'>
                <div className='mb-3'>
                  <Label className='form-label ' for='Nombre'>
                    Quién
                  </Label>
                  <Input type='text' maxLength={10} name='Nombre' id='Nombre' placeholder='Nombre' onChange={event => disparodeAccionQuien({ type: "onchange", field: "Nombre", value: event.target.value.toUpperCase() })} value={Nombre} />
                </div>
                <div className='mb-3'>
                  <Label className='form-label' for='Imagen'>
                    Imagen
                  </Label>
                  <Input type='file' id='Imagen' name='Imagen' onChange={e => handleChange({ event: e, field: "Imagen" })} />
                </div>
              </Col>
              <Button disabled={bloqueoAgregar} onClick={() => { onsubmitAgregarOpcion() }} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
                {loadingAgregar && <Spinner size="sm">
                  Loading...
                </Spinner>}
                &nbsp;&nbsp;Agregar
              </Button>
            </Col>
            <ListadoQuienAdministrador />
          </Row>
        </TabPane>
      </TabContent>
    </Container>
  )
}
