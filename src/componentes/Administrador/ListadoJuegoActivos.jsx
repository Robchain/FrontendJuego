import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'
import { JuegosActivos } from '../../service/Adminstrador/Vocabulario';

export const ListadoJuegoActivos = () => {

const [data, setData] = useState([]);

const llamadoServicio=async()=>{
const input =await  JuegosActivos();
setData(input);
}

useEffect(() => {
    llamadoServicio()
}, []);

  return (
    <>
<h3 style={{ color: "#9696D3" }}>Listado de juego activos</h3>
<Table striped>
   <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
            <tr>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>Curso</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>Paralelo</th>
              <th style={{borderBottomColor:"#f8f8f8", fontSize:14}}>Activos</th>
            </tr>
            </thead>
             <tbody>
            {data.map((e)=>(<tr className='m-4'>
         <td style={{fontWeight:700}}><span style={{ color:"#85858C"}}>{e.Curso}</span> </td>
         <td style={{fontWeight:700}}><span style={{ color:"#85858C"}}>{e.Paralelo} </span></td>
         <td style={{fontWeight:700}}><span style={{ color:"#85858C"}}>{e.Activo} </span></td>
    </tr>))}
            </tbody> 
   </Table>
    </>
  )
}
