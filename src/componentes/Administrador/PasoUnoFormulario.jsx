import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, Col, Input, Label, Row } from "reactstrap";
import Select from 'react-select'
import { todosTeam } from '../../service/Equipo';
const Options = [
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' }
]
const Options2 = [
  { value: '2', label: '2' },
  { value: '4', label: '4' },
  { value: '6', label: '6' }
]
export const PasoUnoFormulario = ({ prevButton, nextButton, index, dispatch, NumeroDeGrupos, NumeroDeIntegrantes, NombreDeEquipo,TipoDeJuego }) => {
  const [TeamData, setTeamData] = useState([]);
  const llamadaDataInicial  = async ()=>{
    const data = await todosTeam();
    setTeamData(data);
  }
  
  useEffect(() => {
    llamadaDataInicial()
  }, [])

  return (
    <Card className="mt-5">
      <CardBody>
        <div className='content-header'>
          <h5 className='mb-0'>Armar Grupos</h5>
          <small className='text-muted'>Especificar el nombre de los integrantes</small>
        </div>
        <Row>
          <Col md="6" className="mb-1">
            <Label className='form-label' for='grupos'>
              Numero de Grupos
            </Label>
            <Select
            value={NumeroDeGrupos}
              onChange={e =>{dispatch({ type: "actualizarData", field: "NumeroDeGrupos", value: e})}}
              options={Options}
              name="Grupo"
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className='form-label' for='equipos'>
              Nombres de Equipos
            </Label>
            <Select
            value={NombreDeEquipo}
          isMulti
          onChange={e =>{dispatch({ type: "actualizarData", field: "NombreDeEquipo", value: e })}}
          name='Equipos'
            options={TeamData.map(i => { 
                return {
                        label: i.Nombre,
                        value: i._id }
                      })}
            />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='integrantes'>
              Numero de Integrantes
            </Label>
            <Select
               value={NumeroDeIntegrantes}
            onChange={e =>{dispatch({ type: "actualizarData", field: "NumeroDeIntegrantes", value: e })}}
            name='NIntegrantes'
              options={Options2}
            />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label>
              Tipo de Juego
            </Label><br />
            <Label><Input
              type='radio'
              name="TipoDeJuego"
              id={1}
              value={1}
              onChange={event => dispatch({ type: "actualizarData", field: "TipoDeJuego", value: event.target.value })}
              defaultChecked={TipoDeJuego === 1}
            />Vocabularios</Label><br />
            <Label>
              <Input
                type='radio'
                name="TipoDeJuego"
                id={2}
                value={2}
                onChange={event => dispatch({ type: "actualizarData", field: "TipoDeJuego", value: event.target.value})}
              defaultChecked={TipoDeJuego === 2}
              />Oraciones
            </Label><br/>
            <Label>
              <Input
                type='radio'
                id={3}
                name="TipoDeJuego"
                value={3}
                onChange={event => dispatch({ type: "actualizarData", field: "TipoDeJuego", value: event.target.value })}
              defaultChecked={TipoDeJuego === 3}
              />Oraciones y Vocabularios
            </Label>
          </Col>
        </Row>
        <div className='d-flex justify-content-between mt-3'>
        <Button onClick={prevButton} disabled={index === 1} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
          Atras
        </Button>
        <Button onClick={nextButton} disabled={NombreDeEquipo.length < 1} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
          Siguiente
        </Button>
        </div>
      </CardBody>
    </Card>
  )
}
