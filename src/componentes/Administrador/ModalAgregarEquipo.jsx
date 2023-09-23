import React, { useEffect, useReducer, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Spinner } from 'reactstrap';
import { subidaIEquipo } from '../../firebase/config';
import { PostCrearEquipo } from '../../service/Adminstrador/Equipo';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
const BaseInicialFormulario = { Nombre: "", Imagen:null};
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
export const ModalAgregarEquipo = ({modal, toggle}) => {
  const MySwal = withReactContent(Swal)
  const [{Nombre, Imagen}, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario);
  const [bloqueo, setBloqueo] = useState(true);
  const [bloqueoSecu, setBloqueoSecu] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
      if(Nombre.length > 2 && Imagen !== null){
        setBloqueo(false);
      }else{
        setBloqueo(true);
      }

  }, [Nombre, Imagen])


  
  
  const uploaddata = async ()=>{
    try {
      setBloqueoSecu(true); 
      setBloqueo(true);
      setLoading(true);
      const urlImagen = await subidaIEquipo(Imagen)
      const data = await  PostCrearEquipo({Imagen:urlImagen,Nombre:Nombre });
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false}) 
      setBloqueoSecu(false);
      setBloqueo(true);
      setLoading(false);
      toggle();
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: "No se puede crear",
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false})
        setBloqueoSecu(false);
        setBloqueo(true);
        setLoading(false);
        toggle();
    }


  }
  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered '>
    <ModalHeader style={{backgroundColor:'#e6dff0', color:"#592a98"}}>Agregar Equipo</ModalHeader>
    <ModalBody>
    <div className='mb-2'>
              <Label className='form-label' for='Nombre'>Nombre</Label>
              <Input type='text' id='Nombre' name="Nombre" placeholder='Nombre' 
              value={Nombre}
             onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value.toUpperCase() })}
              />
              <Label className='form-label' for='Imagen'>
              Foto Del Equipo
            </Label>
            <Input type='file' id='Imagen' name='Imagen' onChange={event => disparodeAccion({ type: "onchange", field: "Imagen", value: event.target.files[0] })} />
            </div>
    </ModalBody>
    <ModalFooter>
    <Button  outline style={{color:'#592a98'}} disabled={bloqueoSecu} onClick={()=>{ disparodeAccion({type: "reset"});toggle();}}>
            Cancelar
          </Button>&nbsp;&nbsp;
          <Button  onClick={()=>{uploaddata()}} disabled={bloqueo} style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}}>
          { loading && <Spinner size="sm">
    Loading...
  </Spinner>  }
            Agregar
          </Button>
    </ModalFooter>
  </Modal>
  )
}
