import React from 'react'
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import bliblaimagen from '../../../assets/img/Icons/LOGO BLIPBLA.png'
import { fechaEcuador } from '../../../helpers/contador';
export const DescargarJuegadorReporte = ({data, actividad}) => {
    return (
      <>
      {
        data.length > 0 &&<Document><Page size='A4'> <View style={{paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,}}>
         <View style={{marginBottom:'10px'}} fixed >
         <Image src={bliblaimagen} style={{width:'100px'}}/>
           <Text style={{ color: "#9696D3",fontSize:'16px', textAlign:'center'}}>Reporte por Estudiante</Text>
         </View>
        <View style={{fontSize:'12px', marginBottom:'11px', textAlign:'left'}}>
           <Text><Text style={{fontWeight:700,color:'#8cc5b0'}}>Estudiante:</Text> {data[0].Estudiante.Nombre}</Text>
           <Text><Text style={{fontWeight:700,color:'#8cc5b0'}}>Cedula:</Text> {data[0].Estudiante.Identificacion}</Text>
           <Text><Text style={{fontWeight:700,color:'#8cc5b0'}}>Actividad:</Text> {actividad}</Text>
         </View>
  {
    data.filter((item) => item.Avance !== null).map((i,index)=>(
      <View style={{marginBottom:'11px'}}>
      <Text style={{fontSize:'14px', textAlign:'center', fontWeight:700}}>Juego {index+1} - {i.Avance[0].PalabraAEvaluar.length>=13?'Oracion':'Vocabulario'}</Text>
      <View>
        <Text style={{fontWeight:700, fontSize:"12px"}}> <Text style={{color:'#8cc5b0'}} > Fecha de creacion del juego:</Text> {fechaEcuador(i.createdAt)} --- <Text style={{color:'#8cc5b0'}}>ultima fecha de actualizacion:</Text> {fechaEcuador(i.updatedAt)}</Text>
     {i.Avance.map((e)=>(<View style={{fontSize:"11px", marginTop:'8px', textAlign:'justify'}}>
           <Text style={{fontWeight:700}}><Text style={{ color:"#85858C"}}>Palabra seleccionada: </Text> {e.PalabraASeleccionada}</Text>
           <Text style={{fontWeight:700}}><Text style={{ color:"#85858C"}}> Palabra a evaluar: </Text>{e.PalabraAEvaluar}</Text>
           <Text style={{fontWeight:700}}><Text style={{ color:"#85858C"}}>Resultado: </Text>{e.Resultado}</Text>
           <View style={{width:'100%',height:'1px',backgroundColor:'#000'}}></View>
      </View>))}
      </View>
      </View>
    ))
  }
        </View>
        </Page>
        </Document>
      }</>
    )
  }
  