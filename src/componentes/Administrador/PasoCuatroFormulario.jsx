import React from 'react'
import { Button, Card, CardBody, CardFooter, Col, Label, Row } from "reactstrap";
import Repeater from '../Repeater';
export const PasoCuatroFormulario = ({ prevButton, nextButton, index }) => {
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
            <p>{ }</p>
            <Label>Tarjetas De Actividades</Label>

          </Col>
          <Col md='6' className='mb-1'>
            <Label>Jugadores por grupo</Label>

          </Col>
          <Col md='6' className='mb-1'>
            <Label>Fecha de la Actividad</Label>


          </Col>
        </Row>
      </CardBody>
      <CardFooter className="d-flex justify-content-between">
        <Button onClick={prevButton} disabled={index === 1} >
          Atras
        </Button>
        <Button onClick={nextButton}>
          Guardar
        </Button>
      </CardFooter>
    </Card>
  )
}
