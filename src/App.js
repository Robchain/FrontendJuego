import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
//Login
import Login from './paginas/Logins/Login'
//Administrador
import EstudianteAdmi from './paginas/Administrador/EstudianteAdmi';
import RompecabezaAdmi from './paginas/Administrador/RompecabezaAdmi';
import VocabularioAdmi from './paginas/Administrador/VocabularioAdmi';
import OracionAdm from './paginas/Administrador/OracionAdm';
import EquipoAdm from './paginas/Administrador/EquipoAdm';
import ReporteAdm from './paginas/Administrador/ReporteAdm';
import CategoriaAdm from  './paginas/Administrador/CategoriaAdm';
import VerCategoriaAdm from './paginas/Administrador/VerCategoriaAdm';
import VerEstudianteAdm from  './paginas/Administrador/VerEstudianteAdm';
import VerRompecabezaAdm from './paginas/Administrador/VerRompecabezaAdm';
import VerVocabularioAdm from './paginas/Administrador/VerVocabularioAdm';
import VerOracionAdm from './paginas/Administrador/VerOracionAdm';
import ActividadColaborativaAdm from  './paginas/Administrador/ActividadColaborativaAdm';
//Juego
import MenuJuego from './paginas/Juego/MenuJuego';
import RompecabezaJV from './paginas/Juego/RompecabezaJV';
import RompecabezaJO from './paginas/Juego/RompecabezaJO';

const App =() =>{

  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route  path='/'   element={<Login/>}></Route>
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
          <Route  path='/VerOracion'  element={<VerOracionAdm/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App;

