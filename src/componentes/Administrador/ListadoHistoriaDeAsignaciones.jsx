import React, { useState } from 'react'
import { Check, Edit, MoreVertical, Trash } from 'react-feather';
import { DropdownItem, DropdownMenu, DropdownToggle, Table, UncontrolledDropdown } from 'reactstrap'
import { fechaEcuador, fechaEcuadoracutal, nombre } from '../../helpers/contador';
import { ModalEditarColaborativo } from './ModalEditarColaborativo';

export const ListadoHistoriaDeAsignaciones = ({data}) => {
  const [modal, setModal] = useState(false)

  const [dataseleccionada, setDataseleccionada] = useState({})
  const toggledos = () => { setModal(!modal) }
    const desactivarPersonaFunc =(i)=>{

    }
    const habilitarPersonaFunc =(i)=>{
        
    }
  return (
    <>
    <ModalEditarColaborativo data={dataseleccionada} modal={modal} toggle={toggledos} />
   <Table striped>
         <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}><tr>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>INTEGRANTES</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>TIPO DE JUEGO</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>TURNO ACTUAL</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>EQUIPO</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>FECHA DE INICIO</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>FECHA FINAL</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>ESTADO</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>ACCIONES</th>
            </tr></thead>
            <tbody>
{data.map( i=>(
    <tr key={i._id}>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Integrantes.map(e=>(<li>{e.label}</li> ))}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}> {
              i.TipoDeJuego == '1' && <span>Vocabularios</span>
            }
            {
              i.TipoDeJuego == '2' && <span>Oraciones</span>
            }
            {
              i.TipoDeJuego == '3' && <span>Oraciones y Vocabularios</span>
            }</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{nombre({objecto:i})}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{ 
                   i.Equipo === null ? "No hay equipos" :`${i.Equipo.Nombre}`
                  }</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{fechaEcuador(i.FechaDeInicio)}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{fechaEcuador(i.FechaDeFin)}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>{fechaEcuadoracutal(i.FechaDeFin) || ((i.Avance!==null)&&(i.Avance.length/5 === i.Integrantes.length)) ? "Juego terminado":"Juego en proceso"}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>
                    <UncontrolledDropdown>
                      <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' >
                        <MoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href='#' onClick={e => {e.preventDefault(); setDataseleccionada(i); toggledos()} }>
                          <Edit className='me-50' size={15} /> <span className='align-middle'>Editar</span>
                        </DropdownItem>
                        <DropdownItem href='#' onClick={e => { e.preventDefault(); i.Estado === "ACTIVO" ? desactivarPersonaFunc(i) : habilitarPersonaFunc(i); }}>
                        {i.Estado === "ACTIVO" ? <><Trash className='me-50' size={15} /><span className='align-middle'>Desactivar</span></> : <><Check className='me-50' size={15} /><span className='align-middle'>Activar</span></>}
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>)
)}
                </tbody>
    </Table>
    </>
  )
}