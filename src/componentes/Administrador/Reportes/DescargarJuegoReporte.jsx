import React from 'react'
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import bliblaimagen from '../../../assets/img/Icons/LOGO BLIPBLA.png'
import { fechaEcuador, filtradoCurso } from '../../../helpers/contador';
export const DescargarJuegoReporte = ({data, juego}) => {
  return (
    <>
    {
      data.length > 0 && <Document><Page size='A4'><View style={{paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,}}>
      <View style={{marginBottom:'10px'}} fixed>
      <Image src={bliblaimagen} style={{width:'100px',marginTop:'20px'}}/>
         <Text style={{ color: "#9696D3",fontSize:'16px', textAlign:'center'}}>Reporte {`${juego}`}</Text>
      </View>
      {filtradoCurso({data:data}).filter((item) => item.Avance.length > 0).map((i,index)=>(
        <>
        <View style={{fontSize:'12px', marginBottom:'11px', textAlign:'left'}} break={index > 0 && true}>
<Text><Text style={{fontWeight:700,color:'#8cc5b0'}}>Estudiante:</Text> {i.Estudiante.Nombre}</Text>
         <Text><Text style={{fontWeight:700,color:'#8cc5b0'}}>Cedula:</Text> {i.Estudiante.Identificacion}</Text>
         <Text><Text style={{fontWeight:700,color:'#8cc5b0'}}>Curso:</Text> {i.Estudiante.Curso}  &ensp;  <Text style={{fontWeight:700,color:'#8cc5b0'}}>Paralelo:</Text> {i.Estudiante.Paralelo}</Text>
         <Text><Text style={{fontWeight:700,color:'#8cc5b0'}}>Actividad:</Text> {juego}</Text>
    </View>
    <View>
    <Text style={{fontWeight:700, fontSize:"12px"}}> <Text style={{color:'#8cc5b0'}} > Fecha de creacion del juego:</Text> {fechaEcuador(i.createdAt)} --- <Text style={{color:'#8cc5b0'}}>ultima fecha de actualizacion:</Text> {fechaEcuador(i.updatedAt)}</Text>
{i.Avance.map((e)=>(<View style={{fontSize:"11px", marginTop:'8px', textAlign:'justify'}}>
         <Text style={{fontWeight:700}}><Text style={{ color:"#85858C"}}>Palabra seleccionada: </Text> {e.PalabraASeleccionada}</Text>
         <Text style={{fontWeight:700}}><Text style={{ color:"#85858C"}}> Palabra a evaluar: </Text>{e.PalabraAEvaluar}</Text>
         <Text style={{fontWeight:700}}><Text style={{ color:"#85858C"}}>Resultado: </Text>{e.Resultado}</Text>
         <View style={{width:'100%',height:'1px',backgroundColor:'#000'}}></View>
    </View>))}
    </View>
        </>
      ))}
      </View>
      </Page>
        </Document>
    }
    </>
  )
}