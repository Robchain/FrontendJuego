import React, { useState, useReducer } from "react";
import { Container, Row } from "reactstrap";
import { Stepbar } from "../../componentes/Administrador/Stepbar";
import MenuAdmi from "../../componentes/MenuAdmi";
import { NavBar } from "../../componentes/NavBar";
import { PasoUnoFormulario } from "../../componentes/Administrador/PasoUnoFormulario";
import { PasoDosFormulario } from "../../componentes/Administrador/PasoDosFormulario";
import { PasoTresFormulario } from "../../componentes/Administrador/PasoTresFormulario";
import { PasoCuatroFormulario } from "../../componentes/Administrador/PasoCuatroFormulario";
import { useEffect } from "react";
const estadoInicialFormularioActividad = { NumeroDeGrupos: {}, NumeroDeIntegrantes:{}, NombreDeEquipo: []}

function ActualizacionDeDataFormularioEquipo(state, action) {
  switch (action.type) {
    case 'actualizarData':
      return { ...state, [action.field]: action.value };
    default:
      throw new Error();
  }
}

const ActividadColaborativaAdm = () => {
  const [{NumeroDeGrupos, NumeroDeIntegrantes, NombreDeEquipo, IntegrantesPorGrupo}, dispatch] = useReducer(ActualizacionDeDataFormularioEquipo, estadoInicialFormularioActividad)
  const [index, setIndex] = useState(1)
 const [Segundo, setSegundo] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => { setIsOpen(!isOpen)}
  const prevButton = () => {
    if (index > 1) {
      setIndex(prev => prev - 1);
    }
  };
  
  const nextButton = () => {
    if (index < 4) {
      setIndex(prev => prev + 1);
    }
  };
  return (
    <Container>
      <NavBar toggle={toggle} Seccion={"Actividad Colaborativa"} />
      <MenuAdmi toggle={toggle} isOpen={isOpen} />
      <Row>
        <Stepbar steps={index} />
        {
          index === 1 && <PasoUnoFormulario index={index} nextButton={nextButton} prevButton={prevButton} dispatch={dispatch} NumeroDeGrupos={NumeroDeGrupos} NumeroDeIntegrantes={NumeroDeIntegrantes} NombreDeEquipo={NombreDeEquipo} />
        }
        {
          index === 2 && <PasoDosFormulario index={index} nextButton={nextButton} prevButton={prevButton} setSegundo={setSegundo} NumeroDeGrupos={NumeroDeGrupos} />
        }
        {
          index === 3 && <PasoTresFormulario index={index} nextButton={nextButton} prevButton={prevButton} />
        }
        {
          index === 4 && <PasoCuatroFormulario index={index} nextButton={nextButton} prevButton={prevButton} />
        }
      </Row>
      {JSON.stringify(Segundo)}
    </Container>
  )
}
export default ActividadColaborativaAdm;