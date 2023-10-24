import React, { useEffect, useReducer, useState } from "react";
import Select from "react-select";
import Flatpickr from 'react-flatpickr'
import "flatpickr/dist/themes/dark.css"; 
import { Button, Col, Label, Row } from "reactstrap";
import { ReporteCurso } from "../../../service/Adminstrador/Reporte";
import { ReportePDFCurso } from "./ReportePDFCurso";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DescargaCursoReporte } from "./DescargaCursoReporte";
import { MostrarCurso, MostrarParalelo } from "../../../service/Adminstrador/Usuarios";
const BaseInicialFormulario = {
  Curso: undefined,
  Paralelo: undefined,
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
export const ReporteCursos = () => {
  const [{ Curso, Paralelo, Juego }, disparodeAccion] = useReducer(
    llenadodeFormulario,
    BaseInicialFormulario
  );
  const [cursoData, setcursoData] = useState([]);
  const [paraleloData, setparaleloData] = useState([])
  const [bloqueodos, setBloqueodos] = useState(true);
  const [bloqueo, setBloqueo] = useState(true);
  const [picker, setPicker] = useState(new Date());
  const [MostrarVocabulario, setMostrarVocabulario] = useState([]);
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
    if ((Curso, Paralelo)) {
      setBloqueodos(false);
    }
  }, [Curso, Paralelo]);

  useEffect(() => {
    if (Juego) {
      setBloqueo(false);
    }
  }, [Juego]);

  useEffect(() => {
    setMostrarVocabulario([]);
  }, [Juego, Curso, Paralelo])
  

  const Buscar = async () => {
    setMostrarVocabulario([]);
    const data = await ReporteCurso({
      Curso: Curso,
      Pregunta: Juego,
      Paralelo: Paralelo,
      Fecha:picker
    });
    setMostrarVocabulario(data);
  };
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
            options={cursoData.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Nombre, value: i.Nombre } })}
          />
          <Label className="form-label" for="Paralelo">
            &nbsp;&nbsp;
            Paralelo&nbsp;&nbsp;
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
        </Col>
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
                minDate: 'today',
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
          <PDFDownloadLink document={<DescargaCursoReporte data={MostrarVocabulario} juego={Juego}  Curso={Curso} Paralelo={Paralelo}/>} fileName="Reporte curso.pdf">
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
       <ReportePDFCurso data={MostrarVocabulario} juego={Juego}  Curso={Curso} Paralelo={Paralelo}/> 
    </>
  );
};
