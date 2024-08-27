import React, { useEffect, useReducer, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Spinner } from 'reactstrap';
import { EditarDataRompecabeza, EditarDataRompecabezaSinArchivo } from '../../service/Adminstrador/Rompecabeza';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { subidaIRompecabeza } from '../../firebase/config';
import { responseformualrio } from '../../helpers';
const BaseInicialFormulario = { Nombre: '', FileBlanco: undefined, FileColor: undefined, Pieza: 0 };
function llenadodeFormulario(state, action) {
    switch (action.type) {
        case 'onchange':
            return { ...state, [action.field]: action.value };
        default:
            throw new Error();
    }
}

export const ModalEditarRompecabeza = ({ modal, toggle, dataBase }) => {

    const [{ Nombre, FileBlanco, FileColor, Pieza }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario);
    const MySwal = withReactContent(Swal)
    const [loading, setLoading] = useState(false)
    const [bloqueoSecu, setBloqueoSecu] = useState(false);
    const [checkbos, setCheckbos] = useState(false);
    const [bloqueo, setBloqueo] = useState(true);


    useEffect(() => {
        if ((Nombre !== dataBase.Nombre && Pieza !== 0) || (FileBlanco || FileColor)) {
            setBloqueo(false);
        } else {
            setBloqueo(true);
        }
    }, [Nombre, FileBlanco, FileColor, Pieza])



    useEffect(() => {
        disparodeAccion({ type: "onchange", field: "Nombre", value: dataBase.Nombre });
        disparodeAccion({ type: "onchange", field: "Pieza", value: dataBase.Pieza });
        disparodeAccion({ type: "onchange", field: "FileColor", value: undefined });
        disparodeAccion({ type: "onchange", field: "FileBlanco", value: undefined });
        setCheckbos(false);
    }, [dataBase, modal])

    const uploadData = async () => {
        try {
            let _id = dataBase._id;
            let ulrC = dataBase.FileColor;
            let ulrB = dataBase.FileBlanco;
            if (checkbos === true) {
                setBloqueoSecu(true);
                setBloqueo(true);
                setLoading(true);
                if (FileColor) {
                    ulrC = await subidaIRompecabeza(FileColor)
                }
                if (FileBlanco) {
                    ulrB = await subidaIRompecabeza(FileBlanco)
                }
                const data = await EditarDataRompecabeza({ FileBlanco: ulrB, FileColor: ulrC, Nombre: Nombre, Pieza: Pieza, _id: _id });
                MySwal.fire({
                    title: `${data.titulo}`,
                    text: `${data.respuesta}`,
                    showConfirmButton:data.titulo !== "Excelente",
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
                if(data.titulo ==="Excelente"){
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            } else if (checkbos === false) {
                setBloqueoSecu(true);
                setBloqueo(true);
                setLoading(true);
                const data = await EditarDataRompecabezaSinArchivo({ Nombre: Nombre, Pieza: Pieza, _id: _id });
                MySwal.fire({
                    title: `${data.titulo}`,
                    text: `${data.respuesta}`,
                    showConfirmButton:data.titulo !== "Excelente",
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
                if(data.titulo ==="Excelente"){
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
    const handleChangeFilePDF = ({ event, field }) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            // Verificar la extensión del archivo
            const allowedExtensions = ['pdf'];
            const fileNameParts = selectedFile.name.split('.');
            const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                // El archivo no tiene una extensión PDF, puedes manejar el error aquí
                alert('Por favor, seleccione un archivo PDF válido.');
                event.target.value = ''; // Limpia el input para eliminar el archivo no válido
                return;
            }

            // Si llegamos aquí, el archivo es un PDF válido, puedes realizar la acción deseada
            disparodeAccion({ type: "onchange", field: field, value: selectedFile });
        }
    };
    return (
        <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered '>
            <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Editar rompecabeza</ModalHeader>
            <ModalBody>
                <div className=''>

                    <div className='mb-3'>
                    <Label style={{ color: '#8b8b8c', fontWeight: "700" }} className='form-label' for='Nombre'>Nombre</Label>
                    <Input name="Nombre" placeholder='Nombre' maxLength={20} onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value.toUpperCase() })} defaultValue={dataBase.Nombre} value={Nombre} />
                        </div>        
                        <div className='mb-3'>
                        <Label style={{ color: '#8b8b8c', fontWeight: "700" }} >Piezas</Label><br />
                    <Label>
                        <Input
                            style={{ color: '#8b8b8c' }}
                            type='radio'
                            id={4}
                            name="Pieza"
                            value={4}
                            defaultChecked={dataBase.Pieza === 4}
                            onChange={event => disparodeAccion({ type: "onchange", field: "Pieza", value: event.target.value })}
                        />&nbsp;&nbsp;4</Label><br />
                    <Label><Input
                        style={{ color: '#8b8b8c' }}
                        type='radio'
                        id={6}
                        name="Pieza"
                        value={6}
                        defaultChecked={dataBase.Pieza === 6}
                        onChange={event => disparodeAccion({ type: "onchange", field: "Pieza", value: event.target.value })}
                    />&nbsp;&nbsp;6 </Label>
                    <br />
                        </div>   
<div className='mb-3'>
<Input
                        id="editarImagen"
                        name="check"
                        type="checkbox"

                        onChange={e => { setCheckbos(e.target.checked) }}
                    />&nbsp;&nbsp;
                    <Label
                        check
                        for="editarImagen"
                        style={{ color: '#8b8b8c', fontWeight: "700" }}
                    >
                        Editar imágenes
                    </Label>
</div>           
                    
                 
                 

                    {checkbos === true && <div className='mt-1'>
                        <div className='mb-3'>
                        <Label className='form-label' for='FileColor' style={{ color: '#8b8b8c', fontWeight: "700" }}>
                        Foto color (jpg, jpeg, png, o gif)
                        </Label><br />
                        <Input type='file' id='FileColor' name='FileColor' onChange={event => handleChange({ event: event, field: 'FileColor' })} />
                        </div>
                        <div className='mb-3'>
                        <Label className='form-label' for='FileBlanco' style={{ color: '#8b8b8c', fontWeight: "700" }}>
                        Archivo blanco y negro (PDF)
                        </Label>
                        <Input type='file' id='FileBlanco' name='FileBlanco' onChange={event => handleChangeFilePDF({ event: event, field: 'FileBlanco' })} />
                        </div>
                    </div>}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button outline style={{ color: '#592a98' }} onClick={() => {

                    toggle()
                }} disabled={bloqueoSecu}>
                    Cancelar
                </Button>&nbsp;&nbsp;
                <Button onClick={() => {
                    uploadData();
                }} disabled={bloqueo} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
                    {loading && <Spinner size="sm">
                        Loading...
                    </Spinner>}
                    &nbsp;&nbsp;Editar
                </Button>
            </ModalFooter>
        </Modal>
    )
}
