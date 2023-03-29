import React, { useEffect, useReducer, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Spinner } from 'reactstrap';
import { CrearRompecabeza, EditarDataRompecabeza, EditarDataRompecabezaSinArchivo } from '../../service/Adminstrador/Rompecabeza';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { subidaIRompecabeza } from '../../firebase/config';

function llenadodeFormulario(state, action) {
    switch (action.type) {
        case 'onchange':
            return { ...state, [action.field]: action.value };
        default:
            throw new Error();
    }
}

export const ModalEditarRompecabeza = ({ modal, toggle, dataBase }) => {
    const BaseInicialFormulario = { Nombre: dataBase.Nombre, FileBlanco: dataBase.FileBlanco, FileColor: dataBase.FileColor, Pieza:dataBase.Pieza };
    const [{ Nombre, FileBlanco, FileColor, Pieza }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario);
    const MySwal = withReactContent(Swal)
    const [loading, setLoading] = useState(false)
    const [bloqueoSecu, setBloqueoSecu] = useState(false);
    const [checkbos, setCheckbos] = useState(false);
    const [bloqueo, setBloqueo] = useState(true);

    useEffect(() => {
        if (Nombre !== dataBase.Nombre  && Pieza !== 0 ) {
            setBloqueo(false);
        } else {
            setBloqueo(true);
        }
    }, [Nombre, FileBlanco, FileColor, Pieza])

    const uploadData = async () => {
        try {
            let _id = dataBase._id;
            if(checkbos === true){
                setBloqueoSecu(true);
                setBloqueo(true);
                setLoading(true);
                const ulrC = await subidaIRompecabeza(FileColor)
                const ulrB = await subidaIRompecabeza(FileBlanco)
                const data = await EditarDataRompecabeza({ FileBlanco: ulrB, FileColor: ulrC, Nombre: Nombre, Pieza: Pieza, _id:_id });
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
            }else if(checkbos === false){
                setBloqueoSecu(true);
                setBloqueo(true);
                setLoading(true);
                const data = await EditarDataRompecabezaSinArchivo({ Nombre: Nombre, Pieza: Pieza, _id:_id });
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

    return (
        <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered '>
            <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Editar Rompecabeza</ModalHeader>
            <ModalBody>
                <div className=''>
                    <Label style={{color:'#8b8b8c',fontWeight:"700"}} className='form-label' for='Nombre'>Nombre</Label>
                    <Input type='text' id='Nombre' name="Nombre" defaultValue={dataBase.Nombre} placeholder='Nombre' onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value.toUpperCase() })} />
                    <Label style={{color:'#8b8b8c',fontWeight:"700"}} >Pieza</Label><br />
                    <Label>
                        <Input
                            style={{ color: '#8b8b8c' }}
                            type='radio'
                            id={4}
                            name="Pieza"
                            value={4}
                            defaultChecked={dataBase.Pieza === 4}
                            onChange={event => disparodeAccion({ type: "onchange", field: "Pieza", value: event.target.value })}
                        />{" "}4</Label><br />
                    <Label><Input
                        style={{ color: '#8b8b8c' }}
                        type='radio'
                        id={6}
                        name="Pieza"
                        value={6}
                        defaultChecked={dataBase.Pieza === 6}
                        onChange={event => disparodeAccion({ type: "onchange", field: "Pieza", value: event.target.value })}
                    />{" "}6 </Label>
                    <br/>
                    <Input
                        id="exampleCheck"
                        name="check"
                        type="checkbox"
                        
                        onChange={e => { setCheckbos(e.target.checked) }}
                    />{" "}
                    <Label
                        check
                        for="exampleCheck"
                        style={{color:'#8b8b8c',fontWeight:"700"}}
                    >
                        Editar Imagenes
                    </Label>

                    { checkbos === true && <div className='mt-1'>
                    <Label className='form-label' for='FileColor' style={{color:'#8b8b8c',fontWeight:"700"}}>
                        Imagen Color
                    </Label><br />
                        <Input type='file' id='FileColor' name='FileColor' onChange={event => disparodeAccion({ type: "onchange", field: "FileColor", value: event.target.files[0] })} />
                        <Label className='form-label' for='FileBlanco' style={{color:'#8b8b8c',fontWeight:"700"}}>
                            Imagen Blanco y Negro
                        </Label>
                        <Input type='file' id='FileBlanco' name='FileBlanco' onChange={event => disparodeAccion({ type: "onchange", field: "FileBlanco", value: event.target.files[0] })} />
                    </div>}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button outline style={{ color: '#592a98' }} onClick={toggle} disabled={bloqueoSecu}>
                    Cancelar
                </Button>{' '}
                <Button onClick={() => {
                    uploadData();
                }} disabled={bloqueo} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
                    {loading &&  <Spinner size="sm">
                        Loading...
                    </Spinner>}
                   {" "} Agregar
                </Button>
            </ModalFooter>
        </Modal>
    )
}
