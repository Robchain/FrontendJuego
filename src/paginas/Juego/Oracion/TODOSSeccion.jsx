import React, { useContext, useEffect, useReducer, useState } from 'react'
import buentrajo from '../../../assets/img/AssetsGame/GOOD JOD.png';
import malTrabajo from '../../../assets/img/AssetsGame/Bad Jood.png';
import Quien from '../../../assets/img/AssetsGame/ico_Que.png';
import Que from '../../../assets/img/AssetsGame/icon_Que.png';
import Verbo from "../../../assets/img/AssetsGame/ico_verbo.png";
import Cantidad from '../../../assets/img/AssetsGame/ico_cantidad.png'
import ReactPlayer from 'react-player';
import { OracionRespuesta, analizarAdverbios, analizaradentro, resultadoOracion } from '../../../helpers';
import { JuecoContext } from '../../../context/Juego/JuecoContext';

const Preguntasecction = ({setcro,dispatch,disparadorQuien, disparadorQue, disparadorAdverbio,setVideoActual,videoActual,data, indice, ...props }) => {

  const [videoPreguntaSecctionTodo, setVideoPreguntaSecctionTodo] = useState("")
  useEffect(() => {
    setVideoPreguntaSecctionTodo(preguntavideo)
  }, [data, indice])
  
  const preguntavideo = () => {
    var Pregu = Math.floor(Math.random() * (2 - 1 + 1) + 1)
    let pregunta = "";
    let respuesta="";
    if (Pregu === 1) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].Respuesta === 'CORRECTO') {
          respuesta = data[i].FileVideoMuestra
          pregunta = data[i].FileVideoPreguntaQue
          break; // para salir del bucle una vez que se encuentra la respuesta correcta
        }
      }
    } else if (Pregu === 2) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].Respuesta === 'CORRECTO') {
          respuesta = data[i].FileVideoMuestra
          pregunta = data[i].FileVideoPreguntaQuien
          break; // para salir del bucle una vez que se encuentra la respuesta correcta
        }
      }
    }
    return [respuesta, pregunta];
  }


  return (
    <div>
      <ReactPlayer
        url={videoPreguntaSecctionTodo[videoActual]}
        playing={true}
        controls={true}
        onEnded={() => { if (1 === videoActual) {  
          disparadorAdverbio({ type: "opacarAdverbio", field: "opacity1", value: 1 })
          disparadorAdverbio({ type: "opacarAdverbio", field: "opacity3", value: 1 })
      disparadorAdverbio({ type: "opacarAdverbio", field: "opacity2", value: 1 })

      // quien
      disparadorQuien({ type: "opacarQuien", field: "opacityquien2", value: 1 })
      disparadorQuien({ type: "opacarQuien", field: "opacityquien3", value: 1 })
      disparadorQuien({ type: "opacarQuien", field: "opacityquien1", value: 1 })
      //que
      disparadorQue({ type: "opacarQue", field: "opacityQue3", value: 1 })
      disparadorQue({ type: "opacarQue", field: "opacityQue2", value: 1 })
          disparadorQue({ type: "opacarQue", field: "opacityQue1", value: 1 })
      //pointer
      dispatch({ type: "puntador", field: "pointer2", value: "auto" })
      dispatch({ type: "puntador", field: "pointer3", value: "auto" })
      dispatch({ type: "puntador", field: "pointer", value: "auto" })
      setcro("pregunta")

         } else {setVideoActual(videoActual + 1);  } }}
        {...props}
      />
    </div>
  )
};


const Respuestasecction = ({setcro, siguiente, data, ...props }) => {
  const [videoRespuestaSeleccionadoTodo, setvideoRespuestaSeleccionadoTodo] = useState("")
  useEffect(() => {
    setcro('respuesta');
    let pregunta = "";
    for (let i = 0; i < data.length; i++) {
      if (data[i].Respuesta === 'CORRECTO') {
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
        playing={true}
        controls={true}
        onEnded={siguiente}
        {...props}
      />
    </div>
  )
};


const estadoInicialApuntadores = { pointer: "none", pointer2: "none", pointer3: "none" };
function apuntadores(state, action) {
  switch (action.type) {
    case 'puntador':
      return { ...state, [action.field]: action.value };
      case 'resetear':
        return estadoInicialApuntadores;
    default:
      throw new Error();
  }
}

const estadoInicialOpacidadQuien = { opacityquien1: 0.4, opacityquien2: 0.4, opacityquien3: 0.4 }

function opacarsOpacidadQuien(state, action) {
  switch (action.type) {
    case 'opacarQuien':
      return { ...state, [action.field]: action.value };
      case 'resetear':
        return estadoInicialOpacidadQuien;
    default:
      throw new Error();
  }
}

const selecciondeImagenes = { QueSelecion: null, AdverbNSeleccion: null, QuienSeleccion: null }

function seleccionDeImagenesf(state, action) {
  switch (action.type) {
    case 'seleccionImagen':
      return { ...state, [action.field]: action.value };
      case 'resetear':
        return selecciondeImagenes;
    default:
      throw new Error();
  }
}

const estadoInicialOpacidadQue = { opacityQue1: 0.4, opacityQue2: 0.4, opacityQue3: 0.4 }

function opacarsOpacidadQue(state, action) {
  switch (action.type) {
    case 'opacarQue':
      return { ...state, [action.field]: action.value };
      case 'resetear':
        return estadoInicialOpacidadQue;
    default:
      throw new Error();
  }
}
const estadoInicialOpacidadAdverbio = { opacity1: 0.4, opacity2: 0.4, opacity3: 0.4 }

function opacarsOpacidadAdverbio(state, action) {
  switch (action.type) {
    case 'opacarAdverbio':
      return { ...state, [action.field]: action.value };
      case 'resetear':
        return estadoInicialOpacidadAdverbio;
    default:
      throw new Error();
  }
}
const estadoInicialSelecionPalabras = { QuienSelec: undefined, AdverSelec: undefined, Queselec: undefined }

function seleccionDePalabrasSelecion(state, action) {
  switch (action.type) {
    case 'seleccion':
      return { ...state, [action.field]: action.value };
      case 'resetear':
        return estadoInicialSelecionPalabras;
    default:
      throw new Error();
  }
}
const SeleccionQue = ({ QueSelecion, data, indice, ...props }) => {

  if (QueSelecion === 1) { return (<img src={data[`Juego` + indice].Oraciones[0].Que.value} alt={data[`Juego` + indice].Oraciones[0].Que.label} {...props} />) }
  if (QueSelecion === 2) { return (<img src={data[`Juego` + indice].Oraciones[1].Que.value} alt={data[`Juego` + indice].Oraciones[1].Que.label} {...props} />) }
  if (QueSelecion === 3) { return (<img src={data[`Juego` + indice].Oraciones[2].Que.value} alt={data[`Juego` + indice].Oraciones[2].Que.label} {...props} />) }
  if (QueSelecion === 0) { return (<div {...props}></div>) }
  return (<div {...props}></div>)
}

const SeleccionCantidad = ({ Adverbios,AdverbNSeleccion, indice, ...props }) => {

  if (AdverbNSeleccion === 1) { return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{Adverbios[0].Adverbio || ''}</span>) }
  if (AdverbNSeleccion === 2) { return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{Adverbios[1].Adverbio || ''}</span>) }
  if (AdverbNSeleccion === 3) { return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{Adverbios[2].Adverbio || ''}</span>) }
  if (AdverbNSeleccion === 0) { return (<div {...props}></div>) }
  return (<div {...props}></div>)
}
const SeleccionQuien = ({ modeloquienMostrar,QuienSeleccion, data, indice, ...props }) => {
  if (QuienSeleccion === 1) { return (<img src={modeloquienMostrar[0].value} alt={modeloquienMostrar[0].label} {...props} />) }
  if (QuienSeleccion === 2) { return (<img src={modeloquienMostrar[1].value} alt={modeloquienMostrar[1].label} {...props} />) }
  if (QuienSeleccion === 3) { return (<img src={modeloquienMostrar[2].value} alt={modeloquienMostrar[2].label} {...props} />) }
  if (QuienSeleccion === 0) { return (<div {...props}></div>) }
  return (<div {...props}></div>)
}

const RespuestaImagen = ({ data, indice, dispatchProgreso, palabrasEstdo, setopcionRes, opcionRes, setMomento, ...opc }) => {
  let sujetoRespuesta = "";
  let AdjectivoRespuesta = "";
  let oracion = "";


  let base = "Nada";
  if (palabrasEstdo.QuienSelec && palabrasEstdo.Queselec) {
    if (palabrasEstdo.QuienSelec.length != 0 && palabrasEstdo.Queselec.length != 0) {
      if (data[`Juego` + indice].Oraciones[0].Respuesta === "CORRECTO") {
        oracion = data[`Juego` + indice].Oraciones[0].Oracion;
        sujetoRespuesta = data[`Juego` + indice].Oraciones[0].Sujeto.label;
        AdjectivoRespuesta = data[`Juego` + indice].Oraciones[0].Que.label;
      } else if (data[`Juego` + indice].Oraciones[1].Respuesta === "CORRECTO") {
        sujetoRespuesta = data[`Juego` + indice].Oraciones[1].Sujeto.label;
        oracion = data[`Juego` + indice].Oraciones[1].Oracion;
        AdjectivoRespuesta = data[`Juego` + indice].Oraciones[1].Que.label;
      } else if (data[`Juego` + indice].Oraciones[2].Respuesta === "CORRECTO") {
        sujetoRespuesta = data[`Juego` + indice].Oraciones[2].Sujeto.label;
        oracion = data[`Juego` + indice].Oraciones[2].Oracion;
        AdjectivoRespuesta = data[`Juego` + indice].Oraciones[2].Que.label;
      }

      useEffect(() => {
        if ((sujetoRespuesta === palabrasEstdo.QuienSelec) && (AdjectivoRespuesta === palabrasEstdo.Queselec)) {
          base = "CORRECTO"
          dispatchProgreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracion({ objeto1: data[`Juego` + indice].Oraciones[0], objeto2: data[`Juego` + indice].Oraciones[1], objeto3: data[`Juego` + indice].Oraciones[2] }), selecionado: `En el Quien, se seleccionó: ${palabrasEstdo.QuienSelec}  - En el Que, se seleccionó ${palabrasEstdo.Queselec}`, Resul: base, OracionCorrecta: OracionRespuesta({ objecto1: data[`Juego` + indice].Oraciones[0], objecto2: data[`Juego` + indice].Oraciones[1], objecto3: data[`Juego` + indice].Oraciones[2] }) });
        } else if (sujetoRespuesta !== palabrasEstdo.QuienSelec || AdjectivoRespuesta !== palabrasEstdo.Queselec) {
          base = "INCORRECTO"
          dispatchProgreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracion({ objeto1: data[`Juego` + indice].Oraciones[0], objeto2: data[`Juego` + indice].Oraciones[1], objeto3: data[`Juego` + indice].Oraciones[2] }), selecionado: `En el Quien, se seleccionó: ${palabrasEstdo.QuienSelec}  - En el Que, se seleccionó ${palabrasEstdo.Queselec}`, Resul: base, OracionCorrecta: OracionRespuesta({ objecto1: data[`Juego` + indice].Oraciones[0], objecto2: data[`Juego` + indice].Oraciones[1], objecto3: data[`Juego` + indice].Oraciones[2] }) });
        }
        setopcionRes(base);
      }, [palabrasEstdo.Queselec, palabrasEstdo.QuienSelec])
      if (opcionRes === "CORRECTO") {
        setMomento("Respuesta");
        return (<><img src={buentrajo}  alt="buen trabajo" {...opc} /></>);
      }
      if (opcionRes === "INCORRECTO") {
        setMomento("Respuesta");
        return (<><img src={malTrabajo} alt='mal trabajo' {...opc}/></>);
      }
    }
  }
}
const VerboRespuesta = ({ indice, data, ...props }) => {
  let verbo = "";
  if (data[`Juego` + indice].Oraciones[0].Respuesta === "CORRECTO") {
    verbo = data[`Juego` + indice].Oraciones[0].Verbo
  } else if (data[`Juego` + indice].Oraciones[1].Respuesta === "CORRECTO") {
    verbo = data[`Juego` + indice].Oraciones[1].Verbo
  } else if (data[`Juego` + indice].Oraciones[2].Respuesta === "CORRECTO") {
    verbo = data[`Juego` + indice].Oraciones[2].Verbo
  }
  return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{verbo}</span>)
}

const isAdverbio = (indice, data) => {
  if (data[`Juego` + indice].Oraciones[0].Adverbio || data[`Juego` + indice].Oraciones[2].Adverbio || data[`Juego` + indice].Oraciones[1].Adverbio) {
    return true;
  } else {
    return false;
  }
}

const RespuestaImagenconAdverbio = ({ indice, dispatchProgreso, palabrasEstdo, setopcionRes, opcionRes, setMomento, data, ...opc}) => {
  let sujetoRespuesta = "";
  let AdjectivoRespuesta = "";
  let AdverbioRespuesta = "";
  let base = "Nada";
  let oraciones = "";
  if (palabrasEstdo.QuienSelec && palabrasEstdo.Queselec && palabrasEstdo.AdverSelec) {
    if (palabrasEstdo.QuienSelec.length != 0 && palabrasEstdo.Queselec.length != 0 && (palabrasEstdo.AdverSelec.length >= 1 || palabrasEstdo.AdverSelec.length === 0)) {
      if (data[`Juego` + indice].Oraciones[0].Respuesta === "CORRECTO") {
        sujetoRespuesta = data[`Juego` + indice].Oraciones[0].Sujeto.label;
        AdjectivoRespuesta = data[`Juego` + indice].Oraciones[0].Que.label;
        AdverbioRespuesta = data[`Juego` + indice].Oraciones[0].Adverbio || 'no habia'
        oraciones = data[`Juego` + indice].Oraciones[0].Oracion;
      } else if (data[`Juego` + indice].Oraciones[1].Respuesta === "CORRECTO") {
        sujetoRespuesta = data[`Juego` + indice].Oraciones[1].Sujeto.label;
        AdjectivoRespuesta = data[`Juego` + indice].Oraciones[1].Que.label;
        AdverbioRespuesta = data[`Juego` + indice].Oraciones[1].Adverbio || 'no habia'
        oraciones = data[`Juego` + indice].Oraciones[1].Oracion;
      } else if (data[`Juego` + indice].Oraciones[2].Respuesta === "CORRECTO") {
        sujetoRespuesta = data[`Juego` + indice].Oraciones[2].Sujeto.label;
        AdjectivoRespuesta = data[`Juego` + indice].Oraciones[2].Que.label;
        AdverbioRespuesta = data[`Juego` + indice].Oraciones[2].Adverbio || 'no habia'
        oraciones = data[`Juego` + indice].Oraciones[2].Oracion;
      }
      useEffect(() => {
        if ((sujetoRespuesta === palabrasEstdo.QuienSelec) && (AdjectivoRespuesta === palabrasEstdo.Queselec) && (palabrasEstdo.AdverSelec === AdverbioRespuesta)) {
          base = "CORRECTO"
          setMomento("Respuesta");
          dispatchProgreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracion({ objeto1: data[`Juego` + indice].Oraciones[0], objeto2: data[`Juego` + indice].Oraciones[1], objeto3: data[`Juego` + indice].Oraciones[2] }), selecionado: `En el Quien, se seleccionó: ${palabrasEstdo.QuienSelec} ${palabrasEstdo.AdverSelec ? `- En el Adverbio, se seleccionó: ${palabrasEstdo.AdverSelec}` : ''} - En el Que, se seleccionó: ${palabrasEstdo.Queselec}`, Resul: base, OracionCorrecta: OracionRespuesta({ objecto1: data[`Juego` + indice].Oraciones[0], objecto2: data[`Juego` + indice].Oraciones[1], objecto3: data[`Juego` + indice].Oraciones[2] }) });
        } else if (sujetoRespuesta !== palabrasEstdo.QuienSelec || AdjectivoRespuesta !== palabrasEstdo.Queselec || AdverbioRespuesta !== palabrasEstdo.AdverSelec) {
          base = "INCORRECTO"
          setMomento("Respuesta");
          dispatchProgreso({ type: "PROGRESO", PalabraCorrecta: resultadoOracion({ objeto1: data[`Juego` + indice].Oraciones[0], objeto2: data[`Juego` + indice].Oraciones[1], objeto3: data[`Juego` + indice].Oraciones[2] }), selecionado: `En el Quien, se seleccionó: ${palabrasEstdo.QuienSelec} - ${palabrasEstdo.AdverSelec ? `- En el Adverbio, se seleccionó: ${palabrasEstdo.AdverSelec}` : ''} - En el Que, se seleccionó: ${palabrasEstdo.Queselec}`, Resul: base, OracionCorrecta: OracionRespuesta({ objecto1: data[`Juego` + indice].Oraciones[0], objecto2: data[`Juego` + indice].Oraciones[1], objecto3: data[`Juego` + indice].Oraciones[2] }) });
        }
        setopcionRes(base);
      }, [palabrasEstdo.QuienSelec, palabrasEstdo.Queselec, palabrasEstdo.AdverSelec])


      if (opcionRes === "CORRECTO") {
        return (<><img src={buentrajo}  alt="buen trabajo" {...opc} /></>);
      }
      if (opcionRes === "INCORRECTO") {
        return (<><img src={malTrabajo} alt='mal trabajo' {...opc} /></>);
      }

    }
  }
}
const TODOSSeccion = ({ setcro, indice, siguiente, dispatchProgreso, data }) => {
  const { quienlist} = useContext(JuecoContext);
  const [estate, dispatch] = useReducer(apuntadores, estadoInicialApuntadores)
  const [videoActual, setVideoActual] = useState(0);
  const [modeloquienMostrar, setmodeloquienMostrar] = useState([])
  const [opacarQuien, disparadorQuien] = useReducer(opacarsOpacidadQuien, estadoInicialOpacidadQuien)
  const [opacarQue, disparadorQue] = useReducer(opacarsOpacidadQue, estadoInicialOpacidadQue)
  const [opacarAdverbio, disparadorAdverbio] = useReducer(opacarsOpacidadAdverbio, estadoInicialOpacidadAdverbio)
  const [palabrasEstdo, disparadorPalabras] = useReducer(seleccionDePalabrasSelecion, estadoInicialSelecionPalabras)
  const [opcionRes, setopcionRes] = useState("Nada");
  const [Adverbios, setAdverbios] = useState([])
  const [{ QueSelecion, QuienSeleccion, AdverbNSeleccion }, DisparadordeImagenes] = useReducer(seleccionDeImagenesf, selecciondeImagenes)
  const [momento, setMomento] = useState("inicial");
  useEffect(() => {
    if(data!=null){
      const info = analizarAdverbios({data:data, indice:indice});
      setAdverbios(info);
    }
  }, [indice])
  useEffect(() => {
    if(data!=null){
      const info2 = analizaradentro({quienlist:quienlist, data:data, indice:indice});
      setmodeloquienMostrar(info2);
    }
  }, [indice])

useEffect(() => {
  setcro("inicial")
  setMomento("inicial");
  setopcionRes("Nada");
  setVideoActual(0);
  dispatch({ type: "resetear"})
  disparadorQuien({ type: "resetear"})
  disparadorQue({ type: "resetear"})
  disparadorAdverbio({ type: "resetear"})
  disparadorPalabras({ type: "resetear"})
  DisparadordeImagenes({ type: "resetear"})
}, [indice, data])




  const onhandleClickPrimero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "QuienSeleccion", value: 1 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien2", value: 0.4 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "QuienSelec", value: modeloquienMostrar[0].label })
  }

  const onhandleClickSegundo = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "QuienSeleccion", value: 2 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien1", value: 0.4 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "QuienSelec", value: modeloquienMostrar[1].label })
  }
  const onhandleClickTercero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "QuienSeleccion", value: 3 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien1", value: 0.4 })
    disparadorQuien({ type: "opacarQuien", field: "opacityquien2", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "QuienSelec", value: modeloquienMostrar[2].label })
  }
  //-------------------
  const onhandleClickQuePrimero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "QueSelecion", value: 1 })
    disparadorQue({ type: "opacarQue", field: "opacityQue2", value: 0.4 })
    disparadorQue({ type: "opacarQue", field: "opacityQue3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer2", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "Queselec", value: data[`Juego` + indice].Oraciones[0].Que.label })
  }
  const onhandleClickQueSegundo = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "QueSelecion", value: 2 })
    disparadorQue({ type: "opacarQue", field: "opacityQue1", value: 0.4 })
    disparadorQue({ type: "opacarQue", field: "opacityQue3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer2", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "Queselec", value: data[`Juego` + indice].Oraciones[1].Que.label })

  }
  const onhandleClickQueTercero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "QueSelecion", value: 3 })
    disparadorQue({ type: "opacarQue", field: "opacityQue2", value: 0.4 })
    disparadorQue({ type: "opacarQue", field: "opacityQue1", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer2", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "Queselec", value: data[`Juego` + indice].Oraciones[2].Que.label })
  }
  //---------------
  const onhandleClickAdvePrimero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "AdverbNSeleccion", value: 1 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity2", value: 0.4 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer3", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "AdverSelec", value: Adverbios[0].Adverbio || 'no habia' })
  }
  const onhandleClickAdveSegundo = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "AdverbNSeleccion", value: 2 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity1", value: 0.4 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity3", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer3", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "AdverSelec", value: Adverbios[1].Adverbio || 'no habia' })
  }

  const onhandleClickAdveTercero = () => {
    DisparadordeImagenes({ type: "seleccionImagen", field: "AdverbNSeleccion", value: 3 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity1", value: 0.4 })
    disparadorAdverbio({ type: "opacarAdverbio", field: "opacity2", value: 0.4 })
    dispatch({ type: "puntador", field: "pointer3", value: "none" })
    disparadorPalabras({ type: "seleccion", field: "AdverSelec", value: Adverbios[2].Adverbio || 'no habia' })
  }


  return (
    <div className='contenido-una-oracion'>
      <div className='up-side-oracion'> 
      <div className='seccion-videos-oracion' >
        {
          momento === "inicial" && <Preguntasecction setcro={setcro} dispatch={dispatch} disparadorQuien={disparadorQuien} disparadorQue={disparadorQue}  disparadorAdverbio={disparadorAdverbio}   setVideoActual={setVideoActual} videoActual={videoActual} data={data[`Juego` + indice].Oraciones} indice={indice} className="video-pregunta-oracion-una" />
        }
        {
          momento === "Respuesta" && <Respuestasecction setcro={setcro} siguiente={siguiente} data={data[`Juego` + indice].Oraciones} className="video-respuesta-oracion-una" />
        }
      </div>
      <div className='opcion-multi-oracion'>
        {modeloquienMostrar.length>0? <div className='seccion-quien-multiple'>
          <div className='imagen-pregunta-quien-multi'>
            <img alt='sujeto' src={Quien} />
          </div>
          <div style={{ pointerEvents: estate.pointer, opacity: opacarQuien.opacityquien1 }} onClick={() => { onhandleClickPrimero() }}>
            <div className='opcion-imagen-multi'>
              <img src={modeloquienMostrar[0].value} alt={modeloquienMostrar[0].label} className='opcion-imagen-multi-neta' />
            </div>
          </div>
          <div style={{ pointerEvents: estate.pointer, opacity: opacarQuien.opacityquien2 }} onClick={() => { onhandleClickSegundo() }}>
            <div className='opcion-imagen-multi'>
              <img src={modeloquienMostrar[1].value} alt={modeloquienMostrar[1].label} className='opcion-imagen-multi-neta' />
            </div>
          </div>
          <div style={{ pointerEvents: estate.pointer, opacity: opacarQuien.opacityquien3 }} onClick={() => { onhandleClickTercero() }}>
            <div className='opcion-imagen-multi'>
              <img src={modeloquienMostrar[2].value} alt={modeloquienMostrar[2].label} className='opcion-imagen-multi-neta' />
            </div>
          </div>
        </div>:<div className='seccion-quien-multiple'>
          </div>}
        {
     Adverbios.length > 0 &&  isAdverbio(indice, data)
          ? (
            <div className='seccion-adv-multiple'>
              <div className='imagen-pregunta-adv-multi'>
                <img alt='sujeto' src={Cantidad} />
              </div>
              <div style={{ pointerEvents: estate.pointer3, opacity: opacarAdverbio.opacity1 }} onClick={onhandleClickAdvePrimero}>
                <div className='opcion-multi-letras'>
                  <div>
                    <p>{Adverbios[0].Adverbio}</p>
                  </div>
                </div>
              </div>
              <div style={{ pointerEvents: estate.pointer3, opacity: opacarAdverbio.opacity2 }} onClick={onhandleClickAdveSegundo} >
                <div className='opcion-multi-letras'>
                  <div>
                    <p>{Adverbios[1].Adverbio}</p>
                  </div>
                </div>
              </div>
              <div style={{ pointerEvents: estate.pointer3, opacity: opacarAdverbio.opacity3 }} onClick={onhandleClickAdveTercero} >
                <div className='opcion-multi-letras'>
                  <div>
                    <p >{Adverbios[2].Adverbio}</p>
                  </div>
                </div>
              </div>
            </div>) :<div className='seccion-adv-multiple'></div>
        }
        <div className='seccion-que-multiple'>
          <div className='imagen-pregunta-que-multi'>
            <img alt='que' src={Que} />
          </div>
          <div style={{ pointerEvents: estate.pointer2, opacity: opacarQue.opacityQue1 }} onClick={() => { onhandleClickQuePrimero() }}>
            <div className='opcion-imagen-multi'>
              <img src={data[`Juego` + indice].Oraciones[0].Que.value} alt={data[`Juego` + indice].Oraciones[0].Que.label} className='opcion-imagen-multi-neta' />
            </div>
          </div>
          <div style={{ pointerEvents: estate.pointer2, opacity: opacarQue.opacityQue2 }} onClick={() => { onhandleClickQueSegundo() }}>
            <div className='opcion-imagen-multi'>
              <img src={data[`Juego` + indice].Oraciones[1].Que.value} alt={data[`Juego` + indice].Oraciones[1].Que.label} className='opcion-imagen-multi-neta' />
            </div>
          </div>
          <div style={{ pointerEvents: estate.pointer2, opacity: opacarQue.opacityQue3 }} onClick={() => { onhandleClickQueTercero() }}>
            <div className='opcion-imagen-multi'>
              <img src={data[`Juego` + indice].Oraciones[2].Que.value} alt={data[`Juego` + indice].Oraciones[2].Que.label} className='opcion-imagen-multi-neta' />
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className='zonainteractiva'>
        <div className='pruebaDise' style={{ borderRadius: "10px", border: "#F8F7FD solid", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.13)", backgroundColor: "#F8F7FD" }}>
          
          {/*parte de seleccion */}
          <div className='seleccion' >
            <div style={{ padding: '0px' }} >
              <SeleccionQuien modeloquienMostrar={modeloquienMostrar} QuienSeleccion={QuienSeleccion} indice={indice} data={data} className='opcionesSelec' />
            </div>
            <div style={{ padding: '0px' }} >
              <VerboRespuesta indice={indice} data={data} className='opcionesSelec' />
            </div>
            {
              isAdverbio(indice, data)
              && (
                <div style={{ padding: '0px' }}>
                  <SeleccionCantidad Adverbios={Adverbios} indice={indice} AdverbNSeleccion={AdverbNSeleccion} data={data} className='opcionesSelec' />
                </div>
              )
            }
            <div style={{ padding: '0px' }} >
              <SeleccionQue QueSelecion={QueSelecion} indice={indice} data={data} className='opcionesSelec' />
            </div>
          </div>
        </div>
        <div className='respuesta-seccion' >
          {isAdverbio(indice, data) ? <div><RespuestaImagenconAdverbio data={data} dispatchProgreso={dispatchProgreso} indice={indice} palabrasEstdo={palabrasEstdo} opcionRes={opcionRes} setMomento={setMomento} setopcionRes={setopcionRes} className='imagen-respuesta-oracion'  /></div>
            : <div><RespuestaImagen data={data} dispatchProgreso={dispatchProgreso} indice={indice} palabrasEstdo={palabrasEstdo} opcionRes={opcionRes} setMomento={setMomento} setopcionRes={setopcionRes} className='imagen-respuesta-oracion'  /></div>
          }
        </div>
      </div>
      {JSON.stringify(data)}
    </div>
  )
}

export default TODOSSeccion