import React, { useEffect, useState } from 'react'
import { Button, Col, Input, Label, Row, Spinner } from 'reactstrap'
import { ListadoCUrsosAdministrador } from './ListadoCUrsosAdministrador';
import { ListadoParaleloAdministrador } from './ListadoParaleloAdministrador';
import { CrearCurso, CrearParalelo } from '../../service/Adminstrador/Usuarios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { responseformualrio } from '../../helpers';

export const AdministradorOpcionesEstudiante = () => {
  const MySwal = withReactContent(Swal)
  const [Curso, setCurso] = useState("");
  const [Paralelo, setParalelo] = useState("");
  const [loadingAgregarCurso, setloadingAgregarCurso] = useState(false);
  const [loadingAgregarParalelo, setloadingAgregarParalelo] = useState(false);
  const [bloqueoAgregarCurso, setbloqueoAgregarCurso] = useState(true);
  const [bloqueoAgregarParalale, setbloqueoAgregarParalale] = useState(true);
useEffect(() => {
  if(Curso.length > 0){
    setbloqueoAgregarCurso(false);
  }

}, [Curso])

useEffect(() => {
  if(Paralelo.length > 0){
    setbloqueoAgregarParalale(false);
  }

}, [Paralelo])


const onsudmitAgregarCurso = async()=>{
  try {
    setloadingAgregarCurso(true);
    setbloqueoAgregarCurso(true);
    setbloqueoAgregarParalale(true);
    const data = await CrearCurso({Nombre:Curso});
    MySwal.fire({
      title: `${data.titulo}`,
      text: `${data.respuesta}`,
      icon: `${data.type}`,
      showConfirmButton:data.titulo !== "Excelente",
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false}) 
      setloadingAgregarCurso(false);
      setbloqueoAgregarCurso(false);
      setbloqueoAgregarParalale(true);
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
    setloadingAgregarCurso(false);
    setbloqueoAgregarCurso(false);
    setbloqueoAgregarParalale(true);
  }
}

const onsudmitAgregarParalelo = async()=>{
  try {
    setloadingAgregarParalelo(true);
    setbloqueoAgregarParalale(true);
    setbloqueoAgregarCurso(true);
    const data = await CrearParalelo({Nombre:Paralelo});
    MySwal.fire({
      title: `${data.titulo}`,
      text: `${data.respuesta}`,
      icon: `${data.type}`,
      showConfirmButton:data.titulo !== "Excelente",
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false}) 
      setloadingAgregarParalelo(false);
      setbloqueoAgregarParalale(false);
      setbloqueoAgregarCurso(true);
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
      setloadingAgregarParalelo(false);
      setbloqueoAgregarParalale(false);
      setbloqueoAgregarCurso(true);

  }
}

  return (
    <Row>
    <h3 style={{ color: "#9696D3" }}>Administrador de opciones</h3>
      <Col xl='6' lg="6" className='d-xl p-0 mt-2'>
      <Col md='6' sm='12' className='mb-1'>
      <h4 style={{ color: "#9696D3" }}>Cursos</h4>
          <Label className='form-label ' for='Nombre'>
            Curso
          </Label>
          <Input type='text' maxLength={20} name='Nombre' id='Nombre' placeholder='Curso' onChange={event => setCurso(event.target.value.toUpperCase())} value={Curso} />
        </Col>     
        <Button disabled={bloqueoAgregarCurso} onClick={() => { onsudmitAgregarCurso() }} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
      {loadingAgregarCurso && <Spinner size="sm">
          Loading...
        </Spinner>} 
        &nbsp;&nbsp;Agregar
      </Button>
      </Col>
      <ListadoCUrsosAdministrador />
      <Col xl='6' lg="6" className='d-xl p-0 mt-2'>
      <Col md='6' sm='12' className='mb-1'>
      <h4 style={{ color: "#9696D3" }}>Paralelo</h4>
          <Label className='form-label ' for='Nombre'>
            Paralelo
          </Label>
          <Input type='text' maxLength={20} name='Nombre' id='Nombre' placeholder='Paralelo' onChange={event => setParalelo(event.target.value.toUpperCase())} value={Paralelo} />
        </Col>     
        <Button disabled={bloqueoAgregarParalale} onClick={() => { onsudmitAgregarParalelo()}} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
      {loadingAgregarParalelo && <Spinner size="sm">
          Loading...
        </Spinner>} 
        &nbsp;&nbsp;Agregar
      </Button>
      </Col>
      <ListadoParaleloAdministrador />
    </Row>
  )
}
