import React,{ useEffect, useReducer,useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Input, Label, Col } from 'reactstrap';
import Select from 'react-select';
import { EditarApiCategoriaOracion, EditarApiCategoriaVocabulario } from '../../service/Adminstrador/Categoria';
function llenadodeFormulario(state, action) {
  switch (action.type) {
    case 'onchange':
      return { ...state, [action.field]: action.value };
    default:
      throw new Error();
  }
}
export const ModalEditarCategoria = ({modal, toggle, data, juego}) => {
      const BaseInicialFormulario = { NombreCategoria:data.NombreCategoria}
      const MySwal = withReactContent(Swal);
      const [bloqueo, setBloqueo] = useState(true);
      const [{ NombreCategoria }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario)
useEffect(() => {
    if(NombreCategoria === data.NombreCategoria){
setBloqueo(true);
    }else{
        setBloqueo(false)
    }

}, [NombreCategoria])

      const EditarData = async () =>{
        try {
           let _id = data._id
            if(juego === "VOCABULARIO"){
                const data  = await  EditarApiCategoriaVocabulario({_id, NombreCategoria});
                MySwal.fire({
                  title: `${data.titulo}`,
                  text: `${data.respuesta}`,
                  icon: `${data.type}`,
                  customClass: {
                    confirmButton: 'btn btn-primary'
                  },
                  buttonsStyling: false}) 
                  toggle();

            }else if(juego === "ORACION"){
                const data  = await  EditarApiCategoriaOracion({_id, NombreCategoria});
                MySwal.fire({
                  title: `${data.titulo}`,
                  text: `${data.respuesta}`,
                  icon: `${data.type}`,
                  customClass: {
                    confirmButton: 'btn btn-primary'
                  },
                  buttonsStyling: false}) 
                  toggle();
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
  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered'>
    <ModalHeader style={{backgroundColor:'#e6dff0', color:"#592a98"}}>Editar Categoria</ModalHeader>
    <ModalBody>
     <Row><Col>
     <Label for="Juego"  style={{color:'#8b8b8c', fontWeight:"700"}} >Juego</Label>
     <Select placeholder="Seleccione" name='Juego' className='react-select' defaultValue={juego === "VOCABULARIO" ? {label:"Vocabulario",value:"Vocabulario"} :  {label:"ORACION",value:"ORACION"}} isDisabled={true} options={[{label:"Vocabulario",value:"Vocabulario"},{label:"Oracion",value:"Oracion"}]}  onChange={event => disparodeAccion({ type: "onchange", field: "Juego", value: event })} />
     <Label for='NombreCategoria'  style={{color:'#8b8b8c', fontWeight:"700"}}>Categoria</Label>
     <Input name='NombreCategoria'  onChange={event => disparodeAccion({ type: "onchange", field: "NombreCategoria", value: event.target.value.toUpperCase() })} defaultValue={data.NombreCategoria} />
     </Col></Row>
    </ModalBody>
    <ModalFooter>
    <Button  outline style={{color:'#592a98'}} onClick={()=>{toggle(); }}>
            Cancelar
          </Button>{' '}
          <Button  onClick={()=>{EditarData();}} disabled={bloqueo} style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}}>
            Agregar
          </Button>
    </ModalFooter>
  </Modal>
  )
}
