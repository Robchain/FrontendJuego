import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import buentrajo from '../../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../../assets/img/AssetsGame/Bad Jood.png'
import Quien from '../../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../../assets/img/AssetsGame/ico_verbo.png";
import Cantidad from '../../../assets/img/AssetsGame/ico_cantidad.png'
import ReactPlayer from 'react-player';
import { OracionRespuesta, resultadoOracionQuien } from '../../../helpers'

const VerVerboRespuesta = ({ data,  indice, ...props }) => {
  const [selccionver, setSelccionver] = useState("")
  useEffect(() => {
    if (data[`Juego` + indice].Oraciones[0].Respuesta === "CORRECTO") {
      setSelccionver(data[`Juego` + indice].Oraciones[0].Verbo)
    } else if (data[`Juego` + indice].Oraciones[1].Respuesta === "CORRECTO") {
      setSelccionver(data[`Juego` + indice].Oraciones[1].Verbo)
    } else if (data[`Juego` + indice].Oraciones[2].Respuesta === "CORRECTO") {
      setSelccionver(data[`Juego` + indice].Oraciones[2].Verbo)
    }
  }, [data])

  return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{selccionver}</span>)
}
const VerSeleccionqUE = ({ data,  indice, ...props }) => {
  const [seleccionverbo, setSeleccionverbo] = useState({value:'', label:''});
  useEffect(() => {
    if (data[`Juego` + indice].Oraciones[0].Respuesta === "CORRECTO") {
      setSeleccionverbo(data[`Juego` + indice].Oraciones[0].Que)
    } else if (data[`Juego` + indice].Oraciones[1].Respuesta === "CORRECTO") {
      setSeleccionverbo(data[`Juego` + indice].Oraciones[1].Que)
    } else if (data[`Juego` + indice].Oraciones[2].Respuesta === "CORRECTO") {
      setSeleccionverbo(data[`Juego` + indice].Oraciones[2].Que)
    }
  }, [data])

  return (<img src={seleccionverbo.value} alt='opcion1' {...props} />)

}
const SeleccionQUIEN = ({ data,  indice, QueSelecion, ...props }) => {
  const [selcci, setSelcci] = useState({value:'', label:''});
  useEffect(() => {
    if (QueSelecion === 1) { setSelcci(data[`Juego` + indice].Oraciones[0].Sujeto) }
    if (QueSelecion === 2) { setSelcci(data[`Juego` + indice].Oraciones[1].Sujeto) }
    if (QueSelecion === 3) { setSelcci(data[`Juego` + indice].Oraciones[2].Sujeto) }
  }, [QueSelecion,indice])

  return (<>{
   selcci.label.length !==0?  (
      <img src={selcci.value} alt='opcion1'  {...props}/>
    ):<div></div>
  }</>)
}
const VerCantidad = ({ data,  indice, ...props }) => {
  const [verbo, setVerbo] = useState("")
  useEffect(() => {
    if (data[`Juego` + indice].Oraciones[0].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego` + indice].Oraciones[0].Adverbio)
    } else if (data[`Juego` + indice].Oraciones[1].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego` + indice].Oraciones[1].Adverbio)
    } else if (data[`Juego` + indice].Oraciones[2].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego` + indice].Oraciones[2].Adverbio)
    }
  }, [data])

  return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{verbo}</span>)
}
const isAdverbio = ( indice, data) => {
  if (data[`Juego` + indice].Oraciones[2].Adverbio || data[`Juego` + indice].Oraciones[1].Adverbio|| data[`Juego` + indice].Oraciones[0].Adverbio) {
    return true;
  } else {
    return false;
  }
}
const Preguntasecction = ({ data, ...props }) => {

  const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    let pregunta = ""; 
    for(let i=0; i<data.length; i++){
      if(data[i].Respuesta === 'CORRECTO'){
        pregunta = data[i].FileVideoPreguntaQuien;
        break; // para salir del bucle una vez que se encuentra la respuesta correcta
      }
    }
    setVideoseleccionado(pregunta);
  }, [data])
   return (
    <div>
      <ReactPlayer
        url={videoseleccionado}
        playing={true}
        controls={true}
        loop={true}
        {...props}
        
      />
    </div>
  )
};
const Respuestasecction = ({ siguiente, data, ...props  }) => {
  const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    let pregunta = ""; 
    for(let i=0; i<data.length; i++){
      if(data[i].Respuesta === 'CORRECTO'){
        pregunta = data[i].FileVideoMuestra;
        break; // para salir del bucle una vez que se encuentra la respuesta correcta
      }
    }
    setVideoseleccionado(pregunta);
  }, [data])
  return (
    <div>
      <ReactPlayer
        url={videoseleccionado}
        onEnded={siguiente}
        controls={true}
        playing={true}
        {...props}
      />
    </div>
  )
};
const RespuestaImagen = ({answer, momento, Queselec, data, indice, setMomento, Progreso }) => {
  const [imagense, setImagense] = useState({value:'', label:''})
  let AdjectivoRespuesta = {value:'', label:''};
  useEffect(() => {

    if (data[`Juego` + indice].Oraciones[0].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego` + indice].Oraciones[0].Sujeto;
    } else if (data[`Juego` + indice].Oraciones[1].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego` + indice].Oraciones[1].Sujeto;
    } else if (data[`Juego` + indice].Oraciones[2].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego` + indice].Oraciones[2].Sujeto;
    }

    if (Queselec.label.length != 0) {
      if (AdjectivoRespuesta.label === Queselec.label) {
        setMomento("Respuesta");
        setImagense(buentrajo);
        Progreso({ type: "PROGRESO",PalabraCorrecta:resultadoOracionQuien({objeto1:data[`Juego` + indice].Oraciones[0], objeto2:data[`Juego` + indice].Oraciones[1], objeto3:data[`Juego` + indice].Oraciones[2]}) , selecionado: `Se seleccionó: ${Queselec}`, Resul: `${answer}`, OracionCorrecta: OracionRespuesta({objecto1:data[`Juego` + indice].Oraciones[0], objecto2:data[`Juego` + indice].Oraciones[1], objecto3:data[`Juego` + indice].Oraciones[2]}) })
      } else if (AdjectivoRespuesta.label !== Queselec.label) {
        setMomento("Respuesta");
        setImagense(malTrabajo);
        Progreso({ type: "PROGRESO",PalabraCorrecta:resultadoOracionQuien({objeto1:data[`Juego` + indice].Oraciones[0], objeto2:data[`Juego` + indice].Oraciones[1], objeto3:data[`Juego` + indice].Oraciones[2]}) , selecionado: `Se seleccionó: ${Queselec}`, Resul: `${answer}`, OracionCorrecta: OracionRespuesta({objecto1:data[`Juego` + indice].Oraciones[0], objecto2:data[`Juego` + indice].Oraciones[1], objecto3:data[`Juego` + indice].Oraciones[2]}) })
      }
    } else {
      setImagense("");
    }

  }, [Queselec])

  return (<>
    {
      momento === "Respuesta" && (<img src={imagense} width="100" alt='incorrecto' />)
    }
  </>)
}
const QuienSeccion = ({  indice, siguiente, Progreso, data }) => {
  const [momento, setMomento] = useState("inicial");
  const [Queselec, setQueselec] = useState({label:'', value:''});
  const [QueSelecion, setQueSelecion] = useState(0);
  const [answer, setAnswer] = useState("")
  const [pointerEvent, setPointer] = useState("auto");
  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(1);
  const [opacity3, setOpacity3] = useState(1);

  

useEffect(() => {
    setMomento("inicial")
    setQueselec({label:'', value:''});
    setQueSelecion(0)
    setPointer('auto');
    setOpacity1(1);
    setOpacity2(1);
    setOpacity3(1);
}, [indice])


  const onhandleClickQuePrimero = () => {
    
    // Progreso({ type: "PROGRESO", PalabraCorrecta:resultadoOracionQuien({objeto1:data[`Juego` + indice].Oraciones[0], objeto2:data[`Juego` + indice].Oraciones[1], objeto3:data[`Juego` + indice].Oraciones[2]}) ,selecionado: `Se seleccionó: ${data[`Juego` + indice].Oraciones[0].Sujeto.label}`, Resul: data[`Juego` + indice].Oraciones[0].Respuesta, OracionCorrecta: OracionRespuesta({objecto1:data[`Juego` + indice].Oraciones[0], objecto2:data[`Juego` + indice].Oraciones[1], objecto3:data[`Juego` + indice].Oraciones[2]}) })
    setQueSelecion(1);
    setAnswer(data[`Juego` + indice].Oraciones[0].Respuesta)
    setQueselec(data[`Juego` + indice].Oraciones[0].Sujeto);
    setPointer("none")
    setOpacity2(0.4);
    setOpacity3(0.4);
  }

  const onhandleClickQueSegundo = () => {
    
    // Progreso({ type: "PROGRESO",PalabraCorrecta:resultadoOracionQuien({objeto1:data[`Juego` + indice].Oraciones[0], objeto2:data[`Juego` + indice].Oraciones[1], objeto3:data[`Juego` + indice].Oraciones[2]}) , selecionado: `Se seleccionó: ${data[`Juego` + indice].Oraciones[1].Sujeto.label}`, Resul: data[`Juego` + indice].Oraciones[1].Respuesta, OracionCorrecta: OracionRespuesta({objecto1:data[`Juego` + indice].Oraciones[0], objecto2:data[`Juego` + indice].Oraciones[1], objecto3:data[`Juego` + indice].Oraciones[2]}) })
    setQueSelecion(2);
    setAnswer(data[`Juego` + indice].Oraciones[1].Respuesta)
    setQueselec(data[`Juego` + indice].Oraciones[1].Sujeto);
    setPointer("none")
    setOpacity3(0.4);
    setOpacity1(0.4);
  }
  const onhandleClickQueTercero = () => {
    
    // Progreso({ type: "PROGRESO",PalabraCorrecta:resultadoOracionQuien({objeto1:data[`Juego` + indice].Oraciones[0], objeto2:data[`Juego` + indice].Oraciones[1], objeto3:data[`Juego` + indice].Oraciones[2]}) , selecionado: `Se seleccionó: ${data[`Juego` + indice].Oraciones[2].Sujeto.label}`, Resul: data[`Juego` + indice].Oraciones[2].Respuesta, OracionCorrecta: OracionRespuesta({objecto1:data[`Juego` + indice].Oraciones[0], objecto2:data[`Juego` + indice].Oraciones[1], objecto3:data[`Juego` + indice].Oraciones[2]}) })
    setQueSelecion(3);
    setAnswer(data[`Juego` + indice].Oraciones[2].Respuesta)
    setQueselec(data[`Juego` + indice].Oraciones[2].Sujeto);
    setPointer("none")
    setOpacity1(0.4);
    setOpacity2(0.4);
  }






  return (
    <div className='contenido-una-oracion'>
      <div className='seccion-videos-oracion' >
        {
          momento === "inicial" && <Preguntasecction data={data[`Juego` + indice].Oraciones} className="video-pregunta-oracion-una"  />
        }
        {
          momento === "Respuesta" && <Respuestasecction siguiente={siguiente} data={data[`Juego` + indice].Oraciones}  className="video-respuesta-oracion-una"  />
        }
      </div>
      <div className='seccion-opciones-oracion'>
          <div className='imagen-pregunta-una'>
            <img alt='que' src={Quien} />
          </div>
          <div style={{pointerEvents: pointerEvent, opacity: opacity1 }} onClick={onhandleClickQuePrimero}>
            <div className='opcion-imagen-una'>
            <img src={data[`Juego` + indice].Oraciones[0].Sujeto.value} alt='opcion1' className='opcion-imagen-neta' />
          </div></div>
          <div style={{pointerEvents: pointerEvent, opacity: opacity2 }} onClick={onhandleClickQueSegundo}>
            <div className='opcion-imagen-una'>
            <img src={data[`Juego` + indice].Oraciones[1].Sujeto.value} alt='opcion2' className='opcion-imagen-neta' />
            </div>
          </div>
          <div style={{ pointerEvents: pointerEvent, opacity: opacity3 }} onClick={onhandleClickQueTercero}>
            <div className='opcion-imagen-una'>
            <img src={data[`Juego` + indice].Oraciones[2].Sujeto.value} alt='opcion3' className='opcion-imagen-neta' />
            </div>
          </div>
        </div>
      <div className='zonainteractiva'>
      <div   className='pruebaDise' style={{ borderRadius: "10px", border: "#F8F7FD solid", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.13)", backgroundColor: "#F8F7FD" }}>
        <div className='opciones' >
          <div style={{padding:'0px'}}>
            <img alt='que' src={Quien} className='imagenOpc'  />
          </div>
          <div style={{padding:'0px'}} >
            <img src={Verbo} alt='opcion1' className='imagenOpc' />
          </div>
          {isAdverbio(indice, data)
            &&
            (
              <div style={{padding:'0px'}} >
                <img src={Cantidad} alt='opcion1' className='imagenOpc'/>
              </div>)
          }
          <div style={{padding:'0px'}} >
            <img alt='que' src={Que} className='imagenOpc'  />
          </div>
        </div>
        {/* parte de seleccion */}
        <div className='seleccion'>
          <div style={{padding:'0px'}} >
            <SeleccionQUIEN QueSelecion={QueSelecion}  data={data} indice={indice} className='opcionesSelec' />
          </div>
          <div style={{padding:'0px'}} >
            <VerVerboRespuesta  data={data} indice={indice} className='opcionesSelec' />
          </div>
          {
            isAdverbio( indice, data)
            && (
              <div style={{padding:'0px'}} >
                <VerCantidad  data={data} indice={indice} className='opcionesSelec' />
              </div>
            )
          }
          <div style={{padding:'0px'}} >
            <VerSeleccionqUE  data={data} indice={indice} className='opcionesSelec'/>
          </div>
        </div>
      </div>
      <div  className='respuesta-seccion' >
        <RespuestaImagen answer={answer} momento={momento} Queselec={Queselec} setMomento={setMomento} data={data} Progreso={Progreso}  indice={indice} />
        </div>
   </div>
    </div>
  )
}

export default QuienSeccion