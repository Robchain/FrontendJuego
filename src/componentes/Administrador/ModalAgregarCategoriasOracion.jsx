import React, { useEffect, useReducer, useState } from 'react'
import Swal from 'sweetalert2'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Input, Label, Col } from 'reactstrap';
import { CrearPostCategoria } from '../../service/Adminstrador/Categoria';
import withReactContent from 'sweetalert2-react-content';
import { responseformualrio } from '../../helpers';
const BaseInicialFormulario = { NombreCategoria:""}
function llenadodeFormulario(state, action) {
  switch (action.type) {
    case 'onchange':
      return { ...state, [action.field]: action.value };
    case "reset":
      return BaseInicialFormulario;
    default:
      throw new Error();
  }
}

export const ModalAgregarCategoriasOracion = ({modal, toggle}) => {
  const MySwal = withReactContent(Swal)
  const [bloqueo, setBloqueo] = useState(true);
  const [{  NombreCategoria }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario)
  
  const subidaData = async () =>{
    try {
const data  = await  CrearPostCategoria({NombreCategoria, Juego:{value:'Oración'}});
  MySwal.fire({
    title: `${data.titulo}`,
    text: `${data.respuesta}`,
    icon: `${data.type}`,
    showConfirmButton:data.titulo !== "Excelente",
    customClass: {
      confirmButton: 'btn btn-primary'
    },
    buttonsStyling: false}) 
    toggle();
    if(data.titulo ==="Excelente"){
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      }
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: responseformualrio.Creado.NoCreado,
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false})
        toggle();
    }  
  } 

  useEffect(() => {
    if(NombreCategoria && NombreCategoria.length > 0 && NombreCategoria.trim() != ''){
      setBloqueo(false);
    } else {
      setBloqueo(true);
    }
  }, [ NombreCategoria])
  
  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered'>
    <ModalHeader style={{backgroundColor:'#e6dff0', color:"#592a98"}}>Agregar Categoría Oración</ModalHeader>
    <ModalBody>
     <Row><Col>
     <Label for='NombreCategoria'>Categoría</Label>
     <Input name='NombreCategoria' maxLength={25}  onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value.toUpperCase() })} value={NombreCategoria}  />
     </Col></Row>
    </ModalBody>
    <ModalFooter>
    <Button  outline style={{color:'#592a98'}} onClick={()=>{toggle(); disparodeAccion({ type: "reset" }); }}>
            Cancelar
          </Button>{' '}
          <Button  onClick={()=>{subidaData()}} disabled={bloqueo} style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}}>
            Agregar
          </Button>
    </ModalFooter>
  </Modal>
  )
}
