import React, {useEffect, useReducer, useState} from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Swal from 'sweetalert2'
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css'
import withReactContent from 'sweetalert2-react-content';
//material_green.css, material_blue.css, material_red.css, material_orange.css, dark.css
import { ActualizarCoolaborativo } from '../../service/Multijugador';
import { responseformualrio } from '../../helpers';
function llenadodeFormulario(state, action) {
    switch (action.type) {
      case 'onchange':
        return { ...state, [action.field]: action.value };
      default:
        throw new Error();
    }
  }
export const ModalEditarColaborativo = ({toggle,modal, data }) => {
    const BaseInicialFormulario = { TipoDeJuego:data.TipoDeJuego }
const [{TipoDeJuego}, dispatch] = useReducer(llenadodeFormulario, BaseInicialFormulario)
    const MySwal = withReactContent(Swal);
    const [picker, setPicker] = useState(new Date());
    const [picker2, setPicker2] = useState(new Date());
  const [bloqueo, setBloqueo] = useState(true);
  useEffect(() => { 
    if (TipoDeJuego !== data.TipoDeJuego || picker != Date() || picker2 !=Date()) {
      setBloqueo(false);
    } else {
      setBloqueo(true)  ;
    }
  }, [TipoDeJuego, picker])

  useEffect(() => {
    setPicker(new Date());
    setPicker2(new Date());
    dispatch( { type: "onchange", field: "TipoDeJuego", value:data.TipoDeJuego })
  }, [data, modal]);


  const EditarData = async () => {
    let _id = data._id
    try {
      const data = await ActualizarCoolaborativo({ _id:_id, picker:picker, picker2:picker2, TipoDeJuego:TipoDeJuego });
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
      <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Editar colaborativo</ModalHeader>
      <ModalBody>
        
        
      <Label className='form-label' >
            Feha de inicio
            </Label><br/>
            <DateTimePicker
            amPmAriaLabel="Select AM/PM"
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            hourAriaLabel="Hour"
            maxDetail="second"
            minDate={new Date()}
            minuteAriaLabel="Minute"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date and time"
            onChange={setPicker}
            secondAriaLabel="Second"
            value={picker}
            yearAriaLabel="Year"
          /><br/>
          
         
          <Label className='form-label mt-2' >
              Fecha de cierre
            </Label> <br/>
            <DateTimePicker
            amPmAriaLabel="Select AM/PM"
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            hourAriaLabel="Hour"
            maxDetail="second"
            minDate={new Date(picker)}
            minuteAriaLabel="Minute"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date and time"
            onChange={setPicker2}
            secondAriaLabel="Second"
            value={picker2}
            yearAriaLabel="Year"
          /><br/>

        <Label>
              Tipo de Juego
            </Label><br />
            <Input
              type='radio'
              name="TipoDeJuego"
              value={1}
              onChange={event => dispatch({ type: "onchange", field: "TipoDeJuego", value: event.target.value })}
              defaultChecked={data.TipoDeJuego == '1'}
            /> Vocabulario<br />
              <Input
                type='radio'
                name="TipoDeJuego"
                value={2}
                onChange={event => dispatch({ type: "onchange", field: "TipoDeJuego", value: event.target.value})}
              defaultChecked={data.TipoDeJuego == '2'}
              /> Oraciones
            <br/>
            <Input
                type='radio'
                name="TipoDeJuego"
                value={3}
                onChange={event => dispatch({ type: "onchange", field: "TipoDeJuego", value: event.target.value })}
              defaultChecked={data.TipoDeJuego == '3'}
              /> Oraciones y Vocabulario
        
                
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
