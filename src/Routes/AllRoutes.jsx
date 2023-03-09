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
import { PantallaParteUno } from '../paginas/Juego/Multijugador/PantallaParteUno'
import { PantallaParteDos } from '../paginas/Juego/Multijugador/PantallaParteDos'
export const AllRoutes = () => {
  return (<>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/*' element={<Navigate to="/" />} />
      {/* administrador */}
      <Route path='/VerEstudiante' element={<VerEstudianteAdm />} />
      <Route path='/VerCategoria' element={<VerCategoriaAdm />} />
      <Route path='/VerRompecabeza' element={<VerRompecabezaAdm />} />
      <Route path='/VerVocabulario' element={<VerVocabularioAdm />} />
      <Route path='/VerOracion' element={<OracionPagina/>}/>
      <Route path='/Equipo' element={<EquipoAdm />} />
      <Route path='/ActividadColaborativa' element={<ActividadColaborativaAdm />} />
      <Route path='/ReporteEstudiante' element={<ReporteAdm />} />
      {/* Juego */}
      <Route path='/MenuJuego' element={<MenuJuego />} />
      {/* Vocabulario*/}
      <Route path='/RompecabezaJV' element={<RompecabezaJV />} />
      <Route path='/VocabularioJuego/:id' element={<VocabularioJ />} />
      <Route path='/finalVocabulario/:id' element={<FinalVocabulario />} />
      {/* Oracion*/}
      <Route path='/RompecabezaJO' element={<RompecabezaJO />} />
      <Route path='/OracionJuego/:id' element={<OracionJ />} />finalOracionJuego
      <Route path='/finalOracionJuego/:id' element={<FinalOracionJuego />} />
      {/*Co-operativo*/}
    <Route path='/SeleccionDeEquipo' element={<PantallaParteUno/>}/>
    <Route  path='/JuegoActivo/Jugador/:id' element={<PantallaParteDos/>} />
      {/*Trofeos*/}
      <Route path='/Trofeo/:id' element={<Trofeos/>}/>
    </Routes>
  </>
  )
}
