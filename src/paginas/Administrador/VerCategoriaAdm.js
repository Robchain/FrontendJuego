import React, {useEffect,useState}  from 'react';
import MenuAdmi from "../../componentes/MenuAdmi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table, Button, Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { NavBar } from '../../componentes/NavBar';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { ModalAgregarCategorias } from '../../componentes/Administrador/ModalAgregarCategorias';
import { Edit, MoreVertical, Trash } from 'react-feather';
import { DeleteApiCategoria, DeleteApiCategoriaOracion, llamadaDeLaApiCategoriaGet, llamadaGetApiCategoriaOracion } from '../../service/Adminstrador/Categoria';
import { ModalEditarCategoria } from '../../componentes/Administrador/ModalEditarCategoria';
const VerCategoriaAdm = () => {
  const MySwal = withReactContent(Swal)
  const [modal, setModal] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [Data, setData] = useState([])
  const [OracionData, setOracionData] = useState([])
  const [tabs, setTabs] = useState("1")
  const [dataSeleccionada, setDataSeleccionada] = useState({});
const toggle  = ()  =>  {setIsOpen(!isOpen)}
const [JuegoAModificar, setJuegoAModificar] = useState("")
const respuesta = async ()=>{
  const data = await llamadaDeLaApiCategoriaGet();
  setData(data);
}
const DataOracion = async ()=>{
  const data = await llamadaGetApiCategoriaOracion();
  setOracionData(data);
}
const ondeleteVocabulario = async (objeto)=>{
  try {
    const data = await DeleteApiCategoria({_id:objeto._id});   
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
const ondeleteOracion = async (objeto)=>{
  try {
    const data = await DeleteApiCategoriaOracion({_id:objeto._id});   
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
  useEffect(() => {
    respuesta();
    DataOracion();
  }, [])
const toggledos = () => { setModal(!modal) }
const toggleEdtiar = () => {setModalEditar(!modalEditar)}
  return (
    <Container>
    <NavBar toggle={toggle} Seccion={"Categoria"} />
    <MenuAdmi toggle={toggle} isOpen={isOpen}/>
    <ModalEditarCategoria data={dataSeleccionada}  modal={modalEditar} toggle={toggleEdtiar} juego={JuegoAModificar}/>
    <Row  className='justify-content-center fuente fuenteDoce' >
    <Col xl='9' lg="11"   className='d-flex justify-content-between '>
    <Nav tabs style={{fontSize:14}} >
    <NavItem>
      <NavLink
        style={{color:"#62259E"}}
        onClick={()=>{setTabs("1")}}
      >
      Vocabularios
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        style={{color:"#62259E"}}
        onClick={()=>{setTabs("2")}}
      >
        Oraciones
      </NavLink>
    </NavItem>
  </Nav>
    <Button onClick={toggledos}  className='px-4' style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}}>
       Agregar
          </Button>
        <ModalAgregarCategorias modal={modal} toggle={toggledos}/>
          </Col>
          <TabContent activeTab={tabs} className="tabvs">
          <TabPane tabId="1" >
        <Col xl='12' lg="11" className='d-xl p-0 mt-2' >
        <h3 style={{color:"#9696D3"}}>Vocabulario</h3>
        <Table  striped>
          <thead style={{backgroundColor:"#E6DFF0", color:"#62269E", textAlign:"initial"}}>
          <tr>
          <th style={{borderBottomColor:"#f8f8f8"}}>CATEGORIA</th>
          <th style={{borderBottomColor:"#f8f8f8"}}>ESTADO</th>
          <th style={{borderBottomColor:"#f8f8f8"}}>ACCIONES</th>
          </tr></thead>
          <tbody>
            {Data.map(i=>(
              <tr>
                <td style={{borderBottomColor:"#f8f8f8"}}>{i.NombreCategoria}</td>
                <td style={{borderBottomColor:"#f8f8f8"}}>{i.Estado}</td>
                <td style={{borderBottomColor:"#f8f8f8"}}>
                <UncontrolledDropdown>
                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm'>
                        <MoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href='#' onClick={e=>{e.preventDefault(); setJuegoAModificar("VOCABULARIO");  setDataSeleccionada(i);toggleEdtiar(); }  } >
                          <Edit className='me-50' size={15} /> <span className='align-middle'>Editar</span>
                        </DropdownItem>
                        <DropdownItem href='#' onClick={e=>{e.preventDefault(); ondeleteVocabulario(i);}  } >
                          <Trash className='me-50' size={15} /> <span className='align-middle'>Borrar</span>
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
        <h3 style={{color:"#9696D3"}}>Oracion</h3>
        <Table  striped>
          <thead style={{backgroundColor:"#E6DFF0", color:"#62269E", textAlign:"initial"}}>
          <tr>
          <th style={{borderBottomColor:"#f8f8f8"}}>CATEGORIA</th>
          <th style={{borderBottomColor:"#f8f8f8"}}>ESTADO</th>
          <th style={{borderBottomColor:"#f8f8f8"}}>ACCIONES</th>
          </tr></thead>
          <tbody>
            {OracionData.map(i=>(<>
              <tr>
                <td style={{borderBottomColor:"#f8f8f8"}}>{i.NombreCategoria}</td>
                <td style={{borderBottomColor:"#f8f8f8"}}>{i.Estado}</td>
                <td style={{borderBottomColor:"#f8f8f8"}}>
                <UncontrolledDropdown>
                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm'>
                        <MoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href='#' onClick={e=>{e.preventDefault(); setJuegoAModificar("ORACION"); setDataSeleccionada(i); toggleEdtiar(); }}>
                          <Edit className='me-50' size={15} /> <span className='align-middle'>Editar</span>
                        </DropdownItem>
                        <DropdownItem href='#' onClick={e=>{e.preventDefault(); ondeleteOracion(i);  }}  >
                          <Trash className='me-50' size={15} /> <span className='align-middle'>Borrar</span>
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