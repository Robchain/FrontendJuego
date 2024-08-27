import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
export const ModalDetalleUsuario = ({modal, toggle,dataBase}) => {
  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered modal-lg'>
    <ModalHeader style={{backgroundColor:'#e6dff0', color:"#592a98"}}>Detalles</ModalHeader>
    <ModalBody>
    <Row>
              <Col  md='6' sm='12' className='mb-2'>
              {dataBase.FotoPerfil ? <img  width={250} src={dataBase.FotoPerfil}  alt="foto perfil"></img> : <h4>no foto de perfil</h4> }
              </Col>
              <Col  md='6' sm='12' className='mb-2'>
              <ul>
                <li><b  style={{color:'#8cc5b0'}}>Nombre:</b> {dataBase.Nombre}</li>
                <li><b  style={{color:'#8cc5b0'}}>Apellido: </b>{dataBase.Apellido}</li>
                <li><b  style={{color:'#8cc5b0'}}>Identificación:</b> {dataBase.Identificacion}</li>
                <li><b  style={{color:'#8cc5b0'}}>Correo electrónico:</b> {dataBase.Email}  </li>
                <li><b  style={{color:'#8cc5b0'}}>Usuario:</b> {dataBase.TipoUsuario}</li>
                <li><b  style={{color:'#8cc5b0'}}>Tipo de usuario:</b>  {dataBase.TipoUsuario}</li>
                <li><b  style={{color:'#8cc5b0'}}>Estado:</b> {dataBase.Estado}</li>
              </ul>
              </Col>
              </Row>
    </ModalBody>
    <ModalFooter>
    <Button  outline style={{color:'#592a98'}} onClick={()=>{toggle(); }}>
            Cerrar
          </Button>
    </ModalFooter>
  </Modal>
  )
}