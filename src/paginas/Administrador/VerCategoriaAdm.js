import React, {useEffect,useState}  from 'react'
import MenuAdmi from "../../componentes/MenuAdmi";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader,ModalFooter,Container, Table, Button, Row, Col } from 'reactstrap';
import { NavBar } from '../../componentes/NavBar';
const VerCategoriaAdm = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [Data, setData] = useState([])
  const [Modales, setModales] = useState({
    modalInsertar:false,
    modalEliminar:false,
    tipoModal:""
  })
  const [FormValue, setFormValue] = useState({
    NombreCategoria:'',
    Estado:'Activo'
})
const toggle  = ()  =>  {setIsOpen(!isOpen)}
const handlechange  =   (event)  =>{
    const {name, value}=event.target;
setFormValue({...FormValue,[name]:value})   
}
const handlesubmit =    e=>{
    e.preventDefault();
    //metodos post y get
    const postCategoria    =   async ()    =>{
        try {
            const response  = await axios({
                url:"http://localhost:3002/api/auth/Categoria",
                method:'POST',
                data:FormValue
            })
        } catch (e) {
            console.log(e);
        }
    }
    postCategoria();
    setFormValue({NombreCategoria:''})
    modalInsertar();
}
  useEffect(() => {
    const respuesta = async ()=>{
      const data = await axios.get('http://localhost:3002/api/auth/Categoria/mostrartodo');
      setData(data.data);
    }
    respuesta();
  }, [])
const  modalInsertar=()=>{
  setModales({modalInsertar:!Modales.modalInsertar})
}
  return (
    <Container>
    <NavBar toggle={toggle}/>
    <MenuAdmi toggle={toggle} isOpen={isOpen}/>
    <Row  className='justify-content-center fuenteDoce' >
    <Col xl='9' lg="11" className='d-xl p-0'>
    <Col className='d-flex justify-content-end '>
    <Button  className='px-4' style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}}>
       Agregar
          </Button>
          </Col>
        <br/>
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
        <Modal  isOpen={Modales.modalInsertar}>
        <ModalHeader  style={{display:'block'}}>
            <span style={{float:'right'}}>x</span>
        </ModalHeader>
        <ModalBody>
        <div  className='form-group'>
        <h1>Categoria</h1>
        <label>CATEGORIA</label>
        <input
            name='NombreCategoria'
            value={FormValue.NombreCategoria}
            onChange={handlechange}
        ></input><br/><br/>
        <label>ESTADO</label><br/>
        <label> <input  
            type='radio'
            name="Estado"
            value="Activo"
            checked={FormValue.Estado==="Activo"}
            onChange={handlechange}
        />Activo</label> <br/>
        <label>
        <input  
            type='radio'
            name="Estado"
            value="Inactivo"
            checked={FormValue.Estado==="Inactivo"}
            onChange={handlechange}
        />Inactivo
        </label>
        </div>
    </ModalBody>
    <ModalFooter>
    { Modales.tipoModal=="Actualizar"?
    <button className='btn btn-success'>Actualizar</button>:
    <button className='btn btn-primary' onClick={handlesubmit}>Insertar</button>
  }
    <button  className='btn btn-danger' onClick={modalInsertar}>Cancelar</button>
    </ModalFooter>
        </Modal>
        <Modal  isOpen={Modales.modalEliminar}>
        <ModalBody>
          Seguro de eliminar el dato{FormValue  &&  FormValue.NombreCategoria}
          </ModalBody>
          <ModalBody>
          <button  className='btn btn-danger' >SI</button>
          <button  className='btn btn-secundary' >NO</button>
          </ModalBody>
        </Modal>
        </Row>
        </Container>
  )
}
export default VerCategoriaAdm