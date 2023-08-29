import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2'
import Select from 'react-select';
import withReactContent from 'sweetalert2-react-content';
import { useReducer } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Label, Col, Input, Spinner } from 'reactstrap';
import { subidaIPerfil } from '../../firebase/config';
import { editarPersonaconImagen, editarPersonasinImagen } from '../../service/Adminstrador/Usuarios';

function llenadodeFormulario(state, action) {
  switch (action.type) {
    case 'onchange':
      return { ...state, [action.field]: action.value };
    default:
      throw new Error();
  }
}

export const ModalEditarEstudiante = ({ modal, toggle, dataBase }) => {
    const BaseInicialFormulario = { Nombre: dataBase.Nombre, Apellido: dataBase.Apellido, Identificacion: dataBase.Identificacion,FotoPerfil:undefined, Email:dataBase.Email, Usuario: dataBase.Usuario, TipoUsuario: dataBase.TipoUsuario, Curso:  dataBase.Curso, Paralelo:  dataBase.Paralelo }
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal)
  const [bloqueoSecu, setBloqueoSecu] = useState(false);
  const [checkbosDos, setCheckbosDos] = useState(false);
  const [bloqueo, setbloqueo] = useState(true)
  const [{ Nombre, Apellido, Identificacion, Email, Usuario, TipoUsuario,FotoPerfil, Curso, Paralelo }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario)
  useEffect(() => {
    if (Nombre!== dataBase.Nombre || Apellido !== dataBase.Apellido || Identificacion !== dataBase.Identificacion || Email !== dataBase.Email || Usuario!== dataBase.Usuario ) {
      setbloqueo(false);
    }else{
      setbloqueo(true);
    }
  }, [Nombre, Apellido, Identificacion, Email, Usuario, TipoUsuario, Curso, Paralelo,FotoPerfil])

  const onsubmit = async ()=>{
try {
    let _id=dataBase._id;
  setBloqueoSecu(true);
  setbloqueo(true);
  setLoading(true);
  if(checkbosDos === true){
      const url = await subidaIPerfil(FotoPerfil);
 const data = await  editarPersonaconImagen({_id:_id,Nombre:Nombre, Apellido:Apellido, Identificacion:Identificacion, Email:Email, Usuario:Usuario, TipoUsuario:TipoUsuario, Curso:Curso, Paralelo:Paralelo,FotoPerfil:url});
  MySwal.fire({
    title: `${data.titulo}`,
    text: `${data.respuesta}`,
    icon: `${data.type}`,
    customClass: {
      confirmButton: 'btn btn-primary'
    },
    buttonsStyling: false
  })
}else if(checkbosDos === false){
    const data = await  editarPersonasinImagen({_id:_id,Nombre:Nombre, Apellido:Apellido, Identificacion:Identificacion, Email:Email, Usuario:Usuario, TipoUsuario:TipoUsuario, Curso:Curso, Paralelo:Paralelo});
    MySwal.fire({
      title: `${data.titulo}`,
      text: `${data.respuesta}`,
      icon: `${data.type}`,
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    })
}
  setBloqueoSecu(false);
  setbloqueo(false);
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
  setbloqueo(false);
  setLoading(false);
  toggle();
}
  }

  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered modal-lg'>
      <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Editar Usuario</ModalHeader>
      <ModalBody>
        <Row>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameMulti'>
              Nombre
            </Label>
            <Input type='text' name="Nombre" id='nameMulti' placeholder='Nombre' onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value })} defaultValue={dataBase.Nombre} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='lastNameMulti'>
              Apellido
            </Label>
            <Input type='text' name='Apellido' id='lastNameMulti' placeholder='Apellido' onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value })} defaultValue={dataBase.Apellido} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='cityMulti'>
              Identificacion
            </Label>
            <Input type='text' name='Identificacion' id='cityMulti' placeholder='Identificacion' onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value })} defaultValue={dataBase.Identificacion} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='CountryMulti'>
              Correo Electronico
            </Label>
            <Input type='text' name='Email' id='CountryMulti' placeholder='Correo Electronico' onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value })} defaultValue={dataBase.Email} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='CompanyMulti'>
              Usuario
            </Label>
            <Input type='text' name='Usuario' id='CompanyMulti' placeholder='Usuario' 
            onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value })} defaultValue={dataBase.Usuario} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <Input id="exampleCheck"    name="check" type="checkbox"   onChange={e => { setCheckbosDos(e.target.checked) }} />{" "}
                <Label  check for="exampleCheck" style={{ color: '#8b8b8c', fontWeight: "700" }}> Editar Imagene</Label>
                {checkbosDos &&<><br/>
            <Label className='form-label' for='inputFile'>
              Foto de perfil
            </Label>
            <Input type='file' id='inputFile' name='FotoPerfil' onChange={e => disparodeAccion({ type: "onchange", field: 'FotoPerfil', value: e.target.files[0] }) } />
            </>}</Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='Curso'>
              Curso
            </Label>
            <Select name="Curso" isSearchable={false} defaultValue={{value:dataBase.Curso,label:dataBase.Curso}} onChange={e => disparodeAccion({ type: "onchange", field: 'Curso', value: e.value }) } options={[{value:"PRIMERO", label:"PRIMERO"},{value:"SEGUNDO", label:"SEGUNDO"},{value:"TERCERO", label:"TERCERO"},]} />
            <Label className='form-label' for='Paralelo'>
              Paralelo
            </Label>
            <Select name="Paralelo" isSearchable={false} defaultValue={{value:dataBase.Paralelo,label:dataBase.Paralelo}} onChange={e => disparodeAccion({ type: "onchange", field: 'Paralelo', value: e.value }) } options={[{value:"A", label:"A"},{value:"B", label:"B "},{value:"C", label:"C"},{value:"D", label:"D"},{value:"E", label:"E"},{value:"F", label:"F"},]}  />
          </Col>     
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='EmailMulti'>
              Tipo Usuario
            </Label><br />
            <Label><Input
              type='radio'
              name="TipoUsuario"
              value="ESTUDIANTE"
              onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value })}
            defaultChecked={dataBase.TipoUsuario === "ESTUDIANTE"}
            />Estudiante</Label><br />
            <Label>
              <Input
                type='radio'
                name="TipoUsuario"
                value="DOCENTE"
                onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value })}
              defaultChecked={dataBase.TipoUsuario === "DOCENTE"}
              />Docente
            </Label>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button outline disabled={bloqueoSecu} style={{ color: '#592a98' }} onClick={()=>{toggle(); setCheckbosDos(false);}}>
          Cancelar
        </Button>&nbsp;&nbsp;
        <Button disabled={bloqueo} onClick={() => { onsubmit() }} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
        {loading && <Spinner size="sm">
            Loading...
          </Spinner>} 
          Editar
        </Button>
      </ModalFooter>
    </Modal>
  )
}
