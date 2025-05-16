import React, { useEffect, useState, useReducer } from 'react'
import Select from 'react-select';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Label, Input, Spinner } from 'reactstrap';
import { llamadaGetApiCategoriaOracion } from '../../service/Adminstrador/Categoria';
import { EdtiarOracion, EdtiarOracionSinImagen, listadoQuienImagen } from '../../service/Adminstrador/Oracion';
import { llamadaDeDataTodosActivos } from '../../service/Adminstrador/Vocabulario';
import { subidaIOracion } from '../../firebase/config';
import { responseformualrio } from '../../helpers';
const BaseInicialFormulario = { Categoria: '', Oracion: '', Verbo: '', Adverbio: undefined, Sujeto: undefined, Que: undefined, FileVideoPreguntaQue: undefined, FileVideoPreguntaQuien: undefined, FileVideoMuestra: undefined }
const VideoNames = {
    FileVideoPreguntaQueLabel: '',
    FileVideoPreguntaQuienLabel: '',
    FileVideoMuestraLabel: ''
}
function llenadodeFormulario(state, action) {
    switch (action.type) {
        case 'onchange':
            return { ...state, [action.field]: action.value };
        default:
            throw new Error();
    }
}
const optionsAdverbio = [{ value: "", label: "NINGUNO" }, { value: "UNO", label: "UNO" }, { value: "UNA", label: "UNA" }, { value: "UN", label: "UN" }, { value: "DOS", label: "DOS" }, { value: "MUCHOS", label: "MUCHOS" }, { value: "MUCHAS", label: "MUCHAS" }]
export const ModalEditarOracion = ({ modal, toggle, dataBase }) => {

    const [{ Categoria, Oracion, Verbo, Adverbio, Sujeto, Que, FileVideoPreguntaQue, FileVideoPreguntaQuien, FileVideoMuestra }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario);
    const [checkbos, setCheckbos] = useState(false);
    const [checkbosDos, setCheckbosDos] = useState(false);
    const [loading, setLoading] = useState(false);
    const MySwal = withReactContent(Swal)
    const [bloqueoSecu, setBloqueoSecu] = useState(false);
    const [ListadoImagenQuien, setListadoImagenQuien] = useState([]);
    const [bloqueo, setBloqueo] = useState(true);
    const [listadoOption, setListadoOption] = useState([])
    const [listadoOptionsQue, setListadoOptionsQue] = useState([])
    useEffect(() => {

        if (dataBase && dataBase.FileVideoMuestra) {
            const fileName = dataBase.FileVideoMuestra.split("/").pop().split("%2F").pop().split("?")[0];
            VideoNames.FileVideoMuestraLabel = fileName;
        }

        if (dataBase && dataBase.FileVideoPreguntaQue) {
            const fileName = dataBase.FileVideoPreguntaQue.split("/").pop().split("%2F").pop().split("?")[0];
            VideoNames.FileVideoPreguntaQueLabel = fileName;
        }

        if (dataBase && dataBase.FileVideoPreguntaQuien) {
            const fileName = dataBase.FileVideoPreguntaQuien.split("/").pop().split("%2F").pop().split("?")[0];
            VideoNames.FileVideoPreguntaQuienLabel = fileName;
        }

        disparodeAccion({ type: "onchange", field: "Categoria", value: dataBase.Categoria });
        disparodeAccion({ type: "onchange", field: "Sujeto", value: dataBase.Sujeto });
        disparodeAccion({ type: "onchange", field: "Que", value: dataBase.Que });
        disparodeAccion({ type: "onchange", field: "Oracion", value: dataBase.Oracion });
        disparodeAccion({ type: "onchange", field: "Verbo", value: dataBase.Verbo });
        setCheckbos(false);
        setCheckbosDos(false);

    }, [dataBase, modal])
    const llamdaInicialListado = async () => {
        const data = await llamadaGetApiCategoriaOracion();
        setListadoOption(data);
    }
    const llamadainicialQuienImagen = async () => {
        const data = await listadoQuienImagen();
        setListadoImagenQuien(data)
    }
    useEffect(() => {
        llamadainicialQuienImagen();
    }, [])
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
            let fileVideoPreguntaQue = dataBase.FileVideoPreguntaQue;
            let fileVideoMuestra = dataBase.FileVideoMuestra;
            let fileVideoPreguntaQuien = dataBase.FileVideoPreguntaQuien;
            let _id = dataBase._id;
            setBloqueoSecu(true);
            setBloqueo(true);
            setLoading(true);
            if (checkbosDos === true) {
                if (FileVideoPreguntaQue) {
                    fileVideoPreguntaQue = await subidaIOracion(FileVideoPreguntaQue);
                }
                if (FileVideoMuestra) {
                    fileVideoMuestra = await subidaIOracion(FileVideoMuestra);
                }
                if (FileVideoPreguntaQuien) {
                    fileVideoPreguntaQuien = await subidaIOracion(FileVideoPreguntaQuien);
                }
                const data = await EdtiarOracion({ _id: _id, Categoria: Categoria, Oracion: Oracion, Verbo: Verbo, Adverbio: Adverbio, Sujeto: Sujeto, Que: Que, FileVideoPreguntaQue: fileVideoPreguntaQue, FileVideoPreguntaQuien: fileVideoPreguntaQuien, FileVideoMuestra: fileVideoMuestra })
                MySwal.fire({
                    title: `${data.titulo}`,
                    showConfirmButton: data.titulo !== "Excelente",
                    text: `${data.respuesta}`,
                    icon: `${data.type}`,
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    buttonsStyling: false
                })
            }
            if (checkbosDos === false) {
                const data = await EdtiarOracionSinImagen({ _id: _id, Categoria: Categoria, Oracion: Oracion, Verbo: Verbo, Adverbio: Adverbio, Sujeto: Sujeto, Que: Que, })
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
            setBloqueo(false);
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
            setBloqueo(false);
            setLoading(false);
            toggle();
        }
    }
    useEffect(() => {
        if (Categoria !== dataBase.Categoria || Oracion !== dataBase.Oracion || Verbo !== dataBase.Verbo) {
            if (dataBase.Adverbio) {
                if (Adverbio !== undefined && checkbos === true) {
                    setBloqueo(false);
                } else if (Adverbio === undefined && checkbos === true) {
                    setBloqueo(true);
                } else {
                    setBloqueo(false);
                }
            } else {
                setBloqueo(false);
            }
        } else {
            setBloqueo(true);
        }
    }, [Categoria, Oracion, Verbo, Adverbio, Sujeto, Que, FileVideoPreguntaQue, FileVideoPreguntaQuien, FileVideoMuestra])

    const handleChangeFileImage = ({ event, field }) => {
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

    const handleChangeFileVideo = ({ event, field }) => {
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
            <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Editar oración</ModalHeader>
            {/* <ModalBody>
                <Row>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='Categoria'>Categoría</Label><br />
                        <Select name="Categoria" isSearchable={true} defaultValue={{ label: dataBase.Categoria, value: dataBase.Categoria }} options={listadoOption.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.NombreCategoria, value: i._id } })} onChange={event => disparodeAccion({ type: "onchange", field: "Categoria", value: event.label })} />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='Verbo'>
                            Verbo
                        </Label>
                        <Input type='text' maxLength={15} name='Verbo' id='Verbo' placeholder='Verbo' defaultValue={dataBase.Verbo} value={Verbo} onChange={event => disparodeAccion({ type: "onchange", field: "Verbo", value: event.target.value.toUpperCase() })} />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label check for="AdverbioCheck" style={{ color: '#8b8b8c', fontWeight: "700" }} className="mb-2" >Adverbio (opcional)</Label>
                        <div>
                            <Select name="Adverbio" placeholder="Adverbio" isSearchable={false} options={optionsAdverbio} onChange={event => disparodeAccion({ type: "onchange", field: "Adverbio", value: checkbos ? event.value : undefined })} />
                        </div>
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='Oracion'>
                            Oración
                        </Label>
                        <Input type='text' maxLength={30} name='Oracion' id='Oracion' defaultValue={dataBase.Oracion} placeholder='Oracion' value={Oracion} onChange={event => disparodeAccion({ type: "onchange", field: "Oracion", value: event.target.value.toUpperCase() })} />
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='Que'>
                            Imágenes del Qué
                            </Label>
                            <Select name="Que" isSearchable={false} defaultValue={dataBase.Que} options={listadoOptionsQue.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Palabra, value: i.FileImagen } })} onChange={event => disparodeAccion({ type: "onchange", field: "Que", value: event })} />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='Sujeto' >
                            Imagen del Quién (Sujeto)
                            </Label>
                            <Select name="Sujeto" isSearchable={false} defaultValue={dataBase.Sujeto} options={ListadoImagenQuien.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Nombre, value: i.Imagen } })} onChange={event => disparodeAccion({ type: "onchange", field: "Sujeto", value: event })} />
                        </Col>
                </Row>
                <Input id="editarVideoOracion" name="check" type="checkbox" onChange={e => { setCheckbosDos(e.target.checked) }} />&nbsp;&nbsp;
                <Label check for="editarVideoOracion" style={{ color: '#8b8b8c', fontWeight: "700" }}> Editar videos </Label>
                <Row>
                    {checkbosDos === true && <>
                        
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='FileVideoMuestra'>
                                Video respuesta (con audio)
                            </Label>
                            <Input type='file' id='FileVideoMuestra' name='FileVideoMuestra'  onChange={e => handleChangeFileImage({event:e, field:"FileVideoMuestra"})} />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='FileVideoPreguntaQue'>
                                Video pregunta Qué (sin audio)
                            </Label>
                            <Input type='file' id='FileVideoPreguntaQue' name='FileVideoPreguntaQue' onChange={e => handleChangeFileImage({event:e, field:"FileVideoPreguntaQue"})} />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='FileVideoPreguntaQuien'>
                                Video pregunta Quién (sin audio)
                            </Label>
                            <Input type='file' id='FileVideoPreguntaQuien' name='FileVideoPreguntaQuien' onChange={e => handleChangeFileImage({event:e, field:"FileVideoPreguntaQuien"})} />
                        </Col>
                        
                    </>}
                </Row>
            </ModalBody> */}

            <ModalBody>
                <Row>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='Categoria'>Categoría</Label><br />
                        <Select name="Categoria" defaultValue={{ label: dataBase.Categoria, value: '' }} isSearchable={true} options={listadoOption.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.NombreCategoria, value: i._id } })} onChange={event => disparodeAccion({ type: "onchange", field: "Categoria", value: event.label })} />
                    </Col>

                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='Oracion'>
                            Oración
                        </Label>
                        <Input type='text' maxLength={30} name='Oracion' id='Oracion' placeholder='Oración' onChange={event => disparodeAccion({ type: "onchange", field: "Oracion", value: event.target.value.toUpperCase() })} value={Oracion} />
                    </Col>
                </Row>


                <Row>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='Sujeto' >
                            Quién (Sujeto)
                        </Label>
                        {dataBase.Que && dataBase.Que.label &&
                            <Select name="Sujeto" defaultValue={{ label: dataBase.Sujeto.label, value: '' }} isSearchable={true} options={ListadoImagenQuien.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Nombre, value: i.Imagen } })} onChange={event => disparodeAccion({ type: "onchange", field: "Sujeto", value: event })} />
                        }
                        {/* <Input type='file' id='FileSujetoImagen' name='FileSujetoImagen' onChange={e => disparodeAccion({ type: "onchange", field: "FileSujetoImagen", value: e.target.files[0] })} /> */}
                        {/* <Select name="Sujeto" defaultValue={{ label: dataBase.Que.label, value: ''}} isSearchable={true} options={ListadoImagenQuien.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Nombre, value: i.Imagen } })} onChange={event => disparodeAccion({ type: "onchange", field: "Sujeto", value: event })} /> */}
                    </Col>

                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='FileVideoMuestra'>
                            Video respuesta (con audio) 
                        </Label>
                        <div>
                        <Label className='form-label' for='FileVideoMuestra' style={{ color: '#5E319B' }}>
                            {
                                VideoNames && VideoNames.FileVideoMuestraLabel && 
                                VideoNames.FileVideoMuestraLabel
                            }
                        </Label>
                        </div>
                        <Input type='file' id='FileVideoMuestra' name='FileVideoMuestra' onChange={e => handleChangeFileVideo({ event: e, field: 'FileVideoMuestra' })} />
                    </Col>
                </Row>

                <Row>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='Verbo'>
                            Verbo
                        </Label>
                        <Input type='text' maxLength={15} name='Verbo' id='Verbo' placeholder='Verbo' onChange={event => disparodeAccion({ type: "onchange", field: "Verbo", value: event.target.value.toUpperCase() })} value={Verbo} />
                    </Col>

                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='FileVideoPreguntaQue'>
                            Video pregunta Qué (sin audio)
                        </Label>
                        <div>
                        <Label className='form-label' for='FileVideoPreguntaQue' style={{ color: '#5E319B' }}>
                            {
                                VideoNames && VideoNames.FileVideoPreguntaQueLabel && 
                                VideoNames.FileVideoPreguntaQueLabel
                            }
                        </Label>
                        </div>
                        <Input type='file' id='FileVideoPreguntaQue' name='FileVideoPreguntaQue' onChange={e => handleChangeFileVideo({ event: e, field: 'FileVideoPreguntaQue' })} />
                    </Col>
                </Row>

                <Row>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='Verbo'>
                            Adverbio (Opcional)
                        </Label>

                        <div>
                            <Select name="Adverbio" placeholder="Adverbio" isSearchable={false} options={optionsAdverbio} onChange={event => disparodeAccion({ type: "onchange", field: "Adverbio", value: checkbos ? event.value : undefined })} />
                        </div>
                    </Col>

                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='FileVideoPreguntaQuien'>
                            Video pregunta Quién (sin audio)
                        </Label>
                        <div>
                        <Label className='form-label' for='FileVideoPreguntaQuien' style={{ color: '#5E319B' }}>
                            {
                                VideoNames && VideoNames.FileVideoPreguntaQuienLabel && 
                                VideoNames.FileVideoPreguntaQuienLabel
                            }
                        </Label>
                        </div>
                        <Input type='file' id='FileVideoPreguntaQuien' name='FileVideoPreguntaQuien' onChange={e => handleChangeFileVideo({ event: e, field: 'FileVideoPreguntaQuien' })} />
                    </Col>
                </Row>

                <Row>
                    <Col md='6' sm='12' className='mb-1'>
                        <Label className='form-label' for='Que'>
                           Qué (Vocabulario)
                        </Label>
                        {dataBase.Que && dataBase.Que.label &&
                            <Select name="Que" defaultValue={{ label: dataBase.Que.label, value: '' }} isSearchable={true} options={listadoOptionsQue.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Palabra, value: i.FileImagen } })} onChange={event => disparodeAccion({ type: "onchange", field: "Que", value: event })} />
                        }
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button outline style={{ color: '#592a98' }} disabled={bloqueoSecu} onClick={() => {
                    toggle();
                }}>
                    Cancelar
                </Button>&nbsp;&nbsp;
                <Button onClick={() => { uploadData(); }} disabled={bloqueo} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
                    {loading && <Spinner size="sm">
                        Loading...
                    </Spinner>}   Editar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

