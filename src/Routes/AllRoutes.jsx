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
import { FinalVocabulario } from '../paginas/Juego/Vocabulario/FinalVocabulario'
import RompecabezaJV from '../paginas/Juego/Vocabulario/RompecabezaJV'
import Login from "../paginas/Logins/Login"
import RompecabezaAdmi from "../paginas/Administrador/RompecabezaAdmi"
import CategoriaAdm from "../paginas/Administrador/CategoriaAdm";
import VocabularioJ from "../paginas/Juego/Vocabulario/VocabularioJ"

export const AllRoutes = () => {
  return (
         <Routes>
          <Route  path='/'   element={<Login/>}></Route>
          <Route  path='/*' element={<Navigate to="/"/>}/>
          <Route  path='/Administrador'  element={<EstudianteAdmi/>}></Route>
          <Route  path='/Rompecabeza'  element={<RompecabezaAdmi/>}></Route>
          <Route  path='/Vocabulario'  element={<VocabularioAdmi/>}></Route>
          <Route  path='/Oracion' element={<OracionAdm/>}></Route>
          <Route  path='/Equipo'  element={<EquipoAdm/>}></Route>
          <Route  path='/ActividadColaborativa' element={<ActividadColaborativaAdm/>}></Route>
          <Route  path='/ReporteEstudiante' element={<ReporteAdm/>}></Route>
          <Route  path='/MenuJuego' element={<MenuJuego/>}></Route>
          <Route  path='/RompecabezaJV' element={<RompecabezaJV/>}></Route>
          <Route  path='/RompecabezaJO' element={<RompecabezaJO/>}></Route>
          <Route  path='/Categoria' element={<CategoriaAdm/>}></Route>
          <Route  path='/VerCategoria'  element={<VerCategoriaAdm/>}></Route>
          <Route  path='/VerEstudiante' element={<VerEstudianteAdm/>}></Route>
          <Route  path='/VerRompecabeza'  element={<VerRompecabezaAdm/>}></Route>
          <Route  path='/VerVocabulario'  element={<VerVocabularioAdm/>}></Route>
          <Route path='/VocabularioJuego/:id' element={<VocabularioJ/>}/>
          <Route path='/OracionJuego' element={<OracionJ/>}/>
          <Route path='/finalVocabulario/:id' element={ <FinalVocabulario/>}/>
          <Route path='/test' element={<Prueba/>}/>
        </Routes>
  )
}
