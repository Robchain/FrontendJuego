import React, { useState, useReducer, useEffect } from "react";
import { Button, Card, CardBody, CardImg, Col, Container, Label, Row } from "reactstrap";
import { Stepbar } from "../../componentes/Administrador/Stepbar";
import {AdmiMenu} from "../../componentes/AdmiMenu";
import { NavBar } from "../../componentes/NavBar";
import Select from "react-select";
import { PasoUnoFormulario } from "../../componentes/Administrador/PasoUnoFormulario";
import { PasoDosFormulario } from "../../componentes/Administrador/PasoDosFormulario";
import { PasoTresFormulario } from "../../componentes/Administrador/PasoTresFormulario";
import { PasoCuatroFormulario } from "../../componentes/Administrador/PasoCuatroFormulario";
import { fechaEcuador, nombre, ordenarYagrupar } from "../../helpers/contador";
import { LlamadaDeLLenadoDeEstudianteMultiJugador } from "../../service/Multijugador";
const estadoInicialFormularioActividad = { NumeroDeGrupos: {}, NumeroDeIntegrantes:{}, NombreDeEquipo: [],TipoDeJuego:1, Aleatorio:false}

function ActualizacionDeDataFormularioEquipo(state, action) {
  switch (action.type) {
    case 'actualizarData':
      return { ...state, [action.field]: action.value };
      case "reset":
        return estadoInicialFormularioActividad;
    default:
      throw new Error();
  }
}
const BaseInicialFormulario = { Curso: undefined, Paralelo: undefined,Estudiante:undefined, Juego:undefined }
function llenadodeFormulario(state, action) {
    switch (action.type) {
        case 'onchange':
            return { ...state, [action.field]: action.value };
        case "reset":
            return BaseInicialFormulario;
        default:
            throw new Error();
    }
}
const ActividadColaborativaAdm = () => {
  const [{NumeroDeGrupos, NumeroDeIntegrantes, NombreDeEquipo,TipoDeJuego,Aleatorio}, dispatch] = useReducer(ActualizacionDeDataFormularioEquipo, estadoInicialFormularioActividad)
  const [index, setIndex] = useState(1)
  const [bloqueo, setBloqueo] = useState(true)
  const [AleotorioArmado, setAleotorioArmado] = useState({});
  const [{ Curso, Paralelo }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario)
  const [picker, setPicker] = useState(new Date())
 const [Segundo, setSegundo] = useState([]);
 const [Estudiantes, setEstudiantes] = useState([])
  const llamddeData = async ()=>{
    try {
    const data = await LlamadaDeLLenadoDeEstudianteMultiJugador({Curso:Curso, Paralelo:Paralelo});
    setEstudiantes(data);
    
    } catch (error) {
        setEstudiantes([])
    }
}
useEffect(() => {
  if(Curso && Paralelo){
      setBloqueo(false);
  }
}, [Curso,Paralelo])
useEffect(() => {
  if(Curso && Paralelo){

    setIndex(1);
    dispatch({ type: "reset"})
    setEstudiantes([]);
  }
}, [Curso,Paralelo])
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => { setIsOpen(!isOpen)}
  const prevButton = () => {
    if (index > 1) {
      setIndex(prev => prev - 1);
    }
  };
  
  const nextButton = () => {
    if (index < 4) {
      setIndex(prev => prev + 1);
    }
  };
  const onClickAleatorio = ()=>{
    setAleotorioArmado(ordenarYagrupar(Estudiantes,parseInt(NumeroDeGrupos.value),parseInt(NumeroDeIntegrantes.value)));
    }
  return (
    <Container>
      <NavBar toggle={toggle} Seccion={"Actividad Colaborativa"} />
      <AdmiMenu toggle={toggle} isOpen={isOpen}/>
      <Row> 
      <Col lg="6" sm="12" md="6" xl="6">
          <Label className="form-label" for="Curso">
            Curso
          </Label>
          <Select
            name="Curso"
            isSearchable={false}
            onChange={(e) =>
              disparodeAccion({
                type: "onchange",
                field: "Curso",
                value: e.value,
              })
            }
            options={[
              { value: "PRIMERO", label: "PRIMERO" },
              { value: "SEGUNDO", label: "SEGUNDO" },
              { value: "TERCERO", label: "TERCERO" },
            ]}
          />
          </Col>
      
          <Col lg="6" sm="12" md="6" xl="6">
          <Label className="form-label" for="Paralelo">
            Paralelo
          </Label>
          <Select
            name="Paralelo"
            isSearchable={false}
            onChange={(e) =>{
              disparodeAccion({
                type: "onchange",
                field: "Paralelo",
                value: e.value,
              })
            }}
            options={[
              { value: "A", label: "A" },
              { value: "B", label: "B " },
              { value: "C", label: "C" },
              { value: "D", label: "D" },
              { value: "E", label: "E" },
              { value: "F", label: "F" },
            ]}
          />
        </Col>
        <Col lg="6" sm="12" md="6" xl="6" className="my-2">
         <Button   style={{
              borderRadius: "10px",
              backgroundColor: "#62259E",
              color: "#fff",
              borderColor: "#62259E",
            }}
            onClick={llamddeData}
            disabled={bloqueo}>
          Crear Asignación
         </Button>
        </Col>
        </Row>
        {
          Estudiantes.length>0 &&<>
        {
          Estudiantes[0].value  &&  <Row>
        <Stepbar steps={index} />
        {
          index === 1 && <PasoUnoFormulario TipoDeJuego={TipoDeJuego} index={index} nextButton={nextButton} prevButton={prevButton} dispatch={dispatch} NumeroDeGrupos={NumeroDeGrupos} NumeroDeIntegrantes={NumeroDeIntegrantes} NombreDeEquipo={NombreDeEquipo} />
        }
        {
          index === 2 && <PasoDosFormulario  dispatch={dispatch} AleotorioArmado={AleotorioArmado} onClickAleatorio={onClickAleatorio} Aleatorio={Aleatorio} Estudiantes={Estudiantes} index={index} nextButton={nextButton} prevButton={prevButton} setSegundo={setSegundo} NumeroDeGrupos={NumeroDeGrupos} NumeroDeIntegrantes={NumeroDeIntegrantes} />
        }
        {
          index === 3 && <PasoTresFormulario index={index} nextButton={nextButton} prevButton={prevButton} setPicker={setPicker} picker={picker} />
        }
        {
          index === 4 && <PasoCuatroFormulario Curso={Curso} Paralelo={Paralelo} index={index} nextButton={nextButton} prevButton={prevButton} Segundo={Segundo}  NombreDeEquipo={NombreDeEquipo} NumeroDeGrupos={NumeroDeGrupos} NumeroDeIntegrantes={NumeroDeIntegrantes} picker={picker} TipoDeJuego={TipoDeJuego}/>
        }
      </Row>
        }
        {
          Estudiantes[0].IdDeLaAsignacion  && <Row>
          <h3 style={{color:"#85858C", fontSize:'1.5em'}}>Juegos en proceso: <br/> Fecha de inicio: {fechaEcuador(Estudiantes[0].FechaDeInicio)} -- Fecha fin: {fechaEcuador(Estudiantes[0].FechaDeFin)}</h3>
            {
              Estudiantes.map(i=>(
                <Col lg='4'>
                  <Card style={{padding:'12px'}}>
                  {
                    i.Equipo === null ? <span style={{color:"#85858C"}}>No hay equipos, el estudiante debe elegir uno</span> : <CardImg  alt={i.Equipo.Nombre} src={i.Equipo.Imagen}   top
      width="100%"/>
                  }
                    <CardBody>
<span style={{color:"#62259E", fontWeight:700}}>Listado de los integrantes</span>
<ul>
                  {i.Integrantes.map(e=>(<li>{e.label}</li> ))}
                  </ul>
                  <p><span style={{color:"#62259E", fontWeight:700}}>Tipo de Juego: </span> 
                  {
              i.TipoDeJuego == '1' && <span>Vocabularios</span>
            }
            {
              i.TipoDeJuego == '2' && <span>Oraciones</span>
            }
            {
              i.TipoDeJuego == '3' && <span>Oraciones y Vocabularios</span>
            }
            </p>
            {
              (i.Avance!==null&&(i.Avance.length/5===i.Integrantes.length)) ? <h3 style={{color:"#62259E"}}>
                    Juego terminado
                      </h3> : <p style={{marginTop:'10px'}}> <span style={{color:"#62259E", fontWeight:700}}>Turno actual: </span>{nombre({objecto:i})} </p>
            }
                    </CardBody>
                  </Card>
                </Col>
              ))
            }
          </Row>
        }
        </>
        }
    </Container>
  )
}
export default ActividadColaborativaAdm;