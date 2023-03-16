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
        <Col xl='9' lg="11" className='d-flex justify-content-end '>
          <Button onClick={toggledos} className='px-4 ' data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
            Agregar
          </Button>
          { /*aqui va  el modal*/}
          <ModalAgregarEstudiante modal={modal} toggle={toggledos} />
        </Col>
        <Col xl='9' lg="11" className='d-xl p-0 mt-2' >
          <Table striped>
            <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}><tr>
              <th>NOMBRE</th>
              <th>APELLIDO</th>
              <th>EMAIL</th>
              <th>TIPO DE USUARIO</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr></thead>
            <tbody>
              {Data.map(i => (
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