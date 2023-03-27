import React, {useEffect,useState}  from 'react'
import MenuAdmi from "../../componentes/MenuAdmi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table, Button, Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavBar } from '../../componentes/NavBar';
import { ModalAgregarCategorias } from '../../componentes/Administrador/ModalAgregarCategorias';
import { Edit, MoreVertical, Trash } from 'react-feather';
import { llamadaDeLaApiCategoriaGet } from '../../service/Adminstrador/Categoria';
const VerCategoriaAdm = () => {
  const [modal, setModal] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [Data, setData] = useState([])
const toggle  = ()  =>  {setIsOpen(!isOpen)}
const respuesta = async ()=>{
  const data = await llamadaDeLaApiCategoriaGet();
  setData(data);
}
  useEffect(() => {
    respuesta();
  }, [])
const toggledos = () => { setModal(!modal) }
  return (
    <Container>
    <NavBar toggle={toggle} Seccion={"Categoria"} />
    <MenuAdmi toggle={toggle} isOpen={isOpen}/>
    <Row  className='justify-content-center fuente fuenteDoce' >
    <Col xl='9' lg="11"   className='d-flex justify-content-end '>
    <Button onClick={toggledos}  className='px-4' style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}}>
       Agregar
          </Button>
<ModalAgregarCategorias modal={modal} toggle={toggledos}/>
          </Col>
        <Col xl='12' lg="11" className='d-xl p-0 mt-2' >
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
                        <DropdownItem href='#'/* onClick={e => Editar(i, e)}*/>
                          <Edit className='me-50' size={15} /> <span className='align-middle'>Editar</span>
                        </DropdownItem>
                        <DropdownItem href='#' /*onClick={e =>  Eliminar(i.Identificacion, e)}*/>
                          <Trash className='me-50' size={15} /> <span className='align-middle'>Borrar</span>
                        </DropdownItem>
                      </DropdownMenu>
                </UncontrolledDropdown>
                </td>
            </tr>))}
          </tbody>
        </Table>
        </Col>
        </Row>
        </Container>
  )
}
export default VerCategoriaAdm