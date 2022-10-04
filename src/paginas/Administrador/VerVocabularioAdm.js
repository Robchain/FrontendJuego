import React,{useEffect,useState}from 'react'
import MenuAdmi from "../../componentes/MenuAdmi";

import { Table,Button, Container,Modal, ModalBody, ModalHeader,FormGroup,ModalFooter } from 'reactstrap';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
const VerVocabularioAdm = () => {
  const [Data, setData] = useState([])
  useEffect(() => {
    const mostrar = async ()=>{
      const data =await axios.get('http://localhost:3002/api/auth/VocabularioAdmi/mostrartodo');
      setData(data.data)
    }
    mostrar();
  }, [])
  
  
  return (
    <main>
        <MenuAdmi/>
        <Container>
        <NavLink to={'/Vocabulario'}> <Button color="primary" className="Listado">AGREGAR</Button></NavLink>
        <br/>
        <Table>
          <thead><tr>
          <th>Categoria</th>
          <th>Palabra</th>
          <th>Silaba</th>
          <th>Video Muestra/Respuesta</th>
          <th>Video Pregunta</th>
          <th>Archivo Imagen</th>
          <th>Estado</th>
          </tr></thead>
          <tbody>
            {Data.map(i=>(
              <tr>
                <td>{i.Categoria}</td>
                <td>{i.Palabra}</td>
                <td>{i.Silaba}</td>
                <td>{i.FileMuestra}</td>
                <td>{i.FilePregunta}</td>
                <td>{i.FileImagen}</td>
                <td>{i.Estado}</td>
                <td><Button color='primary'>Editar</Button>{"  "}<Button  color='danger'>Elimiar</Button></td>
            </tr>))}
          </tbody>
        </Table>
        </Container>
        </main>
  )
}

export default VerVocabularioAdm