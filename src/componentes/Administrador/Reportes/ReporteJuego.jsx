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
const BaseInicialFormulario = {
  Curso: undefined,
  Paralelo: undefined,
  Estudiante: undefined,
  Juego: undefined,
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
  const [{ Juego }, disparodeAccion] = useReducer(
    llenadodeFormulario,
    BaseInicialFormulario
  );
  const [bloqueo, setBloqueo] = useState(true);
  const [MostrarVocabulario, setMostrarVocabulario] = useState([]);
  useEffect(() => {
    if (Juego !== undefined) {
      setBloqueo(false);
    }
  }, [Juego]);
  useEffect(() => {
    setMostrarVocabulario([]);
  }, [Juego]);
  const Buscar = async () => {
    setMostrarVocabulario([]);
    const data = await ReporteJuegoApi({ Pregunta: Juego, Fecha:picker });
    setMostrarVocabulario(data);
  };
  return (
    <>
      <Row className="bot1">
        <Col lg="6" sm="12" md="6" xl="6">
          <Label className="form-label" for="Juego">
            Juegos
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
           <Label className='form-label' for='DateGameM'>
              Rango de fecha
            </Label>
            <DateTimePicker
            amPmAriaLabel="Select AM/PM"
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            hourAriaLabel="Hour"
            maxDetail="second"
            minDate={new Date()}
            minuteAriaLabel="Minute"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date and time"
            onChange={setPicker}
            secondAriaLabel="Second"
            value={picker}
            yearAriaLabel="Year"
          />
          {
            // este era un date pick range sin hora
          }
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
          <PDFDownloadLink document={<DescargarJuegoReporte data={MostrarVocabulario} juego={Juego} />} fileName="Reporte Juego.pdf">
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
          </PDFDownloadLink>
        </Col>
      </Row>

      <ReportePDFJuego data={MostrarVocabulario} juego={Juego}/>
    </>
  );
};
