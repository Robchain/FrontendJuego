import React, { useEffect, useReducer, useState, useRef } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Spinner } from 'reactstrap';
import { subidaIEquipo } from '../../firebase/config';
import { EditarconImagen, EditarsinImagen } from '../../service/Adminstrador/Equipo';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { responseformualrio } from '../../helpers';
function llenadodeFormulario(state, action) {
  switch (action.type) {
    case 'onchange':
      return { ...state, [action.field]: action.value };
    default:
      throw new Error();
  }
}
export const ModalEditarEquipo = ({ modal, toggle, baseData }) => {
  const BaseInicialFormulario = { Nombre: baseData.Nombre, Imagen: baseData.Imagen };
  const MySwal = withReactContent(Swal)
  const [{ Nombre, Imagen }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario);
  const [bloqueo, setBloqueo] = useState(true);
  const [checkbosDos, setCheckbosDos] = useState(false);
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState(''); // nombre por defecto
  const [bloqueoSecu, setBloqueoSecu] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (Nombre && Nombre !== baseData.Nombre && Nombre.trim() != '') {
      setBloqueo(false);

    } else if (Nombre === baseData.Nombre) {
      if (checkbosDos === true && Nombre && Nombre.trim() != '') {
        setBloqueo(false);
      } else if (checkbosDos === false) {
        setBloqueo(true)
      }
    } else {
      setBloqueo(true)
    }
  }, [Nombre, Imagen])

  useEffect(() => {
    disparodeAccion({ type: "onchange", field: "Nombre", value: baseData.Nombre })

    console.log(baseData)
    if (baseData.Imagen) {
      const fileName = baseData.Imagen.split("/").pop().split("%2F").pop().split("?")[0];
      setFileName(fileName); //seteo de nombre a mostrar del archivo
    }
  }, [baseData, modal]);


  const uploaddata = async () => {
    try {
      let _id = baseData._id;
      setBloqueoSecu(true);
      setBloqueo(true);
      setLoading(true);
      if (checkbosDos === true) {
        const urlImagen = await subidaIEquipo(Imagen)
        const data = await EditarconImagen({ _id: _id, Imagen: urlImagen, Nombre: Nombre });
        MySwal.fire({
          title: `${data.titulo}`,
          text: `${data.respuesta}`,
          icon: `${data.type}`,
          showConfirmButton: data.titulo !== "Excelente",
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        })
      } else if (checkbosDos === false) {
        const data = await EditarsinImagen({ _id: _id, Nombre: Nombre });
        MySwal.fire({
          title: `${data.titulo}`,
          text: `${data.respuesta}`,
          icon: `${data.type}`,
          showConfirmButton: data.titulo !== "Excelente",
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        })
      }
      setBloqueoSecu(false);
      setBloqueo(true);
      setLoading(false);
      toggle();
      if (!bloqueo) {
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
      setBloqueoSecu(false);
      setBloqueo(true);
      setLoading(false);
      toggle();
    }
  }

  const handleChange = ({ event, field }) => {
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
      setFileName(event.target.files[0].name);
      // Si llegamos aquí, el archivo es una imagen válida, puedes realizar la acción deseada
      // disparodeAccion({ type: "onchange", field: "FileBlanco", value: selectedFile });
      disparodeAccion({ type: "onchange", field: field, value: selectedFile })
    }
  };
  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click(); // <-- Esto dispara manualmente el click
    }
  };
  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered '>
      <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Editar equipo</ModalHeader>
      <ModalBody>
        <div className='mb-2'>
          <Label
            className='form-label'
            for='Nombre'>
            Nombre
          </Label>
          <Input
            type='text'
            maxLength={20}
            id='Nombre'
            name="Nombre"
            placeholder='Nombre'
            onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value.toUpperCase() })}
            defaultValue={baseData.Nombre}
            value={Nombre}
          />
          <Input id="exampleCheck"
            name="check"
            type="checkbox"
            onChange={e => { setCheckbosDos(e.target.checked) }} />
          &nbsp;&nbsp;
          <Label
            check
            for="exampleCheck"
            style={{ color: '#8b8b8c', fontWeight: "700" }}>
            Editar imagen
          </Label>
          {checkbosDos && <> <br />
            <Label
              className='form-label'
              for='Imagen'>
              Foto Del Equipo
            </Label>
            {/* <Input type='file'
              id='Imagen'
              name='Imagen'
              onChange={event => handleChange({ event: event, field: 'Imagen' })}
            /> */}
            <div className="d-flex align-items-center">
              <Input
                type="file"
                id="inputFile"
                name="FotoPerfil"
                // onChange={handleFileChange}
                onChange={event => handleChange({ event: event, field: 'Imagen' })}
                innerRef={inputRef}
                style={{ display: 'none' }}
              />
              <Button className='colorBotonPrincipal' onClick={handleButtonClick} >
                Seleccionar archivo
              </Button>
              <span style={{ marginLeft: '10px' }}>{fileName}</span>
            </div>
          </>
          } </div>
      </ModalBody>
      <ModalFooter>
        <Button
          outline
          style={{ color: '#592a98' }}
          disabled={bloqueoSecu}
          onClick={() => { setCheckbosDos(false); toggle(); }}>
          Cancelar
        </Button>
        &nbsp;&nbsp;
        <Button
          onClick={() => { uploaddata() }}
          disabled={bloqueo}
          style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
          {loading && <Spinner
            size="sm">
            Loading...
          </Spinner>}
          Editar
        </Button>
      </ModalFooter>
    </Modal>
  )
}
