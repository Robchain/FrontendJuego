import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import buentrajo from '../../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../../assets/img/AssetsGame/Bad Jood.png'
import Quien from '../../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../../assets/img/AssetsGame/ico_verbo.png";
import Cantidad from '../../../assets/img/AssetsGame/ico_cantidad.png'
import ReactPlayer from 'react-player';
import { resultadoOracion } from '../../../helpers/contador'
const VerVerboRespuesta = ({ data,  window }) => {
  const [selccionver, setSelccionver] = useState("")
  useEffect(() => {
    if (data.Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      setSelccionver(data.Partida[`Juego` + window.id].Oraciones.Oracion1.Verbo)
    } else if (data.Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      setSelccionver(data.Partida[`Juego` + window.id].Oraciones.Oracion2.Verbo)
    } else if (data.Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      setSelccionver(data.Partida[`Juego` + window.id].Oraciones.Oracion3.Verbo)
    }
  }, [data])

  return (<h3 style={{ fontWeight: 700, color: "#85858C" }}>{selccionver}</h3>)
}
const VerSeleccionqUE = ({ data,  window }) => {
  const [seleccionverbo, setSeleccionverbo] = useState("");
  useEffect(() => {
    if (data.Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      setSeleccionverbo(data.Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen)
    } else if (data.Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      setSeleccionverbo(data.Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen)
    } else if (data.Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      setSeleccionverbo(data.Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen)
    }
  }, [data])

  return (<img src={seleccionverbo} width="150" alt='opcion1' />)

}
const SeleccionQUIEN = ({ data,  window, QueSelecion }) => {
  const [selcci, setSelcci] = useState("");
  useEffect(() => {
    if (QueSelecion === 1) { setSelcci(data.Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen) }
    if (QueSelecion === 2) { setSelcci(data.Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen) }
    if (QueSelecion === 3) { setSelcci(data.Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen) }
  }, [QueSelecion])

  return (<>{
   selcci.length >1&&  (
      <img src={selcci} width="150" alt='opcion1' />
    )
  }</>)
}
const VerCantidad = ({ data,  window }) => {
  const [verbo, setVerbo] = useState("")
  useEffect(() => {
    if (data.Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      setVerbo(data.Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio)
    } else if (data.Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      setVerbo(data.Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio)
    } else if (data.Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      setVerbo(data.Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio)
    }
  }, [data])

  return (<h3 style={{ fontWeight: 700, color: "#85858C" }}>{verbo}</h3>)
}
const isAdverbio = ( window, data) => {
  if (data.Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio || data.Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio|| data.Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio) {
    return true;
  } else {
    return false;
  }
}
const Preguntasecction = ({  window, data }) => {

  const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    setVideoseleccionado(preguntavideo);
  }, [])
  const preguntavideo = () => {
    if (data.Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      return data.Partida[`Juego` + window.id].Oraciones.Oracion1.FileVideoPreguntaQuien
    } else if (data.Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      return data.Partida[`Juego` + window.id].Oraciones.Oracion2.FileVideoPreguntaQuien
    } else if (data.Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      return data.Partida[`Juego` + window.id].Oraciones.Oracion3.FileVideoPreguntaQuien
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
const Respuestasecction = ({  window, data }) => {
  const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    setVideoseleccionado(preguntavideo);
  }, [])

  const preguntavideo = () => {
    if (data.Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      return data.Partida[`Juego` + window.id].Oraciones.Oracion1.FileVideoMuestra
    } else if (data.Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      return data.Partida[`Juego` + window.id].Oraciones.Oracion2.FileVideoMuestra
    } else if (data.Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      return data.Partida[`Juego` + window.id].Oraciones.Oracion3.FileVideoMuestra
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
const RespuestaImagen = ({ momento, Queselec, data, window, setMomento }) => {
  const [imagense, setImagense] = useState("")
  let AdjectivoRespuesta = "";
  useEffect(() => {

    if (data.Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data.Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen;
    } else if (data.Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data.Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen;
    } else if (data.Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data.Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen;
    }

    if (Queselec.length > 2) {
      if (AdjectivoRespuesta === Queselec) {
        setMomento("Respuesta");
        setImagense(buentrajo);
      } else if (AdjectivoRespuesta !== Queselec) {
        setMomento("Respuesta");
        setImagense(malTrabajo);
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
const QuienSeccion = ({  window, siguiente, dispatchProgreso, data }) => {
  const [momento, setMomento] = useState("inicial");
  const [Queselec, setQueselec] = useState("");
  const [QueSelecion, setQueSelecion] = useState(0);
  const [pointerEvent, setPointer] = useState("auto");
  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(1);
  const [opacity3, setOpacity3] = useState(1);
  useEffect(() => {
    if(QueSelecion ===0){
    setTimeout(() => { dispatchProgreso({ type: "PROGRESO",PalabraCorrecta:resultadoOracion({objeto1:data.Partida[`Juego` + window.id].Oraciones.Oracion1, objeto2:data.Partida[`Juego` + window.id].Oraciones.Oracion2, objeto3:data.Partida[`Juego` + window.id].Oraciones.Oracion3}) , selecionado: `SE PASO EL TIEMPO-NO HAY RESPUESTA`, Resul: "INCORRECTO" }); siguiente(window.id) }, 90000)
  }
  }, [QueSelecion])
  const onhandleClickQuePrimero = () => {
    setQueSelecion(1);
    setQueselec(data.Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen);
    setPointer("none")
    setOpacity2(0.4);
    setOpacity3(0.4);
    dispatchProgreso({ type: "PROGRESO", PalabraCorrecta:resultadoOracion({objeto1:data.Partida[`Juego` + window.id].Oraciones.Oracion1, objeto2:data.Partida[`Juego` + window.id].Oraciones.Oracion2, objeto3:data.Partida[`Juego` + window.id].Oraciones.Oracion3}) ,selecionado: data.Partida[`Juego` + window.id].Oraciones.Oracion1.Oracion, Resul: data.Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta })
    setTimeout(() => { siguiente(window.id) },  10000)
  }

  const onhandleClickQueSegundo = () => {
    setQueSelecion(2);
    setQueselec(data.Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen);
    setPointer("none")
    setOpacity3(0.4);
    setOpacity1(0.4);
    dispatchProgreso({ type: "PROGRESO",PalabraCorrecta:resultadoOracion({objeto1:data.Partida[`Juego` + window.id].Oraciones.Oracion1, objeto2:data.Partida[`Juego` + window.id].Oraciones.Oracion2, objeto3:data.Partida[`Juego` + window.id].Oraciones.Oracion3}) , selecionado: data.Partida[`Juego` + window.id].Oraciones.Oracion2.Oracion, Resul: data.Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta })
    setTimeout(() => { siguiente(window.id) },  10000)
  }
  const onhandleClickQueTercero = () => {
    setQueSelecion(3);
    setQueselec(data.Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen);
    setPointer("none")
    setOpacity1(0.4);
    setOpacity2(0.4);
    dispatchProgreso({ type: "PROGRESO",PalabraCorrecta:resultadoOracion({objeto1:data.Partida[`Juego` + window.id].Oraciones.Oracion1, objeto2:data.Partida[`Juego` + window.id].Oraciones.Oracion2, objeto3:data.Partida[`Juego` + window.id].Oraciones.Oracion3}) , selecionado: data.Partida[`Juego` + window.id].Oraciones.Oracion3.Oracion, Resul: data.Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta })
    setTimeout(() => { siguiente(window.id) },  10000)
  }






  return (
    <>
      <Col className='' lg="4" sm="12" md="12" >
        {
          momento === "inicial" && <Preguntasecction data={data}  window={window} />
        }
        {
          momento === "Respuesta" && <Respuestasecction data={data}  window={window} />
        }
      </Col>
      <Col lg="8" className='align-self-center'>
        <Row >
          <Col style={{ width: "95px" }}>
            <img alt='que' src={Quien} width="75" />
          </Col>
          <Col style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity1 }} onClick={onhandleClickQuePrimero}>
            <img src={data.Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen} width="150" alt='opcion1' />
          </Col>
          <Col style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity2 }} onClick={onhandleClickQueSegundo}>
            <img src={data.Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen} width="150" alt='opcion2' />
          </Col>
          <Col style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity3 }} onClick={onhandleClickQueTercero}>
            <img src={data.Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen} width="150" alt='opcion3' />
          </Col>
        </Row>
      </Col>
      <Col lg="8" style={{ borderRadius: "10px", border: "#F8F7FD solid", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.13)", backgroundColor: "#F8F7FD" }}>
        <Row lg="8" >
          <div style={{ width: "200px" }} >
            <img alt='que' src={Quien} width="75" style={{ margin: "0px 35px" }}  />
          </div>
          <div style={{ width: "120px" }} >
            <img src={Verbo} alt='opcion1' width="75" />
          </div>
          {isAdverbio(window, data)
            &&
            (
              <div style={{ width: "100px" }} >
                <img src={Cantidad} alt='opcion1' width="75" />
              </div>)
          }
          <div style={{ width: "200px" }} >
            <img alt='que' src={Que} width="75" style={{ margin: "0px 35px" }}  />
          </div>
        </Row>
        {/* parte de seleccion */}
        <Row lg="8" className='align-items-center'>
          <div style={{ width: "200px" }} >
            <SeleccionQUIEN QueSelecion={QueSelecion}  data={data} window={window} />
          </div>
          <div style={{ width: "120px" }} >
            <VerVerboRespuesta  data={data} window={window} />
          </div>
          {
            isAdverbio( window, data)
            && (
              <div style={{ width: "100px" }} >
                <VerCantidad  data={data} window={window} />
              </div>
            )
          }
          <div style={{ width: "200px" }} >
            <VerSeleccionqUE  data={data} window={window} />
          </div>
        </Row>
      </Col>
      <Col lg="3" ><RespuestaImagen momento={momento} Queselec={Queselec} setMomento={setMomento} data={data}  window={window} /></Col>
    </>
  )
}

export default QuienSeccion