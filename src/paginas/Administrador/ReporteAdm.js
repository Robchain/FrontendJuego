import React, {useEffect, useReducer, useState } from "react";
import {  Button, Container, Input, Label } from "reactstrap";
import {AdmiMenu} from "../../componentes/AdmiMenu";
import Select from "react-select";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css'
import { NavBar } from "../../componentes/NavBar";
import DateTimePicker from 'react-datetime-picker';
// import { ReporteJugador } from "../../componentes/Administrador/Reportes/ReporteJugador";
// import { ReporteCursos } from "../../componentes/Administrador/Reportes/ReporteCursos";
import { ReporteJuego } from "../../componentes/Administrador/Reportes/ReporteJuego";
import { MostrarCurso, MostrarParalelo } from "../../service/Adminstrador/Usuarios";
import { ReportePrimero } from "../../service/Adminstrador/Reporte";
const BaseInicialFormulario = { Curso: undefined, Paralelo: undefined, Juego: undefined, FechaInicio: undefined, FechaFin: undefined }
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
const ReporteAdm = () => {
  const [{ Curso, Paralelo,Juego, FechaInicio, FechaFin }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario);
    const [isOpen, setIsOpen] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [cursoData, setcursoData] = useState([]);
    const [paraleloData, setparaleloData] = useState([])
    const [busquedaPor, setBusquedaPor] = useState("");
    const toggle = () => { setIsOpen(!isOpen) }
    const [picker, setPicker] = useState(new Date());
    const [picker2, setPicker2] = useState(new Date());
    //--------
    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };
  //-----
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
    
    useEffect(() => {
      if(isChecked){
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
      }else{
        disparodeAccion({
          type: "onchange",
          field: "FechaInicio",
          value:undefined,
        });
        disparodeAccion({
          type: "onchange",
          field: "FechaFin",
          value: undefined,
        });
      }

    }, [isChecked,picker, picker2])
    
    const busquedaReporte =async()=>{

      const data = await ReportePrimero({Curso, Paralelo, Juego,FechaInicio, FechaFin,isChecked});
      console.log(data)

    }

    return (
        <Container >
            <NavBar toggle={toggle} Seccion={"Reporte Juego"}/>
            <AdmiMenu toggle={toggle} isOpen={isOpen} />
            <div className='form-reporte-inicial'>
              <div className="form-reporte-inicial-arriba">
              <div className="juego-select-reporte">
            <Label className="form-label" for="Juego">
            &nbsp;&nbsp;
            Juego:&nbsp;&nbsp;
          </Label>
          <Select
            name="Juego"
            isSearchable={false}
            onChange={(e) =>{
              disparodeAccion({
                type: "onchange",
                field: "Juego",
                value: e.value,
              })
            }}
            options={[
              { label: "Vocabularios", value: "vocabulario" },
              { label: "Oraciones", value: "oracion" },
              { label: "Colaborativo", value: "Colaborativo" },
              { label: "Todos", value: "Todos" },
            ]}
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
              <div className="form-reporte-inicial-bajo">
              <Label className='form-label' check>
        <Input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        
        &nbsp;&nbsp; Buscar por fecha &nbsp;&nbsp;
      </Label>
              
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
            minDate={new Date()}
            disabled={!isChecked}
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
          <Label className='form-label mt-2' >
              Fecha de cierre:&nbsp;&nbsp;
            </Label> <br/>
            <DateTimePicker
            amPmAriaLabel="Select AM/PM"
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            hourAriaLabel="Hour"
            disabled={!isChecked}
            maxDetail="second"
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
            //  disabled={bloqueo}
            >
            Buscar
          </Button>
          &nbsp;&nbsp;
          <Button style={{color:'#592a98'}} outline
            // onClick={llamddeData}
            // disabled={bloqueo}
            >
            Descargar
          </Button>
              </div>
            {/* <Label className='form-label' for='EmailMulti'>
              Busqueda por:
            </Label><br />
            <Label><Input
              type='radio'
              name="TipoUsuario"
              value="Estudiante"
             onChange={event => setBusquedaPor(event.target.value)  }
            checked={busquedaPor === "Estudiante"}
            /> Estudiante &ensp; </Label>
            <Label> 
             <Input
                type='radio'
                name="TipoUsuario"
                value="Curso"
                onChange={event => setBusquedaPor(event.target.value)  }
              checked={busquedaPor === "Curso"}
              /> Grado y paralelo&ensp;
            </Label>
            <Label> 
             <Input
                type='radio'
                name="TipoUsuario"
                value="Juego"
                onChange={event => setBusquedaPor(event.target.value)  }
                checked={busquedaPor === "Juego"}
              /> Juego&ensp;
            </Label> */}
            
          </div>
          {/* {
            busquedaPor === "Estudiante" && <ReporteJugador/>
          }
          {
            busquedaPor === "Curso" && <ReporteCursos/>
          }
          {
            busquedaPor === "Juego" && <ReporteJuego/>
          } */}
            <br/>
        </Container>
    )
}
export default ReporteAdm;