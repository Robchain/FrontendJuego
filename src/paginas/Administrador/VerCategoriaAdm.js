import React, {useEffect,useState}  from 'react'
import MenuAdmi from "../../componentes/MenuAdmi";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader,ModalFooter,Container } from 'reactstrap';
const VerCategoriaAdm = () => {
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
    <main>
     <MenuAdmi/>
    <Container>
        <button onClick={modalInsertar} className="btn btn-success  ca">AGREGAR</button><br/>
        <br/>
        <table  className='table table-bordered'>
          <thead><tr>
          <th>Categorias</th>
          <th>Estado</th>
          </tr></thead>
          <tbody>
            {Data.map(i=>(
              <tr>
                <td>{i.NombreCategoria}</td>
                <td>{i.Estado}</td>
                <td><button className='btn btn-primary' onClick={''}>Editar</button>{"  "}<button className='btn btn-danger'>Elimiar</button></td>
            </tr>))}
          </tbody>
        </table>
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
        </Container>
       </main>
  )
}
export default VerCategoriaAdm