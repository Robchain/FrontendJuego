import React, { useEffect, useState, useReducer } from 'react'
import Select from 'react-select';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Label, Input, Spinner } from 'reactstrap';
import { llamadaGetApiCategoriaOracion } from '../../service/Adminstrador/Categoria';
import { GuardadodeOracionPost } from '../../service/Adminstrador/Oracion';
import { llamadaDeDataTodosActivos } from '../../service/Adminstrador/Vocabulario';
import { subidaIOracion } from '../../firebase/config';

function llenadodeFormulario(state, action) {
    switch (action.type) {
        case 'onchange':
            return { ...state, [action.field]: action.value };
        default:
            throw new Error();
    }
}
const optionsAdverbio = [{ value: "", label: "NINGUNO" }, { value: "UNO", label: "UNO" }, { value: "UN", label: "UN" }, { value: "DOS", label: "DOS" }, { value: "MUCHOS", label: "MUCHOS" }, { value: "MUCHAS", label: "MUCHAS" }]

export const ModalEditarOracion = ({ modal, toggle, dataBase }) => {
    const BaseInicialFormulario = { Categoria: dataBase.Categoria, Oracion: dataBase.Oracion, Verbo: dataBase.Verbo, Adverbio: dataBase.Adverbio, FileSujetoImagen: dataBase.FileSujetoImagen, FileAdjetivoImagen: dataBase.FileAdjetivoImagen, FileVideoPreguntaQue: dataBase.FileVideoPreguntaQue, FileVideoPreguntaQuien: dataBase.FileVideoPreguntaQuien, FileVideoMuestra: dataBase.FileVideoMuestra }
    const [{ Categoria, Oracion, Verbo, Adverbio, FileSujetoImagen, FileAdjetivoImagen, FileVideoPreguntaQue, FileVideoPreguntaQuien, FileVideoMuestra }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario);
    const [checkbos, setCheckbos] = useState(false);
    const [checkbosDos, setCheckbosDos] = useState(false);
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
        if (Categoria !== dataBase.Categoria && Oracion !== dataBase.Oracion && Verbo !== dataBase.Verbo ) {
            if(dataBase.Adverbio){
                if (Adverbio !== undefined && checkbos === true) {
                    setBloqueo(false);
                } else if (Adverbio === undefined && checkbos === true) {
                    setBloqueo(true);
                } else {
                    setBloqueo(false);
                }
            }else{
                setBloqueo(false);
            }
        } else {
            setBloqueo(true);
        }
    }, [Categoria, Oracion, Verbo, Adverbio, FileSujetoImagen, FileAdjetivoImagen, FileVideoPreguntaQue, FileVideoPreguntaQuien, FileVideoMuestra])


    return (
        <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered modal-lg'>
            <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Editar Oracion</ModalHeader>
            <ModalBody>
                <Row>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='Categoria'>Categoria</Label><br />
                        <Select name="Categoria" isSearchable={false} defaultValue={{label:dataBase.Categoria, value:""}} options={listadoOption.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.NombreCategoria, value: i._id } })} onChange={event => disparodeAccion({ type: "onchange", field: "Categoria", value: event.label })} />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='Verbo'>
                            Verbo
                        </Label>
                        <Input type='text' name='Verbo' id='Verbo' placeholder='Verbo' defaultValue={dataBase.Verbo} onChange={event => disparodeAccion({ type: "onchange", field: "Verbo", value: event.target.value.toUpperCase() })} />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Input id="AdverbioCheck" name="check" type="checkbox" onChange={e => { setCheckbos(e.target.checked) }} /> <Label check for="AdverbioCheck" style={{ color: '#8b8b8c', fontWeight: "700" }} className="mb-2" >Adverbio</Label>
                        {checkbos && <div>
                            <Select name="Adverbio" placeholder="Adverbio" isSearchable={false} options={optionsAdverbio} onChange={event => disparodeAccion({ type: "onchange", field: "Adverbio", value: checkbos ? event.value : undefined })} />
                        </div>
                        }
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='Oracion'>
                            Oracion
                        </Label>
                        <Input type='text' name='Oracion' id='Oracion' defaultValue={dataBase.Oracion} placeholder='Oracion' onChange={event => disparodeAccion({ type: "onchange", field: "Oracion", value: event.target.value.toUpperCase() })} />
                    </Col>
                </Row>
                <Input id="exampleCheck"    name="check" type="checkbox"   onChange={e => { setCheckbosDos(e.target.checked) }} />{" "}
                <Label  check for="exampleCheck" style={{ color: '#8b8b8c', fontWeight: "700" }}> Editar Imagenes </Label>
                <Row>
                    {checkbosDos === true && <>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='FileSujetoImagen' >
                                Imagen Sujeto
                            </Label>
                            <Input type='file' id='FileSujetoImagen' name='FileSujetoImagen' onChange={e => disparodeAccion({ type: "onchange", field: "FileSujetoImagen", value: e.target.files[0] })} />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='FileVideoMuestra'>
                                Video Respuesta
                            </Label>
                            <Input type='file' id='FileVideoMuestra' name='FileVideoMuestra' onChange={e => disparodeAccion({ type: "onchange", field: "FileVideoMuestra", value: e.target.files[0] })} />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='FileVideoPreguntaQue'>
                                Video Pregunta Que
                            </Label>
                            <Input type='file' id='FileVideoPreguntaQue' name='FileVideoPreguntaQue' onChange={e => disparodeAccion({ type: "onchange", field: "FileVideoPreguntaQue", value: e.target.files[0] })} />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='FileVideoPreguntaQuien'>
                                Video Pregunta Quien
                            </Label>
                            <Input type='file' id='FileVideoPreguntaQuien' name='FileVideoPreguntaQuien' onChange={e => disparodeAccion({ type: "onchange", field: "FileVideoPreguntaQuien", value: e.target.files[0] })} />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='FileAdjetivoImagen'>
                                Imagenes Del Que
                            </Label>
                            <Select name="FileAdjetivoImagen" isSearchable={false} options={listadoOptionsQue.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Palabra, value: i.FileImagen } })} onChange={event => disparodeAccion({ type: "onchange", field: "FileAdjetivoImagen", value: event.value })} />
                        </Col>
                    </>}
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button outline style={{ color: '#592a98' }} disabled={bloqueoSecu} onClick={() => { setCheckbosDos(false); toggle();  }}>
                    Cancelar
                </Button>{' '}
                <Button onClick={() => { uploadData(); }} disabled={bloqueo} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
                    {loading && <Spinner size="sm">
                        Loading...
                    </Spinner>}   Agregar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

