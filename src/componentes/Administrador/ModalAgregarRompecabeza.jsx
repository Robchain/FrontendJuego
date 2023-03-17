import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';
export const ModalAgregarRompecabeza = ({modal, toggle}) => {
  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered '>
    <ModalHeader style={{backgroundColor:'#e6dff0', color:"#592a98"}}>Agregar Rompecabeza</ModalHeader>
    <ModalBody>
      <div className=''>
              <Label className='form-label' for='Nombre'>Nombre</Label>
              <Input type='text' id='Nombre' name="Nombre" placeholder='Nombre' /*value={editarMod  === false ?  FormValue.Nombre  : selecion.Nombre}  onChange={editarMod  === false ? handlechange  : handlerFalse}*//>
              <Label className='form-label' for='inputFileC'>
              Foto Color
            </Label>
            <Input type='file' id='inputFileC' name='FileColor' /*onChange={e  => setFileC(e.target.files[0]) }*/ />
              <Label className='form-label' for='inputFileB'>
              Foto Blanco y Negro
            </Label>
            <Input type='file' id='inputFileB' name='FileBlanco' /*onChange={(e)  => setFileB(e.target.files[0])} *//>
            <Label>PIEZA</Label><br/>
        <Label> <Input  
            type='radio'
            name="Pieza"
            value={4}
            //checked={editarMod === false ? FormValue.Pieza === 4 : selecion.Pieza === 4}
            //onChange={editarMod  === false ? handlechange  : handlerFalse}
        />{" "}4</Label><br/>
        <Label><Input 
            type='radio'
            name="Pieza"
            value={6}
            //checked={ editarMod === false ? FormValue.Pieza === 6 : selecion.Pieza === 6}
            //onChange={editarMod  === false ? handlechange  : handlerFalse}
        />{" "}6 </Label><br/>
            {/*<Label>ESTADO</Label><br/>
        <Label> <Input  
            type='radio'
            name="Estado"
            value="ACTIVO"
            //checked={editarMod === false ? FormValue.Estado ===  "ACTIVO" : selecion.Estado === "ACTIVO"}
            //onChange={editarMod  === false ? handlechange  : handlerFalse}
        />Activo</Label> <br/>
        <Label>
        <Input  
            type='radio'
            name="Estado"
            value="INACTIVO"
            //checked={editarMod === false ? FormValue.Estado === "INACTIVO"  : selecion.Estado === "INACTIVO"}
            //onChange={editarMod  === false ? handlechange  : handlerFalse}
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
