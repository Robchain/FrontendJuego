import React, { useState, useReducer, useEffect } from "react";
import { Button, Col, Container, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import { Stepbar } from "../../componentes/Administrador/Stepbar";
import { AdmiMenu } from "../../componentes/AdmiMenu";
import { NavBar } from "../../componentes/NavBar";
import Select from "react-select";
import { PasoUnoFormulario } from "../../componentes/Administrador/PasoUnoFormulario";
import { PasoDosFormulario } from "../../componentes/Administrador/PasoDosFormulario";
import { PasoTresFormulario } from "../../componentes/Administrador/PasoTresFormulario";
import { PasoCuatroFormulario } from "../../componentes/Administrador/PasoCuatroFormulario";
import {  ordenarYagrupar } from "../../helpers/contador";
import { LlamadaDeLLenadoDeEstudianteMultiJugador, historialJuego } from "../../service/Multijugador";
import { ListadoHistoriaDeAsignaciones } from "../../componentes/Administrador/ListadoHistoriaDeAsignaciones";
import { MostrarCurso, MostrarParalelo } from "../../service/Adminstrador/Usuarios";

const estadoInicialFormularioActividad = { NumeroDeGrupos: {}, NumeroDeIntegrantes: {}, NombreDeEquipo: [], TipoDeJuego: 1, Aleatorio: false }

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
const BaseInicialFormulario = { Curso: undefined, Paralelo: undefined, Estudiante: undefined, Juego: undefined }
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
  const [{ NumeroDeGrupos, NumeroDeIntegrantes, NombreDeEquipo, TipoDeJuego, Aleatorio }, dispatch] = useReducer(ActualizacionDeDataFormularioEquipo, estadoInicialFormularioActividad)
  const [index, setIndex] = useState(1);
  const [tabs, setTabs] = useState("1")
  const [cursoData, setcursoData] = useState([]);
  const [paraleloData, setparaleloData] = useState([])
  const [bloqueo, setBloqueo] = useState(true);
  const [AleotorioArmado, setAleotorioArmado] = useState({});
  const [{ Curso, Paralelo }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario);
  const [picker, setPicker] = useState(new Date());
  const [picker2, setPicker2] = useState(new Date());
  const [historial, setHistorial] = useState([])
  const [Segundo, setSegundo] = useState([]);
  const [Estudiantes, setEstudiantes] = useState([]);

  const llamddeHistorial = async () => {
    try {
      const data = await historialJuego({ Curso: Curso, Paralelo: Paralelo });
      setHistorial(data);

    } catch (error) {
      setEstudiantes([]);
    }
  }
  const dataCurso = async ()=>{

    const data = await MostrarCurso();
    setcursoData(data);
  }
  const dataParalelo = async ()=>{
    const data = await MostrarParalelo();
    setparaleloData(data)
  }
  useEffect(() => {
    dataCurso();
    dataParalelo();
  }, [])
  useEffect(() => {
    if (Curso && Paralelo) {
      llamddeHistorial()
    }
  }, [Curso, Paralelo])


  const llamddeData = async () => {
    try {
      const data = await LlamadaDeLLenadoDeEstudianteMultiJugador({ Curso: Curso, Paralelo: Paralelo });
      setEstudiantes(data);

    } catch (error) {
      setEstudiantes([]);
    }
  }
  useEffect(() => {
    if (Curso && Paralelo) {
      setBloqueo(false);
    }
  }, [Curso, Paralelo])
  useEffect(() => {
    if (Curso && Paralelo) {

      setIndex(1);
      dispatch({ type: "reset" })
      setEstudiantes([]);
    }
  }, [Curso, Paralelo])
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => { setIsOpen(!isOpen) }
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
  const onClickAleatorio = () => {
    setAleotorioArmado(ordenarYagrupar(Estudiantes, parseInt(NumeroDeGrupos.value), parseInt(NumeroDeIntegrantes.value)));
  }
  return (
    <Container>
      <NavBar toggle={toggle} Seccion={"Juego colaborativo"} />
      <AdmiMenu toggle={toggle} isOpen={isOpen} />
      <Row>
        <Col lg="5" sm="12" md="5" xl="5">
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
            options={cursoData.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Nombre, value: i.Nombre } })}
          />
        </Col>

        <Col lg="5" sm="12" md="5" xl="5">
          <Label className="form-label" for="Paralelo">
            Paralelo
          </Label>
          <Select
            name="Paralelo"
            isSearchable={false}
            onChange={(e) => {
              disparodeAccion({
                type: "onchange",
                field: "Paralelo",
                value: e.value,
              })
            }}
            options={paraleloData.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Nombre, value: i.Nombre } })}
          />
        </Col>
        <Col lg="6" sm="12" md="6" xl="6" className="my-2">
          <Button style={{
            borderRadius: "10px",
            backgroundColor: "#62259E",
            color: "#fff",
            borderColor: "#62259E",
          }}
            onClick={llamddeData}
            disabled={bloqueo}>
            Buscar
          </Button>
        </Col>
        <Nav tabs style={{ fontSize: 14 }} >
            <NavItem>
              <NavLink
                style={{ color: "#62259E" }}
                onClick={() => { setTabs("1") }}
              >
                 Crear Asignación
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ color: "#62259E" }}
                onClick={() => { setTabs("2") }}
              >
                Historial de juegos
              </NavLink>
            </NavItem>
          </Nav>
      </Row>
      <TabContent activeTab={tabs} className="tabvs">
      {
        Estudiantes.length >0 && <>
          {
            Estudiantes[0].value !=="NO HAY ESTUDIANTES" ?    <TabPane tabId="1" >

            <Row className="mt-4">
              <Stepbar steps={index} />
              {
                index === 1 && <PasoUnoFormulario estudiantevalue={Estudiantes.length} TipoDeJuego={TipoDeJuego} index={index} nextButton={nextButton} prevButton={prevButton} dispatch={dispatch} NumeroDeGrupos={NumeroDeGrupos} NumeroDeIntegrantes={NumeroDeIntegrantes} NombreDeEquipo={NombreDeEquipo}  />
              }
              {
                index === 2 && <PasoDosFormulario dispatch={dispatch} AleotorioArmado={AleotorioArmado} onClickAleatorio={onClickAleatorio} Aleatorio={Aleatorio} Estudiantes={Estudiantes} index={index} nextButton={nextButton} prevButton={prevButton} setSegundo={setSegundo} NumeroDeGrupos={NumeroDeGrupos} NumeroDeIntegrantes={NumeroDeIntegrantes} />
              }
              {
                index === 3 && <PasoTresFormulario index={index} nextButton={nextButton} prevButton={prevButton} setPicker={setPicker} picker={picker} picker2={picker2} setPicker2={setPicker2}/>
              }
              {
                index === 4 && <PasoCuatroFormulario Curso={Curso} Paralelo={Paralelo} index={index} nextButton={nextButton} prevButton={prevButton} Segundo={Segundo} picker2={picker2} NombreDeEquipo={NombreDeEquipo} NumeroDeGrupos={NumeroDeGrupos} NumeroDeIntegrantes={NumeroDeIntegrantes} picker={picker} TipoDeJuego={TipoDeJuego} />
              }
            </Row> </TabPane>:<>
            NO HAY SUFICIENTES ESTUDIANTES
            </>
          }
                  <TabPane tabId="2" >{
            historial.length > 0 && <div> <br /> <h4 style={{ color: "#85858C", fontSize: '1.5em' }}>Historial de juegos</h4> 
            {historial.map(i=>(
 <ListadoHistoriaDeAsignaciones data={i.documentos}/>
            ))
            }
           </div>
          }
</TabPane>
        </>
      }
      
     


          
      
        </TabContent>
      

    </Container>
  )
}
export default ActividadColaborativaAdm;