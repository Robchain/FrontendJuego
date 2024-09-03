import React, { useEffect, useReducer, useState } from "react";
import Select from "react-select";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css'
import { Button, Col, Label, Row } from "reactstrap";
import { ReporteCurso } from "../../../service/Adminstrador/Reporte";
import { ReportePDFCurso } from "./ReportePDFCurso";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DescargaCursoReporte } from "./DescargaCursoReporte";
import { MostrarCurso, MostrarParalelo } from "../../../service/Adminstrador/Usuarios";
import { base64ToBlob, downloadBlob } from "../../../helpers";
const BaseInicialFormulario = {
  Curso: undefined,
  Paralelo: undefined,
  Juego: undefined,
  FechaInicio: undefined,
   FechaFin: undefined
};
function llenadodeFormulario(state, action) {
  switch (action.type) {
    case "onchange":
      return { ...state, [action.field]: action.value };
    case "reset":
      return BaseInicialFormulario;
    default:
      throw new Error();
  }
}
export const ReporteCursos = () => {
  const [{ Curso, Paralelo, Juego, FechaFin, FechaInicio }, disparodeAccion] = useReducer(
    llenadodeFormulario,
    BaseInicialFormulario
  );
  const [picker2, setPicker2] = useState(new Date());
  const [cursoData, setcursoData] = useState([]);
  const [paraleloData, setparaleloData] = useState([])
  const [bloqueodos, setBloqueodos] = useState(true);
  const [isavailable, setIsavailable] = useState(true);
  const [base64archivo, setBase64archivo] = useState('');
  const [bloqueo, setBloqueo] = useState(true);
  const [picker, setPicker] = useState(new Date());
  const [MostrarVocabulario, setMostrarVocabulario] = useState([]);
  //llamada de los curso 
  const dataCurso = async ()=>{
    const data = await MostrarCurso();
    setcursoData(data);
  }
  //llamada de los paralelo
  const dataParalelo = async ()=>{
    const data = await MostrarParalelo();
    setparaleloData(data)
  }
  //llamadas inciales
  useEffect(() => {
    dataCurso();
    dataParalelo();
  }, [])
  //habilitar campos
  useEffect(() => {
    if ((Curso, Paralelo)) {
      setBloqueodos(false);
    }
  }, [Curso, Paralelo]);

  //habilitar el boton de busqueda
  useEffect(() => {
    if (Juego) {
      setBloqueo(false);
    }
  }, [Juego]);

  //borrar la data mostrada
  useEffect(() => {
    setMostrarVocabulario([]);
    setIsavailable(true);
  }, [Juego, Curso, Paralelo])
  //llenado de las fechas
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
  

  //busqueda
  const Buscar = async () => {
    setMostrarVocabulario([]);
    const data = await ReporteCurso({
      Curso: Curso,
      Pregunta: Juego,
      Paralelo: Paralelo,
      FechaInicio: FechaInicio,
        FechaFin: FechaFin
    });
    setMostrarVocabulario(data);
    if(data.pdf!= undefined || data.pdf!= null )
      {
      if(data.pdf.length>10)
        {
      setBase64archivo(data.pdf)
      setIsavailable(false);
    }}
  };

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
      <div className="form-reporte-planificacion">
        <div className="form-reporte-inicial-arriba">
            <div className="curso-select-reporte">
            <Label className="form-label" for="Curso">
            &nbsp;&nbsp;
            Grado:&nbsp;&nbsp;
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
            </div>
            <div className="paralelo-select-reporte">
            <Label className="form-label" for="Paralelo">
            &nbsp;&nbsp;
            Paralelo:&nbsp;&nbsp;
          </Label>
          <Select
            name="Paralelo"
            isSearchable={false}
            onChange={(e) =>
              disparodeAccion({
                type: "onchange",
                field: "Paralelo",
                value: e.value,
              })
            }
            options={paraleloData.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Nombre, value: i.Nombre } })}
          />
            </div>
            <div className="juego-select-reporte">
            <Label className="form-label" for="Juego">
            &nbsp;&nbsp;
            Juegos:&nbsp;&nbsp;
          </Label>
          <Select
            name="Juego"
            options={[
              { label: "Vocabularios", value: "vocabulario" },
              { label: "Oraciones", value: "oracion" },
              { label: "Colaborativo", value: "Colaborativo" },
              { label: "Todos", value: "Todos" },
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
            </div>
        </div>
            
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
      </div>
       <ReportePDFCurso data={MostrarVocabulario} juego={Juego}  Curso={Curso} Paralelo={Paralelo}/> 
    </>
  );
};
