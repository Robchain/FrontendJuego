import React, { useEffect, useReducer, useState } from "react";
import Select from "react-select";
import { Button, Col, Label, Row } from "reactstrap";
import { ReporteCurso } from "../../../service/Adminstrador/Reporte";
import { ReportePDFCurso } from "./ReportePDFCurso";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DescargaCursoReporte } from "./DescargaCursoReporte";
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
  const [bloqueodos, setBloqueodos] = useState(true);
  const [bloqueo, setBloqueo] = useState(true);
  const [MostrarVocabulario, setMostrarVocabulario] = useState([]);

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
    if (Juego === "vocabulario") {
      const data = await ReporteCurso({
        Curso: Curso,
        Pregunta: Juego,
        Paralelo: Paralelo,
      });
      setMostrarVocabulario(data);
    } else if (Juego === "oracion") {
      const data = await ReporteCurso({
        Curso: Curso,
        Pregunta: Juego,
        Paralelo: Paralelo,
      });
      setMostrarVocabulario(data);
    } else if (Juego === "Multi-Jugador") {
      const data = await ReporteCurso({
        Curso: Curso,
        Pregunta: Juego,
        Paralelo: Paralelo,
      });
      setMostrarVocabulario(data);
    } else if (Juego === "Todos") {
      const data = await ReporteCurso({
        Curso: Curso,
        Pregunta: Juego,
        Paralelo: Paralelo,
      });
      setMostrarVocabulario(data);
    }
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
            onChange={(e) =>
              disparodeAccion({
                type: "onchange",
                field: "Paralelo",
                value: e.value,
              })
            }
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
          <Label className="form-label" for="Juego">
            Juegos
          </Label>
          <Select
            name="Juego"
            options={[
              { label: "Vocabularios", value: "vocabulario" },
              { label: "Oraciones", value: "oracion" },
              { label: "Multi-Jugador", value: "Multi-Jugador" },
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
          <PDFDownloadLink document={<DescargaCursoReporte data={MostrarVocabulario} juego={Juego}  Curso={Curso} Paralelo={Paralelo}/>} fileName="prueba.pdf">
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
