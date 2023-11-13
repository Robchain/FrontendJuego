import React, { useEffect, useReducer, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Input, Label, Col } from 'reactstrap';
import Select from 'react-select';
import { EditarApiCategoriaOracion, EditarApiCategoriaVocabulario } from '../../service/Adminstrador/Categoria';
import { responseformualrio } from '../../helpers';
const BaseInicialFormulario = { NombreCategoria: '' }
function llenadodeFormulario(state, action) {
  switch (action.type) {
    case 'onchange':
      return { ...state, [action.field]: action.value };
    default:
      throw new Error();
  }
}
export const ModalEditarCategoria = ({ modal, toggle, data, juego }) => {

  const MySwal = withReactContent(Swal);
  const [bloqueo, setBloqueo] = useState(true);
  const [{ NombreCategoria }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario)
  useEffect(() => {

    if (NombreCategoria === data.NombreCategoria) {
      setBloqueo(true);
    } else {
      setBloqueo(false)
    }
  }, [NombreCategoria])

  useEffect(() => {
    disparodeAccion({ type: "onchange", field: "NombreCategoria", value: data.NombreCategoria })

  }, [])


  const EditarData = async () => {
    try {
      let _id = data._id
      if (juego === "VOCABULARIO") {
        const data = await EditarApiCategoriaVocabulario({ _id, NombreCategoria });
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
      } else if (juego === "ORACION") {
        const data = await EditarApiCategoriaOracion({ _id, NombreCategoria });
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
    }
  }
  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered'>
      <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Editar Categoría</ModalHeader>
      <ModalBody>
        <Row><Col>
          <Label for="Juego" style={{ color: '#8b8b8c', fontWeight: "700" }} >Juego</Label>
          <Select placeholder="Seleccione" name='Juego' className='react-select' defaultValue={juego === "VOCABULARIO" ? { label: "Vocabulario", value: "Vocabulario" } : { label: "Oración", value: "Oración" }} isDisabled={true} options={[{ label: "Vocabulario", value: "Vocabulario" }, { label: "Oracion", value: "Oracion" }]} onChange={event => disparodeAccion({ type: "onchange", field: "Juego", value: event })} />
          <Label for='NombreCategoria' style={{ color: '#8b8b8c', fontWeight: "700" }}>Categoría</Label>
          <Input name='NombreCategoria' maxLength={25} onChange={event => disparodeAccion({ type: "onchange", field: "NombreCategoria", value: event.target.value.toUpperCase() })} defaultValue={data.NombreCategoria} value={NombreCategoria} />
        </Col></Row>
      </ModalBody>
      <ModalFooter>
        <Button outline style={{ color: '#592a98' }} onClick={() => {  toggle(); }}>
          Cancelar
        </Button>&nbsp;&nbsp;
        <Button onClick={() => { EditarData(); }} disabled={bloqueo} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
          Editar
        </Button>
      </ModalFooter>
    </Modal>
  )
}
