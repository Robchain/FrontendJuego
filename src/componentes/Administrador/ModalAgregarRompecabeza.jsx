import React, { useEffect, useReducer, useState, useRef } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Spinner } from 'reactstrap';
import { CrearRompecabeza } from '../../service/Adminstrador/Rompecabeza';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { subidaIRompecabeza } from '../../firebase/config';
import { responseformualrio } from '../../helpers';
const BaseInicialFormulario = { Nombre: "", FileBlanco: undefined, FileColor: undefined, Pieza: 0 };
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

export const ModalAgregarRompecabeza = ({ modal, toggle }) => {
  const [{ Nombre, FileBlanco, FileColor, Pieza }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario);
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);
  const [bloqueoSecu, setBloqueoSecu] = useState(false);
  const [bloqueo, setBloqueo] = useState(true);
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const [fileName, setFileName] = useState(''); // nombre por defecto
  const [fileName2, setFileName2] = useState(''); // nombre por defecto

  useEffect(() => {
    if (!Nombre || (Nombre && Nombre.trim() == '')) {
      setBloqueo(true);
      return;
    }
    
    if (Nombre.length > 0 && FileBlanco !== undefined && FileColor !== undefined && Pieza !== 0) {
      setBloqueo(false);
    } else {
      setBloqueo(true);
    }
  }, [Nombre, FileBlanco, FileColor, Pieza])

  const uploadData = async () => {
    try {
      setBloqueoSecu(true);
      setBloqueo(true);
      setLoading(true);
      const ulrC = await subidaIRompecabeza(FileColor)
      const ulrB = await subidaIRompecabeza(FileBlanco)
      const data = await CrearRompecabeza({ FileBlanco: ulrB, FileColor: ulrC, Nombre: Nombre, Pieza: Pieza });
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        showConfirmButton:data.titulo !== "Excelente",
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
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: responseformualrio.Creado.NoCreado,
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
      setFileName(event.target.files[0].name);

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
  
      setFileName2(event.target.files[0].name);
      // Si llegamos aquí, el archivo es un PDF válido, puedes realizar la acción deseada
      disparodeAccion({ type: "onchange", field: field, value: selectedFile });
    }
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click(); // <-- Esto dispara manualmente el click
    }
  };


  const handleButtonClick2 = () => {
    if (inputRef2.current) {
      inputRef2.current.click(); // <-- Esto dispara manualmente el click
    }
  };


  return (
    <Modal isOpen={modal} toggle={toggle} keyboard={false} aria-hidden={true} backdrop={'static'} className='modal-dialog-centered '>
      <ModalHeader style={{ backgroundColor: '#e6dff0', color: "#592a98" }}>Agregar Rompecabeza</ModalHeader>
      <ModalBody>
        <div>
          <div className='mb-3'> 
          <Label className='form-label' for='Nombre'>Nombre</Label>
          <Input type='text' maxLength={20} id='Nombre' name="Nombre" placeholder='Nombre' onChange={event => disparodeAccion({ type: "onchange", field: event.target.name, value: event.target.value.toUpperCase() })} value={Nombre} />
          </div>
          <div className='mb-3'> 
          <Label className='form-label' for='FileColor'>
            Foto color (jpg, jpeg, png, o gif)
          </Label>
          {/* <Input type='file' id='FileColor' name='FileColor' onChange={event =>handleChange({event:event, field:"FileColor"})} /> */}

          <div className="d-flex align-items-center">
                            <Input
                              type="file"
                              id="inputFile"
                              name="FotoPerfil"
                              // onChange={handleFileChange}
                              onChange={event =>handleChange({event:event, field:"FileColor"})}
                              innerRef={inputRef}
                              style={{ display: 'none' }}
                            />
                            <Button className='colorBotonPrincipal' onClick={handleButtonClick} >
                              Seleccionar archivo
                            </Button>
                            <span style={{ marginLeft: '10px' }}>{fileName}</span>
                          </div>
          </div>
          <div className='mb-3'> 
          <Label className='form-label' for='FileBlanco'>
           Archivo blanco y negro (PDF)
          </Label>
         {/* <Input type='file' id='FileBlanco' name='FileBlanco' onChange={event =>handleChangeFilePDF({event:event, field:"FileBlanco"})} /> */}

         <div className="d-flex align-items-center">
                            <Input
                              type="file"
                              id="inputFile"
                              name="FotoPerfil"
                              // onChange={handleFileChange}
                              onChange={event =>handleChangeFilePDF({event:event, field:"FileBlanco"})}
                              innerRef={inputRef2}
                              style={{ display: 'none' }}
                            />
                            <Button className='colorBotonPrincipal' onClick={handleButtonClick2} >
                              Seleccionar archivo
                            </Button>
                            <span style={{ marginLeft: '10px' }}>{fileName2}</span>
                          </div>


          </div>
          <div className='mb-3'> 
          <Label>Piezas</Label><br />
          <Label>
            <Input
              style={{ color: '#8b8b8c' }}
              type='radio'
              id={4}
              name="Pieza"
              value={4}
              defaultChecked={Pieza === 4}
              onChange={event => disparodeAccion({ type: "onchange", field: "Pieza", value: event.target.value })}
            />&nbsp;&nbsp;4</Label><br />
          <Label><Input
            style={{ color: '#8b8b8c' }}
            type='radio'
            id={6}
            name="Pieza"
            value={6}
            defaultChecked={Pieza === 6}
            onChange={event => disparodeAccion({ type: "onchange", field: "Pieza", value: event.target.value })}
          />&nbsp;&nbsp;6 </Label><br />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button outline style={{ color: '#592a98' }} onClick={()=>{ disparodeAccion({type: "reset"});toggle();}} disabled={bloqueoSecu}>
          Cancelar
        </Button>&nbsp;&nbsp;
        <Button onClick={() => {
          uploadData();
        }} disabled={bloqueo} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
          {loading && <Spinner size="sm">
            Loading...
          </Spinner>}
          Agregar
        </Button>
      </ModalFooter>
    </Modal>
  )
}
