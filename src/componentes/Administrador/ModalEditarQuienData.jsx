import React, { useEffect, useReducer, useState } from 'react'
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { ImagenEditarQuien, ImagenEditarQuienSinImagen } from '../../service/Adminstrador/Oracion';
import { subidaQuienImagen } from '../../firebase/config';
import { responseformualrio } from '../../helpers';
const imageName = {
  nameFile: '',
}
function llenadodeFormulario(state, action) {
  switch (action.type) {
    case 'onchange':
      return { ...state, [action.field]: action.value };
    default:
      throw new Error();
  }
}
export const ModalEditarQuienData = ({ modal, toggle, baseData }) => {
  const BaseInicialFormulario = { Nombre: baseData.Nombre, Imagen: baseData.Imagen };
  const MySwal = withReactContent(Swal)
  const [{ Nombre, Imagen }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario);
  const [bloqueo, setBloqueo] = useState(true);
  const [checkbosDos, setCheckbosDos] = useState(false);
  const [bloqueoSecu, setBloqueoSecu] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("Imagen", Imagen);

    if (checkbosDos === true && (!Imagen || Imagen.length == 0)) {
      setBloqueo(true)
      return;
    }

    if (Nombre !== baseData.Nombre && Nombre.trim() != '' && Nombre) {
      setBloqueo(false);

    } else if (Nombre === baseData.Nombre) {
      if (checkbosDos === true) {
        if (!Imagen || Imagen == undefined) {
          setBloqueo(true)
          return;
        }
        setBloqueo(false);
      } else if (checkbosDos === false) {
        setBloqueo(true)
      }
    } else {
      setBloqueo(true)
    }
  }, [Nombre, Imagen])

  useEffect(() => {

    if (baseData && baseData.Imagen) {
      const fileName = baseData.Imagen.split("/").pop().split("%2F").pop().split("?")[0];
      imageName.nameFile = fileName;
    }

    disparodeAccion({ type: "onchange", field: "Nombre", value: baseData.Nombre })
    setCheckbosDos(false);

  }, [baseData, modal])


  const uploaddata = async () => {
    try {
      let _id = baseData._id;
      setBloqueoSecu(true);
      setBloqueo(true);
      setLoading(true);
      if (checkbosDos === true) {
        const urlImagen = await subidaQuienImagen(Imagen)
        const data = await ImagenEditarQuien({ _id: _id, Imagen: urlImagen, Nombre: Nombre });
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
        const data = await ImagenEditarQuienSinImagen({ _id: _id, Nombre: Nombre });
        MySwal.fire({
          title: `${data.titulo}`,
          text: `${data.respuesta}`,
          showConfirmButton: data.titulo !== "Excelente",
          icon: `${data.type}`,
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

      // Si llegamos aquí, el archivo es una imagen válida, puedes realizar la acción deseada
      // disparodeAccion({ type: "onchange", field: "FileBlanco", value: selectedFile });
      disparodeAccion({ type: "onchange", field: field, value: selectedFile })
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered '>
      <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Editar Sujetos</ModalHeader>
      <ModalBody>
        <div className='mb-2'>
          <Label className='form-label' for='Nombre'>Sujeto</Label>
          <Input type='text' maxLength={15} id='Nombre' name="Nombre" placeholder='Nombre'
            onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value.toUpperCase() })}
            defaultValue={baseData.Nombre}
            value={Nombre}
          />
          <Input id="exampleCheck" name="check" type="checkbox" onChange={e => { setCheckbosDos(e.target.checked) }} />&nbsp;&nbsp;
          <Label check for="exampleCheck" style={{ color: '#8b8b8c', fontWeight: "700" }}> Editar imagen</Label>
          {checkbosDos && <> <br />  <Label className='form-label' for='Imagen'>
            Foto Del Sujeto
          </Label>
            <div>
              <Label className='form-label' for='inputVideoM' style={{ color: '#5E319B' }}>
                {
                  imageName && imageName.nameFile &&
                  imageName.nameFile
                }
              </Label>
            </div>
            <Input type='file' id='Imagen' name='Imagen' onChange={event => handleChange({ event: event, field: 'Imagen' })} />
          </>
          } </div>
      </ModalBody>
      <ModalFooter>
        <Button outline style={{ color: '#592a98' }} disabled={bloqueoSecu} onClick={() => { toggle(); }}>
          Cancelar
        </Button>&nbsp;&nbsp;
        <Button onClick={() => { uploaddata() }} disabled={bloqueo} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
          {loading && <Spinner size="sm">
            Loading...
          </Spinner>}
          Editar
        </Button>
      </ModalFooter>
    </Modal>
  )
}
