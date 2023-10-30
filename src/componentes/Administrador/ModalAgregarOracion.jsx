import React, { useEffect, useState, useReducer } from 'react'
import Select from 'react-select';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Label, Input, Spinner } from 'reactstrap';
import { llamadaGetApiCategoriaOracion } from '../../service/Adminstrador/Categoria';
import { GuardadodeOracionPost, listadoQuienImagen } from '../../service/Adminstrador/Oracion';
import { llamadaDeDataTodosActivos } from '../../service/Adminstrador/Vocabulario';
import { subidaIOracion } from '../../firebase/config';
const BaseInicialFormulario = { Categoria: "", Oracion: "", Verbo: "", Adverbio: undefined, Que: undefined, Sujeto: undefined, FileVideoPreguntaQue: undefined, FileVideoPreguntaQuien: undefined, FileVideoMuestra: undefined }
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
const optionsAdverbio = [{ value: "", label: "NINGUNO" }, { value: "UNO", label: "UNO" }, { value: "UN", label: "UN" }, { value: "DOS", label: "DOS" }, { value: "MUCHOS", label: "MUCHOS" }, { value: "MUCHAS", label: "MUCHAS" }]

export const ModalAgregarOracion = ({ modal, toggle }) => {
  const [{ Categoria, Oracion, Verbo, Adverbio,Sujeto, Que, FileVideoPreguntaQue, FileVideoPreguntaQuien, FileVideoMuestra }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario);
  const [checkboss, setCheckbos] = useState(false);
  const [ListadoImagenQuien, setListadoImagenQuien] = useState([]);
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal)
  const [bloqueoSecu, setBloqueoSecu] = useState(false);
  const [bloqueo, setBloqueo] = useState(true);
  const [listadoOption, setListadoOption] = useState([])
  const [listadoOptionsQue, setListadoOptionsQue] = useState([])
  const llamdaInicialListado = async () => {
    const data = await llamadaGetApiCategoriaOracion();
    setListadoOption(data);
  }
  const llamdaInicialListadoVocabulario = async () => {
    const data = await llamadaDeDataTodosActivos()
    setListadoOptionsQue(data);
  }
  const llamadainicialQuienImagen = async()=>{
    const data= await listadoQuienImagen();
    setListadoImagenQuien(data)
  }
  useEffect(() => {
    llamdaInicialListado();
    llamdaInicialListadoVocabulario();
  }, [])


  useEffect(() => {
    llamadainicialQuienImagen();
  }, [])
  
  const uploadData = async () => {
    try {
      setBloqueoSecu(true);
      setBloqueo(true);
      setLoading(true);
      // const fileSujeto = await subidaIOracion(FileSujetoImagen);
      const fileVideoPreguntaQue = await subidaIOracion(FileVideoPreguntaQue);
      const fileVideoMuestra = await subidaIOracion(FileVideoMuestra);
      const fileVideoPreguntaQuien = await subidaIOracion(FileVideoPreguntaQuien);
      const data = await GuardadodeOracionPost({ Categoria: Categoria, Oracion: Oracion, Verbo: Verbo, Adverbio: Adverbio, Sujeto: Sujeto, Que: Que, FileVideoPreguntaQue: fileVideoPreguntaQue, FileVideoPreguntaQuien: fileVideoPreguntaQuien, FileVideoMuestra: fileVideoMuestra })
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
  useEffect(() => {
    if (Categoria.length > 0 && Oracion.length > 0 && Verbo.length > 0 && Sujeto !== undefined && Que !== undefined && FileVideoPreguntaQue !== undefined && FileVideoPreguntaQuien !== undefined && FileVideoMuestra !== undefined) {
      if (Adverbio !== undefined && checkboss === true) {
        setBloqueo(false);
      } else if (Adverbio === undefined && checkboss === true) {
        setBloqueo(true);
      } else {
        setBloqueo(false);
      }
    } else {
      setBloqueo(true);
    }
  }, [Categoria, Oracion, Verbo, Adverbio, Sujeto, Que, FileVideoPreguntaQue, FileVideoPreguntaQuien, FileVideoMuestra])

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


  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered modal-lg'>
      <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Agregar Oración</ModalHeader>
      <ModalBody>
        <Row>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='Categoria'>Categoría</Label><br />
            <Select name="Categoria" isSearchable={true} options={listadoOption.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.NombreCategoria, value: i._id } })} onChange={event => disparodeAccion({ type: "onchange", field: "Categoria", value: event.label })} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='Sujeto' >
            Imagen del Quién
            </Label>
            {/* <Input type='file' id='FileSujetoImagen' name='FileSujetoImagen' onChange={e => disparodeAccion({ type: "onchange", field: "FileSujetoImagen", value: e.target.files[0] })} /> */}
            <Select name="Sujeto" isSearchable={true} options={ListadoImagenQuien.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Nombre, value: i.Imagen } })} onChange={event => disparodeAccion({ type: "onchange", field: "Sujeto", value: event })} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='Oracion'>
            Oración
            </Label>
            <Input type='text' maxLength={55} name='Oracion' id='Oracion' placeholder='Oración' onChange={event => disparodeAccion({ type: "onchange", field: "Oracion", value: event.target.value.toUpperCase() })} value={Oracion} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='FileVideoMuestra'>
            Video respuesta
            </Label>
            <Input type='file' id='FileVideoMuestra' name='FileVideoMuestra' onChange={e => handleChangeFileVideo({event:e, field:'FileVideoMuestra'}) } />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='Verbo'>
              Verbo
            </Label>
            <Input type='text' maxLength={15} name='Verbo' id='Verbo' placeholder='Verbo' onChange={event => disparodeAccion({ type: "onchange", field: "Verbo", value: event.target.value.toUpperCase() })} value={Verbo} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='FileVideoPreguntaQue'>
            Video pregunta Que
            </Label>
            <Input type='file' id='FileVideoPreguntaQue' name='FileVideoPreguntaQue' onChange={e => handleChangeFileVideo({event:e, field:'FileVideoPreguntaQue'}) } />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Input id="AdverbioCheck" name="check" type="checkbox" onChange={e => { setCheckbos(e.target.checked) }} /> <Label check for="AdverbioCheck" style={{ color: '#8b8b8c', fontWeight: "700" }} >Adverbio</Label>
            {checkboss && <div>
              <Select name="Adverbio" placeholder="Adverbio" isSearchable={false} options={optionsAdverbio} onChange={event => disparodeAccion({ type: "onchange", field: "Adverbio", value: checkboss ? event.value : undefined })} />
            </div>
            }
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='FileVideoPreguntaQuien'>
              Video pregunta Quien
            </Label>
            <Input type='file' id='FileVideoPreguntaQuien' name='FileVideoPreguntaQuien' onChange={e => handleChangeFileVideo({event:e, field:'FileVideoPreguntaQuien'}) } />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='Que'>
            Imágenes del Que
            </Label>
            <Select name="Que" isSearchable={true} options={listadoOptionsQue.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Palabra, value: i.FileImagen } })} onChange={event => disparodeAccion({ type: "onchange", field: "Que", value: event })} />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button outline style={{ color: '#592a98' }} disabled={bloqueoSecu} onClick={() => { disparodeAccion({ type: "reset" });setCheckbos(false); toggle();   }}>
          Cancelar
        </Button>&nbsp;&nbsp;
        <Button onClick={() => { uploadData(); }} disabled={bloqueo} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
          {loading && <Spinner size="sm">
            Loading...
          </Spinner>}   Agregar
        </Button>
      </ModalFooter>
    </Modal>
  )
}
