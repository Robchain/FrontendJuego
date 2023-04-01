import React, { useEffect, useReducer, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Spinner } from 'reactstrap';
import { subidaIEquipo } from '../../firebase/config';
import { EditarconImagen, EditarsinImagen } from '../../service/Adminstrador/Equipo';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
function llenadodeFormulario(state, action) {
  switch (action.type) {
    case 'onchange':
      return { ...state, [action.field]: action.value };
    default:
      throw new Error();
  }
}
export const ModalEditarEquipo = ({modal, toggle,baseData}) => {
    const BaseInicialFormulario = { Nombre: baseData.Nombre, Imagen:baseData.Imagen};
  const MySwal = withReactContent(Swal)
  const [{Nombre, Imagen}, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario);
  const [bloqueo, setBloqueo] = useState(true);
  const [checkbosDos, setCheckbosDos] = useState(false);
  const [bloqueoSecu, setBloqueoSecu] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
      if(Nombre !== baseData.Nombre  ){
             setBloqueo(false);
        
      }else if(Nombre === baseData.Nombre){
        if(checkbosDos === true){
            setBloqueo(false);
        }else if(checkbosDos === false){
            setBloqueo(true)
        }
      }
  }, [Nombre, Imagen])
  
  const uploaddata = async ()=>{
    try {
        let _id = baseData._id;
      setBloqueoSecu(true); 
      setBloqueo(true);
      setLoading(true);
    if(checkbosDos === true){
      const urlImagen = await subidaIEquipo(Imagen)
      const data = await  EditarconImagen({_id:_id,Imagen:urlImagen,Nombre:Nombre });
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false}) 
     }else if(checkbosDos === false){
        const data = await  EditarsinImagen({_id:_id,Nombre:Nombre });
        MySwal.fire({
          title: `${data.titulo}`,
          text: `${data.respuesta}`,
          icon: `${data.type}`,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false}) 
      }
      setBloqueoSecu(false);
      setBloqueo(true);
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
        buttonsStyling: false})
        setBloqueoSecu(false);
        setBloqueo(true);
        setLoading(false);
        toggle();
    }
  }
  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered '>
    <ModalHeader style={{backgroundColor:'#e6dff0', color:"#592a98"}}>Editar Equipo</ModalHeader>
    <ModalBody>
    <div className='mb-2'>
              <Label className='form-label' for='Nombre'>Nombre</Label>
              <Input type='text' id='Nombre' name="Nombre" placeholder='Nombre' 
             onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value.toUpperCase() })}
              defaultValue={baseData.Nombre}
              />
              <Input id="exampleCheck"    name="check" type="checkbox"   onChange={e => { setCheckbosDos(e.target.checked) }} />{" "}
                <Label  check for="exampleCheck" style={{ color: '#8b8b8c', fontWeight: "700" }}> Editar Imagene</Label>
                {checkbosDos && <> <br/>  <Label className='form-label' for='Imagen'>
              Foto Del Equipo
            </Label>
            <Input type='file' id='Imagen' name='Imagen' onChange={event => disparodeAccion({ type: "onchange", field: "Imagen", value: event.target.files[0] })} />
            </>
   } </div>
    </ModalBody>
    <ModalFooter>
    <Button  outline style={{color:'#592a98'}} disabled={bloqueoSecu} onClick={() => { setCheckbosDos(false); toggle();  }}>
            Cancelar
          </Button>{' '}
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
