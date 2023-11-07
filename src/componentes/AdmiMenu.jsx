import React from "react";
import { NavLink } from "react-router-dom";
import { NavItem, Nav, Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap";
import LogoBlipBlaPalabra from "./iconosCom/LogoBlipBlaPalabra";
import {AiOutlineUser} from 'react-icons/ai'
import {BiCategoryAlt} from 'react-icons/bi'
import {BsPuzzle, BsBook} from 'react-icons/bs'
import {IoLayersOutline} from 'react-icons/io5'
import {TbReportAnalytics} from 'react-icons/tb'
import {RiTeamLine} from 'react-icons/ri'
import {TiSortAlphabeticallyOutline} from 'react-icons/ti'
export const AdmiMenu = ({toggle, isOpen}) => {
  return (<Offcanvas toggle={toggle}  isOpen={isOpen} >
  <OffcanvasHeader style={{padding:"0 15px"}} >  <LogoBlipBlaPalabra style={{width:"7em"}} className="mt-2"/> </OffcanvasHeader>
  <OffcanvasBody style={{padding:0}}>
    <Nav   vertical className="flex-column mb-auto  minav" >
    <NavItem    className="item">
     <NavLink    to='/VerEstudiante'    className='linkNav'> <AiOutlineUser size={30}/>&nbsp;&nbsp;Usuario</NavLink>
     </NavItem>
     <NavItem    className="item">
    <NavLink    to='/VerCategoria'  className='linkNav'><BiCategoryAlt size={30}/>&nbsp;&nbsp;Categoría</NavLink>
    </NavItem>
    <NavItem     className="item">
    <NavLink    to="/VerRompecabeza"    className='linkNav'> <BsPuzzle size={30}/>&nbsp;&nbsp;Rompecabezas</NavLink>
    </NavItem>
    <NavItem     className="item">
   <NavLink     to='/VerVocabulario'    className='linkNav'><TiSortAlphabeticallyOutline  size={30}/>&nbsp;&nbsp;Vocabulario</NavLink>
   </NavItem>
   <NavItem  className="item">
    <NavLink    to='/VerOracion'    className='linkNav'><BsBook size={30}/>&nbsp;&nbsp;Oración</NavLink>  
    </NavItem>    
   <NavItem  className="item">
    <NavLink    to='/Equipo'    className='linkNav'><IoLayersOutline  size={30}/>&nbsp;&nbsp;Equipo</NavLink>
    </NavItem>
    <NavItem     className="item">
    <NavLink    to='/ActividadColaborativa' className='linkNav'><RiTeamLine  size={30}/>&nbsp;&nbsp;Juego colaborativo</NavLink>
    </NavItem>
    <NavItem    className="item" >
    <NavLink    to='/ReporteEstudiante' className='linkNav'><TbReportAnalytics size={30}/>&nbsp;&nbsp;Reportes</NavLink>
    </NavItem>
    </Nav>
    </OffcanvasBody>
    </Offcanvas>
  )
}
