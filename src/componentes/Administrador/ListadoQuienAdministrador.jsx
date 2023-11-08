import React, { useEffect, useState } from 'react'

import {LuMoreVertical} from 'react-icons/lu'
import {AiOutlineCheck, AiOutlineEdit} from 'react-icons/ai'
import {BsTrash} from 'react-icons/bs'
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Table, UncontrolledDropdown } from 'reactstrap'
import { ImagenQuienDesibilitar, ImagenQuienHabilitar, listadoQuienImagen } from '../../service/Adminstrador/Oracion'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { ModalEditarQuienData } from './ModalEditarQuienData'
export const ListadoQuienAdministrador = () => {
  const MySwal = withReactContent(Swal)
    const [data, setdata] = useState([])
    const [modalEditar, setModalEditar] = useState(false)
    const [dataseleccionada, setDataseleccionada] = useState({})
    const [showAll, setShowAll] = useState(true)
    const handleCheckboxChange = () => {
      setShowAll(!showAll);
    };
    const llamadadata =async()=>{
        const data = await listadoQuienImagen();
        setdata(data);
    }
    
    useEffect(() => {
        llamadadata()
    }, []);
    

    const desactivarQienFunc=async(objecto)=>{
      try {
        const output = await ImagenQuienDesibilitar({_id:objecto._id});
        MySwal.fire({
          title: `${output.titulo}`,
          text: `${output.respuesta}`,
          icon: `${output.type}`,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        })
        if(output.titulo){
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          } 
      } catch (error) {
        MySwal.fire({
          title: 'Error!',
          text: "No se pudo desactivar",
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        })
      }
         
    }
    const habilitarQienFunc=async(objecto)=>{
      try {
        const output = await ImagenQuienHabilitar({_id:objecto._id});
        MySwal.fire({
          title: `${output.titulo}`,
          text: `${output.respuesta}`,
          icon: `${output.type}`,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        })
        if(output.titulo){
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          } 
      } catch (error) {
        MySwal.fire({
          title: 'Error!',
          text: "No se pudo desactivar",
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        })
      }
   
    }

const toggleditar=()=>{
  setModalEditar(!modalEditar)
}
  return (
    <Col lg='6'>
      <ModalEditarQuienData baseData={dataseleccionada} modal={modalEditar} toggle={toggleditar}  />
                <h5 style={{ color: "#9696D3" }}>Listado de Sujetos</h5>
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
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>QUIEN</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>ESTADO</th>
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
                        <LuMoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href='#' onClick={e => {e.preventDefault(); setDataseleccionada(i); toggleditar()} }>
                          <AiOutlineEdit className='me-50' size={15} /> <span className='align-middle'>Editar</span>
                        </DropdownItem>
                        <DropdownItem href='#' onClick={e => { e.preventDefault(); i.Estado === "ACTIVO" ? desactivarQienFunc(i) : habilitarQienFunc(i); }}>
                        {i.Estado === "ACTIVO" ? <><BsTrash className='me-50' size={15} /><span className='align-middle'>Desactivar</span></> : <><AiOutlineCheck className='me-50' size={15} /><span className='align-middle'>Activar</span></>}
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
                      <LuMoreVertical size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href='#' onClick={e => {e.preventDefault(); setDataseleccionada(i); toggleditar()} }>
                        <AiOutlineEdit className='me-50' size={15} /> <span className='align-middle'>Editar</span>
                      </DropdownItem>
                      <DropdownItem href='#' onClick={e => { e.preventDefault(); i.Estado === "ACTIVO" ? desactivarQienFunc(i) : habilitarQienFunc(i); }}>
                      {i.Estado === "ACTIVO" ? <><BsTrash className='me-50' size={15} /><span className='align-middle'>Desactivar</span></> : <><AiOutlineCheck className='me-50' size={15} /><span className='align-middle'>Activar</span></>}
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
  </tr>
</>))
}
            </tbody>
                </Table>
    </Col>
  )
}
