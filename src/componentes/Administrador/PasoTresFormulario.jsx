import React from 'react'
import { Button, Card, CardBody, CardFooter, Col, Label, Row } from "reactstrap";
import DateTimePicker from 'react-datetime-picker';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css'
import { useEffect } from 'react';
import { useState } from 'react';
export const PasoTresFormulario = ({ prevButton, nextButton, index , setPicker, picker,picker2, setPicker2 }) => {
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
          <small>La fecha de inicio y fecha final de la actividad no deben de chocar con las demás actividades</small>
        </div>
        <Row>
          <Col d='6' className='mb-1' >
            <Label className='form-label' for='DateGameM'>
              Feha de inicio
            </Label>
            <DateTimePicker
            amPmAriaLabel="Select AM/PM"
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            hourAriaLabel="Hour"
            maxDetail="second"
            minDate={new Date()}
            minuteAriaLabel="Minute"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date and time"
            onChange={setPicker}
            secondAriaLabel="Second"
            value={picker}
            yearAriaLabel="Year"
          />
            <Label className='form-label mt-2' for='DateGameM' >
              Fecha de cierre
            </Label>
            <DateTimePicker
            amPmAriaLabel="Select AM/PM"
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            hourAriaLabel="Hour"
            maxDetail="second"
            minDate={new Date()}
            minuteAriaLabel="Minute"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date and time"
            onChange={setPicker2}
            secondAriaLabel="Second"
            value={picker2}
            yearAriaLabel="Year"
          />
          </Col>
        </Row>
        <Row>
        </Row>

        {JSON.stringify(picker)}
      </CardBody>
      <CardFooter className="d-flex justify-content-between">
        <Button onClick={prevButton} disabled={index === 1} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }} >
        <AiOutlineArrowLeft size={14} className='align-middle me-sm-25 me-0'/>
        Atrás
        </Button>
        <Button onClick={nextButton} disabled={bloqueo} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
          Siguiente
          <AiOutlineArrowRight size={14} className='align-middle ms-sm-25 ms-0'/>
        </Button>
      </CardFooter>
    </Card>
  )
}
