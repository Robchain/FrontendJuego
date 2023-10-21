import React, { useReducer, useState, useEffect } from 'react'
import Select from 'react-select';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Spinner } from 'reactstrap';
import { GuardadoDeVocabulario } from '../../service/Adminstrador/Vocabulario';
import { subidaIVocabulario } from '../../firebase/config';
import { llamadaDeLaApiCategoriaGet } from '../../service/Adminstrador/Categoria';
const BaseInicialFormulario = { Categoria: "", Palabra: "", Silaba: "", FileImagen: undefined, FileMuestra: undefined, FilePregunta: undefined }
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

export const ModalAgregarVocabulario = ({ modal, toggle }) => {
  const [loading, setLoading] = useState(false)
  const MySwal = withReactContent(Swal)
  const [bloqueoSecu, setBloqueoSecu] = useState(false);
  const [bloqueo, setBloqueo] = useState(true);
  const [{ Categoria, Palabra, Silaba, FileImagen, FileMuestra, FilePregunta }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario)
  const [vocabularioOpciones, setVocabularioOpciones] = useState([]);
  const llenadoDataInicial = async () => {
    const data = await llamadaDeLaApiCategoriaGet();
    setVocabularioOpciones(data);
  }
  useEffect(() => {
    llenadoDataInicial();
  }, [])

  useEffect(() => {
    if (Categoria.length > 0 && Palabra.length > 0 && Silaba.length > 0 && FileImagen !== undefined && FileMuestra !== undefined && FilePregunta !== undefined) {
      setBloqueo(false);
    } else {
      setBloqueo(true);
    }
  }, [Categoria, Palabra, Silaba, FileImagen, FileMuestra, FilePregunta])

  const uploadData = async () => {
    try {
      setBloqueoSecu(true);
      setBloqueo(true);
      setLoading(true);
      const fileImage = await subidaIVocabulario(FileImagen)
      const fileMuestra = await subidaIVocabulario(FileMuestra)
      const filePregunta = await subidaIVocabulario(FilePregunta)
      const data = await GuardadoDeVocabulario({ Categoria: Categoria, Palabra: Palabra, Silaba: Silaba, FileMuestra: fileMuestra, FileImagen: fileImage, FilePregunta: filePregunta });
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
      setBloqueo(false);
      setLoading(false);
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
      setBloqueo(false);
      setLoading(false);
      toggle();
    }
  }
  const handleChangeFileVideo = ({event,field }) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Verificar la extensión del archivo
      const allowedExtensions = ['mp4', 'avi', 'mov', 'mkv', 'wmv'];
      const fileNameParts = selectedFile.name.split('.');
      const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        // El archivo no tiene una extensión de imagen válida, puedes manejar el error aquí
        alert('Por favor, seleccione un archivo de video válido (mp4, avi, mov, mkv, wmv).');
        event.target.value = ''; // Limpia el input para eliminar el archivo no válido
        return;
      } 

      // Si llegamos aquí, el archivo es una imagen válida, puedes realizar la acción deseada
      // disparodeAccion({ type: "onchange", field: "FileBlanco", value: selectedFile });
      disparodeAccion({ type: "onchange", field: field, value: selectedFile })
    }
  };

  const handleChange = ({event,field }) => {
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
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered'>
      <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Agregar Vocabulario</ModalHeader>
      <ModalBody>
        <div className='mb-2'>
          <Label className='form-label' for='categoria'>Categoría</Label><br />
          <Select name="Categoria" options={vocabularioOpciones.map(i => { return { label: i.NombreCategoria, value: i._id } })} onChange={event => disparodeAccion({ type: "onchange", field: "Categoria", value: event.label })} isSearchable={true} />
          <Label className='form-label' for='palabra'>Palabra</Label>
          <Input type='text' id='palabra' name="Palabra" placeholder='Palabra' onChange={event => disparodeAccion({ type: "onchange", field: "Palabra", value: event.target.value.toUpperCase() })} value={Palabra} />
          <Label className='form-label' for='categoria'>Silaba</Label>
          <Input type='text' id='categoria' name="Silaba" placeholder='Silaba' onChange={event => disparodeAccion({ type: "onchange", field: "Silaba", value: event.target.value.toUpperCase() })} value={Silaba} />
          <Label className='form-label' for='inputImage'>
            Imagen
          </Label>
          <Input type='file' id='inputImage' name='FileImagen' onChange={e => handleChange({event:e, field:'FileImagen'})} />
          <Label className='form-label' for='inputVideoM'>
          Video respuesta
          </Label>
          <Input type='file' id='inputVideoM' name='FileMuestra' onChange={e => handleChangeFileVideo({event:e, field:'FileMuestra'})} />
          <Label className='form-label' for='inputask'>
            Video de pregunta
          </Label>
          <Input type='file' id='inputask' name='FilePregunta' onChange={e => handleChangeFileVideo({event:e, field:'FilePregunta'})} />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button outline style={{ color: '#592a98' }} onClick={() => { toggle(); disparodeAccion({ type: "reset" }); }} disabled={bloqueoSecu}>
          Cancelar
        </Button>&nbsp;&nbsp;
        <Button onClick={() => { uploadData() }} disabled={bloqueo} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
          {loading && <Spinner size="sm">
            Loading...
          </Spinner>}
          Agregar
        </Button>
      </ModalFooter>
    </Modal>
  )
}
