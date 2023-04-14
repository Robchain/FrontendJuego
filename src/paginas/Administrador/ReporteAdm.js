import React, {useState, useEffect, useReducer } from "react";
import { Button, Col, Container, Label, Row, Table } from "reactstrap";
import Select from 'react-select';
import MenuAdmi from '../../componentes/MenuAdmi';
import { NavBar } from "../../componentes/NavBar";
import { BuscarPorCursoYParalelo, ReporteOracion, ReporteVocabulario } from "../../service/Adminstrador/Reporte";
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

const ReporteAdm = () => {
    const [{ Curso, Paralelo,Estudiante,Juego }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario)
    const [isOpen, setIsOpen] = useState(false)
    const [bloqueo, setBloqueo] = useState(true)
    const [MostrarVocabulario, setMostrarVocabulario] = useState([]);
    const [MostrarOraciones, setMostrarOraciones] = useState([]);
    const [bloqueodos, setBloqueodos] = useState(true)
    const [Estudiantes, setEstudiantes] = useState([])
    const toggle = () => { setIsOpen(!isOpen) }

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
    if(Estudiante){
        setBloqueo(false)
    }
    }, [Curso,Paralelo,Estudiante])
    const Buscar = async ()=>{
        setMostrarVocabulario([]);
        setMostrarOraciones([]);
        if(Juego === "Vocabularios"){
           
     const data = await    ReporteVocabulario({Usuario:Estudiante})
     setMostrarVocabulario(data);
    }else if(Juego === "Oraciones"){
const data = await ReporteOracion({Usiaro:Estudiante});
setMostrarOraciones(data);
    }}
const Imprimir= ()=>{
    document.querySelector(".informeImprimir").classList.add("print-informe");
    document.querySelector(".bot1").classList.add("desaparecer");
    window.print();
    document.querySelector(".informeImprimir").classList.remove("print-informe");
    document.querySelector(".bot1").classList.remove("desaparecer");
}

    return (
        <Container >
            <NavBar toggle={toggle} Seccion={"Reportes"}/>
            <MenuAdmi toggle={toggle} isOpen={isOpen} />
            <Row className="bot1" >
                <Col lg="6" sm="12" md="6" xl="6" >
                    <Label className='form-label' for='Curso'> Curso </Label>
                    <Select name="Curso" isSearchable={false} onChange={e => disparodeAccion({ type: "onchange", field: 'Curso', value: e.value })} options={[{ value: "PRIMERO", label: "PRIMERO" }, { value: "SEGUNDO", label: "SEGUNDO" }, { value: "TERCERO", label: "TERCERO" },]} />
                    <Label className='form-label' for='Paralelo'> Paralelo </Label>
                    <Select name="Paralelo" isSearchable={false} onChange={e => disparodeAccion({ type: "onchange", field: 'Paralelo', value: e.value })} options={[{ value: "A", label: "A" }, { value: "B", label: "B " }, { value: "C", label: "C" }, { value: "D", label: "D" }, { value: "E", label: "E" }, { value: "F", label: "F" },]} />
                </Col>
                <Col lg="6" sm="12" md="6" xl="6">
                    <Label className='form-label' for='Curso' >
                        Estudiante
                    </Label>
                    <Select name="Estudiante" options={Estudiantes} onChange={evente => disparodeAccion({ type: "onchange", field: 'Estudiante', value: evente.value })} isDisabled={bloqueodos} />
                    <Label className='form-label' for='Curso' >
                        Estudiante
                    </Label>
                    <Select name="Estudiante" options={[{label:"Vocabularios", value:"Vocabularios"}, {label:"Oraciones", value:"Oraciones"}]} onChange={evente => disparodeAccion({ type: "onchange", field: 'Juego', value: evente.value })} isDisabled={bloqueodos} />
                    <br/>
                    <Button onClick={()=>Buscar()} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }} disabled={bloqueo}>Buscar</Button>{" "}
                    <Button onClick={()=>Imprimir()} style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }} disabled={bloqueo}>Imprimir</Button>
                </Col>
            </Row>
            <br/>{
            <Table striped className="informeImprimir">
            <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}><tr>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>JUEGO</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>Opcion SELECCIONADA</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>Opcion CORRECTA</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>RESULTADO</th>
            </tr></thead>
            <tbody>
            {
                MostrarVocabulario.map(i=>(
                    <tr key={i._id}>
                  <td style={{borderBottomColor:"#f8f8f8"}}>Vocabulario</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.PalabraSeleccionada}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.PalabraCorrecta}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Resultado}</td>
                </tr>))
            }
            {
                MostrarOraciones.map(i=>(
                    <tr key={i._id}>
                  <td style={{borderBottomColor:"#f8f8f8"}}>Oraciones</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.PalabraSeleccionada}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.PalabraCorrecta}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Resultado}</td>
                </tr>))
            }
            
            </tbody>
            
          </Table>
        }
        </Container>
    )
}
export default ReporteAdm;