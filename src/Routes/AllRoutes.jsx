import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ActividadColaborativaAdm from '../paginas/Administrador/ActividadColaborativaAdm'
import EquipoAdm from '../paginas/Administrador/EquipoAdm'
import ReporteAdm from '../paginas/Administrador/ReporteAdm'
import VerCategoriaAdm from '../paginas/Administrador/VerCategoriaAdm'
import VerEstudianteAdm from '../paginas/Administrador/VerEstudianteAdm'
import VerRompecabezaAdm from '../paginas/Administrador/VerRompecabezaAdm'
import VerVocabularioAdm from '../paginas/Administrador/VerVocabularioAdm'
import MenuJuego from '../paginas/Juego/MenuJuego'
import OracionJ from '../paginas/Juego/Oracion/OracionJ'
import RompecabezaJO from '../paginas/Juego/Oracion/RompecabezaJO'
import Login from "../paginas/Logins/Login"
import { FinalVocabulario } from '../paginas/Juego/Vocabulario/FinalVocabulario'
import RompecabezaJV from '../paginas/Juego/Vocabulario/RompecabezaJV'
import VocabularioJ from '../paginas/Juego/Vocabulario/VocabularioJ'
import { FinalOracionJuego } from '../paginas/Juego/Oracion/FinalOracionJuego'
import { OracionPagina } from '../paginas/Administrador/OracionPagina'
import { Trofeos } from '../paginas/Juego/Trofeo/Trofeos'
import { SeleccionDeEquipo } from '../paginas/Juego/Multijugador/SeleccionDeEquipo'
export const AllRoutes = () => {
  return (<>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/*' element={<Navigate to="/" />} />
      {/* administrador */}
      <Route path='/VerOracion' element={<OracionPagina/>}/>
      <Route path='/Equipo' element={<EquipoAdm />} />
      <Route path='/ActividadColaborativa' element={<ActividadColaborativaAdm />} />
      <Route path='/ReporteEstudiante' element={<ReporteAdm />} />
      <Route path='/VerCategoria' element={<VerCategoriaAdm />} />
      <Route path='/VerEstudiante' element={<VerEstudianteAdm />} />
      <Route path='/VerRompecabeza' element={<VerRompecabezaAdm />} />
      <Route path='/VerVocabulario' element={<VerVocabularioAdm />} />
      {/* Juego */}
      <Route path='/MenuJuego' element={<MenuJuego />} />
      {/* Vocabulario*/}
      <Route path='/RompecabezaJV' element={<RompecabezaJV />} />
      <Route path='/VocabularioJuego/:id' element={<VocabularioJ />} />
      <Route path='/finalVocabulario/:id' element={<FinalVocabulario />} />
      {/* Oracion*/}
      <Route path='/RompecabezaJO' element={<RompecabezaJO />} />
      <Route path='/OracionJuego/:id' element={<OracionJ />} />
      <Route path='/finalOracionJuego/:id' element={<FinalOracionJuego />} />
      {/*Co-operativo*/}
    <Route path='/SeleccionDeEquipo' element={<SeleccionDeEquipo/>}/>
      {/*Trofeos*/}
      <Route path='/Trofeo/:id' element={<Trofeos/>}/>
    </Routes>
  </>
  )
}
