import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ActividadColaborativaAdm from '../paginas/Administrador/ActividadColaborativaAdm'
import EquipoAdm from '../paginas/Administrador/EquipoAdm'
import EstudianteAdmi from '../paginas/Administrador/EstudianteAdmi'
import OracionAdm from '../paginas/Administrador/OracionAdm'
import ReporteAdm from '../paginas/Administrador/ReporteAdm'
import VerCategoriaAdm from '../paginas/Administrador/VerCategoriaAdm'
import VerEstudianteAdm from '../paginas/Administrador/VerEstudianteAdm'
import VerRompecabezaAdm from '../paginas/Administrador/VerRompecabezaAdm'
import VerVocabularioAdm from '../paginas/Administrador/VerVocabularioAdm'
import VocabularioAdmi from '../paginas/Administrador/VocabularioAdmi'
import MenuJuego from '../paginas/Juego/MenuJuego'
import OracionJ from '../paginas/Juego/Oracion/OracionJ'
import RompecabezaJO from '../paginas/Juego/Oracion/RompecabezaJO'
import Prueba from '../paginas/Juego/Prueba'
import Login from "../paginas/Logins/Login"
import RompecabezaAdmi from "../paginas/Administrador/RompecabezaAdmi"
import CategoriaAdm from "../paginas/Administrador/CategoriaAdm";
import { Juegos } from './Juegos'
import { FinalVocabulario } from '../paginas/Juego/Vocabulario/FinalVocabulario'
import RompecabezaJV from '../paginas/Juego/Vocabulario/RompecabezaJV'
import VocabularioJ from '../paginas/Juego/Vocabulario/VocabularioJ'
import { FinalOracionJuego } from '../paginas/Juego/Oracion/FinalOracionJuego'
export const AllRoutes = () => {
  return (<>
         <Routes>
          <Route  path='/'   element={<Login/>}/>
          <Route  path='/*' element={<Navigate to="/"/>}/>
          <Route  path='/Administrador'  element={<EstudianteAdmi/>}/>
          <Route  path='/Rompecabeza'  element={<RompecabezaAdmi/>}/>
          <Route  path='/Vocabulario'  element={<VocabularioAdmi/>}/>
          <Route  path='/Oracion' element={<OracionAdm/>}/>
          <Route  path='/Equipo'  element={<EquipoAdm/>}/>
          <Route  path='/ActividadColaborativa' element={<ActividadColaborativaAdm/>}/>
          <Route  path='/ReporteEstudiante' element={<ReporteAdm/>}/>
          <Route  path='/MenuJuego' element={<MenuJuego/>}/>
          <Route  path='/Categoria' element={<CategoriaAdm/>}/>
          <Route  path='/VerCategoria'  element={<VerCategoriaAdm/>}/>
          <Route  path='/VerEstudiante' element={<VerEstudianteAdm/>}/>
          <Route  path='/VerRompecabeza'  element={<VerRompecabezaAdm/>}/>
          <Route  path='/VerVocabulario'  element={<VerVocabularioAdm/>}/>
          <Route path='/OracionJuego' element={<OracionJ/>}/>
          <Route path='/test' element={<Prueba/>}/>
          {/* Vocabulario*/}
          <Route  path='/RompecabezaJV' element={<RompecabezaJV/>}/>
          <Route path='/VocabularioJuego/:id' element={<VocabularioJ/>}/>
          <Route path='/finalVocabulario/:id' element={ <FinalVocabulario/>}/>
          {/* Oracion*/}
          <Route  path='/RompecabezaJO' element={<RompecabezaJO/>}/>
          <Route  path='/OracionJuego/:id' element={<OracionJ/>}/>
          <Route  path='/finalOracionJuego/:id' element={<FinalOracionJuego/>}/>
          {/*Co-operativo*/}
        </Routes>
        <Juegos/>
        </>
  )
}
