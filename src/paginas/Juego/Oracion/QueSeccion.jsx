import React, { useEffect, useState } from 'react'
import buentrajo from '../../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../../assets/img/AssetsGame/Bad Jood.png'
import Quien from '../../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../../assets/img/AssetsGame/ico_verbo.png";
import Cantidad from '../../../assets/img/AssetsGame/ico_cantidad.png'
import ReactPlayer from 'react-player';
import { OracionRespuesta, resultadoOracionQue, } from '../../../helpers'
const VerVerboRespuesta = ({ data, indice, ...opc }) => {
  const [palabra, setPalabra] = useState("");
  useEffect(() => {
    if (data[`Juego` + indice].Oraciones[0].Respuesta === "CORRECTO") {
      setPalabra(data[`Juego` + indice].Oraciones[0].Verbo)
    } else if (data[`Juego` + indice].Oraciones[1].Respuesta === "CORRECTO") {
      setPalabra(data[`Juego` + indice].Oraciones[1].Verbo)
    } else if (data[`Juego` + indice].Oraciones[2].Respuesta === "CORRECTO") {
      setPalabra(data[`Juego` + indice].Oraciones[2].Verbo)
    }
  }, [data])

  return (<span style={{ fontWeight: 700, color: "#85858C" }} {...opc}>{palabra}</span>)
}
const isAdverbio = ( indice, data) => {
  if(data[`Juego` + indice].Oraciones[0].Respuesta === "CORRECTO" && data[`Juego` + indice].Oraciones[0].Adverbio){
return true
  }else if(data[`Juego` + indice].Oraciones[1].Respuesta === "CORRECTO" && data[`Juego` + indice].Oraciones[1].Adverbio){
    return true;
  }else if(data[`Juego` + indice].Oraciones[2].Respuesta === "CORRECTO" && data[`Juego` + indice].Oraciones[2].Adverbio){
    return true;
  }else {
    return false;
  }
}
const Preguntasecction = ({ setcro, setOpacity1, setOpacity2,setOpacity3,setPointer, setVideoActual, videoActual, data, ...props }) => {

  const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    let pregunta = "";
    let respuesta = '';
    for (let i = 0; i < data.length; i++) {
      if (data[i].Respuesta === 'CORRECTO') {
        respuesta = data[i].FileVideoMuestra
        pregunta = data[i].FileVideoPreguntaQue
        break; // para salir del bucle una vez que se encuentra la respuesta correcta
      }
    }
    setVideoseleccionado([respuesta, pregunta]);
  }, [data])
  return (
    <div >
      <ReactPlayer
        url={videoseleccionado[videoActual]}
        onEnded={() => { if (1 === videoActual) {   setPointer('auto');
        setOpacity1(1);
        setOpacity2(1);
        setOpacity3(1); 
        setcro("pregunta")
      } else { setVideoActual(videoActual + 1);  } }}
        playing={true}
        controls={true}
        
        {...props}
      />
    </div>
  )
};

const Respuestasecction = ({setcro, siguiente, data, ...props }) => {
  const [videoseleccionado2, setVideoseleccionado2] = useState("");
  useEffect(() => {
    setcro('respuesta');
    let pregunta = "";
    for (let i = 0; i < data.length; i++) {
      if (data[i].Respuesta === 'CORRECTO') {
        pregunta = data[i].FileVideoMuestra
        break; // para salir del bucle una vez que se encuentra la respuesta correcta
      }
    }
    setVideoseleccionado2(pregunta);
  }, [data])

  return (
    <div>
      <ReactPlayer
        url={videoseleccionado2}
        playing={true}
        controls={true}
        onEnded={siguiente}
        {...props}
      />
    </div>
  )
};
const VerSeleccionQuien = ({ data, indice, ...opc }) => {
  const [queselec, setQueselec] = useState({ label: '', value: '' })
  useEffect(() => {
    if (data[`Juego` + indice].Oraciones[0].Respuesta === "CORRECTO") {
      setQueselec(data[`Juego` + indice].Oraciones[0].Sujeto)
    } else if (data[`Juego` + indice].Oraciones[1].Respuesta === "CORRECTO") {
      setQueselec(data[`Juego` + indice].Oraciones[1].Sujeto)
    } else if (data[`Juego` + indice].Oraciones[2].Respuesta === "CORRECTO") {
      setQueselec(data[`Juego` + indice].Oraciones[2].Sujeto)
    }
  }, [data, indice])

  return (<>
    {
      queselec.value.length !== 0 && (<img src={queselec.value} alt={queselec.label} {...opc} />)
    }
  </>)

}

const VerCantidad = ({ data, indice, ...props }) => {
  const [seleccion, setSeleccion] = useState("")
  useEffect(() => {
    if (data[`Juego` + indice].Oraciones[0].Respuesta === "CORRECTO") {
      setSeleccion(data[`Juego` + indice].Oraciones[0].Adverbio)
    } else if (data[`Juego` + indice].Oraciones[1].Respuesta === "CORRECTO") {
      setSeleccion(data[`Juego` + indice].Oraciones[1].Adverbio)
    } else if (data[`Juego` + indice].Oraciones[2].Respuesta === "CORRECTO") {
      setSeleccion(data[`Juego` + indice].Oraciones[2].Adverbio)
    }
  }, [data, indice])

  return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{seleccion}</span>)
}

const SeleccionQue = ({ QueSelecion, data, indice, ...props }) => {
  if (QueSelecion === 1) { return (<img src={data[`Juego` + indice].Oraciones[0].Que.value} alt='opcion1'  {...props} />) }
  if (QueSelecion === 2) { return (<img src={data[`Juego` + indice].Oraciones[1].Que.value} alt='opcion1'  {...props} />)  }
  if (QueSelecion === 3) {  return (<img src={data[`Juego` + indice].Oraciones[2].Que.value} alt='opcion1'  {...props} />)}
  if (QueSelecion === 0) {  return (<div></div>)}
  return (<div></div>)
}
const RespuestaImagen = ({ Queselec, data, indice, setMomento, momento, ...opc }) => {
  const [imagense, setImagense] = useState("")
  let AdjectivoRespuesta = { label: '', value: '' };
  useEffect(() => {
    if (data[`Juego` + indice].Oraciones[0].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego` + indice].Oraciones[0].Que;
    } else if (data[`Juego` + indice].Oraciones[1].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego` + indice].Oraciones[1].Que;
    } else if (data[`Juego` + indice].Oraciones[2].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego` + indice].Oraciones[2].Que;
    }

    if (Queselec.label.length !== 0) {
      if (AdjectivoRespuesta.label === Queselec.label) {
        setMomento("Respuesta");
        setImagense(buentrajo);

      } else if (AdjectivoRespuesta.label !== Queselec.label) {
        setMomento("Respuesta");
        setImagense(malTrabajo);
      }
    } else {
      setImagense("");
    }
  }, [Queselec])

  return (<>{
    momento === "Respuesta" && (<img src={imagense} alt='imagen' {...opc} />)}
    <></>
  </>)
}

const QueSeccion = ({setcro, indice, siguiente, dispatchProgreso, data }) => {
  const [momento, setMomento] = useState("inicial");
  const [Queselec, setQueselec] = useState({ label: "", value: "" });
  const [QueSelecion, setQueSelecion] = useState(0);
  const [videoActual, setVideoActual] = useState(0);
  const [pointerEvent, setPointer] = useState("none")
  const [opacity1, setOpacity1] = useState(0.4);
  const [opacity2, setOpacity2] = useState(0.4);
  const [opacity3, setOpacity3] = useState(0.4);
  
  useEffect(() => {
    setcro("inicial")
    setMomento("inicial")
    setQueselec({ label: '', value: '' });
    setQueSelecion(0);
    setVideoActual(0);
    setPointer('none');
    setOpacity1(0.4);
    setOpacity2(0.4);
    setOpacity3(0.4);
  }, [indice])

  const onhandleClickQuePrimero = () => {
    dispatchProgreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracionQue({ objeto1: data[`Juego` + indice].Oraciones[0], objeto2: data[`Juego` + indice].Oraciones[1], objeto3: data[`Juego` + indice].Oraciones[2] }), selecionado: `Se seleccionó:  ${data[`Juego` + indice].Oraciones[0].Que.label}`, Resul: data[`Juego` + indice].Oraciones[0].Respuesta, OracionCorrecta: OracionRespuesta({ objecto1: data[`Juego` + indice].Oraciones[0], objecto2: data[`Juego` + indice].Oraciones[1], objecto3: data[`Juego` + indice].Oraciones[2] }) })
    setQueSelecion(1);
    setQueselec(data[`Juego` + indice].Oraciones[0].Que);
    setPointer("none")
    setOpacity2(0.4);
    setOpacity3(0.4);
  }

  const onhandleClickQueSegundo = () => {
    dispatchProgreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracionQue({ objeto1: data[`Juego` + indice].Oraciones[0], objeto2: data[`Juego` + indice].Oraciones[1], objeto3: data[`Juego` + indice].Oraciones[2] }), selecionado: `Se seleccionó:  ${data[`Juego` + indice].Oraciones[1].Que.label}`, Resul: data[`Juego` + indice].Oraciones[1].Respuesta, OracionCorrecta: OracionRespuesta({ objecto1: data[`Juego` + indice].Oraciones[0], objecto2: data[`Juego` + indice].Oraciones[1], objecto3: data[`Juego` + indice].Oraciones[2] }) })
    setQueSelecion(2);
    setQueselec(data[`Juego` + indice].Oraciones[1].Que);
    setPointer("none")
    setOpacity3(0.4);
    setOpacity1(0.4);
  }
  const onhandleClickQueTercero = () => {
    dispatchProgreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracionQue({ objeto1: data[`Juego` + indice].Oraciones[0], objeto2: data[`Juego` + indice].Oraciones[1], objeto3: data[`Juego` + indice].Oraciones[2] }), selecionado: `Se seleccionó:  ${data[`Juego` + indice].Oraciones[2].Que.label}`, Resul: data[`Juego` + indice].Oraciones[2].Respuesta, OracionCorrecta: OracionRespuesta({ objecto1: data[`Juego` + indice].Oraciones[0], objecto2: data[`Juego` + indice].Oraciones[1], objecto3: data[`Juego` + indice].Oraciones[2] }) })
    setQueSelecion(3);
    setQueselec(data[`Juego` + indice].Oraciones[2].Que);
    setPointer("none")
    setOpacity1(0.4);
    setOpacity2(0.4);
  }




  return (
    <div className='contenido-una-oracion'>
      <div className='up-side-oracion'>
        <div className='seccion-videos-oracion'>
          {
            momento === "inicial" && <Preguntasecction setcro={setcro} setOpacity1={setOpacity1} setOpacity2={setOpacity2} setOpacity3={setOpacity3} setPointer={setPointer} setVideoActual={setVideoActual} videoActual={videoActual} data={data[`Juego` + indice].Oraciones} className="video-pregunta-oracion-una" />
          }
          {
            momento === "Respuesta" && <Respuestasecction  setcro={setcro} siguiente={siguiente} data={data[`Juego` + indice].Oraciones} className="video-respuesta-oracion-una" />
          }
        </div>
        <div className='seccion-opciones-oracion'>
          <div className='imagen-pregunta-una' >
            <img alt='que' src={Que} />
          </div>
          <div style={{ pointerEvents: pointerEvent, opacity: opacity1 }} onClick={onhandleClickQuePrimero}>
            <div className='opcion-imagen-una'>
              <img src={data[`Juego` + indice].Oraciones[0].Que.value} alt='opcion1' className='opcion-imagen-neta' />
            </div>
          </div>
          <div style={{ pointerEvents: pointerEvent, opacity: opacity2 }} onClick={onhandleClickQueSegundo}>
            <div className='opcion-imagen-una'>
              <img src={data[`Juego` + indice].Oraciones[1].Que.value} alt='opcion2' className='opcion-imagen-neta' />
            </div>
          </div>
          <div style={{ pointerEvents: pointerEvent, opacity: opacity3 }} onClick={onhandleClickQueTercero}>
            <div className='opcion-imagen-una'>
              <img src={data[`Juego` + indice].Oraciones[2].Que.value} alt='opcion3' className='opcion-imagen-neta' />
            </div>
          </div>

        </div>
      </div>
      <div className='zonainteractiva'>
        <div className='pruebaDise' style={{ borderRadius: "10px", border: "#F8F7FD solid", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.13)", backgroundColor: "#F8F7FD" }}>
          
          {/* parte de seleccion */}
          <div className='seleccion'  >
            <div style={{ padding: '0px' }}>
              <VerSeleccionQuien data={data} indice={indice} className='opcionesSelec' />
            </div>
            <div style={{ padding: '0px' }}>
              <VerVerboRespuesta data={data} indice={indice} className='opcionesSelec' />
            </div>
            {
              isAdverbio(indice, data)
              && (
                <div style={{ padding: '0px' }}>
                  <VerCantidad data={data} indice={indice} className='opcionesSelec' />
                </div>
              )
            }
            <div style={{ padding: '0px' }}>
              <SeleccionQue QueSelecion={QueSelecion} data={data} indice={indice} className='opcionesSelec' />
            </div>
          </div>
        </div>
        <div className='respuesta-seccion'>
          <div>
            <RespuestaImagen momento={momento} setMomento={setMomento} Queselec={Queselec} data={data} indice={indice} className='imagen-respuesta-oracion' />
          </div>
        </div>
      </div>
    </div>
  )
}
export default QueSeccion