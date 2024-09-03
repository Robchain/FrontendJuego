import React,{ useReducer,useState,useEffect } from "react";
import { Button, Col, Label, Row } from "reactstrap";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css'
import Select from "react-select";
import { BuscarPorCursoYParalelo, ReportesJugadorApi } from "../../../service/Adminstrador/Reporte";
import { ReportePDFJugador } from "./ReportePDFJugador";
import { MostrarCurso, MostrarParalelo } from "../../../service/Adminstrador/Usuarios";
import { base64ToBlob, downloadBlob } from "../../../helpers";
const BaseInicialFormulario = { Curso: undefined, Paralelo: undefined,Estudiante:undefined, Juego:undefined, FechaInicio: undefined, FechaFin: undefined, datosPer:undefined  }
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
  const [{ Curso, Paralelo,Estudiante,Juego, FechaFin, FechaInicio, datosPer}, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario)
  const [Estudiantes, setEstudiantes] = useState([])
  const [picker, setPicker] = useState(new Date())
  const [cursoData, setcursoData] = useState([]);
  const [isavailable, setIsavailable] = useState(true);
  const [base64archivo, setBase64archivo] = useState('');
  const [paraleloData, setparaleloData] = useState([])
  const [bloqueodos, setBloqueodos] = useState(true)
  const [bloqueo, setBloqueo] = useState(true)
  const [picker2, setPicker2] = useState(new Date());
  const [MostrarVocabulario, setMostrarVocabulario] = useState(undefined);
  //llama a los estudiates
  const llamddeData = async ()=>{
    try {
    const data = await BuscarPorCursoYParalelo({Curso:Curso, Paralelo:Paralelo});
    setEstudiantes(data);
    setBloqueodos(false);   
    } catch (error) {
        setEstudiantes([])
    }
}

//muestra el curso
const dataCurso = async ()=>{
  const data = await MostrarCurso();
  setcursoData(data);
}
//muestra el paralelo
const dataParalelo = async ()=>{
  const data = await MostrarParalelo();
  setparaleloData(data)
}
//llama la data
useEffect(() => {
  dataCurso();
  dataParalelo();
}, [])
//llama a los estudiates
useEffect(() => {
if(Curso && Paralelo){
    llamddeData()
}  
}, [Curso,Paralelo])

//habilita campos 
useEffect(() => {
  if((Estudiante !== undefined && Juego !== undefined) || Array.isArray(picker)){
    setBloqueo(false)
  }
}, [Estudiante,Juego])

//limpia la data en pantalla
useEffect(() => {
  setMostrarVocabulario([])
  setIsavailable(true);
}, [Juego,Estudiante, FechaInicio,FechaFin ])

useEffect(() => {
  
  disparodeAccion({
    type: "onchange",
    field: "FechaInicio",
    value:picker,
  });
  disparodeAccion({
    type: "onchange",
    field: "FechaFin",
    value: picker2,
  });

}, [picker, picker2])

//llamada final al buscar
const Buscar = async ()=>{
    setMostrarVocabulario([]);
    const data = await    ReportesJugadorApi({id:Estudiante,Pregunta:Juego,FechaInicio: FechaInicio, FechaFin: FechaFin, datosPer:datosPer })
    setMostrarVocabulario(data);
    if(data.pdf!= undefined || data.pdf!= null )
      {
      if(data.pdf.length>10)
        {
      setBase64archivo(data.pdf)
      setIsavailable(false);
    }}
    
}


const descarga = ()=>{
try {
  
  // const base64PDF = data.base64PDF; // Asumiendo que el base64PDF está en esta propiedad

  // 4) Convertir de base64 a PDF
  if(base64archivo.length<10)return alert('error al descargar archivo')

  const pdfBlob = base64ToBlob(base64archivo, 'application/pdf');

  // 5) Descargar el archivo en el dispositivo
  downloadBlob(pdfBlob, 'archivo.pdf');

} catch (error) {
  alert('error al descargar archivo');
}
}

  return (
    <>
      <Row className="bot1">
        <Col lg="6" sm="12" md="6" xl="6">
          <Label className="form-label" for="Curso">
            &nbsp;&nbsp;
            Grado&nbsp;&nbsp;
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
            options={paraleloData.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Nombre, value: i.Nombre } })}
          />
        </Col>
        <Col lg="6" sm="12" md="6" xl="6">
          <Label className="form-label" for="Curso">
            Estudiante
          </Label>
          <Select
            name="Estudiante"
           options={Estudiantes}
            onChange={(evente) =>{
              disparodeAccion({
                type: "onchange",
                field: "Estudiante",
                value: evente.value,
              })

              disparodeAccion({
                type: "onchange",
                field: "datosPer",
                value: evente,
              })
            }
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
        </Col>
        <div className="form-reporte-section-fecha mt-3">  
              <div className='fecha-inicial-reporte'>
            <Label className='form-label'>
              Feha de inicio:&nbsp;&nbsp;
            </Label><br/>
            <DateTimePicker
            amPmAriaLabel="Select AM/PM"
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            hourAriaLabel="Hour"
            maxDetail="second"
            maxDate={new Date()}
            minuteAriaLabel="Minute"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date and time"
            onChange={setPicker}
            secondAriaLabel="Second"
            value={picker}
            yearAriaLabel="Year"
          />
          </div>&nbsp;&nbsp;&nbsp;&nbsp;
          <div className='fecha-cierre-reporte'>
          <Label className='form-label' >
              Fecha de cierre:&nbsp;&nbsp;
            </Label> <br/>
            <DateTimePicker
            amPmAriaLabel="Select AM/PM"
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            hourAriaLabel="Hour"
            maxDetail="second"
            maxDate={new Date()}
            minDate={new Date(picker)}
            minuteAriaLabel="Minute"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date and time"
            onChange={setPicker2}
            secondAriaLabel="Second"
            value={picker2}
            yearAriaLabel="Year"
          /></div>&nbsp;&nbsp;
              </div>
        <div>
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
            <Button 
            disabled={isavailable}
            style={{
              borderRadius: "10px",
              backgroundColor: "#62259E",
              color: "#fff",
              borderColor: "#62259E",
            }}
            onClick={()=>{descarga()}}
            >
Descargar
            </Button>
        </div>
        
      </Row>
      {/* {JSON.stringify(MostrarVocabulario)} */}
      {
        (MostrarVocabulario != undefined && MostrarVocabulario != null) && (<>
        
        {MostrarVocabulario.data != undefined && <>
          <ReportePDFJugador data={MostrarVocabulario.data} actividad={Juego} Estudiante={Estudiante} Estudiantes={Estudiantes} />
          </>
          }
        </>
        )
      }
      
    </>
  );
};
