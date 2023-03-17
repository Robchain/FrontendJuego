import React from 'react'
import Select from 'react-select';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';

export const ModalAgregarVocabulario = ({modal, toggle}) => {
  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered'>
        <ModalHeader style={{backgroundColor:'#e6dff0', color:"#592a98"}}>Agregar Vocabulario</ModalHeader>
        <ModalBody>
        <div className='mb-2'>
              <Label className='form-label' for='categoria'>Categoria</Label><br/>
              <Select  name="Categoria"    /*onChange={editarMod  === false ? handlechange  : handlerFalse }*//>
                      {/*list.map(i => (<option   key={i._id} value={i.NombreCategoria}>{i.NombreCategoria}</option>))*/}
              <Label className='form-label' for='palabra'>Palabra</Label>
              <Input type='text' id='palabra' name="Palabra" placeholder='Palabra' /*value={editarMod === false ? FormValue.Palabra : selecionado.Palabra}  onChange={editarMod  === false ? handlechange  : handlerFalse}*//>
              <Label className='form-label' for='categoria'>Silaba</Label>
              <Input type='text' id='categoria' name="Silaba" placeholder='Silaba' /*value={editarMod === false ? FormValue.Silaba  : selecionado.Silaba}  onChange={editarMod  === false ? handlechange  : handlerFalse}*//>
              <Label className='form-label' for='inputImage'>
              Imagen 
            </Label>
            <Input type='file' id='inputImage' name='FileImagen' /*onChange={e  =>  setImagen(e.target.files[0])}*//>
              <Label className='form-label' for='inputVideoM'>
              Video de Muestra
            </Label>
            <Input type='file' id='inputVideoM' name='FileMuestra' /* onChange={e =>  setVideo(e.target.files[0])}*//>
            <Label className='form-label' for='inputask'>
              Video Pregunta
            </Label>
            <Input type='file' id='inputask' name='FilePregunta' /* onChange={e =>  setAsk(e.target.files[0])}*//>
            
            <Label>Estado</Label><br/>
        <Label> <input  
            type='radio'
            name="Estado"
            value="ACTIVO"
          //  checked={editarMod === false ? FormValue.Estado ===  "ACTIVO" : selecionado.Estado ===  'ACTIVO' }
            //onChange={ editarMod  === false ? handlechange  : handlerFalse}
        />Activo</Label> <br/>
        <Label>
        <Input  
            type='radio'
            name="Estado"
            value="Inactivo"
            //checked={editarMod === false ? FormValue.Estado ===  "INACTIVO" : selecionado.Estado ===  'INACTIVO'}
            //onChange={  editarMod === false ? handlechange  : handlerFalse}
        />Inactivo
        </Label>
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
