import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Col, Row } from 'reactstrap';
import { JuecoContext } from '../../../context/Juego/JuecoContext';
import buentrajo from '../../../assets/img/AssetsGame/GOOD JOD.png';
import malTrabajo from '../../../assets/img/AssetsGame/Bad Jood.png';
import Quien from '../../../assets/img/AssetsGame/ico_Que.png';
import Que from '../../../assets/img/AssetsGame/icon_Que.png';
import Verbo from "../../../assets/img/AssetsGame/ico_verbo.png";
import Cantidad from '../../../assets/img/AssetsGame/ico_cantidad.png'
import ReactPlayer from 'react-player';
const Preguntasecction = ({ id, window }) => {
  const { oraciondata } = useContext(JuecoContext);
  const [videoPreguntaSecctionTodo, setVideoPreguntaSecctionTodo] = useState("")
  useEffect(() => {
    setVideoPreguntaSecctionTodo(preguntavideo)
  }, [])

  const preguntavideo = () => {
    var Pregu = Math.floor(Math.random() * (2 - 1 + 1) + 1)
    if (Pregu === 1) {
      if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
        return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileVideoPreguntaQue
      } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
        return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileVideoPreguntaQue
      } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
        return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileVideoPreguntaQue
      }
    } else if (Pregu === 2) {
      if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
        return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileVideoPreguntaQuien
      } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
        return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileVideoPreguntaQuien
      } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
        return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileVideoPreguntaQuien
      }
    }
  }
  return (
    <div>
      <ReactPlayer
        url={videoPreguntaSecctionTodo}
        width={300}
        playing
        loop={true}
      />
    </div>
  )
};


const Respuestasecction = ({ id, window }) => {


  const { oraciondata } = useContext(JuecoContext);
  const [videoRespuestaSeleccionadoTodo, setvideoRespuestaSeleccionadoTodo] = useState("")
  useEffect(() => {
    setvideoRespuestaSeleccionadoTodo(preguntavideo);
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
        url={videoRespuestaSeleccionadoTodo}
        width={300}
        playing
      />
    </div>
  )
};


const estadoInicialApuntadores = { pointer: "auto", pointer2: "auto", pointer3: "auto" };
function apuntadores(state, action) {
  switch (action.type) {
    case 'puntador':
      return { ...state, [action.field]: action.value };
    default:
      throw new Error();
  }
}

const estadoInicialOpacidadQuien = { opacityquien1: 1, opacityquien2: 1, opacityquien3: 1 }

function opacarsOpacidadQuien(state, action) {
  switch (action.type) {
    case 'opacarQuien':
      return { ...state, [action.field]: action.value };
    default:
      throw new Error();
  }
}
const selecciondeImagenes = { QueSelecion: 0, AdverbNSeleccion: 0, QuienSeleccion: 0 }

function seleccionDeImagenesf(state, action) {
  switch (action.type) {
    case 'seleccionImagen':
      return { ...state, [action.field]: action.value };
    default:
      throw new Error();
  }
}

const estadoInicialOpacidadQue = { opacityQue1: 1, opacityQue2: 1, opacityQue3: 1 }

function opacarsOpacidadQue(state, action) {
  switch (action.type) {
    case 'opacarQue':
      return { ...state, [action.field]: action.value };
    default:
      throw new Error();
  }
}
const estadoInicialOpacidadAdverbio = { opacity1: 1, opacity2: 1, opacity3: 1 }

function opacarsOpacidadAdverbio(state, action) {
  switch (action.type) {
    case 'opacarAdverbio':
      return { ...state, [action.field]: action.value };
    default:
      throw new Error();
  }
}
const estadoInicialSelecionPalabras = { QuienSelec: "", AdverSelec: "", Queselec: "" }

function seleccionDePalabrasSelecion(state, action) {
  switch (action.type) {
    case 'seleccion':
      return { ...state, [action.field]: action.value };
    default:
      throw new Error();
  }
}
const SeleccionQue = ({ QueSelecion, id, window }) => {
  const { oraciondata } = useContext(JuecoContext);
  if (QueSelecion === 1) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen} width="170" alt='opcion1' />) }
  if (QueSelecion === 2) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen} width="170" alt='opcion2' />) }
  if (QueSelecion === 3) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen} width="170" alt='opcion3' />) }
  if (QueSelecion === 0) { return (<></>) }
  return (<></>)
}

const SeleccionCantidad = ({ AdverbNSeleccion, id, window }) => {
  const { oraciondata } = useContext(JuecoContext);
  if (AdverbNSeleccion === 1) { return (<h3 style={{ color: "blue" }}>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio}</h3>) }
  if (AdverbNSeleccion === 2) { return (<h3 style={{ color: "blue" }}>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio}</h3>) }
  if (AdverbNSeleccion === 3) { return (<h3 style={{ color: "blue" }}>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio}</h3>) }
  if (AdverbNSeleccion === 0) { return (<></>) }
  return (<></>)
}
const SeleccionQuien = ({ QuienSeleccion, id, window }) => {
  const { oraciondata } = useContext(JuecoContext);
  if (QuienSeleccion === 1) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen} width="170" alt='opcion1' />) }
  if (QuienSeleccion === 2) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen} width="170" alt='opcion2' />) }
  if (QuienSeleccion === 3) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen} width="170" alt='opcion3' />) }
  if (QuienSeleccion === 0) { return (<></>) }
  return (<></>)
}

const RespuestaImagen = ({ id, window, dispatchProgreso, palabrasEstdo, siguiente, setopcionRes, opcionRes, setMomento }) => {
  let sujetoRespuesta = "";
  let AdjectivoRespuesta = "";
  let oracion = "";

  const { oraciondata } = useContext(JuecoContext);
  let base = "Nada";
  if (palabrasEstdo.QuienSelec.length > 2 && palabrasEstdo.Queselec.length > 2) {
    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      oracion = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Oracion;
      sujetoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen;
      AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen;
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      sujetoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen;
      oracion = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Oracion;
      AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen;
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      sujetoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen;
      oracion = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Oracion;
      AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen;
    }

    useEffect(() => {
      if ((sujetoRespuesta === palabrasEstdo.QuienSelec) && (AdjectivoRespuesta === palabrasEstdo.Queselec)) {
        base = "CORRECTO"
        setTimeout(() => { dispatchProgreso({ type: "PROGRESO", selecionado: "", Resul: base }); siguiente(window.id); }, 9000)
      } else if (sujetoRespuesta !== palabrasEstdo.QuienSelec || AdjectivoRespuesta !== palabrasEstdo.Queselec) {
        base = "INCORRECTO"
        setTimeout(() => { dispatchProgreso({ type: "PROGRESO", selecionado: "", Resul: base });; siguiente(window.id) }, 9000)
      }
      setopcionRes(base);
    }, [palabrasEstdo.Queselec, palabrasEstdo.QuienSelec])
    if (opcionRes === "CORRECTO") {
      setMomento("Respuesta");
      return (<><img src={buentrajo} width="100" alt="buen trabajo" /></>);
    }
    if (opcionRes === "INCORRECTO") {
      setMomento("Respuesta");
      return (<><img src={malTrabajo} width="100" alt='mal trabajo' /></>);
    }
  }
}
const VerboRespuesta = ({ id, window }) => {
  let verbo = "";
  const { oraciondata } = useContext(JuecoContext);
  if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
    verbo = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Verbo
  } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
    verbo = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Verbo
  } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
    verbo = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Verbo
  }
  return (<h3>{verbo}</h3>)
}

const isAdverbio = (id, window, oraciondata) => {
  if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio && oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio) {
    return true;
  } else {
    return false;
  }
}

const RespuestaImagenconAdverbio = ({ id, window, dispatchProgreso, palabrasEstdo, siguiente, setopcionRes, opcionRes, setMomento }) => {
  const { oraciondata } = useContext(JuecoContext);
  let sujetoRespuesta = "";
  let AdjectivoRespuesta = "";
  let AdverbioRespuesta = "";
  let base = "Nada";
  let oraciones = "";
  if (palabrasEstdo.QuienSelec.length > 2 && palabrasEstdo.Queselec.length > 2 && palabrasEstdo.AdverSelec.length > 1) {
    if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      sujetoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen;
      AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen;
      AdverbioRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio
      oraciones = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Oracion;
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      sujetoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen;
      AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen;
      AdverbioRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio
      oraciones = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Oracion;
    } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      sujetoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen;
      AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen;
      AdverbioRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio
      oraciones = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Oracion;
    }
    useEffect(() => {
      if ((sujetoRespuesta === palabrasEstdo.QuienSelec) && (AdjectivoRespuesta === palabrasEstdo.Queselec) && (palabrasEstdo.AdverSelec === AdverbioRespuesta)) {
        base = "CORRECTO"
        setMomento("Respuesta");
        setTimeout(() => { dispatchProgreso({ type: "PROGRESO", selecionado: "", Resul: base }); siguiente(window.id) }, 9000)
      } else if (sujetoRespuesta !== palabrasEstdo.QuienSelec || AdjectivoRespuesta !== palabrasEstdo.Queselec || AdverbioRespuesta !== palabrasEstdo.AdverSelec) {
        base = "INCORRECTO"
        setMomento("Respuesta");
        setTimeout(() => { dispatchProgreso({ type: "PROGRESO", selecionado: "", Resul: base }); siguiente(window.id) }, 9000)
      }
      setopcionRes(base);
    }, [palabrasEstdo.QuienSelec, palabrasEstdo.Queselec, palabrasEstdo.AdverSelec])



    switch (opcionRes) {
      case "CORRECTO":
        return (<><img src={buentrajo} width="100" alt="buen trabajo" /></>);
      case "INCORRECTO":
        return (<><img src={malTrabajo} width="100" alt='mal trabajo' /></>);
      case "Nada":
        return (<></>)
      default:
        return (<></>);
    }
  }
}
const TODOSSeccion = ({ id, window, siguiente, dispatchProgreso }) => {
  const { oraciondata } = useContext(JuecoContext);
  const [estate, dispatch] = useReducer(apuntadores, estadoInicialApuntadores)
  const [opacarQuien, disparadorQuien] = useReducer(opacarsOpacidadQuien, estadoInicialOpacidadQuien)
  const [opacarQue, disparadorQue] = useReducer(opacarsOpacidadQue, estadoInicialOpacidadQue)
  const [opacarAdverbio, disparadorAdverbio] = useReducer(opacarsOpacidadAdverbio, estadoInicialOpacidadAdverbio)
  const [palabrasEstdo, disparadorPalabras] = useReducer(seleccionDePalabrasSelecion, estadoInicialSelecionPalabras)
  const [opcionRes, setopcionRes] = useState("Nada");
  const [{ QueSelecion, QuienSeleccion, AdverbNSeleccion }, DisparadordeImagenes] = useReducer(seleccionDeImagenesf, selecciondeImagenes)
  const [momento, setMomento] = useState("inicial");


  const onhandleClickPrimero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "QuienSeleccion", value: 1 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien2", value: 0.4 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "QuienSelec", value: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen })
  }

  const onhandleClickSegundo = () => {

    DisparadordeImagenes({ type: "seleccionImagen", field: "QuienSeleccion", value: 2 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien1", value: 0.4 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "QuienSelec", value: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen })
  }
  const onhandleClickTercero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "QuienSeleccion", value: 3 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien1", value: 0.4 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien2", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "QuienSelec", value: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen })
  }
  //-------------------
  const onhandleClickQuePrimero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "QueSelecion", value: 1 })
    disparadorQue({ type: "opacarQue", field: "opacityQue2", value: 0.4 })
    disparadorQue({ type: "opacarQue", field: "opacityQue3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer2", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "Queselec", value: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen })
  }
  const onhandleClickQueSegundo = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "QueSelecion", value: 2 })
    disparadorQue({ type: "opacarQue", field: "opacityQue1", value: 0.4 })
    disparadorQue({ type: "opacarQue", field: "opacityQue3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer2", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "Queselec", value: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen })

  }
  const onhandleClickQueTercero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "QueSelecion", value: 3 })
    disparadorQue({ type: "opacarQue", field: "opacityQue2", value: 0.4 })
    disparadorQue({ type: "opacarQue", field: "opacityQue1", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer2", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "Queselec", value: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen })
  }
  //---------------
  const onhandleClickAdvePrimero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "AdverbNSeleccion", value: 1 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity2", value: 0.4 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer3", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "AdverSelec", value: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio })
  }
  const onhandleClickAdveSegundo = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "AdverbNSeleccion", value: 2 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity1", value: 0.4 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer3", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "AdverSelec", value: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio })
  }

  const onhandleClickAdveTercero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "AdverbNSeleccion", value: 3 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity1", value: 0.4 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity2", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer3", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "AdverSelec", value: oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio })
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
          <Col style={{ width: "95px", height: "120px" }}>
            <img alt='sujeto' src={Quien} width="75" />
          </Col>
          <Col style={{ width: "175px", pointerEvents: estate.pointer, opacity: opacarQuien.opacityquien1 }} onClick={() => { onhandleClickPrimero() }}>
            <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen} width="170" alt='opcion1' />
          </Col>
          <Col style={{ width: "175px", pointerEvents: estate.pointer, opacity: opacarQuien.opacityquien2 }} onClick={() => { onhandleClickSegundo() }}>
            <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen} width="170" alt='opcion2' />
          </Col>
          <Col style={{ width: "175px", pointerEvents: estate.pointer, opacity: opacarQuien.opacityquien3 }} onClick={() => { onhandleClickTercero() }}>
            <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen} width="170" alt='opcion3' />
          </Col>
        </Row>
        {
          isAdverbio(id, window, oraciondata)
          && (
            <Row lg="12" className='align-items-center'>
              <Col style={{ width: "150px", height: "120px" }}>
                <img alt='sujeto' src={Cantidad} width="100" />
              </Col>
              <Col style={{ width: "150px", height: "100px", pointerEvents: estate.pointer3, opacity: opacarAdverbio.opacity1 }} onClick={onhandleClickAdvePrimero}>
                <span style={{ color: "blue" }}>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio}</span>
              </Col>
              <Col style={{ width: "150px", height: "100px", pointerEvents: estate.pointer3, opacity: opacarAdverbio.opacity2 }} onClick={onhandleClickAdveSegundo} >
                <span style={{ color: "blue" }}>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio}</span>
              </Col>
              <Col style={{ width: "150px", height: "100px", pointerEvents: estate.pointer3, opacity: opacarAdverbio.opacity3 }} onClick={onhandleClickAdveTercero} >
                <span style={{ color: "blue" }}>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio}</span>
              </Col>
            </Row>)
        }
        <Row lg="12" className='align-items-center'>
          <Col style={{ width: "95px" }}>
            <img alt='que' src={Que} width="75" />
          </Col>
          <Col style={{ width: "175px", pointerEvents: estate.pointer2, opacity: opacarQue.opacityQue1 }} onClick={() => { onhandleClickQuePrimero() }}>
            <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen} width="170" alt='opcion1' />
          </Col>
          <Col style={{ width: "175px", pointerEvents: estate.pointer2, opacity: opacarQue.opacityQue2 }} onClick={() => { onhandleClickQueSegundo() }}>
            <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen} width="170" alt='opcion2' />
          </Col>
          <Col style={{ width: "175px", pointerEvents: estate.pointer2, opacity: opacarQue.opacityQue3 }} onClick={() => { onhandleClickQueTercero() }}>
            <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen} width="170" alt='opcion3' />
          </Col>
        </Row>
      </Col>
      <Col lg="8">
        <Row lg="8" className='align-items-center'>
          <Col style={{ width: "95px" }} className="mx-auto">
            <img alt='que' src={Quien} width="75" />
          </Col>
          <Col style={{ width: "95px" }} className="mx-auto">
            <img src={Verbo} alt='opcion1' width="75" />
          </Col>
          {isAdverbio(id, window, oraciondata)
            &&
            (
              <Col style={{ width: "95px" }} className="mx-auto">
                <img src={Cantidad} alt='opcion1' width="75" />
              </Col>)
          }
          <Col style={{ width: "95px" }} className="mx-auto">
            <img alt='que' src={Que} width="75" />
          </Col>
        </Row>
        <Row lg="8" className='align-items-center'>
          <Col style={{ width: "95px" }} className='mx-auto'>
            <SeleccionQuien QuienSeleccion={QuienSeleccion} id={id} window={window} />
          </Col>
          <Col style={{ width: "95px" }} className="mx-auto">
            <VerboRespuesta id={id} window={window} />
          </Col>
          {
            isAdverbio(id, window, oraciondata)
            && (
              <Col style={{ width: "95px" }} className="mx-auto">
                <SeleccionCantidad id={id} window={window} AdverbNSeleccion={AdverbNSeleccion} />
              </Col>
            )
          }
          <Col style={{ width: "95px" }} className="mx-auto">
            <SeleccionQue QueSelecion={QueSelecion} id={id} window={window} />
          </Col>
        </Row>
      </Col>
      <Col lg="3" >
        {isAdverbio(id, window, oraciondata) ? <RespuestaImagenconAdverbio dispatchProgreso={dispatchProgreso} id={id} window={window} palabrasEstdo={palabrasEstdo} opcionRes={opcionRes} setMomento={setMomento} setopcionRes={setopcionRes} siguiente={siguiente} />
          : <RespuestaImagen dispatchProgreso={dispatchProgreso} id={id} window={window} palabrasEstdo={palabrasEstdo} opcionRes={opcionRes} setMomento={setMomento} setopcionRes={setopcionRes} siguiente={siguiente} />
        }
      </Col>
    </>
  )
}

export default TODOSSeccion