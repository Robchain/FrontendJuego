import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { JuecoContext } from '../../../context/Juego/JuecoContext';
import buentrajo from '../../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../../assets/img/AssetsGame/Bad Jood.png'
import Quien from '../../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../../assets/img/AssetsGame/ico_verbo.png";
import Cantidad from '../../../assets/img/AssetsGame/ico_cantidad.png'
import ReactPlayer from 'react-player';
const VerVerboRespuesta = ({ oraciondata, id, window }) => {
  const [selccionver, setSelccionver] = useState("")
  useEffect(() => {
    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      setSelccionver(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Verbo)
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      setSelccionver(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Verbo)
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      setSelccionver(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Verbo)
    }
  }, [oraciondata])

  return (<h3 style={{ fontWeight: 700, color: "#85858C" }}>{selccionver}</h3>)
}
const VerSeleccionqUE = ({ oraciondata, id, window }) => {
  const [seleccionverbo, setSeleccionverbo] = useState("");
  useEffect(() => {
    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      setSeleccionverbo(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen)
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      setSeleccionverbo(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen)
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      setSeleccionverbo(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen)
    }
  }, [oraciondata])

  return (<img src={seleccionverbo} width="150" alt='opcion1' />)

}
const SeleccionQUIEN = ({ oraciondata, id, window, QueSelecion }) => {
  const [selcci, setSelcci] = useState("");
  useEffect(() => {
    if (QueSelecion === 1) { setSelcci(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen) }
    if (QueSelecion === 2) { setSelcci(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen) }
    if (QueSelecion === 3) { setSelcci(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen) }
  }, [QueSelecion])

  return (<>{
    QueSelecion.length > 2 && (
      <img src={selcci} width="150" alt='opcion1' />
    )
  }</>)
}
const VerCantidad = ({ oraciondata, id, window }) => {
  const [verbo, setVerbo] = useState("")
  useEffect(() => {
    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      setVerbo(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio)
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      setVerbo(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio)
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      setVerbo(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio)
    }
  }, [oraciondata])

  return (<h3 style={{ fontWeight: 700, color: "#85858C" }}>{verbo}</h3>)
}
const isAdverbio = (id, window, oraciondata) => {
  if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio || oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio) {
    return true;
  } else {
    return false;
  }
}
const Preguntasecction = ({ id, window, oraciondata }) => {

  const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    setVideoseleccionado(preguntavideo);
  }, [])
  const preguntavideo = () => {
    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileVideoPreguntaQuien
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileVideoPreguntaQuien
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileVideoPreguntaQuien
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
const Respuestasecction = ({ id, window, oraciondata }) => {
  const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    setVideoseleccionado(preguntavideo);
  }, [])

  const preguntavideo = () => {
    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileVideoMuestra
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileVideoMuestra
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileVideoMuestra
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
const RespuestaImagen = ({ momento, Queselec, oraciondata, id, window, setMomento }) => {
  const [imagense, setImagense] = useState("")
  let AdjectivoRespuesta = "";
  useEffect(() => {

    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen;
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen;
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen;
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
const QuienSeccion = ({ id, window, siguiente, dispatchProgreso }) => {
  const [momento, setMomento] = useState("inicial");
  const { oraciondata } = useContext(JuecoContext);
  const [Queselec, setQueselec] = useState("");
  const [QueSelecion, setQueSelecion] = useState(0);
  const [pointerEvent, setPointer] = useState("auto");
  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(1);
  const [opacity3, setOpacity3] = useState(1);
  const onhandleClickQuePrimero = () => {
    setQueSelecion(1);
    setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen);
    setPointer("none")
    setOpacity2(0.4);
    setOpacity3(0.4);
    dispatchProgreso({ type: "PROGRESO", selecionado: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Oracion, Resul: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta })
    setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000)
  }

  const onhandleClickQueSegundo = () => {
    setQueSelecion(2);
    setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen);
    setPointer("none")
    setOpacity3(0.4);
    setOpacity1(0.4);
    dispatchProgreso({ type: "PROGRESO", selecionado: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Oracion, Resul: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta })
    setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000)
  }
  const onhandleClickQueTercero = () => {
    setQueSelecion(3);
    setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen);
    setPointer("none")
    setOpacity1(0.4);
    setOpacity2(0.4);
    dispatchProgreso({ type: "PROGRESO", selecionado: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Oracion, Resul: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta })
    setTimeout(() => { siguiente(window.id) }, /*playref.current.getDuration()*1900*/ 9000)
  }






  return (
    <>
      <Col className='' lg="4" sm="12" md="12" >
        {
          momento === "inicial" && <Preguntasecction oraciondata={oraciondata} id={id} window={window} />
        }
        {
          momento === "Respuesta" && <Respuestasecction oraciondata={oraciondata} id={id} window={window} />
        }
      </Col>
      <Col lg="8" className='align-self-center'>
        <Row >
          <Col style={{ width: "95px" }}>
            <img alt='que' src={Quien} width="75" />
          </Col>
          <Col style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity1 }} onClick={onhandleClickQuePrimero}>
            <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen} width="150" alt='opcion1' />
          </Col>
          <Col style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity2 }} onClick={onhandleClickQueSegundo}>
            <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen} width="150" alt='opcion2' />
          </Col>
          <Col style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity3 }} onClick={onhandleClickQueTercero}>
            <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen} width="150" alt='opcion3' />
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
          {isAdverbio(id, window, oraciondata)
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
            <SeleccionQUIEN QueSelecion={QueSelecion} id={id} oraciondata={oraciondata} window={window} />
          </div>
          <div style={{ width: "120px" }} >
            <VerVerboRespuesta id={id} oraciondata={oraciondata} window={window} />
          </div>
          {
            isAdverbio(id, window, oraciondata)
            && (
              <div style={{ width: "100px" }} >
                <VerCantidad id={id} oraciondata={oraciondata} window={window} />
              </div>
            )
          }
          <div style={{ width: "200px" }} >
            <VerSeleccionqUE id={id} oraciondata={oraciondata} window={window} />
          </div>
        </Row>
      </Col>
      <Col lg="3" ><RespuestaImagen momento={momento} Queselec={Queselec} setMomento={setMomento} oraciondata={oraciondata} id={id} window={window} /></Col>
    </>
  )
}

export default QuienSeccion