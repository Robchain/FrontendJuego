import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import buentrajo from '../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../assets/img/AssetsGame/Bad Jood.png'
import Quien from '../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../assets/img/AssetsGame/ico_verbo.png";
import Cantidad from '../../assets/img/AssetsGame/ico_cantidad.png'
import ReactPlayer from 'react-player';
import { resultadoOracionAdverbio } from '../../helpers/contador'
const MostrarQue = ({ data, window, ...props }) => {
  const [verbo, setVerbo] = useState({value:'', label:''})
  useEffect(() => {
    if (data[`Juego${window.id}`].Oraciones[0].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego${window.id}`].Oraciones[0].Que)
    } else if (data[`Juego${window.id}`].Oraciones[1].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego${window.id}`].Oraciones[1].Que)
    } else if (data[`Juego${window.id}`].Oraciones[2].Respuesta === "CORRECTO") {
      setVerbo(data[`Juego${window.id}`].Oraciones[2].Que)
    }
  }, [data])


  return (<img src={verbo.value} alt='opcion que' {...props} />)
}
const RespuestaImagen = ({ data, setImagen, imagen, window, Queselec, setMomento, momento }) => {

  let AdjectivoRespuesta = ""

  useEffect(() => {
    adjetivoRespuesta();
    if (Queselec.length > 2) {
      if (AdjectivoRespuesta === Queselec) {
        setMomento("Respuesta");
        setImagen(buentrajo);
      } else if (AdjectivoRespuesta !== Queselec) {
        setMomento("Respuesta");
        setImagen(malTrabajo);
      }
    } else {
      setImagen("");
    }
  }, [Queselec])


  const adjetivoRespuesta = () => {
    if (data[`Juego${window.id}`].Oraciones[0].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego${window.id}`].Oraciones[0].Adverbio;
    } else if (data[`Juego${window.id}`].Oraciones[1].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego${window.id}`].Oraciones[1].Adverbio
    } else if (data[`Juego${window.id}`].Oraciones[2].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego${window.id}`].Oraciones[2].Adverbio
    }

  }



  return (<>

    {momento === "Respuesta" && (
      <img src={imagen} width="100" alt='adverbioRespuesta' />
    )}
  </>)
}
const Preguntasecction = ({ data }) => {
  const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    let pregunta = "";
    for (let i = 0; i < data.length; i++) {
      if (data[i].Respuesta === 'CORRECTO') {
        pregunta = data[i].FileVideoPreguntaQue;
        break; // para salir del bucle una vez que se encuentra la respuesta correcta
      }
    }
    setVideoseleccionado(pregunta);
  }, [data])
  return (
    <div>
      <ReactPlayer
        url={videoseleccionado}
        height={225}
        width={300}
        playing
        loop={true}
      />
    </div>
  )
};
const Respuestasecction = ({ data }) => {
  const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    let pregunta = "";
    for (let i = 0; i < data.length; i++) {
      if (data[i].Respuesta === 'CORRECTO') {
        pregunta = data[i].FileVideoMuestra
        break; // para salir del bucle una vez que se encuentra la respuesta correcta
      }
    }
    setVideoseleccionado(pregunta);
  }, [data])

  return (
    <div>
      <ReactPlayer
        url={videoseleccionado}
        height={225}
        width={300}
        playing
      />
    </div>
  )
};
const isAdverbio = (window, data) => {
  if (data[`Juego${window.id}`].Oraciones[2].Adverbio || data[`Juego${window.id}`].Oraciones[1].Adverbio || data[`Juego${window.id}`].Oraciones[3].Adverbio) {
    return true;
  } else {
    return false;
  }
}
const SeleccionAdverbio = ({ QueSelecion, data, window, ...props }) => {
  const [seleccionpal, setSeleccionpal] = useState("");
  useEffect(() => {
    if (QueSelecion === 1) { setSeleccionpal(data[`Juego${window.id}`].Oraciones[0].Adverbio) }
    if (QueSelecion === 2) { setSeleccionpal(data[`Juego${window.id}`].Oraciones[1].Adverbio) }
    if (QueSelecion === 3) { setSeleccionpal(data[`Juego${window.id}`].Oraciones[2].Adverbio) }
  }, [QueSelecion])


  return (
    <span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{seleccionpal}</span>
  )
}
const VerVerboRespuesta = ({ data, window, ...props }) => {
  let verbo = "";
    if (data[`Juego${window.id}`].Oraciones[0].Respuesta === "CORRECTO") {
      verbo = data[`Juego${window.id}`].Oraciones[0].Verbo
    } else if (data[`Juego${window.id}`].Oraciones[1].Respuesta === "CORRECTO") {
      verbo = data[`Juego${window.id}`].Oraciones[1].Verbo
    } else if (data[`Juego${window.id}`].Oraciones[2].Respuesta === "CORRECTO") {
      verbo = data[`Juego${window.id}`].Oraciones[2].Verbo
    }
  return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{verbo}</span>)
}
const VerSeleccionQuien = ({ data, window, ...props }) => {
  const [selecion, setSelecion] = useState({label:'', value:''});
  useEffect(() => {
    if (data[`Juego${window.id}`].Oraciones[0].Respuesta === "CORRECTO") {
      setSelecion(data[`Juego${window.id}`].Oraciones[0].Sujeto)
    } else if (data[`Juego${window.id}`].Oraciones[1].Respuesta === "CORRECTO") {
      setSelecion(data[`Juego${window.id}`].Oraciones[1].Sujeto)
    } else if (data[`Juego${window.id}`].Oraciones[2].Respuesta === "CORRECTO") {
      setSelecion(data[`Juego${window.id}`].Oraciones[2].Sujeto)
    }
  }, [data])
  return (<>{selecion.value.length != 0 && (<img src={selecion.value} alt='opcion1' {...props} />)}</>)
}
export const AdverbioSeleccionMulti = ({ window, siguiente, data, Progreso }) => {
  const [momento, setMomento] = useState("inicial");
  // const { oraciondata } = useContext(JuecoContext);
  const [Queselec, setQueselec] = useState("");
  const [imagen, setImagen] = useState("");
  const [QueSelecion, setQueSelecion] = useState(0);
  const [pointerEvent, setPointer] = useState("auto")
  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(1);
  const [opacity3, setOpacity3] = useState(1);
  const onhandleClickQuePrimero = () => {
    setQueSelecion(1);
    setQueselec(data[`Juego${window.id}`].Oraciones[0].Adverbio);
    setPointer("none")
    setOpacity2(0.4);
    setOpacity3(0.4);
    Progreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracionAdverbio({ objeto1: data[`Juego${window.id}`].Oraciones[0], objeto2: data[`Juego${window.id}`].Oraciones[1], objeto3: data[`Juego${window.id}`].Oraciones[2] }), PalabraSeleccionada: `Se seleccionó: ${data[`Juego${window.id}`].Oraciones[0].Adverbio}`, Resultado: data[`Juego${window.id}`].Oraciones[0].Respuesta })
    setTimeout(() => { siguiente(window.id) }, 9000)
  }
  const onhandleClickQueSegundo = () => {
    setQueSelecion(2);
    setQueselec(data[`Juego${window.id}`].Oraciones[1].Adverbio);
    setPointer("none")
    setOpacity3(0.4);
    setOpacity1(0.4);
    Progreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracionAdverbio({ objeto1: data[`Juego${window.id}`].Oraciones[0], objeto2: data[`Juego${window.id}`].Oraciones[1], objeto3: data[`Juego${window.id}`].Oraciones[2] }), PalabraSeleccionada: `Se seleccionó: ${data[`Juego${window.id}`].Oraciones[1].Adverbio}`, Resultado: data[`Juego${window.id}`].Oraciones[1].Respuesta })
    setTimeout(() => { siguiente(window.id) }, 9000)
  }
  const onhandleClickQueTercero = () => {
    setQueSelecion(3);
    setQueselec(data[`Juego${window.id}`].Oraciones[2].Adverbio);
    setPointer("none")
    setOpacity1(0.4);
    setOpacity2(0.4);
    Progreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracionAdverbio({ objeto1: data[`Juego${window.id}`].Oraciones[0], objeto2: data[`Juego${window.id}`].Oraciones[1], objeto3: data[`Juego${window.id}`].Oraciones[2] }), PalabraSeleccionada: `Se seleccionó: ${data[`Juego${window.id}`].Oraciones[2].Adverbio}`, Resultado: data[`Juego${window.id}`].Oraciones[2].Respuesta })
    setTimeout(() => { siguiente(window.id) }, 9000)
  }
  return (
    <>
      <Col className='mt-2' lg="4" sm="12" md="12" >
        {
          momento === "inicial" && <Preguntasecction data={data[`Juego` + window.id].Oraciones} />
        }
        {
          momento === "Respuesta" && <Respuestasecction data={data[`Juego` + window.id].Oraciones} />
        }
      </Col>
      <Col lg="8" className='align-self-center'>
        <Row >
          <Col style={{ width: "95px" }}>
            <img alt='que' src={Cantidad} width="75" />
          </Col>
          <Col style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity1 }} onClick={onhandleClickQuePrimero}>
            <h3 style={{ fontWeight: 700, color: "#85858C" }}>{data[`Juego${window.id}`].Oraciones[0].Adverbio}</h3>
          </Col>
          <Col style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity2 }} onClick={onhandleClickQueSegundo}>
            <h3 style={{ fontWeight: 700, color: "#85858C" }}>{data[`Juego${window.id}`].Oraciones[1].Adverbio}</h3>
          </Col>
          <Col style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity3 }} onClick={onhandleClickQueTercero}>
            <h3 style={{ fontWeight: 700, color: "#85858C" }}>{data[`Juego${window.id}`].Oraciones[2].Adverbio}</h3>
          </Col>
        </Row>
      </Col>
      <div className='zonainteractiva'>
        <div className='pruebaDise' style={{ borderRadius: "10px", border: "#F8F7FD solid", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.13)", backgroundColor: "#F8F7FD" }}>
          <div className='opciones' >
            <div style={{ padding: '0px' }} >
              <img alt='que' src={Quien} className='imagenOpc' />
            </div>
            <div style={{ padding: '0px' }} >
              <img src={Verbo} alt='opcion1' className='imagenOpc' />
            </div>
            {isAdverbio(window, data)
              &&
              (
                <div style={{ padding: '0px' }} >
                  <img src={Cantidad} alt='opcion1' className='imagenOpc' />
                </div>)
            }
            <div style={{ padding: '0px' }} >
              <img alt='que' src={Que} className='imagenOpc' />
            </div>
          </div>
          <div className='seleccion' >
            <div style={{ padding: '0px' }} >
              <VerSeleccionQuien data={data} window={window} className='opcionesSelec' />
            </div>
            <div style={{ padding: '0px' }} >
              <VerVerboRespuesta data={data} window={window} className='opcionesSelec' />
            </div>
            {
              isAdverbio(window, data)
              && (
                <div style={{ padding: '0px' }} >
                  <SeleccionAdverbio QueSelecion={QueSelecion} data={data} window={window} className='opcionesSelec' />
                </div>
              )
            }
            <div style={{ padding: '0px' }} >
              <MostrarQue data={data} window={window} className='opcionesSelec' />
            </div>
          </div>
        </div>
        <div  ><RespuestaImagen imagen={imagen} setImagen={setImagen} data={data} Queselec={Queselec} window={window} setMomento={setMomento} momento={momento} /></div>
      </div>
    </>
  )
}
