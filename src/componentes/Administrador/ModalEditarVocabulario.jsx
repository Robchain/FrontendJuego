import React, { useEffect, useReducer, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Spinner } from 'reactstrap';
import Swal from 'sweetalert2'
import Select from 'react-select';
import withReactContent from 'sweetalert2-react-content';
import { subidaIVocabulario } from '../../firebase/config';
import { EditarVocabulario, EditarVocabularioSinArchivos } from '../../service/Adminstrador/Vocabulario';
import { llamadaDeLaApiCategoriaGet } from '../../service/Adminstrador/Categoria';
import { responseformualrio } from '../../helpers';
const BaseInicialFormulario = { Categoria: '', Palabra: '', Silaba: '', FileImagen: undefined, FileMuestra: undefined, FilePregunta: undefined };
const ImagesNames = {
    FileImagen: '',
    FileMuestra: '',
    FilePregunta: ''
}
function llenadodeFormulario(state, action) {
    switch (action.type) {
        case 'onchange':
            return { ...state, [action.field]: action.value };
        default:
            throw new Error();
    }
}

export const ModalEditarVocabulario = ({ modal, toggle, dataBase }) => {

    const [{ Categoria, Palabra, Silaba, FileImagen, FileMuestra, FilePregunta }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario);
    const MySwal = withReactContent(Swal)
    const [loading, setLoading] = useState(false)
    const [bloqueoSecu, setBloqueoSecu] = useState(false);
    const [vocabularioOpciones, setVocabularioOpciones] = useState([]);
    const [checkbos, setCheckbos] = useState(false);
    const [bloqueo, setBloqueo] = useState(true);
    const llenadoDataInicial = async () => {
        const data = await llamadaDeLaApiCategoriaGet();
        setVocabularioOpciones(data);
    }
    useEffect(() => {
        llenadoDataInicial();
    }, [])
    useEffect(() => {
        if (Categoria !== dataBase.Categoria || Palabra !== dataBase.Palabra || Silaba !== dataBase.Silaba) {
            if (checkbos === true) {
                setBloqueo(false);
            } else if (checkbos === false) {
                setBloqueo(false);
            }
        } else {
            if (checkbos === true) {
                setBloqueo(false);
            } else if (checkbos === false) {
                setBloqueo(true);
            }
        }
    }, [Categoria, Palabra, Silaba, FileImagen, FileMuestra, FilePregunta, checkbos])

    useEffect(() => {

        if (dataBase && dataBase.FileImagen) {
            const fileName = dataBase.FileImagen.split("/").pop().split("%2F").pop().split("?")[0];
            ImagesNames.FileImagen = fileName;
        }

        if (dataBase && dataBase.FileMuestra) {
            const fileName = dataBase.FileMuestra.split("/").pop().split("%2F").pop().split("?")[0];
            ImagesNames.FileMuestra = fileName;
        }

        if (dataBase && dataBase.FilePregunta) {
            const fileName = dataBase.FilePregunta.split("/").pop().split("%2F").pop().split("?")[0];
            ImagesNames.FilePregunta = fileName;
        }

        disparodeAccion({ type: "onchange", field: "Categoria", value: dataBase.Categoria });
        disparodeAccion({ type: "onchange", field: "Palabra", value: dataBase.Palabra });
        disparodeAccion({ type: "onchange", field: "Silaba", value: dataBase.Silaba });
        setBloqueo(true); setCheckbos(false);

    }, [dataBase, modal])
    const uploadData = async () => {
        try {
            let _id = dataBase._id;
            let fileImage = dataBase.FileImagen;
            let fileMuestra = dataBase.FileMuestra;
            let filePregunta = dataBase.FilePregunta;

            if (checkbos === true) {
                setBloqueoSecu(true);
                setBloqueo(true);
                setLoading(true);
                if (FileImagen) {
                    const fileImage = await subidaIVocabulario(FileImagen)
                }

                if (FileMuestra) {
                    fileMuestra = await subidaIVocabulario(FileMuestra)
                }

                if (FilePregunta) {
                    filePregunta = await subidaIVocabulario(FilePregunta)
                }
                const data = await EditarVocabulario({ Categoria: Categoria, Palabra: Palabra, Silaba: Silaba, FileMuestra: fileMuestra, FileImagen: fileImage, FilePregunta: filePregunta, _id: _id });
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
                setBloqueoSecu(false);
                setBloqueo(false);
                setLoading(false);
                toggle();
                if (data.titulo === "Excelente") {
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            } else if (checkbos === false) {
                setBloqueoSecu(true);
                setBloqueo(true);
                setLoading(true);
                const data = await EditarVocabularioSinArchivos({ Categoria: Categoria, Palabra: Palabra, Silaba: Silaba, _id: _id });
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
                setBloqueoSecu(false);
                setBloqueo(false);
                setLoading(false);
                toggle();
                if (data.titulo === "Excelente") {
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
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

    const handleChange = ({ event, field }) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            // Verificar la extensión del archivo
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            const fileNameParts = selectedFile.name.split('.');
            const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                console.log("entro validacion");

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
        <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered '>
            <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Editar vocabulario</ModalHeader>
            <ModalBody>
                <div className='mb-2'>
                    <div className='mb-3'>
                        <Label className='form-label' for='categoria'>Categoría</Label><br />
                        <Select name="Categoria" defaultValue={{ value: "123", label: dataBase.Categoria }} options={vocabularioOpciones.map(i => { return { label: i.NombreCategoria, value: i._id } })} onChange={event => disparodeAccion({ type: "onchange", field: "Categoria", value: event.label })} isSearchable={true} />
                    </div>
                    <div className='mb-3'>
                        <Label className='form-label' for='palabra'>Palabra</Label>
                        <Input type='text' maxLength={20} id='palabra' name="Palabra" placeholder='Palabra' onChange={event => disparodeAccion({ type: "onchange", field: "Palabra", value: event.target.value.toUpperCase() })} value={Palabra} defaultValue={dataBase.Palabra} /> {/* revisar esto*/}
                    </div>
                    <div className='mb-3'>
                        <Label className='form-label' for='categoria'>Palabra separada en sílabas</Label>
                        <Input type='text' maxLength={25} id='categoria' name="Silaba" placeholder='Silaba' onChange={event => disparodeAccion({ type: "onchange", field: "Silaba", value: event.target.value.toUpperCase() })} defaultValue={dataBase.Silaba} value={Silaba} />
                    </div>
                    <div className='mb-3'>
                        <Input id="EditarImagen" name="check" type="checkbox" onChange={e => { setCheckbos(e.target.checked) }} />&nbsp;&nbsp; <Label check for="EditarImagen" style={{ color: '#8b8b8c', fontWeight: "700" }} > Editar imagen y videos </Label>
                    </div>

                    {checkbos && <div className='mt-1'>
                        <div className='mb-3'>
                            <Label className='form-label' for='inputImage'>
                                Imagen
                            </Label>
                            <div>
                                <Label className='form-label' for='inputImage' style={{ color: '#5E319B' }}>
                                    {
                                        ImagesNames && ImagesNames.FileImagen &&
                                        ImagesNames.FileImagen
                                    }
                                </Label>
                            </div>
                            <Input type='file' id='inputImage' name='FileImagen' onChange={e => handleChange({ event: e, field: "FileImagen" })} />
                        </div>
                        <div className='mb-3'>
                            <Label className='form-label' for='inputVideoM'>
                                Video respuesta (con audio)
                            </Label>
                            <div>
                                <Label className='form-label' for='inputVideoM' style={{ color: '#5E319B' }}>
                                    {
                                        ImagesNames && ImagesNames.FileMuestra &&
                                        ImagesNames.FileMuestra
                                    }
                                </Label>
                            </div>
                            <Input type='file' id='inputVideoM' name='FileMuestra' onChange={e => handleChangeFileVideo({ event: e, field: "FileMuestra" })} />
                        </div>
                        <div className='mb-3'>
                            <Label className='form-label' for='inputask'>
                                Video de pregunta (sin audio)
                            </Label>
                            <div>
                                <Label className='form-label' for='inputask' style={{ color: '#5E319B' }}>
                                    {
                                        ImagesNames && ImagesNames.FilePregunta &&
                                        ImagesNames.FilePregunta
                                    }
                                </Label>
                            </div>
                            <Input type='file' id='inputask' name='FilePregunta' onChange={e => handleChangeFileVideo({ event: e, field: "FilePregunta" })} />
                        </div>

                    </div>}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button outline style={{ color: '#592a98' }} onClick={() => {
                    toggle();
                }} disabled={bloqueoSecu}>
                    Cancelar
                </Button>&nbsp;&nbsp;
                <Button onClick={() => {
                    uploadData();
                }} disabled={bloqueo} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
                    {loading && <Spinner size="sm">
                        Loading...
                    </Spinner>}
                    Editar
                </Button>
            </ModalFooter>
        </Modal>
    )
}
