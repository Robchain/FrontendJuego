import React, { Suspense, useContext, useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import Adverbio from './Adverbio'
import QueSeccion from './QueSeccion'
import QuienSeccion from './QuienSeccion'
import TODOSSeccion from './TODOSSeccion'
import { OracionRespuesta, resultadoOracion, resultadoOracionAdverbio, resultadoOracionQue, resultadoOracionQuien } from '../../../helpers'

export const NuevoOracion = () => {
    const { dataOracion, Oracionprogreso,dispatchProgreso,piezaJuegoIndi, dataOracionJuego} = useContext(JuecoContext);
    const [rango, setRango] = useState(piezaJuegoIndi+1);
    const [indice, setIndice] = useState(1);
    const navegar = useNavigate();
    const siguienteObjeto = () => {
        if(indice === rango){
            navegar(`/finalOracionJuego`);
        }
        
        setIndice((prevIndice) => (prevIndice % rango) + 1);

      };
      const avanzarAutomaticamente = () => {
        if(dataOracionJuego!=null){
            if (dataOracionJuego[`Juego` + indice].TipoPregunta === "TODOS"){
                dispatchProgreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracion({ objeto1: dataOracionJuego[`Juego` + indice].Oraciones[0], objeto2: dataOracionJuego[`Juego` + indice].Oraciones[1], objeto3: dataOracionJuego[`Juego` + indice].Oraciones[2] }), selecionado: "---", Resul: "NO CONTESTO", OracionCorrecta: OracionRespuesta({ objecto1: dataOracionJuego[`Juego` + indice].Oraciones[0], objecto2: dataOracionJuego[`Juego` + indice].Oraciones[1], objecto3: dataOracionJuego[`Juego` + indice].Oraciones[2] }) });
            }
            if(dataOracionJuego[`Juego` + indice].TipoPregunta === "QUE"){
                dispatchProgreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracionQue({ objeto1: dataOracionJuego[`Juego` + indice].Oraciones[0], objeto2: dataOracionJuego[`Juego` + indice].Oraciones[1], objeto3: dataOracionJuego[`Juego` + indice].Oraciones[2] }), selecionado: `---`, Resul: "NO CONTESTO", OracionCorrecta: OracionRespuesta({ objecto1: dataOracionJuego[`Juego` + indice].Oraciones[0], objecto2: dataOracionJuego[`Juego` + indice].Oraciones[1], objecto3: dataOracionJuego[`Juego` + indice].Oraciones[2] }) })
            }
            if(dataOracionJuego[`Juego` + indice].TipoPregunta === "QUIEN"){
                dispatchProgreso({ type: "PROGRESO", PalabraCorrecta:resultadoOracionQuien({objeto1:dataOracionJuego[`Juego` + indice].Oraciones[0], objeto2:dataOracionJuego[`Juego` + indice].Oraciones[1], objeto3:dataOracionJuego[`Juego` + indice].Oraciones[2]}) ,selecionado: `---`, Resul: "NO CONTESTO", OracionCorrecta: OracionRespuesta({objecto1:dataOracionJuego[`Juego` + indice].Oraciones[0], objecto2:dataOracionJuego[`Juego` + indice].Oraciones[1], objecto3:dataOracionJuego[`Juego` + indice].Oraciones[2]}) })
            }
            if(dataOracionJuego[`Juego` + indice].TipoPregunta === "ADVERBIO"){
                dispatchProgreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracionAdverbio({ objeto1: dataOracionJuego[`Juego` + indice].Oraciones[0], objeto2: dataOracionJuego[`Juego` + indice].Oraciones[1], objeto3: dataOracionJuego[`Juego` + indice].Oraciones[2] }), selecionado:"---", Resul: "NO CONTESTO", OracionCorrecta: OracionRespuesta({objecto1:dataOracionJuego[`Juego` + indice].Oraciones[0], objecto2:dataOracionJuego[`Juego` + indice].Oraciones[1], objecto3:dataOracionJuego[`Juego` + indice].Oraciones[2]}) });
            }
           
        }
        if(indice === rango){
            navegar(`/finalOracionJuego`);
      }
        setIndice((prevIndice) => (prevIndice % rango) + 1);
      };
    
      // Establecer un temporizador para avanzar automáticamente después de un tiempo
      useEffect(() => {
        const temporizador = setTimeout(avanzarAutomaticamente, /*60000*/ 180000); // 5000 milisegundos (5 segundos)
        // Limpiar el temporizador al desmontar el componente o cambiar de objeto manualmente
        return () => clearTimeout(temporizador);
      }, [indice, rango]);
    
      useEffect(() => {
        if(dataOracionJuego ===null){
          navegar(`/MenuJuego`);
        }
        dataOracion(localStorage.getItem("Id"));
      }, [])

  return (
    dataOracionJuego !==null && indice !== NaN ? (<Container className="fluid">
    <NavBarJuego Seccion={"Oracion"} urlBack={"/RompecabezaJO"} />
    <div className='contenido-oracion-general'>
    <div>
        <h3 style={{fontWeight:700, color:"#85858C"}}>Puntos: {`${Oracionprogreso.filter(obj => obj.Resultado==="CORRECTO").length}`}</h3>
    </div>
        <Suspense  fallback={<>Cargandos...</>}>
        {
                     //EN CASO DE TODOS 
                    (dataOracionJuego[`Juego` + indice].TipoPregunta === "TODOS") && (<TODOSSeccion indice={indice} data={dataOracionJuego} siguiente={siguienteObjeto}  dispatchProgreso={dispatchProgreso}/>)
        }
        {
                      // EN CASO DE QUE
                    (dataOracionJuego[`Juego` + indice].TipoPregunta === "QUE") && (<QueSeccion indice={indice} data={dataOracionJuego} siguiente={siguienteObjeto}  dispatchProgreso={dispatchProgreso}/>)
        }
        {
                      // EN CASO DE QUIEN
                    (dataOracionJuego[`Juego` + indice].TipoPregunta === "QUIEN") && (<QuienSeccion indice={indice} data={dataOracionJuego} siguiente={siguienteObjeto}  Progreso={dispatchProgreso}/>)
        }
        {
                      // EN CASO DE ADVERBIO
                    (dataOracionJuego[`Juego` + indice].TipoPregunta === "ADVERBIO") && (<Adverbio indice={indice} data={dataOracionJuego} siguiente={siguienteObjeto} dispatchProgreso={dispatchProgreso}/>)
        }
        </Suspense>
    </div>
        </Container>) : <>Cargando...</>
  )
}
