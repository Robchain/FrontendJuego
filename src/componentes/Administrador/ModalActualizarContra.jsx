import React,{ useEffect, useReducer,useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Input, Label, Col } from 'reactstrap';
import { ActulizarContraseña } from '../../service/Adminstrador/Usuarios';
const BaseInicialFormulario = { ContraseñaUno:"", ContraseñaDos:""}
function llenadodeFormulario(state, action) {
  switch (action.type) {
    case 'onchange':
      return { ...state, [action.field]: action.value };
      case 'defaultvalue':
        return BaseInicialFormulario;
    default:
      throw new Error();
  }
}
export const ModalActualizarContra = ({modal, toggle, database}) => {
      const MySwal = withReactContent(Swal);
      const [bloqueodos, setbloqueodos] = useState(false);
      const [bloqueo, setBloqueo] = useState(true);
      const [{ ContraseñaUno, ContraseñaDos}, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario)
useEffect(() => {
    if( ContraseñaUno !== "" &&  ContraseñaDos !== "" && ContraseñaUno !== ContraseñaDos){
setBloqueo(true);
    }
     if(ContraseñaUno.length >5 &&  ContraseñaDos.length >5 && ContraseñaUno === ContraseñaDos){
        setBloqueo(false);
    }
}, [ContraseñaDos,ContraseñaUno])

      const EditarData = async () =>{
        try {
           let _id = database._id
           setBloqueo(true);
           setbloqueodos(true);
                const data  = await  ActulizarContraseña({_id:_id, Password:ContraseñaUno});
                MySwal.fire({
                  title: `${data.titulo}`,
                  text: `${data.respuesta}`,
                  icon: `${data.type}`,
                  customClass: {
                    confirmButton: 'btn btn-primary'
                  },
                  buttonsStyling: false}) 
                  setBloqueo(true);
           setbloqueodos(false);
           disparodeAccion({ type: "defaultvalue"});
                  toggle();
        } catch (error) {
          MySwal.fire({
            title: 'Error!',
            text: "Falto un campo",
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false})
            setBloqueo(true);
            setbloqueodos(false);
            disparodeAccion({ type: "defaultvalue"});
            toggle();
        }  
      } 
  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered'>
    <ModalHeader style={{backgroundColor:'#e6dff0', color:"#592a98"}}>Actulizar contraseña</ModalHeader>
    <ModalBody>
     <Row><Col>
     <Label className='form-label' for='EmailMulti'>
              Contraseña
            </Label>
            <Input type='password' name='Password' id='EmailMulti' placeholder='Contraseña'
            onChange={event => disparodeAccion({ type: "onchange", field: "ContraseñaUno", value: event.target.value })}
            value={ContraseñaUno}
            /><br/>
   {ContraseñaDos !== ContraseñaUno && <small style={{color:'red'}}> La contraseña no coincide</small>}
     <Label className='form-label' for='EmailMulti2'>
              Repetir contraseña
            </Label>
            <Input type='password' name='Password' id='EmailMulti2' placeholder=' Repetir Contraseña'
            onChange={event => disparodeAccion({ type: "onchange", field: "ContraseñaDos", value: event.target.value })}
            value={ContraseñaDos}
            />
     </Col></Row>
    </ModalBody>
    <ModalFooter>
    <Button  outline disabled={bloqueodos} style={{color:'#592a98'}} onClick={()=>{ disparodeAccion({ type: "defaultvalue"}); setBloqueo(true); toggle();  }}>
            Cancelar
          </Button>{' '}
          <Button  onClick={()=>{EditarData();}} disabled={bloqueo} style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}}>
            Agregar
          </Button>
    </ModalFooter>
  </Modal>
  )
} 