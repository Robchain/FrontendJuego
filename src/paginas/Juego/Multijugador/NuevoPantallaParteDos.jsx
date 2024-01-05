import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Progress } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { OracionMulti } from '../../../componentes/MultiJugador/OracionMulti';
import { VerProgresoYaTerminado } from '../../../componentes/MultiJugador/VerProgresoYaTerminado';
import { VocabularioMulti } from '../../../componentes/MultiJugador/VocabularioMulti';
import { JuecoContext } from '../../../context/Juego/JuecoContext';
import cargando from '../../../assets/img/AssetsGame/paperplane.gif'
import Cronometro from '../../../componentes/JuegoComponent/JuegoGeneral/Cronometro';
import { listadoQuienImagen } from '../../../service/Adminstrador/Oracion';
import { OracionRespuesta, resultadoOracion, resultadoOracionAdverbio, resultadoOracionQue, resultadoOracionQuien, resultadoVocaMulti } from '../../../helpers';

export const NuevoPantallaParteDos = () => {
    const {setQuienlist, InfoEstudiaSituacion,LLamadaIncial,setInfoEstudiaSituacion, dispatchMutli,dataMultiJu} = useContext(JuecoContext);
    const [rango, setRango] = useState(5);
    const [listos, setListos] = useState("espera");
    const navegar = useNavigate();
    const { id } = useParams();
    const [cro, setcro] = useState("inicial");
    const [indice, setIndice] = useState(1);
    useEffect(() => {
        LLamadaIncial();
        return () =>{
          setInfoEstudiaSituacion(null);
        }
      }, [])

      const listadoQuien = async ()=>{
        const quielist = await listadoQuienImagen();
        setQuienlist(quielist);
      }
      useEffect(() => {
        listadoQuien()
      }, [])
      
    

    useEffect(() => {
        setTimeout(() => {
          setListos("Ya");
        }, 4500);
        setIndice(1);
      }, [])


      const siguiente = () => {
        
        if(indice === rango ){
            navegar(`/FinalJuegoMulti/Jugador/${id}`);
        }
        
        setIndice((prevIndice) => (prevIndice % (rango)) + 1);
      }
      
      const avanzarAutomaticamente = () => {
        if(dataMultiJu!=null){
          if(dataMultiJu[`Juego${indice}`].Palabras){
            dispatchMutli({ type: "PROGRESOVOCABULARIO", PalabraCorrecta: resultadoVocaMulti({ objeto1: dataMultiJu[`Juego${indice}`].Palabras[0], objeto2: dataMultiJu[`Juego${indice}`].Palabras[1], objeto3: dataMultiJu[`Juego${indice}`].Palabras[2] }), PalabraSeleccionada: "---", Resultado: "NO CONTESTO" });
          }
          if(dataMultiJu[`Juego${indice}`].Oraciones){
            if (dataMultiJu[`Juego${indice}`].TipoPregunta === 'TODOS'){
              dispatchMutli({ type: "PROGRESOORACION", PalabraCorrecta: resultadoOracion({ objeto1: dataMultiJu[`Juego${indice}`].Oraciones[0], objeto2: dataMultiJu[`Juego${indice}`].Oraciones[1], objeto3: dataMultiJu[`Juego${indice}`].Oraciones[2] }), PalabraSeleccionada: "---", Resultado: "NO CONTESTO", OracionCorrecta: OracionRespuesta({ objecto1: dataMultiJu[`Juego${indice}`].Oraciones[0], objecto2: dataMultiJu[`Juego${indice}`].Oraciones[1], objecto3: dataMultiJu[`Juego${indice}`].Oraciones[2] }) });
            }
            if(dataMultiJu[`Juego${indice}`].TipoPregunta === 'QUE'){
              dispatchMutli({ type: "PROGRESOORACION", PalabraCorrecta: resultadoOracionQue({ objeto1: dataMultiJu[`Juego${indice}`].Oraciones[0], objeto2: dataMultiJu[`Juego${indice}`].Oraciones[1], objeto3: dataMultiJu[`Juego${indice}`].Oraciones[2] }), PalabraSeleccionada:"---", Resultado: "NO CONTESTO", OracionCorrecta: OracionRespuesta({ objecto1: dataMultiJu[`Juego${indice}`].Oraciones[0], objecto2: dataMultiJu[`Juego${indice}`].Oraciones[1], objecto3: dataMultiJu[`Juego${indice}`].Oraciones[2] }) })
            }
            if(dataMultiJu[`Juego${indice}`].TipoPregunta === 'QUIEN'){
              dispatchMutli({type:"PROGRESOORACION", PalabraCorrecta:resultadoOracionQuien({objeto1:dataMultiJu[`Juego${indice}`].Oraciones[0],objeto2:dataMultiJu[`Juego${indice}`].Oraciones[1],objeto3:dataMultiJu[`Juego${indice}`].Oraciones[2]}),PalabraSeleccionada:"---", Resultado:"NO CONTESTO",OracionCorrecta: OracionRespuesta({objecto1: dataMultiJu[`Juego${indice}`].Oraciones[0], objecto2: dataMultiJu[`Juego${indice}`].Oraciones[1], objecto3: dataMultiJu[`Juego${indice}`].Oraciones[2]}) })
            }
            if(dataMultiJu[`Juego${indice}`].TipoPregunta === 'ADVERBIO'){
              dispatchMutli({ type: "PROGRESOORACION", PalabraCorrecta: resultadoOracionAdverbio({ objeto1: dataMultiJu[`Juego${indice}`].Oraciones[0], objeto2: dataMultiJu[`Juego${indice}`].Oraciones[1], objeto3: dataMultiJu[`Juego${indice}`].Oraciones[2] }), PalabraSeleccionada: "---", Resultado: "NO CONTESTO",OracionCorrecta: OracionRespuesta({objecto1: dataMultiJu[`Juego${indice}`].Oraciones[0], objecto2: dataMultiJu[`Juego${indice}`].Oraciones[1], objecto3: dataMultiJu[`Juego${indice}`].Oraciones[2]})  });
            }
          }
        }
        if(indice === rango){
          navegar(`/FinalJuegoMulti/Jugador/${id}`);
      }
      setIndice((prevIndice) => (prevIndice % (rango)) + 1);
      };

      useEffect(() => {
        let temporizador ;
        if(cro==='pregunta'){
         temporizador = setTimeout(avanzarAutomaticamente, /*60000*/ 60000); // 5000 milisegundos (5 segundos)
        // Limpiar el temporizador al desmontar el componente o cambiar de objeto manualmente
        }
        return () => clearTimeout(temporizador);
      }, [indice, rango,cro]);

  return (
    <Container>
    <NavBarJuego Seccion={"Colaborativo"} urlBack={"/MenuJuego"}/>
    { (InfoEstudiaSituacion !== null && dataMultiJu !==null)?(<>
        {
  listos === "espera" && <VerProgresoYaTerminado/>
}
{  listos === "Ya" && (
    <>
    <Progress animated  value={(indice-1)*20} />
    <div className='cronometro-juego'>
    <Cronometro minutosInicio={0} reiniciarCronometro={cro} segundosInicio={59}/>
    </div>
    {dataMultiJu[`Juego${indice}`].Palabras && <VocabularioMulti setcro={setcro}  siguiente={siguiente} indice={indice} dataMultiJu={dataMultiJu} dispatchMutli={dispatchMutli} />}

    {dataMultiJu[`Juego${indice}`].Oraciones && <OracionMulti siguiente={siguiente} indice={indice} dataMultiJu={dataMultiJu} dispatchMutli={dispatchMutli} setcro={setcro} />}
    </>)

}
    </>):( <div className="loading-overlay">
        <img src={cargando} alt='cargando'/>
      </div>)
    
    }

    </Container>
  )
}
