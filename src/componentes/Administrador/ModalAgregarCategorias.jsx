import React, { useEffect, useReducer, useState } from 'react'
import Swal from 'sweetalert2'
import Select from 'react-select';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Input, Label, Col } from 'reactstrap';
import { CrearPostCategoria } from '../../service/Adminstrador/Categoria';
import withReactContent from 'sweetalert2-react-content';
const BaseInicialFormulario = { Juego: "", NombreCategoria:""}
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

export const ModalAgregarCategorias = ({modal, toggle}) => {
  const MySwal = withReactContent(Swal)
  const [bloqueo, setBloqueo] = useState(true);
  const [{ Juego, NombreCategoria }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario)
  
  const subidaData = async () =>{
    try {
const data  = await  CrearPostCategoria({Juego,NombreCategoria});
  MySwal.fire({
    title: `${data.titulo}`,
    text: `${data.respuesta}`,
    icon: `${data.type}`,
    customClass: {
      confirmButton: 'btn btn-primary'
    },
    buttonsStyling: false}) 
    toggle();
    if(!bloqueo){
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      }
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: "Falto un campo",
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false})
        toggle();
    }  
  } 

  useEffect(() => {
    if(Juego && NombreCategoria.length > 0){
      setBloqueo(false);
    }else{
      setBloqueo(true);
    }
  }, [Juego, NombreCategoria])
  
  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered'>
    <ModalHeader style={{backgroundColor:'#e6dff0', color:"#592a98"}}>Agregar Categoría</ModalHeader>
    <ModalBody>
     <Row><Col>
     <Label for="Juego">Juego</Label>
     <Select placeholder="Seleccione" name='Juego' className='react-select' options={[{label:"Vocabulario",value:"Vocabulario"},{label:"Oración",value:"Oración"}]}  onChange={event => disparodeAccion({ type: "onchange", field: "Juego", value: event })} />
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
