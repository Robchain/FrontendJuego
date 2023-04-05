import React, {useState, useEffect, useReducer } from "react";
import { Button, Col, Container, Label, Row } from "reactstrap";
import Select from 'react-select';
import MenuAdmi from '../../componentes/MenuAdmi';
import { NavBar } from "../../componentes/NavBar";
import { BuscarPorCursoYParalelo } from "../../service/Adminstrador/Reporte";
const BaseInicialFormulario = { Curso: undefined, Paralelo: undefined,Estudiante:undefined }
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
    const [{ Curso, Paralelo,Estudiante }, disparodeAccion] = useReducer(llenadodeFormulario, BaseInicialFormulario)
    const [isOpen, setIsOpen] = useState(false)
    const [bloqueo, setBloqueo] = useState(true)
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
    
    return (
        <Container>
            <NavBar toggle={toggle} Seccion={"Reportes"} />
            <MenuAdmi toggle={toggle} isOpen={isOpen} />
            <Row>
                <Col lg="6" sm="12" md="6" xl="6">
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
                    <br/>
                    <Button style={{ borderRadius: "10px", backgroundColor: "#62259E", color: "#fff", borderColor: "#62259E" }} disabled={bloqueo}>Buscar</Button>
                </Col>
            </Row>
        </Container>
    )
}
export default ReporteAdm;