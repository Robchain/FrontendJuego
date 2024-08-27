import React, { useEffect, useState } from 'react'
import { NavBar } from '../../componentes/NavBar';
import {LuMoreVertical} from 'react-icons/lu'
import {AiOutlineCheck, AiOutlineEdit} from 'react-icons/ai'
import {BsTrash, BsClipboard} from 'react-icons/bs'
import { Table, Button, Container, Col, Row, DropdownItem, DropdownMenu, UncontrolledDropdown, DropdownToggle, Input, Label, NavLink, NavItem, Nav, TabContent, TabPane } from 'reactstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import {AdmiMenu} from "../../componentes/AdmiMenu";
import { ModalAgregarEstudiante } from '../../componentes/Administrador/ModalAgregarEstudiante';
import { MostrarEstudiante, desabilitarPersonasApi, habilitarPersonasApi, listadoProfesores } from '../../service/Adminstrador/Usuarios';
import { ModalEditarEstudiante } from '../../componentes/Administrador/ModalEditarEstudiante';
import { ModalDetalleUsuario } from '../../componentes/Administrador/ModalDetalleUsuario';
import { ModalActualizarContra } from '../../componentes/Administrador/ModalActualizarContra';
import { AdministradorOpcionesEstudiante } from '../../componentes/Administrador/AdministradorOpcionesEstudiante';
import { responseformualrio } from '../../helpers';
const VerEstudianteAdm = () => {
  const [modalDetalle, setModalDetalle] = useState(false);
  const MySwal = withReactContent(Swal)
  const [tabs, setTabs] = useState("1")
  const [isOpen, setIsOpen] = useState(false)
  const [modaleditar, setModaleditar] = useState(false);
  const [modalContra, setModalContra] = useState(false);
  const [dataseleccionada, setDataseleccionada] = useState({})
  const [modal, setModal] = useState(false)
  const [Data, setData] = useState([]);
  const [dataMaestro, setDataMaestro] = useState([])
  const [showAll, setShowAll] = useState(true);
  const toggleDetalle = ()=>{setModalDetalle(!modalDetalle);}
  const toggleditar =()=>{
    setModaleditar(!modaleditar);
  }
  const handleCheckboxChange = () => {
       setShowAll(!showAll);
     };
     const mostrar = async () => {
      const data = await MostrarEstudiante();
      setData(data);
    }
    const mostrardos = async ()=>{
      const data = await listadoProfesores();
      setDataMaestro(data);
    }
  useEffect(() => {
    mostrar();
    mostrardos();
  }, [])
  const toggle = () => { setIsOpen(!isOpen) }
  const toggledos = () => { setModal(!modal) }
  const toggleContra =()=>setModalContra(!modalContra);
  
  
  
  const desactivarPersonaFunc = async (objeto) => {
    try {
      const data = await desabilitarPersonasApi({ _id: objeto._id });
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
  const habilitarPersonaFunc = async (objeto) => {
    try {
      const data = await habilitarPersonasApi({ _id: objeto._id });
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
      <NavBar toggle={toggle} Seccion={"Usuario y Grado"} />
      <AdmiMenu toggle={toggle} isOpen={isOpen} />
      <ModalEditarEstudiante modal={modaleditar}  toggle={toggleditar}  dataBase={dataseleccionada}/>
          <ModalAgregarEstudiante modal={modal} toggle={toggledos}/>
          <ModalDetalleUsuario dataBase={dataseleccionada} modal={modalDetalle} toggle={toggleDetalle} />
          <ModalActualizarContra database={dataseleccionada} modal={modalContra} toggle={toggleContra}/>
      <div className='fuenteDoce' >
        <div className='navegacion-interna-menu-administador'>
        <Nav tabs style={{ fontSize: 14 }} >
            <NavItem>
              <NavLink
                style={{ color: "#62259E" }}
                onClick={() => { setTabs("1") }}
              >
                Estudiantes
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ color: "#62259E" }}
                onClick={() => { setTabs("2") }}
              >
                Profesores
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ color: "#62259E" }}
                onClick={() => { setTabs("3") }}
              >
                Grado y paralelo
              </NavLink>
            </NavItem>
          </Nav>

        </div>
        <TabContent activeTab={tabs} className="tabvs">
        <TabPane tabId="1" >
        <Button onClick={toggledos} className='px-4 mt-3'  style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
            Agregar
          </Button>
        <Col xl='12' lg="12" className='d-xl p-0 mt-2'>
        <h3 style={{ color: "#9696D3" }}>Estudiantes</h3>
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
                         style={{color:'#8b8b8c',fontWeight:"700"}}
                     >
                         Mostar Todos
                     </Label>
 </Col>
          <Table striped >
            <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}><tr>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>NOMBRE</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>APELLIDO</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>EMAIL</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>GRADO</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>PARALELO</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>ESTADO</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>ACCIONES</th>
            </tr></thead>
            <tbody>
              { showAll ? Data.map(i => (
                <tr key={i._id}>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Nombre}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Apellido}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Email}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Curso}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Paralelo}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Estado}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>
                    <UncontrolledDropdown>
                      <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' >
                        <LuMoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href='#' onClick={e => {e.preventDefault(); setDataseleccionada(i); toggleDetalle();}} >
                          <BsClipboard className='me-50' size={15} /> <span className='align-middle'>Detalle</span>
                        </DropdownItem>
                        <DropdownItem href='#' onClick={e => {e.preventDefault(); setDataseleccionada(i); toggleditar()} }>
                          <AiOutlineEdit className='me-50' size={15} /> <span className='align-middle'>Editar</span>
                        </DropdownItem>
                        <DropdownItem href='#' onClick={e => { e.preventDefault(); i.Estado === "ACTIVO" ? desactivarPersonaFunc(i) : habilitarPersonaFunc(i); }}>
                        {i.Estado === "ACTIVO" ? <><BsTrash className='me-50' size={15} /><span className='align-middle'>Desactivar</span></> : <><AiOutlineCheck className='me-50' size={15} /><span className='align-middle'>Activar</span></>}
                        </DropdownItem>
                        <DropdownItem href='#' onClick={e => {e.preventDefault(); setDataseleccionada(i); toggleContra()} }>
                          <AiOutlineEdit className='me-50' size={15} /> <span className='align-middle'>Editar Contraseña</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>)) : Data.filter((item) => item.Estado === "ACTIVO").map(i => (
                <tr key={i._id}>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Nombre}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Apellido}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Email}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Curso}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Paralelo}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Estado}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>
                    <UncontrolledDropdown>
                      <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' >
                        <LuMoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href='#' /*onClick={e =>  abrirDetalle(i, e)}*/>
                          <BsClipboard className='me-50' size={15} /> <span className='align-middle'>Detalle</span>
                        </DropdownItem>
                        <DropdownItem href='#' onClick={e => {e.preventDefault(); setDataseleccionada(i); toggleditar()}}>
                          <AiOutlineEdit className='me-50' size={15} /> <span className='align-middle'>Editar</span>
                        </DropdownItem>
                        <DropdownItem href='#'onClick={e => { e.preventDefault(); i.Estado === "ACTIVO" ? desactivarPersonaFunc(i) : habilitarPersonaFunc(i); }}  >
                        {i.Estado === "ACTIVO" ? <><BsTrash className='me-50' size={15} /><span className='align-middle'>Desactivar</span></> : <><AiOutlineCheck className='me-50' size={15} /><span className='align-middle'>Activar</span></>}
                        </DropdownItem>
                        <DropdownItem href='#' onClick={e => {e.preventDefault(); setDataseleccionada(i); toggleContra()} }>
                          <AiOutlineEdit className='me-50' size={15} /> <span className='align-middle'>Editar Contraseña</span>
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
        <Button onClick={toggledos} className='px-4 mt-3'  style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
            Agregar
          </Button>
        <Col xl='12' lg="12" className='d-xl p-0 mt-2'>
        <h3 style={{ color: "#9696D3" }}>Profesores</h3>
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
                         style={{color:'#8b8b8c',fontWeight:"700"}}
                     >
                         Mostar Todos
                     </Label>
 </Col>
          <Table striped >
            <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}><tr>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>NOMBRE</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>APELLIDO</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>EMAIL</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>ESTADO</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>ACCIONES</th>
            </tr></thead>
            <tbody>
              { showAll ? dataMaestro.map(i => (
                <tr key={i._id}>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Nombre}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Apellido}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Email}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Estado}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>
                    <UncontrolledDropdown>
                      <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' >
                        <LuMoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href='#' onClick={e => {e.preventDefault(); setDataseleccionada(i); toggleDetalle();}} >
                          <BsClipboard className='me-50' size={15} /> <span className='align-middle'>Detalle</span>
                        </DropdownItem>
                        <DropdownItem href='#' onClick={e => {e.preventDefault(); setDataseleccionada(i); toggleditar()} }>
                          <AiOutlineEdit className='me-50' size={15} /> <span className='align-middle'>Editar</span>
                        </DropdownItem>
                        <DropdownItem href='#' onClick={e => { e.preventDefault(); i.Estado === "ACTIVO" ? desactivarPersonaFunc(i) : habilitarPersonaFunc(i); }}>
                        {i.Estado === "ACTIVO" ? <><BsTrash className='me-50' size={15} /><span className='align-middle'>Desactivar</span></> : <><AiOutlineCheck className='me-50' size={15} /><span className='align-middle'>Activar</span></>}
                        </DropdownItem>
                        <DropdownItem href='#' onClick={e => {e.preventDefault(); setDataseleccionada(i); toggleContra()} }>
                          <AiOutlineEdit className='me-50' size={15} /> <span className='align-middle'>Editar Contraseña</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>)) : dataMaestro.filter((item) => item.Estado === "ACTIVO").map(i => (
                <tr key={i._id}>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Nombre}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Apellido}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Email}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Estado}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>
                    <UncontrolledDropdown>
                      <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' >
                        <LuMoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href='#' /*onClick={e =>  abrirDetalle(i, e)}*/>
                          <BsClipboard className='me-50' size={15} /> <span className='align-middle'>Detalle</span>
                        </DropdownItem>
                        <DropdownItem href='#' onClick={e => {e.preventDefault(); setDataseleccionada(i); toggleditar()}}>
                          <AiOutlineEdit className='me-50' size={15} /> <span className='align-middle'>Editar</span>
                        </DropdownItem>
                        <DropdownItem href='#'onClick={e => { e.preventDefault(); i.Estado === "ACTIVO" ? desactivarPersonaFunc(i) : habilitarPersonaFunc(i); }}  >
                        {i.Estado === "ACTIVO" ? <><BsTrash className='me-50' size={15} /><span className='align-middle'>Desactivar</span></> : <><AiOutlineCheck className='me-50' size={15} /><span className='align-middle'>Activar</span></>}
                        </DropdownItem>
                        <DropdownItem href='#' onClick={e => {e.preventDefault(); setDataseleccionada(i); toggleContra()} }>
                          <AiOutlineEdit className='me-50' size={15} /> <span className='align-middle'>Editar Contraseña</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>))}
            </tbody>
          </Table>
        </Col>
        </TabPane>
        <TabPane tabId="3" >
<AdministradorOpcionesEstudiante/>
        </TabPane>
        </TabContent>
      </div>
    </Container>
  )
}
export default VerEstudianteAdm