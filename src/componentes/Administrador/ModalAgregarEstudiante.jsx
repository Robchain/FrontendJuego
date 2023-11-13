 import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { useReducer } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Label, Col, Input, Spinner } from 'reactstrap';
import { subidaIPerfil } from '../../firebase/config';
import { CrearUsuario, MostrarCurso, MostrarParalelo, signupsinfoto } from '../../service/Adminstrador/Usuarios';

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

export const ModalAgregarEstudiante = ({ modal, toggle  }) => {
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal)
  const [bloqueoSecu, setBloqueoSecu] = useState(false);
  const [cursoData, setcursoData] = useState([]);
  const [paraleloData, setparaleloData] = useState([])
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

const dataCurso = async ()=>{

  const data = await MostrarCurso();
  setcursoData(data);
}
const dataParalelo = async ()=>{
  const data = await MostrarParalelo();
  setparaleloData(data)
}
useEffect(() => {
  dataCurso();
  dataParalelo();
}, [])

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
    showConfirmButton:data.titulo !== "Excelente",
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
  if(!bloqueo){
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    }
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

  const handleChange = (event) => {
    // Aquí puedes agregar lógica para limitar la longitud máxima a 15 caracteres
    const inputValue = event.target.value.slice(0, 15);

    // Aquí puedes permitir números y letras, eliminando cualquier otro carácter no deseado
    const cleanedValue = inputValue.replace(/[^A-Za-z0-9]/g, '');

    disparodeAccion({ type: "onchange", field: event.target.name, value: cleanedValue })
  };
  const handleChangeFile = ({event,field }) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Verificar la extensión del archivo
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const fileNameParts = selectedFile.name.split('.');
      const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        // El archivo no tiene una extensión de imagen válida, puedes manejar el error aquí
        alert('Por favor, seleccione un archivo de imagen válido (jpg, jpeg, png, o gif).');
        event.target.value = ''; // Limpia el input para eliminar el archivo no válido
        return;
      } 

      // Si llegamos aquí, el archivo es una imagen válida, puedes realizar la acción deseada
      // disparodeAccion({ type: "onchange", field: "FileBlanco", value: selectedFile });
      disparodeAccion({ type: "onchange", field: field, value: selectedFile })
    }
  };
  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered modal-lg'>
      <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Agregar Usuario</ModalHeader>
      <ModalBody>
        <Row>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameMulti'>
              Nombre
            </Label>
            <Input type='text' maxLength={25} name="Nombre" id='nameMulti' placeholder='Nombre' onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value.toUpperCase() })} value={Nombre} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='lastNameMulti'>
              Apellido
            </Label>
            <Input type='text' name='Apellido' maxLength={25} id='lastNameMulti' placeholder='Apellido' onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value.toUpperCase() })} value={Apellido} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='cityMulti'>
            Identificación
            </Label>
            <Input type='text'  name='Identificacion' maxLength={15} id='cityMulti' placeholder='Identificación' onChange={handleChange} value={Identificacion} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='CountryMulti'>
            Correo Electrónico
            </Label>
            <Input type='text' maxLength={60} name='Email' id='CountryMulti' placeholder='Correo Electrónico' onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value })} value={Email} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='CompanyMulti'>
              Usuario
            </Label>
            <Input type='text' maxLength={25} name='Usuario' id='CompanyMulti' placeholder='Usuario' 
            onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value.toUpperCase() })} value={Usuario} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='EmailMulti'>
              Contraseña
            </Label> 
            <p style={{lineHeight:'2px', fontWeight:'bold'}}><small>Mínimo de 6 caracteres</small></p>
            <Input type='password' name='Password' id='EmailMulti' placeholder='Contraseña'
            onChange={event =>{setContraseñaUno(event.target.value)}} 
            value={contraseñaUno}
            />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='inputFile'>
              Foto de perfil
            </Label>
            <Input type='file' id='inputFile' name='FotoPerfil' onChange={e => handleChangeFile({event:e, field:'FotoPerfil'}) } />
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
            <Select name="Curso" isSearchable={false} onChange={e => disparodeAccion({ type: "onchange", field: 'Curso', value: e.label }) } options={cursoData.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Nombre, value: i._id } })}  />
            <Label className='form-label' for='Paralelo'>
              Paralelo
            </Label>
            <Select name="Paralelo" isSearchable={false} onChange={e => disparodeAccion({ type: "onchange", field: 'Paralelo', value: e.label }) } options={paraleloData.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Nombre, value: i._id } })}  />
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
            /> Estudiante</Label><br />
            <Label>
              <Input
                type='radio'
                name="TipoUsuario"
                value="DOCENTE"
                onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value })}
              checked={TipoUsuario === "DOCENTE"}
              /> Docente
            </Label>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button outline disabled={bloqueoSecu} style={{ color: '#592a98' }} onClick={()=>{toggle();disparodeAccion({ type: "reset" }); setContraseñaDos(""); setContraseñaUno("");}}>
          Cancelar
        </Button>&nbsp;&nbsp;
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
