import React, { useEffect, useState } from 'react'
import { Check, Edit, MoreVertical, Trash } from 'react-feather';
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Table, UncontrolledDropdown } from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { DesibilitarCurso, HabilitarCurso, MostrarCurso } from '../../service/Adminstrador/Usuarios';
import { ModalEditarCurso } from './ModalEditarCurso';
export const ListadoCUrsosAdministrador = () => {
    const MySwal = withReactContent(Swal)
    const [showAll, setShowAll] = useState(true)
    const [data, setdata] = useState([])
    const [modalEditar, setModalEditar] = useState(false)
    const [dataseleccionada, setDataseleccionada] = useState({})

    const dataLlamada = async()=>{
      try {
        const data = await  MostrarCurso();
      setdata(data);
      } catch (error) {
        setdata([]);
      }
       }
     
       useEffect(() => {
         dataLlamada();
       }, [])

    const handleCheckboxChange = () => {
        setShowAll(!showAll);
      };
      const toggleditar=()=>{
        setModalEditar(!modalEditar)
      }
      const desactivarQienFunc=async({_id})=>{
        try {
          const data = await DesibilitarCurso({_id:_id})
          MySwal.fire({
            title: `${data.titulo}`,
            text: `${data.respuesta}`,
            icon: `${data.type}`,
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false}); 
            if(data.titulo){
              setTimeout(() => {
                window.location.reload();
              }, 2000);
              }
        } catch (error) {
          MySwal.fire({
            title: 'Error!',
            text: "No se puede cambiar",
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false});
        }
      }
      const habilitarQienFunc= async({_id})=>{
        try {
          const data = await HabilitarCurso({_id:_id})
          MySwal.fire({
            title: `${data.titulo}`,
            text: `${data.respuesta}`,
            icon: `${data.type}`,
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false}); 
            if(data.titulo){
              setTimeout(() => {
                window.location.reload();
              }, 2000);
              }
        } catch (error) {
          MySwal.fire({
            title: 'Error!',
            text: "No se puede cambiar",
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false});
        }
      } 
  return (
    <Col lg='6'>
      
    <h5 style={{ color: "#9696D3" }}>Listado de Cursos</h5>
    <Col lg="12">
                     <Input
                         id="exampleCheck"
                         name="check"
                         type="checkbox"
                         checked={showAll}
                        onChange={handleCheckboxChange}
                     />&nbsp;&nbsp;
                     <Label
                         check
                         for="exampleCheck"
                         style={{color:'#8b8b8c',fontWeight:"700"}}
                     >
                         Mostar Todos
                     </Label>
 </Col>

 <Table striped>
                <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}><tr>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>Curso</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>Estado</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>ACCIONES</th>
            </tr></thead>
            <tbody>
{ showAll ? data.map((i, index)=>(<>
    <tr key={index}>
    <td style={{borderBottomColor:"#f8f8f8"}}>{i.Nombre}</td>
    <td style={{borderBottomColor:"#f8f8f8"}}>{i.Estado}</td>
    <td style={{borderBottomColor:"#f8f8f8"}}>
                    <UncontrolledDropdown>
                      <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' >
                        <MoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href='#' onClick={e => {e.preventDefault(); setDataseleccionada(i); toggleditar()} }>
                          <Edit className='me-50' size={15} /> <span className='align-middle'>Editar</span>
                        </DropdownItem>
                        <DropdownItem href='#' onClick={e => { e.preventDefault(); i.Estado === "ACTIVO" ? desactivarQienFunc(i) : habilitarQienFunc(i); }}>
                        {i.Estado === "ACTIVO" ? <><Trash className='me-50' size={15} /><span className='align-middle'>Desactivar</span></> : <><Check className='me-50' size={15} /><span className='align-middle'>Activar</span></>}
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
    </tr>
</>)):
data.filter(item=>item.Estado==='ACTIVO').map((i, index)=>(<>
  <tr key={index}>
  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Nombre}</td>
  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Estado}</td>
  <td style={{borderBottomColor:"#f8f8f8"}}>
                  <UncontrolledDropdown>
                    <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' >
                      <MoreVertical size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href='#' onClick={e => {e.preventDefault(); setDataseleccionada(i); toggleditar()} }>
                        <Edit className='me-50' size={15} /> <span className='align-middle'>Editar</span>
                      </DropdownItem>
                      <DropdownItem href='#' onClick={e => { e.preventDefault(); i.Estado === "ACTIVO" ? desactivarQienFunc(i) : habilitarQienFunc(i); }}>
                      {i.Estado === "ACTIVO" ? <><Trash className='me-50' size={15} /><span className='align-middle'>Desactivar</span></> : <><Check className='me-50' size={15} /><span className='align-middle'>Activar</span></>}
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
  </tr>
</>))
}
            </tbody>
                </Table>
                <ModalEditarCurso modal={modalEditar} toggle={toggleditar} data={dataseleccionada} />
     
    </Col>
  )
}