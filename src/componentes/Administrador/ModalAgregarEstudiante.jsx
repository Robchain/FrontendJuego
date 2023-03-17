import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Label, Col, Input } from 'reactstrap';

export const ModalAgregarEstudiante = ({ modal, toggle }) => {
  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered modal-lg'>
      <ModalHeader style={{backgroundColor:'#e6dff0', color:"#592a98"}}>Agregar Usuario</ModalHeader>
      <ModalBody>
        <Row>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameMulti'>
              Nombre
            </Label>
            <Input type='text' name="Nombre" id='nameMulti' placeholder='Nombre' />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='lastNameMulti'>
              Apellido
            </Label>
            <Input type='text' name='Apellido' id='lastNameMulti' placeholder='Apellido' />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
                Identificacion
              </Label>
              <Input type='text' name='Identificacion' id='cityMulti' placeholder='Identificacion'  />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
                Correo Electronico
              </Label>
              <Input type='text' name='Email' id='CountryMulti' placeholder='Correo Electronico'  />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Usuario
              </Label>
              <Input type='text' name='Usuario' id='CompanyMulti' placeholder='Usuario' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                Contraseña
              </Label>
              <Input type='password' name='Password' id='EmailMulti' placeholder='Contraseña'  />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='inputFile'>
              Foto de perfil
            </Label>
            <Input type='file' id='inputFile' name='FotoPerfil' /*onChange={e =>  setFile(e.target.files[0])}*/ />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='EmailMulti'>
                Tipo Usuario
              </Label><br/>
            <Label><Input 
            type='radio'
            name="TipoUsuario"
            value="ESTUDIANTE"
            /*checked={editarMod  === false ? FormValue.TipoUsuario === "ESTUDIANTE"  : selecion.TipoUsuario  === "ESTUDIANTE"}
            onChange={editarMod === false ? handleChange  : handlerFalse}*/
        />Estudiante</Label><br/>
        <Label>
        <Input  
            type='radio'
            name="TipoUsuario"
            value="MAESTRO"
            /*checked={ editarMod === false ? FormValue.TipoUsuario === "MAESTRO" : selecion.TipoUsuario  === "MAESTRO"}
            onChange={ editarMod  === false ? handleChange  : handlerFalse}*/
        />Maestro
        </Label>
            </Col>
          
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-2'>
            <Label className='form-label' for='EmailMulti'>
                Estado
              </Label><br/>
        <Label> <Input  
            type='radio'
            name="Estado"
            value="ACTIVO"
            /*checked={ editarMod === false ? FormValue.Estado ===  "ACTIVO"  : selecion.Estado === "ACTIVO"}
            onChange={ editarMod  === false ? handleChange  : handlerFalse}*/
        />Activo</Label> <br/>
        <Label>
        <Input  
            type='radio'
            name="Estado"
            value="INACTIVO"
           /* checked={editarMod  === false ?  FormValue.Estado === "INACTIVO"  : selecion.Estado === "INACTIVO"}
            onChange={editarMod === false ? handleChange  : handlerFalse}*/
        />Inactivo
        </Label>
            </div>
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
