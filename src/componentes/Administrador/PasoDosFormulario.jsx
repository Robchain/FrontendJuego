import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import { Button, Card, CardBody, Col, Label, Row, Form } from "reactstrap";
import { MostrarEstudiante } from '../../service/Estudiante';
import Repeater from '../Repeater';
export const PasoDosFormulario = ({ prevButton, nextButton, index, setSegundo, NumeroDeGrupos,NumeroDeIntegrantes }) => {
  
  const [DataEstudiante, setDataEstudiante] = useState([])
  const dataInciial = async () =>{
  const data = await MostrarEstudiante()
  setDataEstudiante(data)
  }
  const {
    control,
    handleSubmit   
  } = useForm()
  useEffect(() => {
    dataInciial()
    return ()=>{
      setDataEstudiante([])
    }
  }, [])
  
  const manejoData = (data) => {
    if (data.equipo0 === undefined) {
     setSegundo((oldvalue)  => oldvalue)
    } else {
      setSegundo(data) 
    }
  }
  
  return (
    <Card className="mt-5">
      <CardBody>
        <div className='content-header'>
          <h5 className='mb-0'>Seleccion de los participantes</h5>
          <small>Especifique los integrantes de los grupos </small>
        </div>
        <Row>
        <Form onSubmit={handleSubmit((data) => {  manejoData(data); nextButton(); })}>
          <Repeater count={Number(NumeroDeGrupos.value)}>
            {
              i => (<Row key={i}>
                <Col md='6' className='mb-1'>
                  <Label className='form-label' for='firstName'>
                    Grupo {i + 1}
                  </Label>
                </Col>
                <Label className='form-label' for={`equipo${i}`}  >
                  Listado Estudiantes
                </Label>
                <Controller 
              name={`equipo${i}`}
              control={control}
              render={ ({field: {onChange, value, ...rest} })  => <Select
                isMulti
                options={DataEstudiante.map(i => {
                return {
                        label:`${i.Nombre} ${i.Apellido}`,
                        value: i._id }
                      })}
                  value={value}
                  id={`equipos`}
                  onChange={ (e)=> {e.length <= parseInt(NumeroDeIntegrantes.value) && onChange(e)}}
                  placeholder='seleccione'
                  className='react-select'
                  classNamePrefix='select'
                  {...rest}
                />}
                />
                
              </Row>)
            }
          </Repeater>
          <div className='d-flex justify-content-between mt-5'>
          <Button onClick={prevButton} disabled={index === 1} >
          Atras
          <ArrowLeft size={14} className='align-middle me-sm-25 me-0'/>
        </Button>
        <Button type='submit' >
          Siguiente
          <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'/>
        </Button>
        </div>
          </Form>
        </Row>
      </CardBody>
    </Card>
  )
}
