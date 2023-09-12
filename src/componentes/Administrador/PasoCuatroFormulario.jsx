import React from 'react'
import { Button, Card, CardBody, CardFooter, Col, Label, Row } from "reactstrap";
import { crearMultiJugador } from '../../service/Multijugador';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const PasoCuatroFormulario = ({picker, NumeroDeGrupos, NumeroDeIntegrantes, NombreDeEquipo, prevButton, index, Segundo,TipoDeJuego,Curso, Paralelo }) => {
  const MySwal = withReactContent(Swal)
  const onclickGuardar = async()=>{
    try {
  const data = await  crearMultiJugador({NombreDeEquipo:NombreDeEquipo,NumeroDeGrupos:NumeroDeGrupos,NumeroDeIntegrantes:NumeroDeIntegrantes, Segundo:Segundo,Curso:Curso, Paralelo:Paralelo, picker:picker, Estado:"ACTIVO",TipoDeJuego:TipoDeJuego})
  MySwal.fire({
    title: `${data.titulo}`,
    text: `${data.respuesta}`,
    icon: `${data.type}`,
    customClass: {
      confirmButton: 'btn btn-primary'
    },
    buttonsStyling: false});
    setTimeout(function() {
      window.location.reload();
    }, 5000);
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
    }
  }

  return (
    <Card className="mt-5">
      <CardBody>
        <div className='content-header'>
          <h5 className='mb-0'>Confirmación de la información</h5>
          <small>Resumen de la actividad</small>
        </div>
        <Row>
          <Col md='6' className='mb-1'>
            <Label>Grupos de trabajo</Label>
            <p>{NumeroDeGrupos.label}</p>
            <Label>Tarjetas De actividades</Label>
            {NombreDeEquipo.map(i=>{
              return (<p key={i.value}> - {i.label}</p>)
            })}
          </Col>
          <Col md='6' className='mb-1'>
            <Label>Jugadores por grupo</Label>
            {
              Object.keys(Segundo).map((grupoKey, e)=>(
                  <Col key={grupoKey}>
                  <Label> Grupo {e+1}</Label>
            {Segundo[grupoKey].map(i=>(
              <li key={i.value}>{i.label}</li>
            ))}
          </Col>
          ))
            }
          </Col>
          <Col md='6' className='mb-1'>
            <Label>Fecha de la actividad</Label>
            {
              picker.map((i, index)=>(
                <p key={index}>- <Label>{index ===0 ? "Fecha de Inicio: " : "Fecha de Fin: "}</Label> {i.toLocaleDateString()}</p>
              ))
            }
          </Col>
          <Col md='6' className='mb-1'>
            <Label>Tipo de juego:&ensp;
             {
              TipoDeJuego == '1' && <span>Vocabularios</span>
            }
            {
              TipoDeJuego == '2' && <span>Oraciones</span>
            }
            {
              TipoDeJuego == '3' && <span>Oraciones y Vocabularios</span>
            }
            </Label>
          </Col>
        </Row>
      </CardBody>
      <CardFooter className="d-flex justify-content-between">
        <Button onClick={prevButton} disabled={index === 1} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }} >
        Atrás
        </Button>
        <Button onClick={onclickGuardar} style={{ borderRadius: "10px", backgroundColor: "#28c76f", color: "#fff", borderColor: "#28c76f" }}>
          Guardar
        </Button>
      </CardFooter>
    </Card>
  )
}
