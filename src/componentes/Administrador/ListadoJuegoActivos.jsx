import React, { useEffect, useState } from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, Table, UncontrolledDropdown } from 'reactstrap'
import { JuegosActivos } from '../../service/Adminstrador/Vocabulario';
import { Check,  MoreVertical, Trash } from 'react-feather';

export const ListadoJuegoActivos = () => {

const [data, setData] = useState([]);

const llamadoServicio=async()=>{
const input =await  JuegosActivos();
setData(input);
}

useEffect(() => {
    llamadoServicio()
}, []);

const desactivarPersonaFunc = async(i)=>{

}
const habilitarPersonaFunc =async(i)=>{

}
  return (
    <>
<h3 style={{ color: "#9696D3" }}>Listado de juego activos</h3>
<Table striped>
   <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
            <tr>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>CURSO</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>PARALELO</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>ESTADO</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>ACCIONES</th>
            </tr>
            </thead>
             <tbody>
            {data.map((i)=>(<tr className='m-4'>
         <td style={{fontWeight:700}}><span style={{ color:"#85858C"}}>{i.Curso}</span> </td>
         <td style={{fontWeight:700}}><span style={{ color:"#85858C"}}>{i.Paralelo} </span></td>
         <td style={{fontWeight:700}}><span style={{ color:"#85858C"}}>{i.Activo} </span></td>
         <td style={{borderBottomColor:"#f8f8f8"}}>
                    <UncontrolledDropdown>
                      <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' >
                        <MoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href='#' onClick={e => { e.preventDefault(); i.Activo === "ACTIVO" ? desactivarPersonaFunc(i) : habilitarPersonaFunc(i); }}>
                        {i.Activo === "ACTIVO" ? <><Trash className='me-50' size={15} /><span className='align-middle'>Desactivar</span></> : <><Check className='me-50' size={15} /><span className='align-middle'>Activar</span></>}
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
    </tr>))}
            </tbody> 
   </Table>
    </>
  )
}
