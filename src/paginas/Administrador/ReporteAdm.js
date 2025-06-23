import React, {useEffect, useReducer, useState } from "react";
import {  Button, Container, Input, Label } from "reactstrap";
import {AdmiMenu} from "../../componentes/AdmiMenu";
import Select from "react-select";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css'
import { NavBar } from "../../componentes/NavBar";
import DateTimePicker from 'react-datetime-picker';
import { ReporteJugador } from "../../componentes/Administrador/Reportes/ReporteJugador";
import { ReporteCursos } from "../../componentes/Administrador/Reportes/ReporteCursos";
import { ReporteJuego } from "../../componentes/Administrador/Reportes/ReporteJuego";
import { MostrarCurso, MostrarParalelo } from "../../service/Adminstrador/Usuarios";
import { ReportePrimero } from "../../service/Adminstrador/Reporte";
import { ReportePlanificacion } from "../../componentes/Administrador/Reportes/ReportePlanificacion";
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
    const [isdesable, setIsdesable] = useState(true)
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
      if(Juego!=undefined){
        setIsdesable(false);
      }
    }, [Juego])
    
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
              <div>
                <Label className='form-label' for='EmailMulti'>
              Busqueda por:
            </Label><br />
            </div>
            <div className="form-seleccion-reporte">
            {/* <div>  
            <Label><Input
              type='radio'
              name="TipoUsuario"
              value="Estudiante"
             onChange={event => setBusquedaPor(event.target.value)  }
            checked={busquedaPor === "Estudiante"}
            /> Estudiante &ensp; </Label>
            </div>
             <div>
            <Label>
             <Input
                type='radio'
                name="TipoUsuario"
                value="Curso"
                onChange={event => setBusquedaPor(event.target.value)  }
              checked={busquedaPor === "Curso"}
              /> Grado y paralelo&ensp;
            </Label>
            </div> */}
            <div>
            <Label> 
             <Input
                type='radio'
                name="TipoUsuario"
                value="Juego"
                onChange={event => setBusquedaPor(event.target.value)  }
                checked={busquedaPor === "Juego"}
              /> Juego&ensp;&ensp;&ensp;
            </Label>
            </div>
            <div>
            <Label> 
             <Input
                type='radio'
                name="TipoUsuario"
                value="Planificacion"
                onChange={event => setBusquedaPor(event.target.value)  }
                checked={busquedaPor === "Planificacion"}
              />Planificación colaborativa&ensp;
            </Label>
            </div>
            </div>
          </div>
          {
            busquedaPor === "Estudiante" && <ReporteJugador/>
          }
          {
            busquedaPor === "Curso" && <ReporteCursos/>
          }
          {
            busquedaPor === "Juego" && <ReporteJuego/>
          }
          {
            busquedaPor == 'Planificacion' && <ReportePlanificacion/>
          }
            <br/>
        </Container>
    )
}
export default ReporteAdm;