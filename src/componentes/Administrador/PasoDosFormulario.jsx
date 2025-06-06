import React from 'react'
import { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import { Button, Card, CardBody, Col, Label, Row, Form } from "reactstrap";
import Repeater from '../Repeater';
export const PasoDosFormulario = ({ prevButton, dispatch, onClickAleatorio, AleotorioArmado, nextButton, Aleatorio, index, setSegundo, NumeroDeGrupos, NumeroDeIntegrantes, Estudiantes }) => {
  const {
    control,
    handleSubmit
  } = useForm()

  const [estudiantesSeleccionados, setEstudiantesSeleccionados] = useState([]);

  const handleSelectChange = (index, selectedOptions) => {
    setEstudiantesSeleccionados((prevState) => {
      const newState = [...prevState];
      newState[index] = selectedOptions;
      return newState;
    });
  };

  const opcionesFiltradas = (index) => {
    const opcionesEstudiantes = Estudiantes.filter(
      (estudiante) =>
        !estudiantesSeleccionados.some((selected) => selected && selected.some((s) => s.value === estudiante.value))
    );
    return opcionesEstudiantes;
  };



  const manejoData = (data) => {
    if (Aleatorio === true) {

      setSegundo(data);
    } else {

      setSegundo(data)
    }
  }

  return (
    <Card className="mt-5">
      <CardBody>
        <div className='content-header'>
          <h5 className='mb-0'>Selección de los participantes</h5>
          <small>Especifique los integrantes de los grupos </small><br />
          <small className='text-red-color'>Si los asigna manualmente, mínimo 2 integrantes por equipo
            (Solo esta opción permite NO planificar a todo el curso).</small><br />
        </div>
        <Row >
          <div >
            {
              Aleatorio ? <><small>se ajustará el número de jugadores a mínimo 2 para completar los grupos solicitados</small>&nbsp;&nbsp;<Button style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }} onClick={() => { onClickAleatorio(); dispatch({ type: "actualizarData", field: "Aleatorio", value: !Aleatorio }) }}>Aleatorio</Button></> : <><small>Si selecciona aleatorio se respeta el criterio ingresado en número de integrantes</small>&nbsp;&nbsp;<Button style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }} onClick={() => { onClickAleatorio(); dispatch({ type: "actualizarData", field: "Aleatorio", value: !Aleatorio }) }}>Aleatorio</Button></>
            }

          </div>
          {
            Aleatorio === true ? <>
              {
                Object.keys(AleotorioArmado) ? <>{
                  Object.keys(AleotorioArmado).map((grupoKey) => (
                    <Col key={grupoKey}>
                      <h3>{grupoKey}</h3>
                      {AleotorioArmado[grupoKey].map(i => (
                        <div key={i.value}>{`- ${i.label}`}</div>
                      ))}
                    </Col>
                  ))
                }</> : <></>
              }
              <div className='d-flex justify-content-between mt-5'>
                <Button onClick={prevButton} disabled={index === 1} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
                  <AiOutlineArrowLeft size={14} className='align-middle me-sm-25 me-0' />
                  Atras
                </Button>
                <Button onClick={() => { manejoData(AleotorioArmado); nextButton() }} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }} >
                  Siguiente
                  <AiOutlineArrowRight size={14} className='align-middle ms-sm-25 ms-0' />
                </Button>
              </div>
            </> : <Form onSubmit={handleSubmit((data) => { manejoData(data); nextButton() })}>
              <Repeater count={Number(NumeroDeGrupos.value)}>
                {
                  i => (<Row key={i}>
                    <Col md='6' className='mb-1'>
                      <Label className='form-label' for='firstName'>
                        Grupo {i + 1}
                      </Label>
                    </Col>
                    <Label className='form-label' for={`Equipo ${i}`}  >
                      Listado Estudiantes
                    </Label>
                    <Controller
                      name={`Equipo ${i + 1}`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          isMulti
                          options={opcionesFiltradas(i)}
                          value={value}
                          onChange={(selectedOptions) => {
                            handleSelectChange(i, selectedOptions);
                            onChange(selectedOptions);
                          }}
                          placeholder='Seleccione'
                        />
                      )}
                    />
                  </Row>)
                }
              </Repeater>

              <div className='d-flex justify-content-between mt-5'>
                <Button onClick={prevButton} disabled={index === 1} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
                  <AiOutlineArrowLeft size={14} className='align-middle me-sm-25 me-0' />
                  Atrás
                </Button>
                <Button type='submit' style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }} >
                  Siguiente
                  <AiOutlineArrowRight size={14} className='align-middle ms-sm-25 ms-0' />
                </Button>
              </div>
            </Form>
          }


        </Row>
      </CardBody>
    </Card>
  )
}
