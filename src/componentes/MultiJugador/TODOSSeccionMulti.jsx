import React, { useReducer,useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import buentrajo from '../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../assets/img/AssetsGame/Bad Jood.png'
import Quien from '../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../assets/img/AssetsGame/ico_verbo.png";
import Cantidad from '../../assets/img/AssetsGame/ico_cantidad.png'
import ReactPlayer from 'react-player';
const Preguntasecction = ({ id, window, data }) => {
    const [videoPreguntaSecctionTodo, setVideoPreguntaSecctionTodo] = useState("")
    useEffect(() => {
      setVideoPreguntaSecctionTodo(preguntavideo)
    }, [])
  
    const preguntavideo = () => {
      var Pregu = Math.floor(Math.random() * (2 - 1 + 1) + 1)
      if (Pregu === 1) {
        if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
          return data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileVideoPreguntaQue
        } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
          return data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileVideoPreguntaQue
        } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
          return data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileVideoPreguntaQue
        }
      } else if (Pregu === 2) {
        if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
          return data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileVideoPreguntaQuien
        } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
          return data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileVideoPreguntaQuien
        } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
          return data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileVideoPreguntaQuien
        }
      }
    }
    return (
      <div>
        <ReactPlayer
          url={videoPreguntaSecctionTodo}
          height={225}
        width={300}
          playing
          loop={true}
        />
      </div>
    )
  };
  
  
  const Respuestasecction = ({ id, window, data }) => {
    const [videoRespuestaSeleccionadoTodo, setvideoRespuestaSeleccionadoTodo] = useState("")
    useEffect(() => {
      setvideoRespuestaSeleccionadoTodo(preguntavideo);
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
          url={videoRespuestaSeleccionadoTodo}
          height={225}
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
  const SeleccionQue = ({ data, QueSelecion, id, window }) => {
    if (QueSelecion === 1) { return (<img src={data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileAdjetivoImagen} width="150" alt='opcion1' />) }
    if (QueSelecion === 2) { return (<img src={data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileAdjetivoImagen} width="150" alt='opcion2' />) }
    if (QueSelecion === 3) { return (<img src={data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileAdjetivoImagen} width="150" alt='opcion3' />) }
    if (QueSelecion === 0) { return (<></>) }
    return (<></>)
  }
  
  const SeleccionCantidad = ({ AdverbNSeleccion, id, window, data }) => {
    if (AdverbNSeleccion === 1) { return (<h3 style={{ fontWeight: 700, color: "#85858C" }}>{data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Adverbio}</h3>) }
    if (AdverbNSeleccion === 2) { return (<h3 style={{ fontWeight: 700, color: "#85858C" }}>{data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Adverbio}</h3>) }
    if (AdverbNSeleccion === 3) { return (<h3 style={{ fontWeight: 700, color: "#85858C" }}>{data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Adverbio}</h3>) }
    if (AdverbNSeleccion === 0) { return (<></>) }
    return (<></>)
  }
  const SeleccionQuien = ({ QuienSeleccion, id, window, data }) => {
    if (QuienSeleccion === 1) { return (<img src={data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileSujetoImagen} width="150" alt='opcion1' />) }
    if (QuienSeleccion === 2) { return (<img src={data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileSujetoImagen} width="150" alt='opcion2' />) }
    if (QuienSeleccion === 3) { return (<img src={data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileSujetoImagen} width="150" alt='opcion3' />) }
    if (QuienSeleccion === 0) { return (<></>) }
    return (<></>)
  }
  
  const RespuestaImagen = ({ id, window, Progreso, palabrasEstdo, siguiente, setopcionRes, opcionRes, setMomento, data }) => {
    let sujetoRespuesta = "";
    let AdjectivoRespuesta = "";
    let oracion = "";
  
    let base = "Nada";
    if (palabrasEstdo.QuienSelec.length > 2 && palabrasEstdo.Queselec.length > 2) {
      if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
        oracion = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Oracion;
        sujetoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileSujetoImagen;
        AdjectivoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileAdjetivoImagen;
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
        sujetoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileSujetoImagen;
        oracion = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Oracion;
        AdjectivoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileAdjetivoImagen;
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
        sujetoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileSujetoImagen;
        oracion = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Oracion;
        AdjectivoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileAdjetivoImagen;
      }
  
      useEffect(() => {
        if ((sujetoRespuesta === palabrasEstdo.QuienSelec) && (AdjectivoRespuesta === palabrasEstdo.Queselec)) {
          base = "CORRECTO"
          setTimeout(() => {  Progreso({type:"PROGRESO", PalabraCorrecta:`${sujetoRespuesta}-${AdjectivoRespuesta}`,PalabraSeleccionada:`${palabrasEstdo.QuienSelec}-${palabrasEstdo.Queselec}`, Resultado:base});  siguiente(window.id); }, 9000)
        } else if (sujetoRespuesta !== palabrasEstdo.QuienSelec || AdjectivoRespuesta !== palabrasEstdo.Queselec) {
          base = "INCORRECTO"
          setTimeout(() => { Progreso({type:"PROGRESO", PalabraCorrecta:`${sujetoRespuesta}-${AdjectivoRespuesta}`,PalabraSeleccionada:`${palabrasEstdo.QuienSelec}-${palabrasEstdo.Queselec}`, Resultado:base});  siguiente(window.id) }, 9000)
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
  const VerboRespuesta = ({ id, window, data }) => {
    let verbo = "";
    if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
      verbo = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Verbo
    } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
      verbo = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Verbo
    } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
      verbo = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Verbo
    }
    return (<h3 className='my-2' style={{ fontWeight: 700, color: "#85858C" }}>{verbo}</h3>)
  }
  
  const isAdverbio = (id, window, data) => {
    if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Adverbio && data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Adverbio) {
      return true;
    } else {
      return false;
    }
  }
  
  const RespuestaImagenconAdverbio = ({ id, window, Progreso, palabrasEstdo, siguiente, setopcionRes, opcionRes, setMomento, data }) => {
    let sujetoRespuesta = "";
    let AdjectivoRespuesta = "";
    let AdverbioRespuesta = "";
    let base = "Nada";
    let oraciones = "";
    if (palabrasEstdo.QuienSelec.length > 2 && palabrasEstdo.Queselec.length > 2 && palabrasEstdo.AdverSelec.length > 1) {
      if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
        sujetoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileSujetoImagen;
        AdjectivoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileAdjetivoImagen;
        AdverbioRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Adverbio
        oraciones = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Oracion;
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
        sujetoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileSujetoImagen;
        AdjectivoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileAdjetivoImagen;
        AdverbioRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Adverbio
        oraciones = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Oracion;
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
        sujetoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileSujetoImagen;
        AdjectivoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileAdjetivoImagen;
        AdverbioRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Adverbio
        oraciones = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Oracion;
      }
      useEffect(() => {
        if ((sujetoRespuesta === palabrasEstdo.QuienSelec) && (AdjectivoRespuesta === palabrasEstdo.Queselec) && (palabrasEstdo.AdverSelec === AdverbioRespuesta)) {
          base = "CORRECTO"
          setMomento("Respuesta");
          setTimeout(() => { Progreso({type:"PROGRESO", PalabraCorrecta:`${sujetoRespuesta}-${AdjectivoRespuesta}-${AdverbioRespuesta}`,PalabraSeleccionada:`${palabrasEstdo.QuienSelec}-${palabrasEstdo.Queselec}-${palabrasEstdo.AdverSelec}`, Resultado:base}); siguiente(window.id) }, 9000)
        } else if (sujetoRespuesta !== palabrasEstdo.QuienSelec || AdjectivoRespuesta !== palabrasEstdo.Queselec || AdverbioRespuesta !== palabrasEstdo.AdverSelec) {
          base = "INCORRECTO"
          setMomento("Respuesta");
          setTimeout(() => { Progreso({type:"PROGRESO", PalabraCorrecta:`${sujetoRespuesta}-${AdjectivoRespuesta}-${AdverbioRespuesta}`,PalabraSeleccionada:`${palabrasEstdo.QuienSelec}-${palabrasEstdo.Queselec}-${palabrasEstdo.AdverSelec}`, Resultado:base}); siguiente(window.id) }, 9000)
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
export const TODOSSeccionMulti = ({id, window, siguiente, data, Progreso}) => {
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
    disparadorPalabras({ type: "seleccion", field: "QuienSelec", value: data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileSujetoImagen })
  }

  const onhandleClickSegundo = () => {

    DisparadordeImagenes({ type: "seleccionImagen", field: "QuienSeleccion", value: 2 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien1", value: 0.4 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "QuienSelec", value: data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileSujetoImagen })
  }
  const onhandleClickTercero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "QuienSeleccion", value: 3 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien1", value: 0.4 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien2", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "QuienSelec", value: data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileSujetoImagen })
  }
  //-------------------
  const onhandleClickQuePrimero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "QueSelecion", value: 1 })
    disparadorQue({ type: "opacarQue", field: "opacityQue2", value: 0.4 })
    disparadorQue({ type: "opacarQue", field: "opacityQue3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer2", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "Queselec", value: data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileAdjetivoImagen })
  }
  const onhandleClickQueSegundo = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "QueSelecion", value: 2 })
    disparadorQue({ type: "opacarQue", field: "opacityQue1", value: 0.4 })
    disparadorQue({ type: "opacarQue", field: "opacityQue3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer2", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "Queselec", value: data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileAdjetivoImagen })

  }
  const onhandleClickQueTercero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "QueSelecion", value: 3 })
    disparadorQue({ type: "opacarQue", field: "opacityQue2", value: 0.4 })
    disparadorQue({ type: "opacarQue", field: "opacityQue1", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer2", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "Queselec", value: data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileAdjetivoImagen })
  }
  //---------------
  const onhandleClickAdvePrimero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "AdverbNSeleccion", value: 1 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity2", value: 0.4 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer3", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "AdverSelec", value: data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Adverbio })
  }
  const onhandleClickAdveSegundo = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "AdverbNSeleccion", value: 2 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity1", value: 0.4 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer3", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "AdverSelec", value: data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Adverbio })
  }

  const onhandleClickAdveTercero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "AdverbNSeleccion", value: 3 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity1", value: 0.4 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity2", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer3", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "AdverSelec", value: data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Adverbio })
  }


  return (
    <>
      <Col className='mt-2' lg="4" sm="12" md="12" >
        {
          momento === "inicial" && <Preguntasecction id={id} window={window} data={data} />
        }
        {
          momento === "Respuesta" && <Respuestasecction id={id} window={window}  data={data}/>
        }
      </Col>
      <Col lg="8">
        <Row lg="12" className='align-items-center'>
          <Col style={{ width: "95px", height: "120px" }}>
            <img alt='sujeto' src={Quien} width="75" />
          </Col>
          <Col style={{ width: "175px", pointerEvents: estate.pointer, opacity: opacarQuien.opacityquien1 }} onClick={() => { onhandleClickPrimero() }}>
            <img src={data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileSujetoImagen} width="150" alt='opcion1' />
          </Col>
          <Col style={{ width: "175px", pointerEvents: estate.pointer, opacity: opacarQuien.opacityquien2 }} onClick={() => { onhandleClickSegundo() }}>
            <img src={data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileSujetoImagen} width="150" alt='opcion2' />
          </Col>
          <Col style={{ width: "175px", pointerEvents: estate.pointer, opacity: opacarQuien.opacityquien3 }} onClick={() => { onhandleClickTercero() }}>
            <img src={data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileSujetoImagen} width="150" alt='opcion3' />
          </Col>
        </Row>
        {
          isAdverbio(id, window, data)
          && (
            <Row lg="12" className='align-items-center'>
              <Col style={{ width: "150px", height: "120px" }}>
                <img alt='sujeto' src={Cantidad} width="100" />
              </Col>
              <Col style={{ width: "150px", height: "100px", pointerEvents: estate.pointer3, opacity: opacarAdverbio.opacity1 }} onClick={onhandleClickAdvePrimero}>
                <h3 style={{ fontWeight: 700, color: "#85858C" }}>{data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Adverbio}</h3>
              </Col>
              <Col style={{ width: "150px", height: "100px", pointerEvents: estate.pointer3, opacity: opacarAdverbio.opacity2 }} onClick={onhandleClickAdveSegundo} >
                <h3 style={{ fontWeight: 700, color: "#85858C" }}>{data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Adverbio}</h3>
              </Col>
              <Col style={{ width: "150px", height: "100px", pointerEvents: estate.pointer3, opacity: opacarAdverbio.opacity3 }} onClick={onhandleClickAdveTercero} >
                <h3 style={{ fontWeight: 700, color: "#85858C" }}>{data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Adverbio}</h3>
              </Col>
            </Row>)
        }
        <Row lg="12" className='align-items-center'>
          <Col style={{ width: "95px" }}>
            <img alt='que' src={Que} width="75" />
          </Col>
          <Col style={{ width: "175px", pointerEvents: estate.pointer2, opacity: opacarQue.opacityQue1 }} onClick={() => { onhandleClickQuePrimero() }}>
            <img src={data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileAdjetivoImagen} width="150" alt='opcion1' />
          </Col>
          <Col style={{ width: "175px", pointerEvents: estate.pointer2, opacity: opacarQue.opacityQue2 }} onClick={() => { onhandleClickQueSegundo() }}>
            <img src={data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileAdjetivoImagen} width="150" alt='opcion2' />
          </Col>
          <Col style={{ width: "175px", pointerEvents: estate.pointer2, opacity: opacarQue.opacityQue3 }} onClick={() => { onhandleClickQueTercero() }}>
            <img src={data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileAdjetivoImagen} width="150" alt='opcion3' />
          </Col>
        </Row>
      </Col>
      <Col lg="8" style={{borderRadius:"10px", border:"#F8F7FD solid", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.13)", backgroundColor:"#F8F7FD"}}>
        <Row lg="8">
          <Col style={{ width: "200px" }} >
            <img alt='que' src={Quien} width="75" style={{ margin: "0px 35px" }}/>
          </Col>
          <Col style={{ width: "120px" }} >
            <img src={Verbo} alt='opcion1' width="75" />
          </Col>
          {isAdverbio(id, window, data)
            &&
            (
              <Col style={{ width: "100px" }} >
                <img src={Cantidad} alt='opcion1' width="75" />
              </Col>)
          }
          <Col style={{ width: "200px" }} >
            <img alt='que' src={Que} width="75" style={{ margin: "0px 35px" }} />
          </Col>
        </Row>
        <Row lg="8" >
          <Col style={{ width: "200px" }} >
            <SeleccionQuien QuienSeleccion={QuienSeleccion} id={id} data={data} window={window} />
          </Col>
          <Col style={{ width: "120px" }} >
            <VerboRespuesta id={id} window={window} data={data}/>
          </Col>
          {
            isAdverbio(id, window, data)
            && (
              <Col style={{ width: "100px" }} >
                <SeleccionCantidad id={id} window={window} AdverbNSeleccion={AdverbNSeleccion}  data={data}/>
              </Col>
            )
          }
          <Col style={{ width: "200px" }} >
            <SeleccionQue QueSelecion={QueSelecion} id={id} window={window} data={data} />
          </Col>
        </Row>
      </Col>
      <Col lg="3" >
        {isAdverbio(id, window, data) ? <RespuestaImagenconAdverbio data={data}  id={id} window={window} palabrasEstdo={palabrasEstdo} opcionRes={opcionRes} setMomento={setMomento} setopcionRes={setopcionRes} siguiente={siguiente} Progreso={Progreso} />
          : <RespuestaImagen  data={data}  id={id} window={window} palabrasEstdo={palabrasEstdo} opcionRes={opcionRes} setMomento={setMomento} setopcionRes={setopcionRes} siguiente={siguiente}  Progreso={Progreso}/>
        }
      </Col>
    </>
  )
}
