import React,{useEffect,useState}from 'react'
import MenuAdmi from "../../componentes/MenuAdmi";
import { NavBar } from '../../componentes/NavBar';
import { Edit, Trash, MoreVertical, Clipboard} from 'react-feather'
import { Table,Button, Container,Modal, ModalBody, ModalHeader,FormGroup,ModalFooter, Col, Row, DropdownItem, DropdownMenu,  UncontrolledDropdown, DropdownToggle } from 'reactstrap';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
const VerEstudianteAdm = () => {
  const [Data, setData] = useState([]);
  useEffect(() => {
   const mostrar= async ()=>{
    const data = await axios.get('http://localhost:3002/api/auth/verRegistrados');
    setData(data.data);
   }
    mostrar();
  }, [])

  return (
    <Container  fluid>
    <Row  className='justify-content-center'>
    <Col  xl='2' lg="2" className='d-none d-xl-flex p-0'>
        <MenuAdmi/>
        </Col>
        <Col xl='10' lg="10" className='' >
<NavBar/>
        </Col>
        <Col  xl='10' lg="10">
        <Col  className='p-10'>
        <NavLink to={'/Administrador'}> <Button color="primary" className="Listado">AGREGAR</Button></NavLink>
        </Col>
        <br/>
        <Table  striped>
          <thead><tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Tipo de Usuario</th>
          <th>Estado</th>
          </tr></thead>
          <tbody>
            {Data.map(i=>(
              <tr key={i._id}>
              <td>{i.Nombre}</td>
                <td>{i.Apellido}</td>
                <td>{i.Email}</td>
                <td>{i.TipoUsuario}</td>
                <td>{i.Estado}</td>
                <td>
                <UncontrolledDropdown>
              <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu>
              <DropdownItem href='/' /*onClick={e =>  abrirDetalle(i, e)}*/>
                  <Clipboard  className='me-50' size={15}/> <span className='align-middle'>Detalle</span>
                </DropdownItem>
                <DropdownItem href='/'/* onClick={e => Editar(i, e)}*/>
                  <Edit className='me-50' size={15} /> <span className='align-middle'>Editar</span>
                </DropdownItem>
                <DropdownItem href='/' /*onClick={e =>  Eliminar(i.Identificacion, e)}*/>
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
export default VerEstudianteAdm