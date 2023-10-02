import React,{ useReducer,useState,useEffect } from "react";
import { Button, Col, Label, Row } from "reactstrap";
import Flatpickr from 'react-flatpickr'
import "flatpickr/dist/themes/dark.css";
import Select from "react-select";
import { BuscarPorCursoYParalelo, ReportesJugadorApi } from "../../../service/Adminstrador/Reporte";
import { ReportePDFJugador } from "./ReportePDFJugador";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DescargarJuegadorReporte } from "./DescargarJuegadorReporte";
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
export const ReporteJugador = () => {
  const [{ Curso, Paralelo,Estudiante,Juego, }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario)
  const [Estudiantes, setEstudiantes] = useState([])
  const [picker, setPicker] = useState(new Date())
  const [bloqueodos, setBloqueodos] = useState(true)
  const [bloqueo, setBloqueo] = useState(true)
  const [MostrarVocabulario, setMostrarVocabulario] = useState([]);
  const llamddeData = async ()=>{
    try {
    const data = await BuscarPorCursoYParalelo({Curso:Curso, Paralelo:Paralelo});
    setEstudiantes(data);
    setBloqueodos(false);   
    } catch (error) {
        setEstudiantes([])
    }
}
useEffect(() => {
if(Curso && Paralelo){
    llamddeData()
}  
}, [Curso,Paralelo])

useEffect(() => {
  if((Estudiante !== undefined && Juego !== undefined) || Array.isArray(picker)){
    setBloqueo(false)
  }
}, [Estudiante,Juego])

useEffect(() => {
  setMostrarVocabulario([])
}, [Juego,Estudiante])

const Buscar = async ()=>{
    setMostrarVocabulario([]);
    const data = await    ReportesJugadorApi({id:Estudiante,Pregunta:Juego,Fecha:picker})
    setMostrarVocabulario(data);

}


  return (
    <>
      <Row className="bot1">
        <Col lg="6" sm="12" md="6" xl="6">
          <Label className="form-label" for="Curso">
            &nbsp;&nbsp;
            Curso&nbsp;&nbsp;
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
          <Label className="form-label" for="Paralelo">
            &nbsp;&nbsp;
            Paralelo&nbsp;&nbsp;
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
        <Col lg="6" sm="12" md="6" xl="6">
          <Label className="form-label" for="Curso">
            Estudiante
          </Label>
          <Select
            name="Estudiante"
           options={Estudiantes}
            onChange={(evente) =>
              disparodeAccion({
                type: "onchange",
                field: "Estudiante",
                value: evente.value,
              })
            }
            isDisabled={bloqueodos}
          />
          <Label className="form-label" for="Juego">
            Juegos
          </Label>
          <Select
            name="Juego"
            options={[
              { label: "Vocabularios", value: "vocabulario" },
              { label: "Oraciones", value: "oracion" },
              { label: "Colaborativo", value: "Colaborativo" },{label:"Todos", value:"Todos"}
            ]}
           onChange={(evente) =>
              disparodeAccion({
                type: "onchange",
                field: "Juego",
                value: evente.value,
              })
            }
            isDisabled={bloqueodos}
          />
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
                
              }}
            />
          <br />
          <Button
            onClick={() => Buscar()}
            style={{
              borderRadius: "10px",
              backgroundColor: "#62259E",
              color: "#fff",
              borderColor: "#62259E",
            }}
            disabled={bloqueo}
          >
            Buscar
          </Button>&nbsp;&nbsp;
  <PDFDownloadLink document={<DescargarJuegadorReporte data={MostrarVocabulario} actividad={Juego} Estudiante={Estudiante} Estudiantes={Estudiantes}/>} fileName={`Reporte.pdf`}>
            <Button
              style={{
                borderRadius: "10px",
                backgroundColor: "#62259E",
                color: "#fff",
                borderColor: "#62259E",
              }}
              disabled={bloqueo}
            >
              Descargar
            </Button>
            </PDFDownloadLink> :<></>
        </Col>
      </Row>
      <ReportePDFJugador data={MostrarVocabulario} actividad={Juego} Estudiante={Estudiante} Estudiantes={Estudiantes} />
    </>
  );
};
