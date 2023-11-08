import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Input, Label, Row } from "reactstrap";
import Select from 'react-select'
import { todosTeam } from '../../service/Equipo';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
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

const prueba=({num, estudiante, equipos})=>{
  
if(estudiante/num<equipos){
  return true;
}else if(estudiante/num<equipos){
  return false;
}
}

export const PasoUnoFormulario = ({ prevButton, nextButton, index, dispatch, NumeroDeGrupos, NumeroDeIntegrantes, NombreDeEquipo,TipoDeJuego, estudiantevalue }) => {
  const [TeamData, setTeamData] = useState([]);
  const [bloqueosiguiente, setbloqueosiguiente] = useState(true);


  useEffect(() => {
   if( prueba({num:NumeroDeIntegrantes.value , estudiante:estudiantevalue, equipos:NombreDeEquipo.length})){
    setbloqueosiguiente(false)
   }else{ setbloqueosiguiente(true)
/// revisar esto
   }
  }, [NombreDeEquipo, NumeroDeGrupos, estudiantevalue])
  
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
          <small className='text-muted'>Especificar el número de los integrantes</small><br/>
          <small className='text-muted'>Nota: hay {estudiantevalue} estudiantes registrados</small>
        </div>
        <Row>
          <Col md="6" className="mb-1">
            <Label className='form-label' for='grupos'>
            Número de grupos             
            </Label>
            <Select
            value={NumeroDeGrupos}
              onChange={e =>{dispatch({ type: "actualizarData", field: "NumeroDeGrupos", value: e})}}
              options={Options}
              name="NumeroDeGrupos"
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className='form-label' for='equipos'>
              Nombres de equipos &nbsp;&nbsp;&nbsp;&nbsp;
            </Label>
            <Select
            value={NombreDeEquipo}
          isMulti
          onChange={e =>{dispatch({ type: "actualizarData", field: "NombreDeEquipo", value: e })}}
          name='NombreDeEquipo'
            options={TeamData.map(i => { 
                return {
                        label: i.Nombre,
                        value: i._id }
                      })}
            />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='integrantes'>
            Número de integrantes
            </Label>
            <Select
               value={NumeroDeIntegrantes}
            onChange={e =>{dispatch({ type: "actualizarData", field: "NumeroDeIntegrantes", value: e })}}
            name='NumeroDeIntegrantes'
              options={Options2}
            />
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <Label>
              Tipo de Juego
            </Label><br />
            <Input
              type='radio'
              name="TipoDeJuego"
              value={1}
              onChange={event => dispatch({ type: "actualizarData", field: "TipoDeJuego", value: event.target.value })}
              defaultChecked={TipoDeJuego == '1'}
            /> Vocabulario<br />
              <Input
                type='radio'
                name="TipoDeJuego"
                value={2}
                onChange={event => dispatch({ type: "actualizarData", field: "TipoDeJuego", value: event.target.value})}
              defaultChecked={TipoDeJuego == '2'}
              /> Oraciones
            <br/>
            <Input
                type='radio'
                name="TipoDeJuego"
                value={3}
                onChange={event => dispatch({ type: "actualizarData", field: "TipoDeJuego", value: event.target.value })}
              defaultChecked={TipoDeJuego == '3'}
              /> Oraciones y Vocabulario
          </Col>
        </Row>
        <div className='d-flex justify-content-between mt-3'>
        <Button onClick={prevButton} disabled={index === 1} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
        <AiOutlineArrowLeft size={14} className='align-middle me-sm-25 me-0'/>
        Atrás
        </Button>
        <Button onClick={nextButton} disabled={bloqueosiguiente} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }}>
          Siguiente
          <AiOutlineArrowRight  size={14} className='align-middle ms-sm-25 ms-0'/>
        </Button>
        </div>
      </CardBody>
    </Card>
  )
}
