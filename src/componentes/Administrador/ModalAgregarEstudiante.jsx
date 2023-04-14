import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { useReducer } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Label, Col, Input, Spinner } from 'reactstrap';
import { subidaIPerfil } from '../../firebase/config';
import { CrearUsuario, signupsinfoto } from '../../service/Adminstrador/Usuarios';

const BaseInicialFormulario = { Nombre: "", Apellido: "", Identificacion: "",FotoPerfil:undefined, Email: "", Usuario: "", Password: "", TipoUsuario: "", Curso: "", Paralelo: "" }
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

export const ModalAgregarEstudiante = ({ modal, toggle }) => {
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal)
  const [bloqueoSecu, setBloqueoSecu] = useState(false);
    const [contraseñaUno, setContraseñaUno] = useState("");
    const [contraseñaDos, setContraseñaDos] = useState("");
  const [bloqueo, setbloqueo] = useState(true)
  const [{ Nombre, Apellido, Identificacion, Email, Usuario, Password, TipoUsuario,FotoPerfil, Curso, Paralelo }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario)
  useEffect(() => {
    if (Nombre.length > 0 && Apellido.length > 0 && Identificacion.length > 0 && Email.length > 0 && Usuario.length > 0 && (contraseñaUno === contraseñaDos) && contraseñaDos.length>5 && contraseñaUno.length>5) {
      setbloqueo(false);
    }else{
      setbloqueo(true);
    }
  }, [Nombre, Apellido, Identificacion, Email, Usuario, Password, TipoUsuario, Curso, Paralelo,contraseñaUno,contraseñaUno,FotoPerfil])

  const onsubmit = async ()=>{
try {
  setBloqueoSecu(true);
  setbloqueo(true);
  setLoading(true);
  let data ;
  if(FotoPerfil === undefined){
  data =  await  signupsinfoto({Nombre:Nombre, Apellido:Apellido, Identificacion:Identificacion, Email:Email, Usuario:Usuario, Password:contraseñaUno, TipoUsuario:TipoUsuario, Curso:Curso, Paralelo:Paralelo});
  }else {
    const url = await subidaIPerfil(FotoPerfil);
    data = await CrearUsuario({Nombre:Nombre, Apellido:Apellido, Identificacion:Identificacion, Email:Email, Usuario:Usuario, Password:contraseñaUno, TipoUsuario:TipoUsuario, Curso:Curso, Paralelo:Paralelo,FotoPerfil:url});
  }
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
  setbloqueo(false);
  setLoading(false);
  disparodeAccion({ type: "reset" });
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
  disparodeAccion({ type: "reset" });
  toggle();
}
  }

  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered modal-lg'>
      <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Agregar Usuario</ModalHeader>
      <ModalBody>
        <Row>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameMulti'>
              Nombre
            </Label>
            <Input type='text' name="Nombre" id='nameMulti' placeholder='Nombre' onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value })} value={Nombre} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='lastNameMulti'>
              Apellido
            </Label>
            <Input type='text' name='Apellido' id='lastNameMulti' placeholder='Apellido' onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value })} value={Apellido} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='cityMulti'>
              Identificacion
            </Label>
            <Input type='text' name='Identificacion' id='cityMulti' placeholder='Identificacion' onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value })} value={Identificacion} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='CountryMulti'>
              Correo Electronico
            </Label>
            <Input type='text' name='Email' id='CountryMulti' placeholder='Correo Electronico' onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value })} value={Email} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='CompanyMulti'>
              Usuario
            </Label>
            <Input type='text' name='Usuario' id='CompanyMulti' placeholder='Usuario' 
            onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value })} value={Usuario} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='EmailMulti'>
              Contraseña
            </Label>
            <Input type='password' name='Password' id='EmailMulti' placeholder='Contraseña'
            onChange={event =>{setContraseñaUno(event.target.value)}} 
            value={contraseñaUno}
            />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='inputFile'>
              Foto de perfil
            </Label>
            <Input type='file' id='inputFile' name='FotoPerfil' onChange={e => disparodeAccion({ type: "onchange", field: 'FotoPerfil', value: e.target.files[0] }) } />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='EmailMulti2'>
              Repetir Contraseña
            </Label>
            <Input type='password' name='Password' id='EmailMulti2' placeholder=' Repetir Contraseña'
            onChange={event =>{setContraseñaDos(event.target.value)}} 
            value={contraseñaDos}
            />
            <br/>
            {contraseñaUno !== contraseñaDos && <small style={{color:'red'}}> la contraseña no coincide</small>}
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='Curso'>
              Curso
            </Label>
            <Select name="Curso" isSearchable={false} onChange={e => disparodeAccion({ type: "onchange", field: 'Curso', value: e.value }) } options={[{value:"PRIMERO", label:"PRIMERO"},{value:"SEGUNDO", label:"SEGUNDO"},{value:"TERCERO", label:"TERCERO"},]} />
            <Label className='form-label' for='Paralelo'>
              Paralelo
            </Label>
            <Select name="Paralelo" isSearchable={false} onChange={e => disparodeAccion({ type: "onchange", field: 'Paralelo', value: e.value }) } options={[{value:"A", label:"A"},{value:"B", label:"B "},{value:"C", label:"C"},{value:"D", label:"D"},{value:"E", label:"E"},{value:"F", label:"F"},]}  />
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
            checked={TipoUsuario === "ESTUDIANTE"}
            />Estudiante</Label><br />
            <Label>
              <Input
                type='radio'
                name="TipoUsuario"
                value="MAESTRO"
                onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value })}
              checked={TipoUsuario === "MAESTRO"}
              />Maestro
            </Label>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button outline disabled={bloqueoSecu} style={{ color: '#592a98' }} onClick={()=>{toggle();disparodeAccion({ type: "reset" }); setContraseñaDos(""); setContraseñaUno("");}}>
          Cancelar
        </Button>{' '}
        <Button disabled={bloqueo} onClick={() => { onsubmit() }} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
        {loading && <Spinner size="sm">
            Loading...
          </Spinner>} 
          Agregar
        </Button>
      </ModalFooter>
    </Modal>
  )
}
