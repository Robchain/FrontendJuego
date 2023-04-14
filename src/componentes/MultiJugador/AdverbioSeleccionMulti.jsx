import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
//import { JuecoContext } from '../../../context/Juego/JuecoContext';
import buentrajo from '../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../assets/img/AssetsGame/Bad Jood.png'
import Quien from '../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../assets/img/AssetsGame/ico_verbo.png";
import Cantidad from '../../assets/img/AssetsGame/ico_cantidad.png'
import ReactPlayer from 'react-player';
import { resultadoMultiJu } from '../../helpers/contador'
const MostrarQue = ({ data, id, window }) => {
    const [verbo, setVerbo] = useState("")
    useEffect(() => {
      if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
        setVerbo(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileAdjetivoImagen)
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
        setVerbo(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileAdjetivoImagen)
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
        setVerbo(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileAdjetivoImagen)
      }
    }, [data])
  
  
    return (<img src={verbo} width="150" alt='opcion que' />)
  }
  const RespuestaImagen = ({ data, setImagen, imagen, id, window, Queselec, setMomento, momento }) => {
  
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
      if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
        AdjectivoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Adverbio;
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
        AdjectivoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Adverbio
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
        AdjectivoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Adverbio
      }
  
    }
  
  
  
    return (<>
  
      {momento === "Respuesta" && (
        <img src={imagen} width="100" alt='adverbioRespuesta' />
      )}
    </>)
  }
  const Preguntasecction = ({ id, window, data }) => {
  //  const { oraciondata } = useContext(JuecoContext);
    const [videoseleccionado, setVideoseleccionado] = useState("");
    useEffect(() => {
      setVideoseleccionado(preguntavideo);
    }, [])
    const preguntavideo = () => {
      if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
        return data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileVideoPreguntaQue
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
        return data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileVideoPreguntaQue
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
        return data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileVideoPreguntaQue
      }
  
    }
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
  const Respuestasecction = ({ id, window, data }) => {
    //const { oraciondata } = useContext(JuecoContext);
    const [videoseleccionado, setVideoseleccionado] = useState("");
    useEffect(() => {
      setVideoseleccionado(preguntavideo);
    }, [])
  
    const preguntavideo = () => {
      if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
        return data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileVideoMuestra
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
        return data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileVideoMuestra
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
        return data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileVideoMuestra
      }
    }
  
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
  const isAdverbio = (id, window, data) => {
    if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Adverbio || data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Adverbio) {
      return true;
    } else {
      return false;
    }
  }
  const SeleccionAdverbio = ({ QueSelecion, data, id, window }) => {
    const [seleccionpal, setSeleccionpal] = useState("");
    useEffect(() => {
      if (QueSelecion === 1) { setSeleccionpal(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Adverbio) }
      if (QueSelecion === 2) { setSeleccionpal(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Adverbio) }
      if (QueSelecion === 3) { setSeleccionpal(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Adverbio) }
    }, [QueSelecion])
  
  
    return (
      <><h3 style={{ fontWeight: 700, color: "#85858C" }}>{seleccionpal}</h3></>
    )
  }
  const VerVerboRespuesta = ({ data, window, id }) => {
   
    const [verbo, setVerbo] = useState("")
    useEffect(() => {
        if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
            setVerbo( data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Verbo)
          } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
            setVerbo(  data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Verbo)
          } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
            setVerbo(  data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Verbo)
          }      
    }, [data])
    return (<h3 style={{ fontWeight: 700, color: "#85858C" }}>{verbo}</h3>)
  }
  const VerSeleccionQuien = ({ data, window, id }) => {
    const [selecion, setSelecion] = useState("");
    useEffect(() => {
      if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
        setSelecion(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileSujetoImagen)
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
        setSelecion(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileSujetoImagen)
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
        setSelecion(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileSujetoImagen)
      }
    }, [data])
    return (<>{selecion.length > 2 && (<img src={selecion} width="150" alt='opcion1' />)}</>)
  }
export const AdverbioSeleccionMulti = ({id, window, siguiente, data, Progreso }) => {
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
      setQueselec(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Adverbio);
      setPointer("none")
      setOpacity2(0.4);
      setOpacity3(0.4);
      Progreso({ type: "PROGRESO", PalabraCorrecta:resultadoMultiJu({objeto1:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1,objeto2:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2,objeto3:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3}), PalabraSeleccionada:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Adverbio, Resultado:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta  })
      setTimeout(() => { siguiente(window.id) }, 9000)
    }
  
  
    const onhandleClickQueSegundo = () => {
      setQueSelecion(2);
      setQueselec(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Adverbio);
      setPointer("none")
      setOpacity3(0.4);
      setOpacity1(0.4);
      Progreso({ type: "PROGRESO", PalabraCorrecta:resultadoMultiJu({objeto1:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1,objeto2:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2,objeto3:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3}), PalabraSeleccionada:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Adverbio, Resultado:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta  })
      setTimeout(() => { siguiente(window.id) }, 9000)
    }
    const onhandleClickQueTercero = () => {
      setQueSelecion(3);
      setQueselec(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Adverbio);
      setPointer("none")
      setOpacity1(0.4);
      setOpacity2(0.4);
     Progreso({ type: "PROGRESO", PalabraCorrecta:resultadoMultiJu({objeto1:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1,objeto2:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2,objeto3:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3}), PalabraSeleccionada:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Adverbio, Resultado:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta  })
      setTimeout(() => { siguiente(window.id) }, 9000)
    }
  return (
    <>
        <Col className='mt-2' lg="4" sm="12" md="12" >
        {
          momento === "inicial" && <Preguntasecction id={id} window={window} data={data} />
        }
        {
          momento === "Respuesta" && <Respuestasecction id={id} window={window} data={data} />
        }
      </Col>
      <Col lg="8" className='align-self-center'>
        <Row >
          <Col style={{ width: "95px" }}>
            <img alt='que' src={Cantidad} width="75" />
          </Col>
          <Col style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity1 }} onClick={onhandleClickQuePrimero}>
            <h3 style={{ fontWeight: 700, color: "#85858C" }}>{data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Adverbio}</h3>
          </Col>
          <Col style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity2 }} onClick={onhandleClickQueSegundo}>
            <h3 style={{ fontWeight: 700, color: "#85858C" }}>{data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Adverbio}</h3>
          </Col>
          <Col style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity3 }} onClick={onhandleClickQueTercero}>
            <h3 style={{ fontWeight: 700, color: "#85858C" }}>{data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Adverbio}</h3>
          </Col>
        </Row>
      </Col>
      <Col lg="8" style={{ borderRadius: "10px", border: "#F8F7FD solid", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.13)", backgroundColor: "#F8F7FD" }}>
        <Row >
          <div style={{ width: "200px" }} >
            <img alt='que' src={Quien} width="75" />
          </div>
          <div style={{ width: "120px" }} >
            <img src={Verbo} alt='opcion1' width="75" />
          </div>
          {isAdverbio(id, window, data)
            &&
            (
              <div style={{ width: "100px" }} >
                <img src={Cantidad} alt='opcion1' width="75" />
              </div>)
          }
          <div style={{ width: "200px" }} >
            <img alt='que' src={Que} width="75" />
          </div>
        </Row>
        <Row lg="8" >

          <div style={{ width: "200px" }} >
            <VerSeleccionQuien id={id} data={data} window={window} />
          </div>
          <div style={{ width: "120px" }} >
            <VerVerboRespuesta id={id} data={data} window={window} />
          </div>
          {
            isAdverbio(id, window, data)
            && (
              <div style={{ width: "100px" }} >
                <SeleccionAdverbio QueSelecion={QueSelecion} id={id} data={data} window={window} />
              </div>
            )
          }
          <div style={{ width: "200px" }} >
            <MostrarQue id={id} data={data} window={window} />
          </div>
        </Row>
      </Col>
      <Col lg="3" ><RespuestaImagen imagen={imagen} setImagen={setImagen} data={data} Queselec={Queselec} id={id} window={window} setMomento={setMomento} momento={momento} /></Col>
    </>
  )
}
