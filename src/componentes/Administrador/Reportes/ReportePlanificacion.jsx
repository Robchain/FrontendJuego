import React, { useEffect, useReducer, useState } from 'react'
import { Button, Col, Container, Input, Label, Row } from "reactstrap";
import DateTimePicker from 'react-datetime-picker';
import Select from "react-select";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css'
import { ReportePrimero } from '../../../service/Adminstrador/Reporte';
import { MostrarCurso, MostrarParalelo } from '../../../service/Adminstrador/Usuarios';
import { ReportePDFPlanificacion } from './ReportePDFPlanificacion';
import { base64ToBlob, downloadBlob } from '../../../helpers';
const BaseInicialFormulario = { Curso: undefined, Paralelo: undefined, FechaInicio: undefined, FechaFin: undefined }
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

export const ReportePlanificacion = () => {
  const [{ Curso, Paralelo, FechaInicio, FechaFin }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario);
  const [cursoData, setcursoData] = useState([]);
  const [paraleloData, setparaleloData] = useState([]);
  const [isdesable, setIsdesable] = useState(true);
  const [isavailable, setIsavailable] = useState(true);
  const [base64archivo, setBase64archivo] = useState('');
  const [MostrarVocabulario, setMostrarVocabulario] = useState([]);
  const [picker, setPicker] = useState(new Date());
  const [picker2, setPicker2] = useState(new Date());


  const dataCurso = async () => {
    const data = await MostrarCurso();
    setcursoData(data);
  }
  const dataParalelo = async () => {
    const data = await MostrarParalelo();
    setparaleloData(data)
  }
  useEffect(() => {
    if (Curso && Paralelo) {
      setIsdesable(false);
    }
  }, [Curso, Paralelo])
  useEffect(() => {
    dataCurso()
    dataParalelo()

  }, [])

  useEffect(() => {

    setMostrarVocabulario([]);
    setIsavailable(true);

  }, [Curso, Paralelo,])


  useEffect(() => {
    disparodeAccion({
      type: "onchange",
      field: "FechaInicio",
      value: picker,
    });
    disparodeAccion({
      type: "onchange",
      field: "FechaFin",
      value: picker2,
    });

  }, [picker, picker2])

  const busquedaReporte = async () => {
    setMostrarVocabulario([]);
    const data = await ReportePrimero({ Curso, Paralelo, FechaInicio, FechaFin });
    setMostrarVocabulario(data);
    if (data.pdf != undefined || data.pdf != null) {
      if (data.pdf.length > 10) {
        setBase64archivo(data.pdf)
        setIsavailable(false);
      }
    }
  }


  const descarga = () => {
    try {

      // const base64PDF = data.base64PDF; // Asumiendo que el base64PDF está en esta propiedad

      // 4) Convertir de base64 a PDF
      if (base64archivo.length < 10) return alert('error al descargar archivo')

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
              Curso:&nbsp;&nbsp;
            </Label>
            <Select
              name="Curso"
              isSearchable={false}
              onChange={(e) => {
                disparodeAccion({
                  type: "onchange",
                  field: "Curso",
                  value: e.value,
                })
              }}
              options={cursoData.filter((item) => item.Estado === "ACTIVO").map(i => { return { label: i.Nombre, value: i.Nombre } })}
            />
         </Col>

        <Col lg="6" sm="12" md="6" xl="6">
               <Label className="form-label" for="Paralelo">
              &nbsp;&nbsp;
              Paralelo:&nbsp;&nbsp;
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
      </Row>

      <div className='form-reporte-planificacion'>
        <div className="form-reporte-section-fecha mt-3">
          <div className='fecha-inicial-reporte'>
            <Label className='form-label'>
              Fecha de inicio:&nbsp;&nbsp;
            </Label><br />
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
          </div>&nbsp;&nbsp;
          <div className='fecha-cierre-reporte'>
            <Label className='form-label' >
              Fecha de cierre:&nbsp;&nbsp;
            </Label> <br />
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
        <div className="form-reporte-inicial-botones">
          <Button style={{
            borderRadius: "10px",
            backgroundColor: "#62259E",
            color: "#fff",
            borderColor: "#62259E",
          }}
            onClick={busquedaReporte}
            disabled={isdesable}
          >

            Buscar
          </Button>
          &nbsp;&nbsp;
          <Button
            disabled={isavailable}
            style={{
              borderRadius: "10px",
              backgroundColor: "#62259E",
              color: "#fff",
              borderColor: "#62259E",
            }}
            onClick={() => { descarga() }}
          >
            Descargar
          </Button>
        </div>

      </div>
      {MostrarVocabulario != undefined && MostrarVocabulario != null && MostrarVocabulario.data != undefined ? (
        <ReportePDFPlanificacion data={MostrarVocabulario.data} Curso={Curso} Paralelo={Paralelo} />
      ) : (
        <div className='final-aciertos return-menu-label'>
          <div className='numeros-aciertos'>
            <span>
              No existen datos
            </span>
          </div>
        </div>
      )
      }
      
      {/* {
        (MostrarVocabulario != undefined && MostrarVocabulario != null) && (<>

          {MostrarVocabulario.data != undefined && <>
            <ReportePDFPlanificacion data={MostrarVocabulario.data} Curso={Curso} Paralelo={Paralelo} />
          </>
          }
        </>
        )
      } */}

    </>
  )
}