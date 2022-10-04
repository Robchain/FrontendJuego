import React,{useEffect,useState}from 'react'
import MenuAdmi from "../../componentes/MenuAdmi";

import { Table,Button, Container,Modal, ModalBody, ModalHeader,FormGroup,ModalFooter } from 'reactstrap';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
const VerOracionAdm = () => {
  const [Data, setData] = useState([]);
  useEffect(() => {
    const mostrar = async ()=>{
      const data  = await axios.get('http://localhost:3002/api/auth/OracionAdmi/mostrartodo');
      setData(data.data);
    }
    mostrar();
  }, [])
  
  return (
    <main>
        <MenuAdmi/>
        <Container>
        <NavLink to={'/Oracion'}> <Button color="primary" className="Listado">AGREGAR</Button></NavLink>
        <br/>
        <Table>
          <thead><tr>
          <th>Categorias</th>
          <th>Oracion</th>
          <th>Verbo</th>
          <th>Imagen Sujeto</th>
          <th>Imagen Adjetivo</th>
          <th>Video Pregunta Que</th>
          <th>Video Pregunta Quien</th>
          <th>Video Pregunta Compleja</th>
          <th>Video Respuesta/Muestra</th>
          <th>Estado</th>
          </tr></thead>
          <tbody>
            {Data.map(i=>(
              <tr>
                <td>{i.Categoria}</td>
                <td>{i.Oracion}</td>
                <td>{i.Verbo}</td>
                <td>{i.FileSujetoImagen}</td>
                <td>{i.FileAdjetivoImagen}</td>
                <td>{i.FileVideoPreguntaQue}</td>
                <td>{i.FileVideoPreguntaQuien}</td>
                <td>{i.FileVideoPreguntaCompleja}</td>
                <td>{i.FileVideoMuestra}</td>
                <td>{i.Estado}</td>
                <td><Button color='primary'>Editar</Button>{"  "}<Button  color='danger'>Elimiar</Button></td>
            </tr>))}
          </tbody>
        </Table>
        </Container>
        </main>
  )
}

export default VerOracionAdm