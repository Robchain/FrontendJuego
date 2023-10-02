import React, {useEffect, useState} from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { EditarParalelo } from '../../service/Adminstrador/Usuarios';
 export const ModalEditarParalelo = ({toggle,modal, data }) => {
    const MySwal = withReactContent(Swal);
  const [bloqueo, setBloqueo] = useState(true);
    const [Paralelo, setParalelo] = useState("");
  useEffect(() => {

    if (Paralelo === data.Nombre) {
      setBloqueo(true);
    } else {
      setBloqueo(false)
    }
  }, [Paralelo])

  useEffect(() => {
    setParalelo(data.Nombre)
  }, [data, modal])


  const EditarData = async () => {
    let _id = data._id 
    try {
      const data = await EditarParalelo({ _id:_id, Nombre:Paralelo });
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
      toggle();
      if(!bloqueo){
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        }
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: "No se pudo ",
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
      toggle();
    }}
   return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered'>
    <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Editar Paralelo</ModalHeader>
    <ModalBody>
      <Row><Col>
        <Label for='Paralelo' style={{ color: '#8b8b8c', fontWeight: "700" }}>Paralelo</Label>
        <Input name='Paralelo' placeholder='Paralelo' onChange={event => setParalelo(event.target.value.toUpperCase())} defaultValue={data.Nombre} value={Paralelo} />
      </Col></Row>
    </ModalBody>
    <ModalFooter>
      <Button outline style={{ color: '#592a98' }} onClick={() => { toggle(); }}>
        Cancelar
      </Button>&nbsp;&nbsp;
      <Button onClick={() => { EditarData(); }} disabled={bloqueo} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
        Editar
      </Button>
    </ModalFooter>
  </Modal>
)
 }
 