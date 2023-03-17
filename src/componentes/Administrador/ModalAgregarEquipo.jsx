import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';
export const ModalAgregarEquipo = ({modal, toggle}) => {
  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered '>
    <ModalHeader style={{backgroundColor:'#e6dff0', color:"#592a98"}}>Agregar Equipo</ModalHeader>
    <ModalBody>
    <div className='mb-2'>
              <Label className='form-label' for='Nombre'>Nombre</Label>
              <Input type='text' id='Nombre' name="Nombre" placeholder='Nombre' 
              //value={editarMod === false  ? FormValue.Nombre :  selecion.Nombre}  
              //onChange={editarMod === false ? handlechange  : handlerFalse}
              />
              <Label className='form-label' for='inputFileB'>
              Foto Del Equipo
            </Label>
            <Input type='file' id='inputFileB' name='Imagen' /*onChange={e  =>  setFile(e.target.files[0])}*//>
            {/*
              <Label>ESTADO</Label><br/>
        <Label> <Input  
            type='radio'
            name="Estado"
            value="ACTIVO"
            //checked={editarMod === false ?  FormValue.Estado ===  "ACTIVO"  : selecion.Estado === "ACTIVO"}
            //onChange={ editarMod === false ? handlechange  : handlerFalse}
        />Activo</Label> <br/>
        <Label>
        <Input  
            type='radio'
            name="Estado"
            value="INACTIVO"
            //checked={editarMod === false ?  FormValue.Estado ===  "INACTIVO"  : selecion.Estado === "INACTIVO"}
            //onChange={editarMod ===  false ? handlechange : handlerFalse}
        />Inactivo
        </Label>*/}
            </div>
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
