
import './App.css';
import React from 'react';
import Login from './paginas/login'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import EstudianteAdmi from './componentes/estudianteAdmi';
import RompecabezaAdmi from './componentes/rompecabezaAdmi';
import VocabularioAdmi from './componentes/vocabularioAdmi';
import OracionAdm from './paginas/oracionAdm';
import EquipoAdm from './paginas/equipoAdm';
import ReporteAdm from './paginas/ReporteAdm';
import ActividadColaborativaAdm from  './paginas/actividadColaborativaAdm';
import MenuJuego from './paginas/MenuJuego';

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
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App;

