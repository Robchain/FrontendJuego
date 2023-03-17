import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Input, Form, Label } from 'reactstrap';
export const ModalAgregarCategorias = ({modal, toggle}) => {
  

const {handleSubmit, control} = useForm();

  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered'>
    <ModalHeader style={{backgroundColor:'#e6dff0', color:"#592a98"}}>Agregar Categoria</ModalHeader>
    <ModalBody>
     <Row>
     <Form>
     <Label for="Juego">Juego</Label>
<Controller control={control} name="Juego" render={({field:{onChange, value, ...rest}})=>(<Select placeholder="Seleccione" className='react-select' options={[{label:"Vocabulario",value:"Vocabulario"},{label:"Oracion",value:"Oracion"}]} value={value} onChange={onChange}  {...rest} />)}/>
     <Label for='NombreCategoria'>Categoria</Label>
<Controller   control={control} name='NombreCategoria' render={({field: { onChange, value, name, ...rest }})=>(<Input  onChange={onChange} value={value}  name={name}  {...rest}/>)}/>
     </Form>
     </Row>
    </ModalBody>
    <ModalFooter>
    <Button  outline style={{color:'#592a98'}} onClick={toggle}>
            Cancelar
          </Button>{' '}
          <Button  onClick={toggle} style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}}>
            Agregar
          </Button>
    </ModalFooter>
  </Modal>
  )
}
