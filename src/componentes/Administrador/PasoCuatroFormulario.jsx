import React from 'react'
import { Button, Card, CardBody, CardFooter, Col, Label, Row } from "reactstrap";
import { crearMultiJugador } from '../../service/Multijugador';
import Repeater from '../Repeater';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const PasoCuatroFormulario = ({picker, NumeroDeGrupos, NumeroDeIntegrantes, NombreDeEquipo, prevButton, index, Segundo,TipoDeJuego }) => {
  const MySwal = withReactContent(Swal)
  const onclickGuardar = async()=>{
    let Estado = "ACTIVO"
  const data = await  crearMultiJugador({NombreDeEquipo:NombreDeEquipo,NumeroDeGrupos:NumeroDeGrupos,NumeroDeIntegrantes:NumeroDeIntegrantes, Segundo:Segundo,picker:picker, Estado:Estado,TipoDeJuego:TipoDeJuego})
  MySwal.fire({
    title: `${data.titulo}`,
    text: `${data.respuesta}`,
    icon: `${data.type}`,
    customClass: {
      confirmButton: 'btn btn-primary'
    },
    buttonsStyling: false}) 
  }

  return (
    <Card className="mt-5">
      <CardBody>
        <div className='content-header'>
          <h5 className='mb-0'>Confirmacion de la Informacion</h5>
          <small>Resumen de la Actividad</small>
        </div>
        <Row>
          <Col md='6' className='mb-1'>
            <Label>Grupos de trabajo</Label>
            <p>{NumeroDeGrupos.label}</p>
            <Label>Tarjetas De Actividades</Label>
            {NombreDeEquipo.map(i=>{
              return (<p key={i.value}> - {i.label}</p>)
            })}
          </Col>
          <Col md='6' className='mb-1'>
            <Label>Jugadores por grupo</Label>
            <Repeater count={Number(NumeroDeGrupos.value)}>
              {i=>(<Row>
                <Col md="6" className='mb-1'>
                  <Label> grupo {i+1}</Label>
                  {Segundo[`equipo${i}`].map(i => (<li  key={i.value}>{i.label}</li>))}
                </Col>
              </Row>)}
            </Repeater>
          </Col>
          <Col md='6' className='mb-1'>
            <Label>Fecha de la Actividad</Label>
            {
              picker.map((i, index)=>(
                <p key={index}>- <Label>{index ===0 ? "Fecha de Inicio: " : "Fecha de Fin: "}</Label> {i.toLocaleDateString()}</p>
              ))
            }
          </Col>
          <Col md='6' className='mb-1'>
            <Label>Tipo de Juego :  {
              TipoDeJuego === 1 && <>Vocabularios</>
            }
            {
              TipoDeJuego === 2 && <>Oraciones</>
            }
            {
              TipoDeJuego === 3 && <>Oraciones y Vocabularios</>
            }</Label>
          </Col>
        </Row>
      </CardBody>
      <CardFooter className="d-flex justify-content-between">
        <Button onClick={prevButton} disabled={index === 1} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }} >
          Atras
        </Button>
        <Button onClick={onclickGuardar} style={{ borderRadius: "10px", backgroundColor: "#28c76f", color: "#fff", borderColor: "#28c76f" }}>
          Guardar
        </Button>
      </CardFooter>
    </Card>
  )
}
