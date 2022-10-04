import React,{useEffect,useState}from 'react'
import MenuAdmi from "../../componentes/MenuAdmi";

import { Table,Button, Container,Modal, ModalBody, ModalHeader,FormGroup,ModalFooter } from 'reactstrap';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const VerRompecabezaAdm = () => {
  const [Data, setData] = useState([])

  useEffect(() => {
    const mostrar=  async()=>{
      const data=await  axios.get('http://localhost:3002/api/auth/rompecabezaAdmi/mostrartodo');
      setData(data.data);
    }
    mostrar()
  }, [])
 
  return (
    <main>
    <MenuAdmi/>
    <Container>
    <NavLink to={'/Rompecabeza'}> <Button color="primary" className="Listado">AGREGAR</Button></NavLink>
        <br/>
        <Table>
          <thead><tr>
          <th>Nombre</th>
          <th>Archivo Blanco/Negro</th>
          <th>Archivo Color</th>
          <th>Estado</th>
          </tr></thead>
          <tbody>
            {Data.map(i=>(
              <tr>
                <td>{i.Nombre}</td>
                <td>{i.FileBlanco}</td>
                <td>{i.FileColor}</td>
                <td>{i.Estado}</td>
                <td><Button color='primary'>Editar</Button>{"  "}<Button  color='danger'  /*onClick={Eliminar}*/>Elimiar</Button></td>
            </tr>))}
          </tbody>
        </Table>
        </Container>
    </main>
  )
}

export default VerRompecabezaAdm