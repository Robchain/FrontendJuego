import React, { useEffect, useState } from 'react';
import {AdmiMenu} from "../../componentes/AdmiMenu";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table, Button, Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Nav, NavItem, NavLink, TabContent, TabPane, Input, Label } from 'reactstrap';
import { NavBar } from '../../componentes/NavBar';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { ModalAgregarCategorias } from '../../componentes/Administrador/ModalAgregarCategorias';
import {LuMoreVertical} from 'react-icons/lu'
import {AiOutlineCheck, AiOutlineEdit} from 'react-icons/ai'
import {BsTrash} from 'react-icons/bs'
import { desabilitarCategoriaOracion, desabilitarCategoriaVocabulario, habilitarCategoriaOracion, habilitarCategoriaVocabulario, llamadaDeLaApiCategoriaGet, llamadaGetApiCategoriaOracion } from '../../service/Adminstrador/Categoria';
import { ModalEditarCategoria } from '../../componentes/Administrador/ModalEditarCategoria';
import { responseformualrio } from '../../helpers';
const VerCategoriaAdm = () => {
  const MySwal = withReactContent(Swal)
  const [modal, setModal] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [Data, setData] = useState([])
  const [OracionData, setOracionData] = useState([])
  const [tabs, setTabs] = useState("1")
  const [showAll, setShowAll] = useState(true);
  const handleCheckboxChange = () => {
    setShowAll(!showAll);
  };

  const [dataSeleccionada, setDataSeleccionada] = useState({});
  const toggle = () => { setIsOpen(!isOpen) }
  const [JuegoAModificar, setJuegoAModificar] = useState("")
  const respuesta = async () => {
    const data = await llamadaDeLaApiCategoriaGet();
    setData(data);
  }
  const DataOracion = async () => {
    const data = await llamadaGetApiCategoriaOracion();
    setOracionData(data);
  }
  const activarCategoriaVocabulario = async (objeto) => {
    try {
      const data = await habilitarCategoriaVocabulario({ _id: objeto._id });
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
  const desactivarCategoriaVocabulario = async (objeto) => {
    try {
      const data = await desabilitarCategoriaVocabulario({ _id: objeto._id });
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
  const desactivarCategoriaOracion = async (objeto) => {
    try {
      const data = await desabilitarCategoriaOracion({ _id: objeto._id });
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
  const habilitarCategoriaOracions = async (objeto) => {
    try {
      const data = await habilitarCategoriaOracion({ _id: objeto._id });
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
  useEffect(() => {
    respuesta();
    DataOracion();
  }, [])
  const toggledos = () => { setModal(!modal) }
  const toggleEdtiar = () => { setModalEditar(!modalEditar) }
  return (
    <Container>
      <NavBar toggle={toggle} Seccion={"Categoría"} />
      <AdmiMenu toggle={toggle} isOpen={isOpen} />
      <ModalEditarCategoria data={dataSeleccionada} modal={modalEditar} toggle={toggleEdtiar} juego={JuegoAModificar} />
      <Row className='justify-content-center fuente fuenteDoce' >
        <Col xl='9' lg="11" className='d-flex justify-content-between '>
          <Nav tabs style={{ fontSize: 14 }} >
            <NavItem>
              <NavLink
                style={{ color: "#62259E" }}
                onClick={() => { setTabs("1") }}
              >
                Vocabularios
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ color: "#62259E" }}
                onClick={() => { setTabs("2") }}
              >
                Oraciones
              </NavLink>
            </NavItem>
          </Nav>
          <Button onClick={toggledos} className='px-4' style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
            Agregar
          </Button>
          <ModalAgregarCategorias modal={modal} toggle={toggledos} />
        </Col>
        <TabContent activeTab={tabs} className="tabvs">
          <TabPane tabId="1" >
            <Col xl='12' lg="11" className='d-xl p-0 mt-2' >
              <h3 style={{ color: "#9696D3" }}>Vocabulario</h3>
              <Col lg="12">
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
                  style={{ color: '#8b8b8c', fontWeight: "700" }}
                >
                  Mostar Todos
                </Label>
              </Col>
              <Table striped>
                <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                  <tr>
                    <th style={{ borderBottomColor: "#f8f8f8" }}>CATEGORÍA</th>
                    <th style={{ borderBottomColor: "#f8f8f8" }}>ESTADO</th>
                    <th style={{ borderBottomColor: "#f8f8f8" }}>ACCIONES</th>
                  </tr></thead>
                <tbody>
                  {showAll ? Data.map(i => (
                    <tr>
                      <td style={{ borderBottomColor: "#f8f8f8" }}>{i.NombreCategoria}</td>
                      <td style={{ borderBottomColor: "#f8f8f8" }}>{i.Estado}</td>
                      <td style={{ borderBottomColor: "#f8f8f8" }}>
                        <UncontrolledDropdown>
                          <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm'>
                            <LuMoreVertical size={15} />
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem href='#' onClick={e => { e.preventDefault(); setJuegoAModificar("VOCABULARIO"); setDataSeleccionada(i); toggleEdtiar(); }} >
                              <AiOutlineEdit className='me-50' size={15} /> <span className='align-middle'>Editar</span>
                            </DropdownItem>
                            <DropdownItem href='#' onClick={e => { e.preventDefault(); i.Estado === "ACTIVO" ? desactivarCategoriaVocabulario(i) : activarCategoriaVocabulario(i);  }} >
                            {i.Estado === "ACTIVO" ? <><BsTrash className='me-50' size={15} /><span className='align-middle'>Desactivar</span></> : <><AiOutlineCheck className='me-50' size={15} /><span className='align-middle'>Activar</span></>}
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>)) : Data.filter((item) => item.Estado === "ACTIVO").map(i => (
                      <tr>
                        <td style={{ borderBottomColor: "#f8f8f8" }}>{i.NombreCategoria}</td>
                        <td style={{ borderBottomColor: "#f8f8f8" }}>{i.Estado}</td>
                        <td style={{ borderBottomColor: "#f8f8f8" }}>
                          <UncontrolledDropdown>
                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm'>
                              <LuMoreVertical size={15} />
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem href='#' onClick={e => { e.preventDefault(); setJuegoAModificar("VOCABULARIO"); setDataSeleccionada(i); toggleEdtiar(); }} >
                                <AiOutlineEdit className='me-50' size={15} /> <span className='align-middle'>Editar</span>
                              </DropdownItem>
                              <DropdownItem href='#' onClick={e => { e.preventDefault(); i.Estado === "ACTIVO" ? desactivarCategoriaVocabulario(i) : activarCategoriaVocabulario(i); }} >
                              {i.Estado === "ACTIVO" ? <><BsTrash className='me-50' size={15} /><span className='align-middle'>Desactivar</span></> : <><AiOutlineCheck className='me-50' size={15} /><span className='align-middle'>Activar</span></>}
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>))}
                </tbody>
              </Table>
            </Col>
          </TabPane>
          <TabPane tabId="2" >
            <Col xl='12' lg="11" className='d-xl p-0 mt-2' >
              <h3 style={{ color: "#9696D3" }}>Oración</h3>
              <Col lg="12">
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
                  style={{ color: '#8b8b8c', fontWeight: "700" }}
                >
                  Mostar Todos
                </Label>
              </Col>
              <Table striped>
                <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
                  <tr>
                    <th style={{ borderBottomColor: "#f8f8f8" }}>CATEGORÍA</th>
                    <th style={{ borderBottomColor: "#f8f8f8" }}>ESTADO</th>
                    <th style={{ borderBottomColor: "#f8f8f8" }}>ACCIONES</th>
                  </tr></thead>
                <tbody>
                  {showAll ? OracionData.map(i => (<>
                    <tr>
                      <td style={{ borderBottomColor: "#f8f8f8" }}>{i.NombreCategoria}</td>
                      <td style={{ borderBottomColor: "#f8f8f8" }}>{i.Estado}</td>
                      <td style={{ borderBottomColor: "#f8f8f8" }}>
                        <UncontrolledDropdown>
                          <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm'>
                            <LuMoreVertical size={15} />
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem href='#' onClick={e => { e.preventDefault(); setJuegoAModificar("ORACION"); setDataSeleccionada(i); toggleEdtiar(); }}>
                              <AiOutlineEdit className='me-50' size={15} /> <span className='align-middle'>Editar</span>
                            </DropdownItem>
                            <DropdownItem href='#' onClick={e => { e.preventDefault(); i.Estado === "ACTIVO" ? desactivarCategoriaOracion(i) : habilitarCategoriaOracions(i); }}  >
                            {i.Estado === "ACTIVO" ? <><BsTrash className='me-50' size={15} /> <span className='align-middle'>Desactivar</span></> : <><AiOutlineCheck className='me-50' size={15} /><span className='align-middle'>Activar</span></>}
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr></>)) : OracionData.filter((item) => item.Estado === "ACTIVO").map(i => (<>
                      <tr>
                        <td style={{ borderBottomColor: "#f8f8f8" }}>{i.NombreCategoria}</td>
                        <td style={{ borderBottomColor: "#f8f8f8" }}>{i.Estado}</td>
                        <td style={{ borderBottomColor: "#f8f8f8" }}>
                          <UncontrolledDropdown>
                            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm'>
                              <LuMoreVertical size={15} />
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem href='#' onClick={e => { e.preventDefault(); setJuegoAModificar("ORACION"); setDataSeleccionada(i); toggleEdtiar(); }}>
                                <AiOutlineEdit className='me-50' size={15} /> <span className='align-middle'>Editar</span>
                              </DropdownItem>
                              <DropdownItem href='#' onClick={e => { e.preventDefault(); i.Estado === "ACTIVO" ? desactivarCategoriaOracion(i) : habilitarCategoriaOracions(i); }}  >
                                 {i.Estado === "ACTIVO" ? <><BsTrash className='me-50' size={15} /><span className='align-middle'>Desactivar</span></> : <><AiOutlineCheck className='me-50' size={15} /><span className='align-middle'>Activar</span></>}
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr></>))}
                </tbody>
              </Table>
            </Col>
          </TabPane>
        </TabContent>
      </Row>
    </Container>
  )
}
export default VerCategoriaAdm