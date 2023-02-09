import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { JuecoContext } from '../../../context/Juego/JuecoContext';
import buentrajo from '../../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../../assets/img/AssetsGame/Bad Jood.png'
import Quien from '../../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../../assets/img/AssetsGame/icon_Que.png'
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
  const Respuestasecction = ({  id , window }) => {
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
  const initialState = { pointer: "auto", pointer2: "auto",pointer3:"auto"};
  function reducer(state, action) {
    switch (action.type) {
      case 'puntador':
        return { ...state, [action.field]:action.value };
      default:
        throw new Error();
    }
  }
const TODOSSeccion = ({id, window, siguiente, progreso }) => {
    const [estate, dispatch] = useReducer(reducer, initialState)
    const { oraciondata} = useContext(JuecoContext);
    const [Queselec, setQueselec] = useState("");
    const [opacityquien1, setopacityquien1] = useState(1);
    const [opacityquien2, setopacityquien2] = useState(1);
    const [opacityquien3, setopacityquien3] = useState(1);  
    const [opacityQue1, setOpacityQue1] = useState(1);
    const [opacityQue2, setopacityQue2] = useState(1);
    const [opacityQue3, setopacityQue3] = useState(1);
    const [opacity1, setOpacity1] = useState(1);
    const [opacity2, setOpacity2] = useState(1);
    const [opacity3, setOpacity3] = useState(1);
    const [QuienSelec, setQuienSelec] = useState("");
    const [AdverSelec, setAdverSelec] = useState("");
    const [opcionRes, setopcionRes] = useState("Nada");
    const [QueSelecion, setQueSelecion] = useState(0);
    const [QuienSeleccion, setQuienSeleccion] = useState(0);
    const [AdverbNSeleccion, setQueSeleccion] = useState(0);
    const [momento, setMomento] = useState("inicial");


    
    const onhandleClickPrimero = ()=>{
        setQuienSeleccion(1);
        setopacityquien2(0.4);
        setopacityquien3(0.4);
        dispatch({type:"puntador", field:"pointer", value:"none"})
        setQuienSelec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen);
        progreso(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Oracion, oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta,window);
      }
      const onhandleClickSegundo = ()=>{
        setQuienSeleccion(2);
        setopacityquien1(0.4);
        setopacityquien3(0.4);
        dispatch({type:"puntador", field:"pointer", value:"none"})
        setQuienSelec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen);
      }
      const onhandleClickTercero = ()=>{
        setQuienSeleccion(3);
        setopacityquien1(0.4);
        setopacityquien2(0.4);
        dispatch({type:"puntador", field:"pointer", value:"none"})
        setQuienSelec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen);
      }
    //-------------------
      const onhandleClickQuePrimero = ()=>{
        setQueSelecion(1);
        setopacityQue3(0.4)
setopacityQue2(0.4)
dispatch({type:"puntador", field:"pointer2", value:"none"})
        setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen);
    
      }
      const onhandleClickQueSegundo =()=>{
        setQueSelecion(2);
        setopacityQue3(0.4)
        setOpacityQue1(0.4)
        dispatch({type:"puntador", field:"pointer2", value:"none"})
        setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen);
      }
      const onhandleClickQueTercero = ()=>{
        setQueSelecion(3);
        setOpacityQue1(0.4);
        setopacityQue2(0.4);
        dispatch({type:"puntador", field:"pointer2", value:"none"})
        setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen);
      }
      //---------------
      const onhandleClickAdvePrimero = ()=>{
        setQueSeleccion(1);
        setOpacity2(0.4);
        setOpacity3(0.4);
        dispatch({type:"puntador", field:"pointer3", value:"none"})
          setAdverSelec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio);
      }
      const onhandleClickAdveSegundo = ()=>{
        setQueSeleccion(2);
        setOpacity1(0.4);
        setOpacity3(0.4);
        dispatch({type:"puntador", field:"pointer3", value:"none"})
        setAdverSelec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio);
      }
    
      const onhandleClickAdveTercero = ()=>{
        setQueSeleccion(3)
        setOpacity1(0.4);
setOpacity2(0.4);
dispatch({type:"puntador", field:"pointer3", value:"none"})
        setAdverSelec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio)
      }
      const isAdverbio =()=>{
        if(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio && oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio){
          return true;
        }else{
          return false;
        }
      }
      const SeleccionQue = () => {
          if (QueSelecion === 1) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen} width="170" alt='opcion1' />) }
          if (QueSelecion === 2) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen} width="170" alt='opcion2' />) }
          if (QueSelecion === 3) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen} width="170" alt='opcion3' />) }
          if (QueSelecion === 0) { return (<></>) }
          return (<></>)
      }
      const SeleccionCantidad = () => {
          if (AdverbNSeleccion === 1) { return (<h3 style={{color:"blue"}}>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio}</h3>) }
          if (AdverbNSeleccion === 2) { return (<h3 style={{color:"blue"}}>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio}</h3>)  }
          if (AdverbNSeleccion === 3) { return (<h3 style={{color:"blue"}}>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio}</h3>)  }
          if (AdverbNSeleccion === 0) { return (<></>) }
          return (<></>)
      }
      const SeleccionQuien = () => {
          if (QuienSeleccion === 1) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen} width="170" alt='opcion1' />) }
          if (QuienSeleccion === 2) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen} width="170" alt='opcion2' />) }
          if (QuienSeleccion === 3) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen} width="170" alt='opcion3' />) }
          if (QuienSeleccion === 0) { return (<></>) }
          return (<></>)
      }
      const RespuestaImagen =()=>{
        let  sujetoRespuesta = "";
        let  AdjectivoRespuesta = "";
        let oracion = ""
        console.log("imagenRespuesta");
        let base = "Nada";
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
         if(QuienSelec ==="" ||  Queselec === "" ){
           base = "Nada"
         }
         if(QuienSelec.length > 2 && Queselec.length > 2){
           if((sujetoRespuesta === QuienSelec) &&  (AdjectivoRespuesta === Queselec)  ){
             base ="CORRECTO"
             setTimeout(() => {progreso("",base, window) ; siguiente(window.id); }, 9000)
           }else if(sujetoRespuesta !== QuienSelec ||  AdjectivoRespuesta !== Queselec){
             base = "INCORRECTO"
             setTimeout(() => { progreso("",base, window) ;siguiente(window.id) }, 9000)
           }else if(QuienSelec ==="" ||  AdjectivoRespuesta !== Queselec){
             base = "INCORRECTO" 
    setTimeout(() => { progreso("",base, window);siguiente(window.id) }, 9000)
           }
         }
         
         setopcionRes(base);
         switch (opcionRes) {
           case "CORRECTO":
             setMomento("Respuesta");
             return(<><img src={buentrajo} width="100" alt="buen trabajo"/></>);
           case "INCORRECTO":
             setMomento("Respuesta");
               return(<><img src={malTrabajo} width="100" alt='mal trabajo'/></>);
           case "Nada":
           return(<></>)
           default:
             break;
         }
       }
       const RespuestaImagenconAdverbio =()=>{
        let  sujetoRespuesta = "";
        let  AdjectivoRespuesta = "";
        let AdverbioRespuesta ="";
        let base = "Nada";
        let oracion = "";

          if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
            sujetoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen;
            AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen;
            AdverbioRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio
            oracion =oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Oracion;
          } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
            sujetoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen;
            AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen;
            AdverbioRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio
            oracion =oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Oracion;
          } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
            sujetoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen;
            AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen;
            AdverbioRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio
            oracion =oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Oracion;
          }          


         if(QuienSelec ==="" ||  Queselec === "" || AdverSelec ===""){
           base = "Nada"
         }
         if(QuienSelec.length> 2 && Queselec.length >2  && AdverSelec.length > 2  ){
           if((sujetoRespuesta === QuienSelec) &&  (AdjectivoRespuesta === Queselec) && (AdverSelec === AdverbioRespuesta) ){
             base ="CORRECTO"
             setMomento("Respuesta");
             setTimeout(() => { progreso("",base, window);siguiente(window.id) }, 9000)
           }else if(sujetoRespuesta !== QuienSelec ||  AdjectivoRespuesta !== Queselec || AdverbioRespuesta !==  AdverSelec){
             base = "INCORRECTO"
             setMomento("Respuesta");
             setTimeout(() => { progreso("",base, window);siguiente(window.id) }, 9000)
           }
         }
         
         setopcionRes(base);
         switch (opcionRes) {
           case "CORRECTO":
             return(<><img src={buentrajo} width="100" alt="buen trabajo"/></>);
           case "INCORRECTO":
               return(<><img src={malTrabajo} width="100" alt='mal trabajo'/></>);
           case "Nada":
           return(<></>)
           default:
          return(<></>);
         }
       }
       const VerboRespuesta = () => {
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
    
  return (
    <>
    <h3>{`${window.id}`}</h3>
        <Col className='mt-2' lg="4" sm="12" md="12" >
                {
                  momento === "inicial" && <Preguntasecction id={id} window={window}  />
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
                  <Col style={{ width: "175px", pointerEvents: estate.pointer, opacity: opacityquien1}} onClick={()=>{onhandleClickPrimero()}}>
                    <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen} width="170" alt='opcion1' />
                  </Col>
                  <Col style={{ width: "175px",pointerEvents: estate.pointer, opacity: opacityquien2 }} onClick={()=>{onhandleClickSegundo()}}>
                    <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen} width="170" alt='opcion2' />
                  </Col>
                  <Col style={{ width: "175px", pointerEvents: estate.pointer, opacity: opacityquien3}} onClick={()=>{onhandleClickTercero()}}>
                    <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen} width="170" alt='opcion3' />
                  </Col>
                </Row>
                {
                  isAdverbio()
                  && (
                    <Row lg="12" className='align-items-center'>
                      <Col style={{ width: "150px", height: "120px" }}>
                        <img alt='sujeto' src={Cantidad} width="100" />
                      </Col>
                      <Col style={{ width: "150px", height: "100px",pointerEvents:estate.pointer3, opacity: opacity1  }} onClick={onhandleClickAdvePrimero}>
                        <span style={{color:"blue"}}>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio}</span>
                      </Col>
                      <Col style={{ width: "150px", height: "100px", pointerEvents: estate.pointer3, opacity: opacity2 }} onClick={onhandleClickAdveSegundo} >
                        <span style={{color:"blue"}}>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio}</span>
                      </Col>
                      <Col style={{ width: "150px", height: "100px", pointerEvents: estate.pointer3, opacity: opacity3 }} onClick={onhandleClickAdveTercero} >
                        <span style={{color:"blue"}}>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio}</span>
                      </Col>
                    </Row>)
                }
                <Row lg="12" className='align-items-center'>
                  <Col style={{ width: "95px" }}>
                    <img alt='que' src={Que} width="75" />
                  </Col>
                  <Col style={{ width: "175px",  pointerEvents: estate.pointer2, opacity: opacityQue1 }} onClick={()=>{onhandleClickQuePrimero()}}>
                    <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen} width="170" alt='opcion1' />
                  </Col>
                  <Col style={{ width: "175px",  pointerEvents:estate.pointer2, opacity: opacityQue2 }} onClick={()=>{onhandleClickQueSegundo()}}>
                    <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen} width="170" alt='opcion2' />
                  </Col>
                  <Col style={{ width: "175px",  pointerEvents: estate.pointer2, opacity: opacityQue3 }} onClick={()=>{onhandleClickQueTercero()}}>
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
                  {isAdverbio()
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
                    <SeleccionQuien />
                  </Col>
                  <Col style={{ width: "95px" }} className="mx-auto">
                    <VerboRespuesta />
                  </Col>
                  {
                    isAdverbio()
                    && (
                      <Col style={{ width: "95px" }} className="mx-auto">
                        <SeleccionCantidad />
                      </Col>
                    )
                  }
                  <Col style={{ width: "95px" }} className="mx-auto">
                    <SeleccionQue />
                  </Col>
                </Row>
                </Col>
                <Col  lg="3" >
                { isAdverbio() ? <RespuestaImagenconAdverbio/> :<RespuestaImagen />}
                
                </Col>
    </>
  )
}

export default TODOSSeccion