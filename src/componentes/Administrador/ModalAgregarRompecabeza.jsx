import React, { useEffect, useReducer, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Spinner } from 'reactstrap';
import { CrearRompecabeza } from '../../service/Adminstrador/Rompecabeza';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { subidaIRompecabeza } from '../../firebase/config';
const BaseInicialFormulario = { Nombre: "", FileBlanco: undefined, FileColor: undefined, Pieza: 0 };
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

export const ModalAgregarRompecabeza = ({ modal, toggle }) => {
  const [{ Nombre, FileBlanco, FileColor, Pieza }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario);
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);
  const [bloqueoSecu, setBloqueoSecu] = useState(false);
  const [bloqueo, setBloqueo] = useState(true);

  useEffect(() => {
    if (Nombre.length > 0 && FileBlanco !== undefined && FileColor !== undefined && Pieza !== 0) {
      setBloqueo(false);
    } else {
      setBloqueo(true);
    }
  }, [Nombre, FileBlanco, FileColor, Pieza])

  const uploadData = async () => {
    try {
      setBloqueoSecu(true);
      setBloqueo(true);
      setLoading(true);
      const ulrC = await subidaIRompecabeza(FileColor)
      const ulrB = await subidaIRompecabeza(FileBlanco)
      const data = await CrearRompecabeza({ FileBlanco: ulrB, FileColor: ulrC, Nombre: Nombre, Pieza: Pieza });
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
      setBloqueoSecu(false);
      setBloqueo(false);
      setLoading(false);
      toggle();
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: "No se pudo Crear",
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
      setBloqueoSecu(false);
      setBloqueo(false);
      setLoading(false);
      toggle();
    }
  }

  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered '>
      <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Agregar Rompecabeza</ModalHeader>
      <ModalBody>
        <div className=''>
          <Label className='form-label' for='Nombre'>Nombre</Label>
          <Input type='text' id='Nombre' name="Nombre" placeholder='Nombre' onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value.toUpperCase() })} />
          <Label className='form-label' for='FileColor'>
            Foto Color
          </Label>
          <Input type='file' id='FileColor' name='FileColor' onChange={event => disparodeAccion({ type: "onchange", field: "FileColor", value: event.target.files[0] })} />
          <Label className='form-label' for='FileBlanco'>
            Foto Blanco y Negro
          </Label>
          <Input type='file' id='FileBlanco' name='FileBlanco' onChange={event => disparodeAccion({ type: "onchange", field: "FileBlanco", value: event.target.files[0] })} />
          <Label>Piezas</Label><br />
          <Label>
            <Input
              style={{ color: '#8b8b8c' }}
              type='radio'
              id={4}
              name="Pieza"
              value={4}
              defaultChecked={Pieza === 4}
              onChange={event => disparodeAccion({ type: "onchange", field: "Pieza", value: event.target.value })}
            />{" "}4</Label><br />
          <Label><Input
            style={{ color: '#8b8b8c' }}
            type='radio'
            id={6}
            name="Pieza"
            value={6}
            defaultChecked={Pieza === 6}
            onChange={event => disparodeAccion({ type: "onchange", field: "Pieza", value: event.target.value })}
          />{" "}6 </Label><br />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button outline style={{ color: '#592a98' }} onClick={toggle} disabled={bloqueoSecu}>
          Cancelar
        </Button>{' '}
        <Button onClick={() => {
          uploadData();
        }} disabled={bloqueo} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
          {loading && <Spinner size="sm">
            Loading...
          </Spinner>}
          Agregar
        </Button>
      </ModalFooter>
    </Modal>
  )
}
