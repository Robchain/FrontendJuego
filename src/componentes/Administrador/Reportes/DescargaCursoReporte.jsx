import React from 'react'
import { fechaEcuador } from '../../../helpers/contador'
import { Document, Image, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import bliblaimagen from '../../../assets/img/Icons/LOGO BLIPBLA.png'

export const DescargaCursoReporte = ({ data, juego, Curso, Paralelo }) => {
  return (
    <>
      {
        data.length > 0 && <Document> <Page size='A4' ><View style={{
          paddingTop: 35,
          paddingBottom: 65,
          paddingHorizontal: 35,
        }}>
          <View style={{ margin: '10px' }} fixed>
            <Image src={bliblaimagen} style={{ width: '100px' }} />
            <Text style={{ color: "#9696D3", fontSize: '16px', textAlign: 'center' }}>Reporte {`${Curso}`} {`${Paralelo}`}</Text>
          </View>
          {
            data.map((documentos, index) => (
              <>
                {
                  index > 0 && <View style={{ height: '16px' }}></View>
                }
                <View style={{ fontSize: '12px', marginBottom: '11px', textAlign: 'left' }} break={index > 0 && true}>
                  {
                    documentos.documentos.Estudiante !== undefined && <><Text><Text style={{ fontWeight: 700, color: '#8cc5b0' }}>Estudiante:</Text> {documentos.documentos.Estudiante.Nombre}</Text>
                      <Text><Text style={{ fontWeight: 700, color: '#8cc5b0' }}>Cédula:</Text> {documentos.documentos.Estudiante.Identificacion}</Text></>
                  }
                  <Text><Text style={{ fontWeight: 700, color: '#8cc5b0' }}>Actividad:</Text> {(documentos.documentos.Integrantes !== undefined && documentos.documentos.Integrantes !== null) ? 'Colaborativo' : juego}</Text>
                  {
                    (documentos.documentos.Equipo !== undefined && documentos.documentos.Equipo !== null) && <><Text><Text style={{ fontWeight: 700, color: '#8cc5b0' }}>Equipo:</Text> {documentos.documentos.Equipo.Nombre}</Text></>}
                    {(documentos.documentos.Integrantes !== undefined && documentos.documentos.Integrantes !== null) &&
                      <>
                        <Text><Text style={{ fontWeight: 700, color: '#8cc5b0' }}>Integrantes:</Text></Text>
                      {documentos.documentos.Integrantes.map((e) => (<>
                        <Text style={{ fontWeight: 700 }}>{e.value} -- {e.label}</Text>
                      </>))}</>
                    }
                </View>
                <View>
              <View style={styles.tableColFecha}>
                <Text style={styles.tableCell}> <Text style={{ color: '#85858C' }} > Fecha de creación del juego:</Text> {fechaEcuador(documentos.documentos.createdAt)} --- {documentos.documentos.updatedAt && <><Text style={{ color: '#85858C' }}>última fecha de actualización:</Text> {fechaEcuador(documentos.documentos.updatedAt)}</>} {documentos.documentos.FechaDeFin && <><Text style={{ color: '#85858C' }}>Fecha de cierre del juego:</Text> {fechaEcuador(documentos.documentos.FechaDeFin)}</>}  </Text>
              </View>
              {(documentos.documentos.Avance !== null && documentos.documentos.Avance !== undefined) && documentos.documentos.Avance.map((avance, index) => (<>
                <View style={{ height: '10px' }}></View>
              <Text style={{ color: "#000", fontSize: '16px', textAlign: 'left' }}>Correctos</Text>
              <View style={{ height: '10px' }}></View>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableColMain}>
                    <Text style={styles.tableCell}>Palabra seleccionada</Text>
                  </View>
                </View>
                {(avance.Correcto !== null && avance.Correcto !== undefined) && avance.Correcto.map((e) => (
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
                {(avance.Incorrecto !== null && avance.Incorrecto !== undefined) && avance.Incorrecto.map((e) => (
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
            </View>
              </>
            ))
          }
        </View></Page></Document>
      }</>
  )
}


const styles = StyleSheet.create({
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
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