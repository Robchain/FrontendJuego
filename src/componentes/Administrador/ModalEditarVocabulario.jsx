import React, { useEffect, useReducer, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Spinner } from 'reactstrap';
import Swal from 'sweetalert2'
import Select from 'react-select';
import withReactContent from 'sweetalert2-react-content';
import { subidaIVocabulario } from '../../firebase/config';
import { EditarVocabulario, EditarVocabularioSinArchivos } from '../../service/Adminstrador/Vocabulario';
import { llamadaDeLaApiCategoriaGet } from '../../service/Adminstrador/Categoria';

function llenadodeFormulario(state, action) {
    switch (action.type) {
        case 'onchange':
            return { ...state, [action.field]: action.value };
        default:
            throw new Error();
    }
}

export const ModalEditarVocabulario = ({ modal, toggle, dataBase }) => {
    const BaseInicialFormulario = { Categoria: dataBase.Categoria, Palabra: dataBase.Palabra, Silaba: dataBase.Silaba,FileImagen: dataBase.FileImagen, FileMuestra: dataBase.FileMuestra, FilePregunta: dataBase.FilePregunta};
    const [{ Categoria, Palabra, Silaba, FileImagen, FileMuestra, FilePregunta }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario);
    const MySwal = withReactContent(Swal)
    const [loading, setLoading] = useState(false)
    const [bloqueoSecu, setBloqueoSecu] = useState(false);
    const [vocabularioOpciones, setVocabularioOpciones] = useState([]);
    const [checkbos, setCheckbos] = useState(false);
    const [bloqueo, setBloqueo] = useState(true);
    const llenadoDataInicial = async ()=>{
        const data = await llamadaDeLaApiCategoriaGet();
        setVocabularioOpciones(data);
       }
       useEffect(() => {
         llenadoDataInicial();
       }, [])
    useEffect(() => {
        if (Categoria !== dataBase.Categoria  ||  Palabra !== dataBase.Palabra || Silaba !== dataBase.Silaba) {
            if(checkbos === true ){
                setBloqueo(false);
            }else if(checkbos === false){
                setBloqueo(false);
            }
        } else {
            if(checkbos === true ){
                setBloqueo(false);
            }else if(checkbos === false){
                setBloqueo(true);
            }
        }
    }, [Categoria, Palabra, Silaba, FileImagen, FileMuestra, FilePregunta,checkbos])

    const uploadData = async () => {
        try {
            let _id = dataBase._id;
            if(checkbos === true){
                setBloqueoSecu(true);
                setBloqueo(true);
                setLoading(true);
                const fileImage = await subidaIVocabulario(FileImagen)
      const fileMuestra = await subidaIVocabulario(FileMuestra)
      const filePregunta = await subidaIVocabulario(FilePregunta)
                const data = await EditarVocabulario({ Categoria: Categoria, Palabra: Palabra, Silaba: Silaba, FileMuestra: fileMuestra, FileImagen: fileImage, FilePregunta: filePregunta, _id:_id });
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
                const data = await EditarVocabularioSinArchivos({Categoria: Categoria, Palabra: Palabra, Silaba: Silaba,_id:_id});
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
            <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Editar Vocabulario</ModalHeader>
            <ModalBody>
                <div className='mb-2'>
                <Label className='form-label' for='categoria'>Categoria</Label><br/>
              <Select  name="Categoria" defaultValue={{value:"123", label:dataBase.Categoria}} options={vocabularioOpciones.map(i=>{return {label:i.NombreCategoria,value:i._id}})}   onChange={ event => disparodeAccion({ type: "onchange", field: "Categoria", value: event.label })} isSearchable={false} />
              <Label className='form-label' for='palabra'>Palabra</Label>
              <Input type='text' id='palabra' name="Palabra" placeholder='Palabra' onChange={event => disparodeAccion({ type: "onchange", field: "Palabra", value: event.target.value })} defaultValue={dataBase.Palabra} />
              <Label className='form-label' for='categoria'>Silaba</Label>
              <Input type='text' id='categoria' name="Silaba" placeholder='Silaba' onChange={event => disparodeAccion({ type: "onchange", field: "Silaba", value: event.target.value })} defaultValue={dataBase.Silaba} />
                    <Input  id="ImagenCheck" name="check" type="checkbox" onChange={e => { setCheckbos(e.target.checked) }}    />{" "} <Label check for="ImagenCheck"  style={{color:'#8b8b8c',fontWeight:"700"}} >Editar Imagenes </Label>
                    { checkbos && <div className='mt-1'>
          <Label className='form-label' for='inputImage'> 
          Imagen 
          </Label>
          <Input type='file' id='inputImage' name='FileImagen' onChange={e => disparodeAccion({ type: "onchange", field: "FileImagen", value: e.target.files[0] })} />
          <Label className='form-label' for='inputVideoM'>
            Video de Muestra
          </Label>
          <Input type='file' id='inputVideoM' name='FileMuestra' onChange={e => disparodeAccion({ type: "onchange", field: "FileMuestra", value: e.target.files[0] })} />
          <Label className='form-label' for='inputask'>
            Video Pregunta
          </Label>
          <Input type='file' id='inputask' name='FilePregunta' onChange={e => disparodeAccion({ type: "onchange", field: "FilePregunta", value: e.target.files[0] })} />
                    </div>}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button outline style={{ color: '#592a98' }} onClick={()=>{setBloqueo(true); setCheckbos(false); toggle();}} disabled={bloqueoSecu}>
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
