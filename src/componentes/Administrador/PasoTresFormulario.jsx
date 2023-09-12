import React from 'react'
import { Button, Card, CardBody, CardFooter, Col, Label, Row } from "reactstrap";
import Flatpickr from 'react-flatpickr'
import "flatpickr/dist/themes/dark.css"; //material_green.css, material_blue.css, material_red.css, material_orange.css, dark.css
import { useEffect } from 'react';
import { useState } from 'react';
export const PasoTresFormulario = ({ prevButton, nextButton, index , setPicker, picker }) => {
 const [bloqueo, setBloqueo] = useState(true);

 useEffect(() => {
  if(Array.isArray(picker)){
    setBloqueo(false)
  }
 }, [picker])
 
  return (
    <Card className="mt-5">
      <CardBody>
        <div className='content-header'>
          <h5 className='mb-0'>Tiempo de la actividad</h5>
          <small></small>
        </div>
        <Row>
          <Col d='6' className='mb-1' >
            <Label className='form-label' for='DateGameM'>
              Rango de fecha
            </Label>
            <Flatpickr
            placeholder='Fecha'
              data-enable-time
              value={picker}
              id='DateGameM'
              className='form-control'
              onChange={date => setPicker(date)}
              options={{
                altFormat: "m/d/Y h:i K",
                mode: 'range',
                minDate: 'today',
              }}
            />
          </Col>
        </Row>
        <Row>
        </Row>
      </CardBody>
      <CardFooter className="d-flex justify-content-between">
        <Button onClick={prevButton} disabled={index === 1} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }} >
        Atrás
        </Button>
        <Button onClick={nextButton} disabled={bloqueo} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
          Siguiente
        </Button>
      </CardFooter>
    </Card>
  )
}
