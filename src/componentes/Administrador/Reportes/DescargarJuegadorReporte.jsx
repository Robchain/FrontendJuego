import React from 'react'
import { Document, Image, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import bliblaimagen from '../../../assets/img/Icons/LOGO BLIPBLA.png'
import { buscarValor, fechaEcuador } from '../../../helpers/contador';
export const DescargarJuegadorReporte = ({ data, actividad, Estudiantes, Estudiante }) => {
  return (
    <>
      {
        data.length > 0 && <Document><Page size='A4'> <View style={{
          paddingTop: 35,
          paddingBottom: 65,
          paddingHorizontal: 35,
        }}>
          <View style={{ marginBottom: '10px' }} fixed >
            <Image src={bliblaimagen} style={{ width: '100px' }} />
            <Text style={{ color: "#9696D3", fontSize: '16px', textAlign: 'center' }}>Reporte por Estudiante</Text>
          </View>
          <View style={{ fontSize: '12px', marginBottom: '11px', textAlign: 'left' }}>
            {data[0].documentos.Estudiante !== undefined ? <>
              <Text><Text style={{ fontWeight: 700, color: '#8cc5b0' }}>Estudiante:</Text> {data[0].documentos.Estudiante.Nombre}</Text>
              <Text><Text style={{ fontWeight: 700, color: '#8cc5b0' }}>Cédula:</Text> {data[0].documentos.Estudiante.Identificacion}</Text>
            </> : <> <Text><Text style={{ fontWeight: 700, color: '#8cc5b0' }}>Estudiante:</Text> {buscarValor(Estudiantes, Estudiante).label}</Text>
              <Text><Text style={{ fontWeight: 700, color: '#8cc5b0' }}>Cedula:</Text> {buscarValor(Estudiantes, Estudiante).value}</Text></>}
            <Text><Text style={{ fontWeight: 700, color: '#8cc5b0' }}>Actividad:</Text> {actividad}</Text>
          </View>
          {
            data.map(i => (
              <>
                <View style={{ height: '16px' }}></View>
                <View style={styles.tableColFecha}>
                  <Text style={styles.tableCell}> <Text style={{ color: '#85858C' }} > Fecha de creación del juego:</Text> {fechaEcuador(i.documentos.createdAt)} --- <Text style={{ color: '#85858C' }}>última fecha de actualización:</Text> {fechaEcuador(i.documentos.updatedAt)}</Text>
                </View>
                <View style={{ height: '10px' }}></View>
                {( i.documentos.Avance !== null && i.documentos.Avance!==undefined) && i.documentos.Avance.map((j, index) => (<>
                <Text style={{ color: "#000", fontSize: '16px', textAlign: 'left' }}>{`Juego ${index + 1}`}</Text>
                <View style={{ height: '10px' }}></View>
                <Text style={{ color: "#000", fontSize: '16px', textAlign: 'left' }}>Correctos</Text>
                <View style={{ height: '10px' }}></View>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColMain}>
                      <Text style={styles.tableCell}>Palabra/Oracion seleccionada</Text>
                    </View>
                  </View>
                  {(j.Correcto !== null && j.Correcto !== undefined) && j.Correcto.map((e) => (
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{e} </Text>
                      </View>
                    </View>))}
                </View>
                <View style={{ height: '10px' }}></View>
                <Text style={{ color: "#000", fontSize: '16px', textAlign: 'left' }}>Incorrectos</Text>
                <View style={{ height: '10px' }}></View>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColMain}>
                      <Text style={styles.tableCell}>Palabra seleccionada</Text>
                    </View>
                    <View style={styles.tableColMain}>
                      <Text style={styles.tableCell}>Palabra a evaluar</Text>
                    </View>
                  </View>
                  {(j.Incorrecto !== null && j.Incorrecto !== undefined) && j.Incorrecto.map((e) => (
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{e.PalabraASeleccionada} </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> {e.PalabraAEvaluar} </Text>
                      </View>

                    </View>))}
                </View>
                </>))}
              </>))
          }
        </View>
        </Page>
        </Document>
      }</>
  )
}


const styles = StyleSheet.create({
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: '0 10',
    flexDirection: 'row',
  },
  tableCol: {
    width: '33%',
    borderStyle: 'solid',
    borderWidth: 1,
    
    borderTopWidth: 0,
    color: "#85858C"
  },
  tableColMain: {
    width: '33%',
    borderStyle: 'solid',
    borderWidth: 1,
    // borderLeftWidth: 0,
    // borderTopWidth: 0,
    color: "#62269E",
    backgroundColor: '#E6DFF0'
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
    fontWeight: 700
  },
  tableColFecha: {
    width: '99%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    color: "#62269E",
    backgroundColor: '#E6DFF0'
  },
});