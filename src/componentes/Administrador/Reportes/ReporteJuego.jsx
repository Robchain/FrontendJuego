import React, { useEffect, useReducer, useState } from "react";
import Select from "react-select";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css'
import { Button, Col, Label, Row } from "reactstrap";
import { ReporteJuegoApi } from "../../../service/Adminstrador/Reporte";
import { ReportePDFJuego } from "./ReportePDFJuego";
import { DescargarJuegoReporte } from "./DescargarJuegoReporte";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MostrarCurso, MostrarParalelo } from "../../../service/Adminstrador/Usuarios";
const BaseInicialFormulario = {
  Juego: undefined,
  Paralelo:undefined,
  FechaInicio: undefined,
  Curso: undefined, 
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
export const ReporteJuego = () => {
  const [picker, setPicker] = useState(new Date());
  const [picker2, setPicker2] = useState(new Date());
  const [cursoData, setcursoData] = useState([]);
  
  const [paraleloData, setparaleloData] = useState([]);
  const [{ Juego, FechaFin, FechaInicio, Curso, Paralelo}, disparodeAccion] = useReducer(
    llenadodeFormulario,
    BaseInicialFormulario
  );
  const [bloqueo, setBloqueo] = useState(true);
  const [MostrarVocabulario, setMostrarVocabulario] = useState([]);

  //habilita la busqueda
  
  //limpia la data en pantalla
  useEffect(() => {
    setMostrarVocabulario([]);
  }, [Juego]);

  useEffect(() => {
    if(Juego &&Paralelo&& Curso ){
      setBloqueo(false);
    }
  }, [Juego, Paralelo, Curso])

  const dataCurso = async ()=>{
    const data = await MostrarCurso();
    setcursoData(data);
  }
  const dataParalelo = async ()=>{
    const data = await MostrarParalelo();
    setparaleloData(data)
  }
  useEffect(() => {
    if(Juego !=undefined ){
      dataCurso()
      dataParalelo()
    }
  }, [Juego])

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
  
  //buscador
  const Buscar = async () => {
    setMostrarVocabulario([]);
    const data = await ReporteJuegoApi({ Pregunta: Juego,  FechaInicio: FechaInicio, FechaFin: FechaFin,Curso:Curso, Paralelo:Paralelo });
    setMostrarVocabulario(data);
  };

  return (
    <>
      <div className="form-reporte-planificacion">
        <div className="form-reporte-inicial-arriba">
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
          />
        </div>
        <div className="curso-select-reporte">
          <Label className="form-label" for="Curso">
            &nbsp;&nbsp;
            Curso:&nbsp;&nbsp;
          </Label>
          <Select
            name="Curso"
            isSearchable={false}
            onChange={(e) =>{
              disparodeAccion({
                type: "onchange",
                field: "Curso",
                value: e.value,
              })
            }}
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
            onChange={(e) =>{
              disparodeAccion({
                type: "onchange",
                field: "Paralelo",
                value: e.value,
              })
            }}
            options={paraleloData.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Nombre, value: i.Nombre } })}
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
              <div className="mt-3">
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
          {/* <PDFDownloadLink document={<DescargarJuegoReporte data={MostrarVocabulario} juego={Juego} />} fileName="Reporte Juego.pdf">
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
          </PDFDownloadLink> */}
              </div>
      </div>

      <ReportePDFJuego data={MostrarVocabulario} juego={Juego}/>

      {/* {JSON.stringify(MostrarVocabulario)} */}
      
    </>
  );
};
