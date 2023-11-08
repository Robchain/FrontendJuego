import React, { useState } from 'react'
import {LuMoreVertical} from 'react-icons/lu'
import {AiOutlineCheck, AiOutlineEdit} from 'react-icons/ai'
import {BsTrash} from 'react-icons/bs'
import { DropdownItem, DropdownMenu, DropdownToggle, Table, UncontrolledDropdown } from 'reactstrap'
import { fechaEcuador, fechaEcuadoracutal, nombre } from '../../helpers/contador';
import { ModalEditarColaborativo } from './ModalEditarColaborativo';
import { ActivarCoolaborativo, DesactivarCoolaborativo } from '../../service/Multijugador';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
export const ListadoHistoriaDeAsignaciones = ({data}) => {
  const [modal, setModal] = useState(false)
  const MySwal = withReactContent(Swal)
  const [dataseleccionada, setDataseleccionada] = useState({})
  const toggledos = () => { setModal(!modal) }
    const desactivarPersonaFunc =async(objecto)=>{
      try {
        const data = await DesactivarCoolaborativo({ _id: objecto._id });
        MySwal.fire({
          title: `${data.titulo}`,
          text: `${data.respuesta}`,
          icon: `${data.type}`,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        })
        if(data.titulo){
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          }
      } catch (error) {
        MySwal.fire({
          title: 'Error!',
          text: "Falto un campo",
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        })
      }
    }
    const habilitarPersonaFunc =async(objecto)=>{
      try {
        const data = await ActivarCoolaborativo({ _id: objecto._id });
        MySwal.fire({
          title: `${data.titulo}`,
          text: `${data.respuesta}`,
          icon: `${data.type}`,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        })
        if(data.titulo){
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          }
      } catch (error) {
        MySwal.fire({
          title: 'Error!',
          text: "Falto un campo",
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
        })
      }
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
              {<th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>ACCIONES</th>}
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
                  <td style={{borderBottomColor:"#f8f8f8"}}>{i.Estado==="INACTIVO"&&(fechaEcuadoracutal(i.FechaDeFin) || ((i.Avance!==null)&&(i.Avance.length/5 === i.Integrantes.length))) ? "Juego terminado":"Juego en proceso"}</td>
                  <td style={{borderBottomColor:"#f8f8f8"}}>
                    <UncontrolledDropdown>
                      <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' >
                        <LuMoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href='#' onClick={e => {e.preventDefault(); setDataseleccionada(i); toggledos()} }>
                          <AiOutlineEdit className='me-50' size={15} /> <span className='align-middle'>Editar</span>
                        </DropdownItem>
                    { !(fechaEcuadoracutal(i.FechaDeFin) || ((i.Avance!==null)&&(i.Avance.length/5 === i.Integrantes.length))) &&<DropdownItem href='#' onClick={e => { e.preventDefault(); i.Estado === "ACTIVO" ? desactivarPersonaFunc(i) : habilitarPersonaFunc(i); }}>
                        {i.Estado === "ACTIVO" ? <><BsTrash className='me-50' size={15} /><span className='align-middle'>Desactivar</span></> : <><AiOutlineCheck className='me-50' size={15} /><span className='align-middle'>Activar</span></>}
                        </DropdownItem>}
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