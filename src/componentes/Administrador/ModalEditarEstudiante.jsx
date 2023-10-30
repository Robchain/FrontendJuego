import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2'
import Select from 'react-select';
import withReactContent from 'sweetalert2-react-content';
import { useReducer } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Label, Col, Input, Spinner } from 'reactstrap';
import { subidaIPerfil } from '../../firebase/config';
import { MostrarCurso, MostrarParalelo, editarPersonaconImagen, editarPersonasinImagen } from '../../service/Adminstrador/Usuarios';

function llenadodeFormulario(state, action) {
  switch (action.type) {
    case 'onchange':
      return { ...state, [action.field]: action.value };
    default:
      throw new Error();
  }
}

export const ModalEditarEstudiante = ({ modal, toggle, dataBase }) => {
  const BaseInicialFormulario = { Nombre: dataBase.Nombre, Apellido: dataBase.Apellido, Identificacion: dataBase.Identificacion, FotoPerfil: undefined, Email: dataBase.Email, Usuario: dataBase.Usuario, TipoUsuario: dataBase.TipoUsuario, Curso: dataBase.Curso, Paralelo: dataBase.Paralelo }
  const [loading, setLoading] = useState(false);
  const [cursoData, setcursoData] = useState([]);
  const [paraleloData, setparaleloData] = useState([])
  const MySwal = withReactContent(Swal)
  const [bloqueoSecu, setBloqueoSecu] = useState(false);
  const [checkbosDos, setCheckbosDos] = useState(false);
  const [bloqueo, setbloqueo] = useState(true)
  const [{ Nombre, Apellido, Identificacion, Email, Usuario, TipoUsuario, FotoPerfil, Curso, Paralelo }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario)
  useEffect(() => {
    if (Nombre !== dataBase.Nombre || Apellido !== dataBase.Apellido || Identificacion !== dataBase.Identificacion || Email !== dataBase.Email || Usuario !== dataBase.Usuario || Curso !== dataBase.Curso || Paralelo !== dataBase.Paralelo) {
      setbloqueo(false);
    } else {
      setbloqueo(true);
    }
  }, [Nombre, Apellido, Identificacion, Email, Usuario, TipoUsuario, Curso, Paralelo, FotoPerfil])

  const dataCurso = async () => {

    const data = await MostrarCurso();
    setcursoData(data);
  }
  const dataParalelo = async () => {
    const data = await MostrarParalelo();
    setparaleloData(data)
  }
  useEffect(() => {
    dataCurso();
    dataParalelo();
  }, [])

  useEffect(() => {

    disparodeAccion({ type: "onchange", field: "Nombre", value: dataBase.Nombre })
    disparodeAccion({ type: "onchange", field: "Apellido", value: dataBase.Apellido })
    disparodeAccion({ type: "onchange", field: "Identificacion", value: dataBase.Identificacion })
    disparodeAccion({ type: "onchange", field: "Email", value: dataBase.Email })
    disparodeAccion({ type: "onchange", field: "Usuario", value: dataBase.Usuario })
    disparodeAccion({ type: "onchange", field: "TipoUsuario", value: dataBase.TipoUsuario })
    disparodeAccion({ type: "onchange", field: "Curso", value: dataBase.Curso })
    disparodeAccion({ type: "onchange", field: "Paralelo", value: dataBase.Paralelo })

    setCheckbosDos(false);
  }, [dataBase, modal])


  const onsubmit = async () => {
    try {
      let _id = dataBase._id;
      setBloqueoSecu(true);
      setbloqueo(true);
      setLoading(true);
      if (checkbosDos === true) {
        const url = await subidaIPerfil(FotoPerfil);
        const data = await editarPersonaconImagen({ _id: _id, Nombre: Nombre, Apellido: Apellido, Identificacion: Identificacion, Email: Email, Usuario: Usuario, TipoUsuario: TipoUsuario, Curso: Curso, Paralelo: Paralelo, FotoPerfil: url });
        MySwal.fire({
          title: `${data.titulo}`,
          text: `${data.respuesta}`,
          icon: `${data.type}`,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        })
      } else if (checkbosDos === false) {
        const data = await editarPersonasinImagen({ _id: _id, Nombre: Nombre, Apellido: Apellido, Identificacion: Identificacion, Email: Email, Usuario: Usuario, TipoUsuario: TipoUsuario, Curso: Curso, Paralelo: Paralelo });
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
      if (!bloqueo) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      //setData((prev)=>[...prev, {_id:_id,Nombre:Nombre, Apellido:Apellido, Identificacion:Identificacion, Email:Email, Usuario:Usuario, TipoUsuario:TipoUsuario, Curso:Curso, Paralelo:Paralelo}])
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
      if (!bloqueo) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  }
  const handleChangeFile = ({ event, field }) => {
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
  const handleChange = (event) => {
    // Aquí puedes agregar lógica para limitar la longitud máxima a 15 caracteres
    const inputValue = event.target.value.slice(0, 15);

    // Aquí puedes permitir números y letras, eliminando cualquier otro carácter no deseado
    const cleanedValue = inputValue.replace(/[^A-Za-z0-9]/g, '');

    disparodeAccion({ type: "onchange", field: event.target.name, value: cleanedValue })
  };
  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered modal-lg'>
      <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Editar Usuario</ModalHeader>
      <ModalBody>
        <Row>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameMulti'>
              Nombre
            </Label>
            <Input type='text' maxLength={25} name="Nombre" id='nameMulti' placeholder='Nombre' onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value.toUpperCase() })} defaultValue={dataBase.Nombre} value={Nombre} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='lastNameMulti'>
              Apellido
            </Label>
            <Input type='text' maxLength={25} name='Apellido' id='lastNameMulti' placeholder='Apellido' onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value.toUpperCase() })} defaultValue={dataBase.Apellido} value={Apellido} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='cityMulti'>
              Identificación
            </Label>
            <Input type='text' name='Identificacion' maxLength={15} id='cityMulti' placeholder='Identificación' onChange={handleChange} defaultValue={dataBase.Identificacion} value={Identificacion} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='CountryMulti'>
              Correo electrónico
            </Label>
            <Input type='text' name='Email' id='CountryMulti' maxLength={60} placeholder='Correo electrónico' onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value })} defaultValue={dataBase.Email} value={Email} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='CompanyMulti'>
              Usuario
            </Label>
            <Input type='text' maxLength={25} name='Usuario' id='CompanyMulti' placeholder='Usuario'
              onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value.toUpperCase() })} defaultValue={dataBase.Usuario} value={Usuario} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Input id="exampleCheck" name="check" type="checkbox" onChange={e => { setCheckbosDos(e.target.checked) }} />&nbsp;&nbsp;
            <Label check for="exampleCheck" style={{ color: '#8b8b8c', fontWeight: "700" }}> Editar imagen</Label>
            {checkbosDos && <><br />
              <Label className='form-label' for='inputFile'>
                Foto de perfil
              </Label>
              <Input type='file' id='inputFile' name='FotoPerfil' onChange={e => handleChangeFile({ event: e, field: "FotoPerfil" })} />
            </>}</Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='Curso'>
              Curso
            </Label>
            <Select name="Curso" isSearchable={false} defaultValue={{ value: dataBase.Curso, label: dataBase.Curso }} onChange={e => disparodeAccion({ type: "onchange", field: 'Curso', value: e.label })} options={cursoData.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Nombre, value: i.Nombre } })} />
            <Label className='form-label' for='Paralelo'>
              Paralelo
            </Label>
            <Select name="Paralelo" isSearchable={false} defaultValue={{ value: dataBase.Paralelo, label: dataBase.Paralelo }} onChange={e => disparodeAccion({ type: "onchange", field: 'Paralelo', value: e.label })} options={paraleloData.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Nombre, value: i.Nombre } })} />
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
        <Button outline disabled={bloqueoSecu} style={{ color: '#592a98' }} onClick={() => { toggle(); }}>
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
