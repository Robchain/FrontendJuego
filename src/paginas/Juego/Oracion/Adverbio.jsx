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
const MostrarQue = ({ oraciondata, id, window }) => {
  const [verbo, setVerbo] = useState("")
  useEffect(() => {
    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      setVerbo(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen)
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      setVerbo(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen)
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      setVerbo(oraciondata.Juego1.Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen)
    }
  }, [oraciondata])


  return (<img src={verbo} width="170" alt='opcion que' />)
}
const RespuestaImagen = ({ oraciondata, setImagen, imagen, id, window, Queselec, setMomento, momento }) => {

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
    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio;
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio
    }

  }



  return (<>

    {momento === "Respuesta" && (
      <img src={imagen} width="100" alt='adverbioRespuesta' />
    )}
  </>)
}
const Preguntasecction = ({ id, window }) => {
  const { oraciondata } = useContext(JuecoContext);
  const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    setVideoseleccionado(preguntavideo);
  }, [])
  const preguntavideo = () => {
    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileVideoPreguntaQue
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileVideoPreguntaQue
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileVideoPreguntaQue
    }

  }
  return (
    <div>
      <ReactPlayer
        url={videoseleccionado}
        width={300}
        playing
        loop={true}
      />
    </div>
  )
};
const Respuestasecction = ({ id, window }) => {
  const { oraciondata } = useContext(JuecoContext);
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
        width={300}
        playing
      />
    </div>
  )
};
const isAdverbio = (id, window, oraciondata) => {
  if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio || oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio) {
    return true;
  } else {
    return false;
  }
}
const SeleccionAdverbio = ({ QueSelecion, oraciondata, id, window }) => {
  const [seleccionpal, setSeleccionpal] = useState("");
  useEffect(() => {
    if (QueSelecion === 1) { setSeleccionpal(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio) }
    if (QueSelecion === 2) { setSeleccionpal(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio) }
    if (QueSelecion === 3) { setSeleccionpal(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio) }
  }, [QueSelecion])


  return (
    <><h3>{seleccionpal}</h3></>
  )
}
const VerVerboRespuesta = ({ oraciondata, window, id }) => {
  let verbo = "";
  if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
    verbo = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Verbo
  } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
    verbo = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Verbo
  } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
    verbo = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Verbo
  }
  return (<h3>{verbo}</h3>)
}
const VerSeleccionQuien = ({ oraciondata, window, id }) => {
  const [selecion, setSelecion] = useState("");
  useEffect(() => {
    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      setSelecion(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen)
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      setSelecion(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen)
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      setSelecion(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen)
    }
  }, [oraciondata])
  return (<>{selecion.length > 2 && (<img src={selecion} width="170" alt='opcion1' />)}</>)
}
const Adverbio = ({ id, window, siguiente, dispatchProgreso }) => {
  const [momento, setMomento] = useState("inicial");
  const { oraciondata } = useContext(JuecoContext);
  const [Queselec, setQueselec] = useState("");
  const [imagen, setImagen] = useState("");
  const [QueSelecion, setQueSelecion] = useState(0);
  const [pointerEvent, setPointer] = useState("auto")
  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(1);
  const [opacity3, setOpacity3] = useState(1);
  const onhandleClickQuePrimero = () => {
    setQueSelecion(1);
    setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio);
    setPointer("none")
    setOpacity2(0.4);
    setOpacity3(0.4);
    dispatchProgreso({ type: "PROGRESO", selecionado: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Oracion, Resul: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta })
    setTimeout(() => { siguiente(window.id) }, 9000)
  }


  const onhandleClickQueSegundo = () => {
    setQueSelecion(2);
    setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio);
    setPointer("none")
    setOpacity3(0.4);
    setOpacity1(0.4);
    dispatchProgreso({ type: "PROGRESO", selecionado: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Oracion, Resul: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta })
    setTimeout(() => { siguiente(window.id) }, 9000)
  }
  const onhandleClickQueTercero = () => {
    setQueSelecion(3);
    setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio);
    setPointer("none")
    setOpacity1(0.4);
    setOpacity2(0.4);
    dispatchProgreso({ type: "PROGRESO", selecionado: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Oracion, Resul: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta })
    setTimeout(() => { siguiente(window.id) }, 9000)
  }


  return (
    <>
      <Col className='mt-2' lg="4" sm="12" md="12" >
        {
          momento === "inicial" && <Preguntasecction id={id} window={window} />
        }
        {
          momento === "Respuesta" && <Respuestasecction id={id} window={window} />
        }
      </Col>
      <Col lg="8">

        <Row lg="12" className='align-items-center'>
          <Col className="align-self-center" style={{ width: "95px" }}>
            <img alt='que' src={Cantidad} width="75" />
          </Col>
          <Col className="align-self-center" style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity1 }} onClick={onhandleClickQuePrimero}>
            <h3>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio}</h3>
          </Col>
          <Col className="align-self-center" style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity2 }} onClick={onhandleClickQueSegundo}>
            <h3>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio}</h3>
          </Col>
          <Col className="align-self-center" style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity3 }} onClick={onhandleClickQueTercero}>
            <h3>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio}</h3>
          </Col>
        </Row>
      </Col>
      <Col lg="8">
        <Row lg="8" className='align-items-center'>
          <div style={{ width: "95px" }} className="mx-auto">
            <img alt='que' src={Quien} width="75" />
          </div>
          <div style={{ width: "95px" }} className="mx-auto">
            <img src={Verbo} alt='opcion1' width="75" />
          </div>
          {oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio
            &&
            (
              <div style={{ width: "95px" }} className="mx-auto">
                <img src={Cantidad} alt='opcion1' width="75" />
              </div>)
          }
          <div style={{ width: "95px" }} className="mx-auto">
            <img alt='que' src={Que} width="75" />
          </div>
        </Row>
        <Row lg="8" className='align-items-center'>

          <div style={{ width: "95px" }} className='mx-auto'>
            <VerSeleccionQuien id={id} oraciondata={oraciondata} window={window} />
          </div>
          <div style={{ width: "95px" }} className="mx-auto">
            <VerVerboRespuesta id={id} oraciondata={oraciondata} window={window} />
          </div>
          {
            isAdverbio(id, window, oraciondata)
            && (
              <div style={{ width: "95px" }} className="mx-auto">
                <SeleccionAdverbio QueSelecion={QueSelecion} id={id} oraciondata={oraciondata} window={window} />
              </div>
            )
          }
          <div style={{ width: "95px" }} className="mx-auto">
            <MostrarQue id={id} oraciondata={oraciondata} window={window} />
          </div>
        </Row>
      </Col>
      <Col lg="3" ><RespuestaImagen imagen={imagen} setImagen={setImagen} oraciondata={oraciondata} Queselec={Queselec} id={id} window={window} setMomento={setMomento} momento={momento} /></Col>
    </>
  )
}

export default Adverbio