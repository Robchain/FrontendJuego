import React, { useEffect, useState } from 'react'
import { NavBar } from '../../componentes/NavBar';
import { Edit, Trash, MoreVertical, Clipboard,Check } from 'react-feather'
import { Table, Button, Container, Col, Row, DropdownItem, DropdownMenu, UncontrolledDropdown, DropdownToggle, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import MenuAdmi from '../../componentes/MenuAdmi';
import { ModalAgregarEstudiante } from '../../componentes/Administrador/ModalAgregarEstudiante';
import { MostrarEstudiante, desabilitarPersonasApi, habilitarPersonasApi } from '../../service/Adminstrador/Usuarios';
const VerEstudianteAdm = () => {
  const MySwal = withReactContent(Swal)
  const [isOpen, setIsOpen] = useState(false)
  const [modal, setModal] = useState(false)
  const [Data, setData] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const handleCheckboxChange = () => {
       setShowAll(!showAll);
     };
     const mostrar = async () => {
      const data = await MostrarEstudiante();
      setData(data);
    }
  useEffect(() => {
   
    mostrar();
  }, [])
  const toggle = () => { setIsOpen(!isOpen) }
  const toggledos = () => { setModal(!modal) }
  
  
  
  const desactivarPersonaFunc = async (objeto) => {
    try {
      const data = await desabilitarPersonasApi({ _id: objeto._id });
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: "Falto un campo",
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
    }
  }
  const habilitarPersonaFunc = async (objeto) => {
    try {
      const data = await habilitarPersonasApi({ _id: objeto._id });
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: "Falto un campo",
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
    }
  }


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
        <Col lg="12">
                     <Input
                         id="exampleCheck"
                         name="check"
                         type="checkbox"
                         checked={showAll}
                        onChange={handleCheckboxChange}
                     />{" "}
                     <Label
                         check
                         for="exampleCheck"
                         style={{color:'#8b8b8c',fontWeight:"700"}}
                     >
                         Mostar Todos
                     </Label>
 </Col>
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
              { showAll ? Data.map(i => (
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
                        <DropdownItem href='/' onClick={e => { e.preventDefault(); i.Estado === "ACTIVO" ? desactivarPersonaFunc(i) : habilitarPersonaFunc(i); }}>
                        {i.Estado === "ACTIVO" ? <><Trash className='me-50' size={15} /><span className='align-middle'>Desactivar</span></> : <><Check className='me-50' size={15} /><span className='align-middle'>Activar</span></>}
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>)) : Data.filter((item) => item.Estado === "ACTIVO").map(i => (
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
                        <DropdownItem href='#' /*onClick={e =>  abrirDetalle(i, e)}*/>
                          <Clipboard className='me-50' size={15} /> <span className='align-middle'>Detalle</span>
                        </DropdownItem>
                        <DropdownItem href='#'/* onClick={e => Editar(i, e)}*/>
                          <Edit className='me-50' size={15} /> <span className='align-middle'>Editar</span>
                        </DropdownItem>
                        <DropdownItem href='#'onClick={e => { e.preventDefault(); i.Estado === "ACTIVO" ? desactivarPersonaFunc(i) : habilitarPersonaFunc(i); }}  >
                        {i.Estado === "ACTIVO" ? <><Trash className='me-50' size={15} /><span className='align-middle'>Desactivar</span></> : <><Check className='me-50' size={15} /><span className='align-middle'>Activar</span></>}
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