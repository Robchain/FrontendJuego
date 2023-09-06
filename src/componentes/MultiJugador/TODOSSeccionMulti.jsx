import React, { useReducer,useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import buentrajo from '../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../assets/img/AssetsGame/Bad Jood.png'
import Quien from '../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../assets/img/AssetsGame/ico_verbo.png";
import Cantidad from '../../assets/img/AssetsGame/ico_cantidad.png'
import ReactPlayer from 'react-player';
import {  resultadoOracion } from '../../helpers/contador';
const Preguntasecction = ({  data }) => {
    const [videoPreguntaSecctionTodo, setVideoPreguntaSecctionTodo] = useState("")
    useEffect(() => {
      setVideoPreguntaSecctionTodo(preguntavideo)
    }, [])
  
    const preguntavideo = () => {
      var Pregu = Math.floor(Math.random() * (2 - 1 + 1) + 1)
      let pregunta;
      if (Pregu === 1) {
        for(let i=0; i<data.length; i++){
          if(data[i].Respuesta === 'CORRECTO'){
            pregunta = data[i].FileVideoPreguntaQue
            break; // para salir del bucle una vez que se encuentra la respuesta correcta
          }
        }
      } else if (Pregu === 2) {
        for(let i=0; i<data.length; i++){
          if(data[i].Respuesta === 'CORRECTO'){
            pregunta = data[i].FileVideoPreguntaQuien
            break; // para salir del bucle una vez que se encuentra la respuesta correcta
          }
        }
      }
    return pregunta;
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
  
  
  const Respuestasecction = ({data }) => {
    const [videoRespuestaSeleccionadoTodo, setvideoRespuestaSeleccionadoTodo] = useState("")
    useEffect(() => {
      let pregunta = ""; 
      for(let i=0; i<data.length; i++){
        if(data[i].Respuesta === 'CORRECTO'){
          pregunta = data[i].FileVideoMuestra
          break; // para salir del bucle una vez que se encuentra la respuesta correcta
        }
      }
      setvideoRespuestaSeleccionadoTodo(pregunta);
    }, [data])
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
  const SeleccionQue = ({ data, QueSelecion, window, ...props }) => {
    if (QueSelecion === 1) { return (<img src={data[`Juego${window.id}`].Oraciones[0].Que.value} alt='opcion1' {...props} />) }
    if (QueSelecion === 2) { return (<img src={data[`Juego${window.id}`].Oraciones[1].Que.value} alt='opcion2' {...props}/>) }
    if (QueSelecion === 3) { return (<img src={data[`Juego${window.id}`].Oraciones[2].Que.value} alt='opcion3' {...props}/>) }
    if (QueSelecion === 0) { return (<div {...props}></div>) }
    return (<div {...props}></div>)
  }
  
  const SeleccionCantidad = ({ AdverbNSeleccion, window, data,...props }) => {
    if (AdverbNSeleccion === 1) { return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{data[`Juego${window.id}`].Oraciones[0].Adverbio}</span>) }
    if (AdverbNSeleccion === 2) { return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{data[`Juego${window.id}`].Oraciones[1].Adverbio}</span>) }
    if (AdverbNSeleccion === 3) { return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{data[`Juego${window.id}`].Oraciones[2].Adverbio}</span>) }
    if (AdverbNSeleccion === 0) { return (<div {...props}></div>) }
    return (<div {...props}></div>)
  }
  const SeleccionQuien = ({ QuienSeleccion, window, data, ...props }) => {
    if (QuienSeleccion === 1) { return (<img src={data[`Juego${window.id}`].Oraciones[0].Sujeto.value}  alt='opcion1' {...props} />) }
    if (QuienSeleccion === 2) { return (<img src={data[`Juego${window.id}`].Oraciones[1].Sujeto.value}  alt='opcion2' {...props} />) }
    if (QuienSeleccion === 3) { return (<img src={data[`Juego${window.id}`].Oraciones[2].Sujeto.value}  alt='opcion3' { ...props}/>) }
    if (QuienSeleccion === 0) { return (<div {...props}></div>) }
    return (<div {...props}></div>)
  }
  
  const RespuestaImagen = ({ window, Progreso, palabrasEstdo, siguiente, setopcionRes, opcionRes, setMomento, data }) => {
    let sujetoRespuesta = "";
    let AdjectivoRespuesta = "";
    let oracion = "";
  
    let base = "Nada";
    if (palabrasEstdo.QuienSelec.length > 2 && palabrasEstdo.Queselec.length > 2) {
      if (data[`Juego${window.id}`].Oraciones[0].Respuesta === "CORRECTO") {
        oracion = data[`Juego${window.id}`].Oraciones[0].Oracion;
        sujetoRespuesta = data[`Juego${window.id}`].Oraciones[0].Sujeto.label;
        AdjectivoRespuesta = data[`Juego${window.id}`].Oraciones[0].Que.label;
      } else if (data[`Juego${window.id}`].Oraciones[1].Respuesta === "CORRECTO") {
        sujetoRespuesta = data[`Juego${window.id}`].Oraciones[1].Sujeto.label;
        oracion = data[`Juego${window.id}`].Oraciones[1].Oracion;
        AdjectivoRespuesta = data[`Juego${window.id}`].Oraciones[1].Que.label;
      } else if (data[`Juego${window.id}`].Oraciones[2].Respuesta === "CORRECTO") {
        sujetoRespuesta = data[`Juego${window.id}`].Oraciones[2].Sujeto.label;
        oracion = data[`Juego${window.id}`].Oraciones[2].Oracion;
        AdjectivoRespuesta = data[`Juego${window.id}`].Oraciones[2].Que.label;
      }
  
      useEffect(() => {
        if ((sujetoRespuesta === palabrasEstdo.QuienSelec) && (AdjectivoRespuesta === palabrasEstdo.Queselec)) {
          base = "CORRECTO"
          setTimeout(() => {  Progreso({type:"PROGRESO", PalabraCorrecta: resultadoOracion({objeto1:data[`Juego${window.id}`].Oraciones[0],objeto2:data[`Juego${window.id}`].Oraciones[1], objeto3:data[`Juego${window.id}`].Oraciones[2]}),PalabraSeleccionada:`En el Quien, se seleccionó: ${palabrasEstdo.QuienSelec}  - En el Que, se seleccionó ${palabrasEstdo.Queselec}`, Resultado:base});  siguiente(window.id); }, 9000)
        } else if (sujetoRespuesta !== palabrasEstdo.QuienSelec || AdjectivoRespuesta !== palabrasEstdo.Queselec) {
          base = "INCORRECTO"
          setTimeout(() => { Progreso({type:"PROGRESO", PalabraCorrecta:resultadoOracion({objeto1:data[`Juego${window.id}`].Oraciones[0],objeto2:data[`Juego${window.id}`].Oraciones[1], objeto3:data[`Juego${window.id}`].Oraciones[2]}),PalabraSeleccionada:`En el Quien, se seleccionó: ${palabrasEstdo.QuienSelec}  - En el Que, se seleccionó ${palabrasEstdo.Queselec}`, Resultado:base});  siguiente(window.id) }, 9000)
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
  const VerboRespuesta = ({  window, data, ...props }) => {
    let verbo = "";
    if (data[`Juego${window.id}`].Oraciones[0].Respuesta === "CORRECTO") {
      verbo = data[`Juego${window.id}`].Oraciones[0].Verbo
    } else if (data[`Juego${window.id}`].Oraciones[1].Respuesta === "CORRECTO") {
      verbo = data[`Juego${window.id}`].Oraciones[1].Verbo
    } else if (data[`Juego${window.id}`].Oraciones[2].Respuesta === "CORRECTO") {
      verbo = data[`Juego${window.id}`].Oraciones[2].Verbo
    }
    return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props} >{verbo}</span>)
  }
  
  const isAdverbio = ( window, data) => {
    if (data[`Juego${window.id}`].Oraciones[2].Adverbio && data[`Juego${window.id}`].Oraciones[1].Adverbio ||data[`Juego${window.id}`].Oraciones[3].Adverbio) {
      return true;
    } else {
      return false;
    }
  }
  
  const RespuestaImagenconAdverbio = ({  window, Progreso, palabrasEstdo, siguiente, setopcionRes, opcionRes, setMomento, data }) => {
    let sujetoRespuesta = "";
    let AdjectivoRespuesta = "";
    let AdverbioRespuesta = "";
    let base = "Nada";
    let oraciones = "";
    if (palabrasEstdo.QuienSelec.length > 2 && palabrasEstdo.Queselec.length > 2 && palabrasEstdo.AdverSelec.length > 1) {
      if (data[`Juego${window.id}`].Oraciones[0].Respuesta === "CORRECTO") {
        sujetoRespuesta = data[`Juego${window.id}`].Oraciones[0].FileSujetoImagen;
        AdjectivoRespuesta = data[`Juego${window.id}`].Oraciones[0].FileAdjetivoImagen;
        AdverbioRespuesta = data[`Juego${window.id}`].Oraciones[0].Adverbio
        oraciones = data[`Juego${window.id}`].Oraciones[0].Oracion;
      } else if (data[`Juego${window.id}`].Oraciones[1].Respuesta === "CORRECTO") {
        sujetoRespuesta = data[`Juego${window.id}`].Oraciones[1].FileSujetoImagen;
        AdjectivoRespuesta = data[`Juego${window.id}`].Oraciones[1].FileAdjetivoImagen;
        AdverbioRespuesta = data[`Juego${window.id}`].Oraciones[1].Adverbio
        oraciones = data[`Juego${window.id}`].Oraciones[0].Oracion;
      } else if (data[`Juego${window.id}`].Oraciones[2].Respuesta === "CORRECTO") {
        sujetoRespuesta = data[`Juego${window.id}`].Oraciones[2].FileSujetoImagen;
        AdjectivoRespuesta = data[`Juego${window.id}`].Oraciones[2].FileAdjetivoImagen;
        AdverbioRespuesta = data[`Juego${window.id}`].Oraciones[2].Adverbio
        oraciones = data[`Juego${window.id}`].Oraciones[0].Oracion;
      }
      useEffect(() => {
        if ((sujetoRespuesta === palabrasEstdo.QuienSelec) && (AdjectivoRespuesta === palabrasEstdo.Queselec) && (palabrasEstdo.AdverSelec === AdverbioRespuesta)) {
          base = "CORRECTO"
          setMomento("Respuesta");
          setTimeout(() => { Progreso({type:"PROGRESO", PalabraCorrecta:resultadoOracion({objeto1:data[`Juego${window.id}`].Oraciones[0],objeto2:data[`Juego${window.id}`].Oraciones[1], objeto3:data[`Juego${window.id}`].Oraciones[2]}),PalabraSeleccionada:`En el Quien, se seleccionó: ${palabrasEstdo.QuienSelec} - ${palabrasEstdo.AdverSelec ?  `- En el Adverbio, se seleccionó: ${palabrasEstdo.AdverSelec}` : '' } - En el Que, se seleccionó: ${palabrasEstdo.Queselec}`, Resultado:base}); siguiente(window.id) }, 9000)
        } else if (sujetoRespuesta !== palabrasEstdo.QuienSelec || AdjectivoRespuesta !== palabrasEstdo.Queselec || AdverbioRespuesta !== palabrasEstdo.AdverSelec) {
          base = "INCORRECTO"
          setMomento("Respuesta");
          setTimeout(() => { Progreso({type:"PROGRESO", PalabraCorrecta:resultadoOracion({objeto1:data[`Juego${window.id}`].Oraciones[0],objeto2:data[`Juego${window.id}`].Oraciones[1], objeto3:data[`Juego${window.id}`].Oraciones[2]}),PalabraSeleccionada:`En el Quien, se seleccionó: ${palabrasEstdo.QuienSelec} - ${palabrasEstdo.AdverSelec ?  `- En el Adverbio, se seleccionó: ${palabrasEstdo.AdverSelec}` : '' } - En el Que, se seleccionó: ${palabrasEstdo.Queselec}`, Resultado:base}); siguiente(window.id) }, 9000)
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
export const TODOSSeccionMulti = ({ window, siguiente, data, Progreso}) => {
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
    disparadorPalabras({ type: "seleccion", field: "QuienSelec", value: data[`Juego${window.id}`].Oraciones[0].Sujeto.label })
  }

  const onhandleClickSegundo = () => {

    DisparadordeImagenes({ type: "seleccionImagen", field: "QuienSeleccion", value: 2 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien1", value: 0.4 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "QuienSelec", value: data[`Juego${window.id}`].Oraciones[1].Sujeto.label })
  }
  const onhandleClickTercero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "QuienSeleccion", value: 3 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien1", value: 0.4 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien2", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "QuienSelec", value: data[`Juego${window.id}`].Oraciones[2].Sujeto.label })
  }
  //-------------------
  const onhandleClickQuePrimero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "QueSelecion", value: 1 })
    disparadorQue({ type: "opacarQue", field: "opacityQue2", value: 0.4 })
    disparadorQue({ type: "opacarQue", field: "opacityQue3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer2", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "Queselec", value: data[`Juego${window.id}`].Oraciones[0].Que.label })
  }
  const onhandleClickQueSegundo = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "QueSelecion", value: 2 })
    disparadorQue({ type: "opacarQue", field: "opacityQue1", value: 0.4 })
    disparadorQue({ type: "opacarQue", field: "opacityQue3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer2", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "Queselec", value: data[`Juego${window.id}`].Oraciones[1].Que.label })

  }
  const onhandleClickQueTercero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "QueSelecion", value: 3 })
    disparadorQue({ type: "opacarQue", field: "opacityQue2", value: 0.4 })
    disparadorQue({ type: "opacarQue", field: "opacityQue1", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer2", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "Queselec", value: data[`Juego${window.id}`].Oraciones[2].Que.label })
  }
  //---------------
  const onhandleClickAdvePrimero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "AdverbNSeleccion", value: 1 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity2", value: 0.4 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer3", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "AdverSelec", value: data[`Juego${window.id}`].Oraciones[0].Adverbio })
  }
  const onhandleClickAdveSegundo = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "AdverbNSeleccion", value: 2 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity1", value: 0.4 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer3", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "AdverSelec", value: data[`Juego${window.id}`].Oraciones[1].Adverbio })
  }

  const onhandleClickAdveTercero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "AdverbNSeleccion", value: 3 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity1", value: 0.4 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity2", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer3", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "AdverSelec", value: data[`Juego${window.id}`].Oraciones[2].Adverbio })
  }


  return (
    <>
      <Col className='mt-2' lg="4" sm="12" md="12" >
        {
          momento === "inicial" && <Preguntasecction data={data[`Juego` + window.id].Oraciones} />
        }
        {
          momento === "Respuesta" && <Respuestasecction data={data[`Juego` + window.id].Oraciones}/>
        }
      </Col>
      <Col lg="8">
        <Row lg="12" className='align-items-center'>
          <Col style={{ width: "95px", height: "120px" }}>
            <img alt='sujeto' src={Quien} width="75" />
          </Col>
          <Col style={{ width: "175px", pointerEvents: estate.pointer, opacity: opacarQuien.opacityquien1 }} onClick={() => { onhandleClickPrimero() }}>
            <img src={data[`Juego${window.id}`].Oraciones[0].Sujeto.value} width="150" alt='opcion1' />
          </Col>
          <Col style={{ width: "175px", pointerEvents: estate.pointer, opacity: opacarQuien.opacityquien2 }} onClick={() => { onhandleClickSegundo() }}>
            <img src={data[`Juego${window.id}`].Oraciones[1].Sujeto.value} width="150" alt='opcion2' />
          </Col>
          <Col style={{ width: "175px", pointerEvents: estate.pointer, opacity: opacarQuien.opacityquien3 }} onClick={() => { onhandleClickTercero() }}>
            <img src={data[`Juego${window.id}`].Oraciones[2].Sujeto.value} width="150" alt='opcion3' />
          </Col>
        </Row>
        {
          isAdverbio( window, data)
          && (
            <Row lg="12" className='align-items-center'>
              <Col style={{ width: "150px", height: "120px" }}>
                <img alt='sujeto' src={Cantidad} width="100" />
              </Col>
              <Col style={{ width: "150px", height: "100px", pointerEvents: estate.pointer3, opacity: opacarAdverbio.opacity1 }} onClick={onhandleClickAdvePrimero}>
                <h3 style={{ fontWeight: 700, color: "#85858C" }}>{data[`Juego${window.id}`].Oraciones[0].Adverbio}</h3>
              </Col>
              <Col style={{ width: "150px", height: "100px", pointerEvents: estate.pointer3, opacity: opacarAdverbio.opacity2 }} onClick={onhandleClickAdveSegundo} >
                <h3 style={{ fontWeight: 700, color: "#85858C" }}>{data[`Juego${window.id}`].Oraciones[1].Adverbio}</h3>
              </Col>
              <Col style={{ width: "150px", height: "100px", pointerEvents: estate.pointer3, opacity: opacarAdverbio.opacity3 }} onClick={onhandleClickAdveTercero} >
                <h3 style={{ fontWeight: 700, color: "#85858C" }}>{data[`Juego${window.id}`].Oraciones[2].Adverbio}</h3>
              </Col>
            </Row>)
        }
        <Row lg="12" className='align-items-center'>
          <Col style={{ width: "95px" }}>
            <img alt='que' src={Que} width="75" />
          </Col>
          <Col style={{ width: "175px", pointerEvents: estate.pointer2, opacity: opacarQue.opacityQue1 }} onClick={() => { onhandleClickQuePrimero() }}>
            <img src={data[`Juego${window.id}`].Oraciones[0].Que.value} width="150" alt='opcion1' />
          </Col>
          <Col style={{ width: "175px", pointerEvents: estate.pointer2, opacity: opacarQue.opacityQue2 }} onClick={() => { onhandleClickQueSegundo() }}>
            <img src={data[`Juego${window.id}`].Oraciones[1].Que.value} width="150" alt='opcion2' />
          </Col>
          <Col style={{ width: "175px", pointerEvents: estate.pointer2, opacity: opacarQue.opacityQue3 }} onClick={() => { onhandleClickQueTercero() }}>
            <img src={data[`Juego${window.id}`].Oraciones[2].Que.value} width="150" alt='opcion3' />
          </Col>
        </Row>
      </Col>
      <div className='zonainteractiva'>
      <div className='pruebaDise' style={{borderRadius:"10px", border:"#F8F7FD solid", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.13)", backgroundColor:"#F8F7FD"}}>
        <div className='opciones'>
          <div style={{padding:'0px'}} >
            <img alt='que' src={Quien}  className='imagenOpc'/>
          </div>
          <div style={{padding:'0px'}} >
            <img src={Verbo} alt='opcion1'  className='imagenOpc' />
          </div>
          {isAdverbio( window, data)
            &&
            (
              <div style={{padding:'0px'}} >
                <img src={Cantidad} alt='opcion1'  className='imagenOpc' />
              </div>)
          }
          <div style={{padding:'0px'}} >
            <img alt='que' src={Que}  className='imagenOpc' />
          </div>
        </div>
        <div className='seleccion' >
          <div style={{padding:'0px'}} >
            <SeleccionQuien QuienSeleccion={QuienSeleccion} data={data} window={window} className='opcionesSelec' />
          </div>
          <div style={{padding:'0px'}} >
            <VerboRespuesta window={window} data={data} className='opcionesSelec'/>
          </div>
          {
            isAdverbio( window, data)
            && (
              <div style={{padding:'0px'}} >
                <SeleccionCantidad  window={window} AdverbNSeleccion={AdverbNSeleccion}  data={data} className='opcionesSelec'/>
              </div>
            )
          }
          <div style={{padding:'0px'}} >
            <SeleccionQue QueSelecion={QueSelecion} window={window} data={data} className='opcionesSelec' />
          </div>
        </div>
      </div>
      <div >
        {isAdverbio( window, data) ? <RespuestaImagenconAdverbio data={data} window={window} palabrasEstdo={palabrasEstdo} opcionRes={opcionRes} setMomento={setMomento} setopcionRes={setopcionRes} siguiente={siguiente} Progreso={Progreso} />
          : <RespuestaImagen  data={data}  window={window} palabrasEstdo={palabrasEstdo} opcionRes={opcionRes} setMomento={setMomento} setopcionRes={setopcionRes} siguiente={siguiente}  Progreso={Progreso}/>
        }
      </div>
      
      </div>
    </>
  )
}
