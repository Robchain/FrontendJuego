import React, {useEffect,useState}  from 'react'
import MenuAdmi from "../../componentes/MenuAdmi";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table, Button, Row, Col } from 'reactstrap';
import { NavBar } from '../../componentes/NavBar';
import { ModalAgregarCategorias } from '../../componentes/Administrador/ModalAgregarCategorias';
const VerCategoriaAdm = () => {
  const [modal, setModal] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [Data, setData] = useState([])
const toggle  = ()  =>  {setIsOpen(!isOpen)}

  useEffect(() => {
    const respuesta = async ()=>{
      const data = await axios.get('http://localhost:3002/api/auth/Categoria/mostrartodo');
      setData(data.data);
    }
    respuesta();
  }, [])
const toggledos = () => { setModal(!modal) }
  return (
    <Container>
    <NavBar toggle={toggle}/>
    <MenuAdmi toggle={toggle} isOpen={isOpen}/>
    <Row  className='justify-content-center fuenteDoce' >
    <Col className='d-flex justify-content-end '>
    <Button onClick={toggledos}  className='px-4' style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}}>
       Agregar
          </Button>
<ModalAgregarCategorias modal={modal} toggle={toggledos}/>
          </Col>
        <br/>
        <Col xl='9' lg="11" className='d-xl p-0 mt-2' >
        <Table  striped>
          <thead style={{backgroundColor:"#E6DFF0", color:"#62269E", textAlign:"initial"}}>
          <tr>
          <th>CATEGORIA</th>
          <th>ESTADO</th>
          <th>ACCIONES</th>
          </tr></thead>
          <tbody>
            {Data.map(i=>(
              <tr>
                <td>{i.NombreCategoria}</td>
                <td>{i.Estado}</td>
                <td><button className='btn btn-primary' onClick={''}>Editar</button>{"  "}<button className='btn btn-danger'>Elimiar</button></td>
            </tr>))}
          </tbody>
        </Table>
        </Col>
        </Row>
        </Container>
  )
}
export default VerCategoriaAdm