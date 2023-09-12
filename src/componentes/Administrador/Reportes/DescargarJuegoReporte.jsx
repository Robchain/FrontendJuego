import React from 'react'
import { Document, Image, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import bliblaimagen from '../../../assets/img/Icons/LOGO BLIPBLA.png'
import { fechaEcuador, filtradoCurso } from '../../../helpers/contador';
export const DescargarJuegoReporte = ({data, juego,}) => {
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
        {i.Estudiante!==undefined &&<>
          <Text><Text style={{fontWeight:700,color:'#8cc5b0'}}>Estudiante:</Text> {i.Estudiante.Nombre}</Text>
         <Text><Text style={{fontWeight:700,color:'#8cc5b0'}}>Cedula:</Text> {i.Estudiante.Identificacion}</Text>
         <Text><Text style={{fontWeight:700,color:'#8cc5b0'}}>Curso:</Text> {i.Estudiante.Curso}  &ensp;  <Text style={{fontWeight:700,color:'#8cc5b0'}}>Paralelo:</Text> {i.Estudiante.Paralelo}</Text>
        </>}

        {
  (i.Equipo!==undefined && i.Equipo!==null ) &&<><Text><Text style={{fontWeight:700,color:'#8cc5b0'}}>Equipo:</Text> {i.Equipo.Nombre}</Text>
  <Text><Text style={{fontWeight:700,color:'#8cc5b0'}}>Integrantes:</Text></Text>
  {i.Integrantes.map((e)=>(<>
          <Text style={{fontWeight:700}}>{e.value} -- {e.label}</Text>
         </>))}
  </>
}
         <Text><Text style={{fontWeight:700,color:'#8cc5b0'}}>Actividad:</Text> {juego}</Text>
    </View>
    <View style={styles.tableColFecha}>
    <Text style={styles.tableCell}> <Text style={{color:'#85858C'}} > Fecha de creacion del juego:</Text> {fechaEcuador(i.createdAt)} --- {i.updatedAt && <><Text style={{color:'#85858C'}}>ultima fecha de actualizacion:</Text> {fechaEcuador(i.updatedAt)}</>} {i.FechaDeFin && <><Text style={{color:'#85858C'}}>Fecha de cierre del juego:</Text> {fechaEcuador(i.FechaDeFin)}</>} </Text>
</View>
<View style={{height:'10px'}}></View>
<Text style={{ color: "#000",fontSize:'16px', textAlign:'center'}}>Correctos</Text>
<View style={{height:'10px'}}></View>
    <View style={styles.table}>
    <View style={styles.tableRow}>
      <View style={styles.tableColMain}>
        <Text style={styles.tableCell}>Palabra seleccionada</Text>
      </View>
    </View>
    {i.Avance.Correcto.map((e)=>(
  <View style={styles.tableRow}>
  <View style={styles.tableCol}>
         <Text style={styles.tableCell}>{e} </Text> 
         </View>
    </View>))}
    </View>
<View style={{height:'10px'}}></View>
<Text style={{ color: "#000",fontSize:'16px', textAlign:'center'}}>Incorrectos</Text>
<View style={{height:'10px'}}></View>
    <View style={styles.table}>
    <View style={styles.tableRow}>
      <View style={styles.tableColMain}>
        <Text style={styles.tableCell}>Palabra seleccionada</Text>
      </View>
      <View style={styles.tableColMain}>
        <Text style={styles.tableCell}>Palabra a evaluar</Text>
      </View>
    </View>
    {i.Avance.Incorrecto.map((e)=>(
  <View style={styles.tableRow}>
  <View style={styles.tableCol}>
         <Text style={styles.tableCell}>{e.PalabraASeleccionada} </Text> 
         </View>
         <View style={styles.tableCol}>
         <Text style={styles.tableCell}> {e.PalabraAEvaluar} </Text>
         </View>
    </View>))}
    </View>
);
        </>
      ))}
      </View>
      </Page>
        </Document>
    }
    </>
  )
}



const styles = StyleSheet.create({
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '33%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    color:"#85858C"
  },
  tableColMain: {
    width: '33%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    color:"#62269E",
    backgroundColor:'#E6DFF0'
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
    fontWeight:700
  },
  tableColFecha: {
    width: '99%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth:0,
    borderTopWidth: 0,
    borderBottomWidth:0,
    color:"#62269E",
    backgroundColor:'#E6DFF0'
  },
});