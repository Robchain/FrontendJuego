import React, { useReducer, useState, useEffect } from 'react'
import Select from 'react-select';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';
const BaseInicialFormulario = { Categoria: "", Palabra: "", Silaba: "", FileImagen: "", FileMuestra: "", FilePregunta: "", Estado: "ACTIVO"}
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
const listadoCategoria = [{value:"Vocabulario",label:"Vocabulario"},{value:"Oracion", label:"Oracion"}]
export const ModalAgregarVocabulario = ({modal, toggle}) => {
  const [bloqueo, setBloqueo] = useState(true);
  const [{ Categoria, Palabra, Silaba,FileImagen, FileMuestra, FilePregunta }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario)

  useEffect(() => {
    if(Categoria && Palabra.length > 0 && Silaba.length > 0 && FileImagen &&  FileMuestra && FilePregunta){
      setBloqueo(false);
    }else{
      setBloqueo(true);
    }
  }, [Categoria, Palabra, Silaba,FileImagen, FileMuestra, FilePregunta])
  

  
  
  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered'>
        <ModalHeader style={{backgroundColor:'#e6dff0', color:"#592a98"}}>Agregar Vocabulario</ModalHeader>
        <ModalBody>
        <div className='mb-2'>
              <Label className='form-label' for='categoria'>Categoria</Label><br/>
              <Select  name="Categoria" options={listadoCategoria}  onChange={ event => disparodeAccion({ type: "onchange", field: "Categoria", value: event })} isSearchable={false} />
              <Label className='form-label' for='palabra'>Palabra</Label>
              <Input type='text' id='palabra' name="Palabra" placeholder='Palabra' onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value })} value={Palabra} />
              <Label className='form-label' for='categoria'>Silaba</Label>
              <Input type='text' id='categoria' name="Silaba" placeholder='Silaba' onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value })} value={Silaba} />
              <Label className='form-label' for='inputImage'>
              Imagen 
            </Label>
            <Input type='file' id='inputImage' name='FileImagen' onChange={e  =>  disparodeAccion({ type: "onchange", field: "FileImagen", value: e.target.files[0] })}/>
              <Label className='form-label' for='inputVideoM'>
              Video de Muestra
            </Label>
            <Input type='file' id='inputVideoM' name='FileMuestra'onChange={e =>   disparodeAccion({ type: "onchange", field: "FileMuestra", value: e.target.files[0] })}/>
            <Label className='form-label' for='inputask'>
              Video Pregunta
            </Label>
            <Input type='file' id='inputask' name='FilePregunta'  onChange={e =>  disparodeAccion({ type: "onchange", field: "FilePregunta", value: e.target.files[0] })}/>
            </div>
            </ModalBody>
        <ModalFooter>
          <Button  outline style={{color:'#592a98'}} onClick={()=>{toggle(); disparodeAccion({ type: "reset" });}}>
            Cancelar
          </Button>{' '}
          <Button  onClick={()=>{console.log(FileImagen,FileMuestra,FilePregunta )}} disabled={bloqueo}  style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}}>
            Agregar
          </Button>
        </ModalFooter>
      </Modal>
  )
}
