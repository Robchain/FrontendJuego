import React from 'react'
import Select from 'react-select';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Label, Input } from 'reactstrap';
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

export const ModalAgregarOracion = ({modal, toggle}) => {
  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered modal-lg'>
    <ModalHeader style={{backgroundColor:'#e6dff0', color:"#592a98"}}>Agregar Oracion</ModalHeader>
    <ModalBody>
    <Row>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='categoria'>Categoria</Label><br/>
              <Select  name="Categoria"    /*onChange={editarMod  === false  ? handlechange : handlerFalse} *//>
                        {/*list.map(i => (<option   key={i._id} value={i.NombreCategoria}>{i.NombreCategoria}</option>))*/}
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='FileVideoPreguntaQuien'>
              Video Pregunta "Adverbio"
            </Label>
            <Input type='file' id='FileVideoPreguntaQuien' name='FileVideoPreguntaQuien'  /*onChange={e => setAskQue(e.target.files[0])}*/ />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
                Oracion
              </Label>
              <Input type='text' name='Oracion' id='lastNameMulti' placeholder='Oracion' /*onChange={editarMod  === false  ? handlechange : handlerFalse}  value={ editarMod  === false ? FormValue.Oracion  : selecionado.Oracion}*//>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='FileAdjetivoImagen'>
              Imagen del Adverbio
            </Label>
            <Input type='file' id='FileAdjetivoImagen' name='FileAdjetivoImagen' /*onChange={e  => setAdjetivo(e.target.files[0])}*//>
          </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='FileSujetoImagen'>
                Imagen del Sujeto 
              </Label>
              <Input type='file' id='FileSujetoImagen' name='FileSujetoImagen' /*onChange={e  => setSujeto(e.target.files[0])}/>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='FileVideoPreguntaComplemento'>
                Video Pregunta Sustantivo
              </Label>
              <Input type='file' id='inputFile' name='FileVideoPreguntaComplemento' /*onChange={e => setAskComplemento(e.target.files[0]) }*/ />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='FileVideoMuestra'>
              Video del Sujeto
            </Label>
            <Input type='file' id='FileVideoMuestra' name='FileVideoMuestra' /*onChange={e  => setMuestra(e.target.files[0])}*//>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='FileVideoPreguntaCompleja'>
              imagen del sustantivo
            </Label>
            <Input type='file' id='FileVideoPreguntaCompleja' name='FileVideoPreguntaCompleja'  /*onChange={e =>  setAskCompleja(e.target.files[0])} *//>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
                verbo
              </Label>
              <Input type='text' name='Verbo' id='cityMulti' placeholder='Verbo' /*onChange={editarMod  === false  ? handlechange : handlerFalse} value={editarMod  === false ? FormValue.Verbo  : selecionado.Verbo } *//>
            </Col>  
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='FileVideoMuestra'>
              Video compleja
            </Label>
            <Input type='file' id='FileVideoMuestra' name='FileVideoMuestra' /*onChange={e  => setMuestra(e.target.files[0])}*//>
            </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-2'>{/*
            <Label className='form-label' for='EmailMulti'>
                Estado
              </Label><br/>
        <Label> <Input  
            type='radio'
            name="Estado"
            value="ACTIVO"
            //checked={editarMod === false ? FormValue.Estado ===  "ACTIVO" : selecionado.Estado  === 'ACTIVO'}
            //onChange={editarMod  === false  ? handlechange : handlerFalse}
        />Activo</Label> <br/>
        <Label>
        <Input  
            type='radio'
            name="Estado"
            value="INACTIVO"
            //checked={editarMod ===  false ? FormValue.Estado === "INACTIVO"  : selecionado.Estado  === "INACTIVO"}
            //onChange={editarMod  === false  ? handlechange : handlerFalse}
        />Inactivo</Label> */}</div>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='FileVideoMuestra'>
              Video Respuestra 
            </Label>
            <Input type='file' id='FileVideoMuestra' name='FileVideoMuestra' /*onChange={e  => setMuestra(e.target.files[0])}*//>
            </Col>
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
