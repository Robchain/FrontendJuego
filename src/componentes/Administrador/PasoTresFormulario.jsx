import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, Col, Label, Row } from "reactstrap";
import Flatpickr from 'react-flatpickr'
import "flatpickr/dist/themes/dark.css"; //material_green.css, material_blue.css, material_red.css, material_orange.css, dark.css
export const PasoTresFormulario = ({ prevButton, nextButton, index }) => {
  const [picker, setPicker] = useState(new Date())
  useEffect(() => {
    console.log(picker)
  }, [picker])

  return (
    <Card className="mt-5">
      <CardBody>
        <div className='content-header'>
          <h5 className='mb-0'>Tiempo de la Actividad</h5>
          <small></small>
        </div>
        <Row>
          <Col d='6' className='mb-1' >
            <Label className='form-label' for='DateGameM'>
              Rango de Fecha
            </Label>
            <Flatpickr
              data-enable-time
              value={picker}
              id='DateGameM'
              className='form-control'
              onChange={date => setPicker(date)}
              options={{
                mode: 'range',
                defaultDate: ['2022-11-30', '2022-10-21']
              }}
            />
          </Col>
        </Row>
        <Row>
        </Row>
      </CardBody>
      <CardFooter className="d-flex justify-content-between">
        <Button onClick={prevButton} disabled={index === 1} >
          Atras
        </Button>
        <Button onClick={nextButton}>
          Siguiente
        </Button>
      </CardFooter>
    </Card>
  )
}
