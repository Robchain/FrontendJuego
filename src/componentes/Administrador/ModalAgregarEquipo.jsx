import React, { useEffect, useReducer, useState, useRef } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Spinner } from 'reactstrap';
import { subidaIEquipo } from '../../firebase/config';
import { PostCrearEquipo } from '../../service/Adminstrador/Equipo';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { responseformualrio } from '../../helpers';
const BaseInicialFormulario = { Nombre: "", Imagen:null};
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
export const ModalAgregarEquipo = ({modal, toggle}) => {
  const MySwal = withReactContent(Swal)
  const [{Nombre, Imagen}, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario);
  const [bloqueo, setBloqueo] = useState(true);
  const [bloqueoSecu, setBloqueoSecu] = useState(false);
  const inputRef = useRef(null);
    const [fileName, setFileName] = useState(''); 
  const [loading, setLoading] = useState(false);
  useEffect(() => {
      if(Nombre.length > 2 && Imagen !== null){
        setBloqueo(false);
      }else{
        setBloqueo(true);
      }

  }, [Nombre, Imagen])


  
  
  const uploaddata = async ()=>{
    try {
      setBloqueoSecu(true); 
      setBloqueo(true);
      setLoading(true);
      const urlImagen = await subidaIEquipo(Imagen)
      const data = await  PostCrearEquipo({Imagen:urlImagen,Nombre:Nombre });
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        showConfirmButton:data.titulo !== "Excelente",
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false}) 
      setBloqueoSecu(false);
      setBloqueo(true);
      setLoading(false);
      toggle();
      if(data.titulo ==="Excelente"){
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        }
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: responseformualrio.Creado.NoCreado,
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false})
        setBloqueoSecu(false);
        setBloqueo(true);
        setLoading(false);
        toggle();
    }

  }
  const handleChangeFile = ({event,field }) => {
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
      setFileName(event.target.files[0].name);

      // Si llegamos aquí, el archivo es una imagen válida, puedes realizar la acción deseada
      // disparodeAccion({ type: "onchange", field: "FileBlanco", value: selectedFile });
      disparodeAccion({ type: "onchange", field: field, value: selectedFile })
    }
  };
  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click(); // <-- Esto dispara manualmente el click
    }
  };
  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered '>
    <ModalHeader style={{backgroundColor:'#e6dff0', color:"#592a98"}}>Agregar Equipo</ModalHeader>
    <ModalBody>
    <div className='mb-2'>
              <Label className='form-label' for='Nombre'>Nombre</Label>
              <Input type='text' maxLength={20} id='Nombre' name="Nombre" placeholder='Nombre' 
              value={Nombre}
             onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value.toUpperCase() })}
              />
              <Label className='form-label' for='Imagen'>
              Foto Del Equipo
            </Label>
            {/* <Input type='file' id='Imagen' name='Imagen' onChange={event => handleChangeFile({event: event, field:'Imagen'}) } /> */}
            <div className="d-flex align-items-center">
                              <Input
                                type="file"
                                id="inputFile"
                                name="FotoPerfil"
                                // onChange={handleFileChange}
                                onChange={event => handleChangeFile({event: event, field:'Imagen'}) }
                                innerRef={inputRef}
                                style={{ display: 'none' }}
                              />
                              <Button className='colorBotonPrincipal' onClick={handleButtonClick} >
                                Seleccionar archivo
                              </Button>
                              <span style={{ marginLeft: '10px' }}>{fileName}</span>
                            </div>
            </div>
    </ModalBody>
    <ModalFooter>
    <Button  outline style={{color:'#592a98'}} disabled={bloqueoSecu} onClick={()=>{ disparodeAccion({type: "reset"});toggle();}}>
            Cancelar
          </Button>&nbsp;&nbsp;
          <Button  onClick={()=>{uploaddata()}} disabled={bloqueo} style={{borderRadius:"10px", backgroundColor:"#62259E", color:"#fff", borderColor:"#62259E"}}>
          { loading && <Spinner size="sm">
    Loading...
  </Spinner>  }
            Agregar
          </Button>
    </ModalFooter>
  </Modal>
  )
}
