import React, {useEffect, useReducer, useState} from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { EditarCurso } from '../../service/Adminstrador/Usuarios';
import { responseformualrio } from '../../helpers';
function llenadodeFormulario(state, action) {
  switch (action.type) {
    case 'onchange':
      return { ...state, [action.field]: action.value };
    default:
      throw new Error();
  }
}
export const ModalEditarCurso = ({toggle,modal, data }) => {
  const BaseInicialFormulario = { Curso: data.Nombre }
const [{Curso}, dispatch] = useReducer(llenadodeFormulario, BaseInicialFormulario)
    const MySwal = withReactContent(Swal);
  const [bloqueo, setBloqueo] = useState(true);
  useEffect(() => { 
    if (Curso === data.Nombre || Curso.trim() == '') {
      setBloqueo(true);
    } else {
      setBloqueo(false)  ;
    }
  }, [Curso])

  
  useEffect(() => {
    dispatch( { type: "onchange", field: "Curso", value:data.Nombre })
  }, [data, modal]);
  


  const EditarData = async () => {
    let _id = data._id
    try {
      const data = await EditarCurso({ _id:_id, Nombre:Curso });
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        showConfirmButton:data.titulo !== "Excelente",
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
      toggle();
      if(data.titulo ==="Excelente"){
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        }
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: responseformualrio.Editadar.editadoFracaso,
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
      <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Editar Curso</ModalHeader>
      <ModalBody>
        <Row><Col>
          <Label for='Curso' style={{ color: '#8b8b8c', fontWeight: "700" }}>Curso</Label>
          <Input name='Curso' maxLength={20} placeholder='Curso' onChange={event => dispatch( { type: "onchange", field: "Curso", value: event.target.value.toUpperCase()})} defaultValue={Curso}  value={Curso} />
        </Col></Row>
      </ModalBody>
      <ModalFooter>
        <Button outline style={{ color: '#592a98' }} onClick={() => { toggle(); }}>
          Cancelar
        </Button>&nbsp;&nbsp;
        <Button onClick={EditarData} disabled={bloqueo} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
          Editar
        </Button>
      </ModalFooter>
    </Modal>
  )
}
