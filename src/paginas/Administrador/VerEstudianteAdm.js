import React, { useEffect, useState } from 'react'
import { NavBar } from '../../componentes/NavBar';
import { Edit, Trash, MoreVertical, Clipboard } from 'react-feather'
import { Table, Button, Container, Col, Row, DropdownItem, DropdownMenu, UncontrolledDropdown, DropdownToggle } from 'reactstrap';
import axios from 'axios';
import MenuAdmi from '../../componentes/MenuAdmi';
import { ModalAgregarEstudiante } from '../../componentes/Administrador/ModalAgregarEstudiante';
const VerEstudianteAdm = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [modal, setModal] = useState(false)
  const [Data, setData] = useState([]);
  useEffect(() => {
    const mostrar = async () => {
      const data = await axios.get('http://localhost:3002/api/auth/Ver-Registrados-Activos');
      setData(data.data);
    }
    mostrar();
  }, [])
  const toggle = () => { setIsOpen(!isOpen) }
  const toggledos = () => { setModal(!modal) }
  return (
    <Container >
      <NavBar toggle={toggle} Seccion={"Estudiantes"} />
      <MenuAdmi toggle={toggle} isOpen={isOpen} />
      <Row className='justify-content-center fuente fuenteDoce' >
        <Col xl='11' lg="12" className='d-flex justify-content-end '>
          <Button onClick={toggledos} className='px-4 ' data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
            Agregar
          </Button>
          { /*aqui va  el modal*/}
          <ModalAgregarEstudiante modal={modal} toggle={toggledos} />
        </Col>
        <Col xl='12' lg="12" className='d-xl p-0 mt-2'>
          <Table striped >
            <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}><tr>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>NOMBRE</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>APELLIDO</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>EMAIL</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>TIPO DE USUARIO</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>ESTADO</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>ACCIONES</th>
            </tr></thead>
            <tbody>
              {Data.map(i => (
                <tr key={i._id}>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Nombre}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Apellido}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Email}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.TipoUsuario}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Estado}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>
                    <UncontrolledDropdown>
                      <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' >
                        <MoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href='/' /*onClick={e =>  abrirDetalle(i, e)}*/>
                          <Clipboard className='me-50' size={15} /> <span className='align-middle'>Detalle</span>
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