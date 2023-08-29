import React, { useEffect, useState, useReducer } from 'react'
import Select from 'react-select';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Label, Input, Spinner } from 'reactstrap';
import { llamadaGetApiCategoriaOracion } from '../../service/Adminstrador/Categoria';
import { GuardadodeOracionPost } from '../../service/Adminstrador/Oracion';
import { llamadaDeDataTodosActivos } from '../../service/Adminstrador/Vocabulario';
import { subidaIOracion } from '../../firebase/config';
const BaseInicialFormulario = { Categoria: "", Oracion: "", Verbo: "", Adverbio: undefined, FileSujetoImagen: undefined, FileAdjetivoImagen: undefined, FileVideoPreguntaQue: undefined, FileVideoPreguntaQuien: undefined, FileVideoMuestra: undefined }
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
  const [{ Categoria, Oracion, Verbo, Adverbio, FileSujetoImagen, FileAdjetivoImagen, FileVideoPreguntaQue, FileVideoPreguntaQuien, FileVideoMuestra }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario);
  const [checkboss, setCheckbos] = useState(false);
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
  useEffect(() => {
    llamdaInicialListado();
    llamdaInicialListadoVocabulario();
  }, [])
  const uploadData = async () => {
    try {
      setBloqueoSecu(true);
      setBloqueo(true);
      setLoading(true);
      const fileSujetoImagen = await subidaIOracion(FileSujetoImagen);
      const fileVideoPreguntaQue = await subidaIOracion(FileVideoPreguntaQue);
      const fileVideoMuestra = await subidaIOracion(FileVideoMuestra);
      const fileVideoPreguntaQuien = await subidaIOracion(FileVideoPreguntaQuien);
      const data = await GuardadodeOracionPost({ Categoria: Categoria, Oracion: Oracion, Verbo: Verbo, Adverbio: Adverbio, FileSujetoImagen: fileSujetoImagen, FileAdjetivoImagen: FileAdjetivoImagen, FileVideoPreguntaQue: fileVideoPreguntaQue, FileVideoPreguntaQuien: fileVideoPreguntaQuien, FileVideoMuestra: fileVideoMuestra })
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
    if (Categoria.length > 0 && Oracion.length > 0 && Verbo.length > 0 && FileSujetoImagen !== undefined && FileAdjetivoImagen !== undefined && FileVideoPreguntaQue !== undefined && FileVideoPreguntaQuien !== undefined && FileVideoMuestra !== undefined) {

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
  }, [Categoria, Oracion, Verbo, Adverbio, FileSujetoImagen, FileAdjetivoImagen, FileVideoPreguntaQue, FileVideoPreguntaQuien, FileVideoMuestra])


  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered modal-lg'>
      <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Agregar Oracion</ModalHeader>
      <ModalBody>
        <Row>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='Categoria'>Categoría</Label><br />
            <Select name="Categoria" isSearchable={false} options={listadoOption.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.NombreCategoria, value: i._id } })} onChange={event => disparodeAccion({ type: "onchange", field: "Categoria", value: event.label })} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='FileSujetoImagen' >
            Imagen del quien
            </Label>
            <Input type='file' id='FileSujetoImagen' name='FileSujetoImagen' onChange={e => disparodeAccion({ type: "onchange", field: "FileSujetoImagen", value: e.target.files[0] })} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='Oracion'>
              Oracion
            </Label>
            <Input type='text' name='Oracion' id='Oracion' placeholder='Oracion' onChange={event => disparodeAccion({ type: "onchange", field: "Oracion", value: event.target.value.toUpperCase() })} value={Oracion} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='FileVideoMuestra'>
            {"Video oración (respuesta)"}
            </Label>
            <Input type='file' id='FileVideoMuestra' name='FileVideoMuestra' onChange={e => disparodeAccion({ type: "onchange", field: "FileVideoMuestra", value: e.target.files[0] })} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='Verbo'>
              Verbo
            </Label>
            <Input type='text' name='Verbo' id='Verbo' placeholder='Verbo' onChange={event => disparodeAccion({ type: "onchange", field: "Verbo", value: event.target.value.toUpperCase() })} value={Verbo} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='FileVideoPreguntaQue'>
              Video Pregunta Que
            </Label>
            <Input type='file' id='FileVideoPreguntaQue' name='FileVideoPreguntaQue' onChange={e => disparodeAccion({ type: "onchange", field: "FileVideoPreguntaQue", value: e.target.files[0] })} />
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
              Video Pregunta Quien
            </Label>
            <Input type='file' id='FileVideoPreguntaQuien' name='FileVideoPreguntaQuien' onChange={e => disparodeAccion({ type: "onchange", field: "FileVideoPreguntaQuien", value: e.target.files[0] })} />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='FileAdjetivoImagen'>
              Imagenes del Que
            </Label>
            <Select name="FileAdjetivoImagen" isSearchable={false} options={listadoOptionsQue.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Palabra, value: i.FileImagen } })} onChange={event => disparodeAccion({ type: "onchange", field: "FileAdjetivoImagen", value: event.value })} />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button outline style={{ color: '#592a98' }} disabled={bloqueoSecu} onClick={() => { toggle(); setCheckbos(false); disparodeAccion({ type: "reset" }); }}>
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
