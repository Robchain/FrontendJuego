import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Col, Row } from 'reactstrap'
import { JuecoContext } from '../../../context/Juego/JuecoContext';
import buentrajo from '../../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../../assets/img/AssetsGame/Bad Jood.png'
import Quien from '../../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../../assets/img/AssetsGame/ico_verbo.png";
import Cantidad from '../../../assets/img/AssetsGame/ico_cantidad.png'
import ReactPlayer from 'react-player';
const Preguntasecction = ({ FuncRamdon, Pregu, setvideoAMostrar, videoAMostrar, id, window }) => {
    const { oraciondata } = useContext(JuecoContext);
    useEffect(() => {
      FuncRamdon()
    }, [])
    
    const preguntavideo = () => {
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
    setvideoAMostrar(preguntavideo);
    return (
      <div>
        <ReactPlayer
          url={videoAMostrar}
          width={300}
          playing
          loop={true}
        />
      </div>
    )
  };
  const Respuestasecction = ({ FuncRamdon, Pregu, setvideoAMostrar, videoAMostrar, id , window }) => {
  
    const { oraciondata } = useContext(JuecoContext);
    useEffect(() => {
      FuncRamdon()
    }, [])
  
    const preguntavideo = useMemo(() => {
        if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
          return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileVideoMuestra
        } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
          return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileVideoMuestra
        } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
          return oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileVideoMuestra
        }
    }, [Pregu, oraciondata])
    setvideoAMostrar(preguntavideo);
    return (
      <div>
        <ReactPlayer
          url={videoAMostrar}
          width={300}
          playing
          loop={true}
        />
      </div>
    )
  };

const TODOSSeccion = ({id, window, siguiente }) => {
    
    const { oraciondata} = useContext(JuecoContext);
    const [Queselec, setQueselec] = useState("");
    const [pointer, setPointer] = useState("auto")
    const [pointer2, setPointer2] = useState("auto")
    const [pointer3, setPointer3] = useState("auto")
    const [opacityquien1, setopacityquien1] = useState(1);
    const [opacityquien, setopacityquien2] = useState(1);
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
    const [QueSeleccion, setQueSeleccion] = useState(0);
    const [Pregu, setPregu] = useState(0);
    const [videoAMostrar, setvideoAMostrar] = useState("")
    const [momento, setMomento] = useState("inicial");

    const func = useCallback(
        () => {
          return Math.floor(Math.random() * (2 - 1 + 1) + 1)
        },
        [],
      )
      const FuncRamdon = () => {
        setPregu(func());

      }

    const onhandleClickPrimero = ()=>{
        setQuienSeleccion(1);
        setQuienSelec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen);
      }
      const onhandleClickSegundo = ()=>{
        setQuienSeleccion(2);
        setQuienSelec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen);
      }
      const onhandleClickTercero = ()=>{
        setQuienSeleccion(3);
        setQuienSelec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen);
      }
    //-------------------
      const onhandleClickQuePrimero = ()=>{
        setQueSelecion(1);
        setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen);
    
      }
      useEffect(() => {
    
        return () => {
          setMomento("inicial")
         }
      }, [])
    
      const onhandleClickQueSegundo =()=>{
        setQueSelecion(2);
        setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen);
      }
      const onhandleClickQueTercero = ()=>{
        setQueSelecion(3);
        setQueselec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen);
      }
      //---------------
      const onhandleClickAdvePrimero = ()=>{
        setQuienSeleccion(3);
          setAdverSelec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen);
      }
      const onhandleClickAdveSegundo = ()=>{
        setQuienSeleccion(3);
        setQuienSelec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen);
      }
    
      const onhandleClickAdveTercero = ()=>{
        setQuienSeleccion(3)
        setQuienSelec(oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen)
      }
      const SeleccionQue = () => {
        let opc = QueSelecion;
        const result = useMemo(() => {
          if (opc === 1) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen} width="170" alt='opcion1' />) }
          if (opc === 2) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen} width="170" alt='opcion2' />) }
          if (opc === 3) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen} width="170" alt='opcion3' />) }
          if (opc === 0) { return (<></>) }
        }, [QueSelecion])
        return result;
      }
      const SeleccionCantidad = () => {
        let opc = QueSeleccion;
        const result = useMemo(() => {
          if (opc === 1) { return (<h3>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio}</h3>) }
          if (opc === 2) { return (<h3>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio}</h3>)  }
          if (opc === 3) { return (<h3>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio}</h3>)  }
          if (opc === 0) { return (<></>) }
        }, [QueSeleccion])
        return result;
      }
      const SeleccionQuien = () => {
        let opc = QuienSeleccion;
        const result = useMemo(() => {
          if (opc === 1) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen} width="170" alt='opcion1' />) }
          if (opc === 2) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen} width="170" alt='opcion2' />) }
          if (opc === 3) { return (<img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen} width="170" alt='opcion3' />) }
          if (opc === 0) { return (<></>) }
        }, [QuienSeleccion])
        return result;
      }
      const RespuestaImagen =({oraciondata})=>{
        let  sujetoRespuesta = "";
        let  AdjectivoRespuesta = "";
        let AdverbioRespuesta ="";
        let base = "Nada";
         if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Respuesta === "CORRECTO") {
           sujetoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen;
           AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen;
         } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Respuesta === "CORRECTO") {
           sujetoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen;
           AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen;
         } else if (oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Respuesta === "CORRECTO") {
           sujetoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen;
           AdjectivoRespuesta = oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen;
         }
       
         if(QuienSelec ==="" ||  Queselec === ""){
           base = "Nada"
         }
         if(QuienSelec.length> 2 && Queselec.length >2 ){
           if((sujetoRespuesta === QuienSelec) &&  (AdjectivoRespuesta === Queselec) ){
             base ="Correcto"
             setTimeout(() => { siguiente(window.id) }, 9000)
           }else if(sujetoRespuesta !== QuienSelec ||  AdjectivoRespuesta !== Queselec){
             base = "Incorrecto"
             setTimeout(() => { siguiente(window.id) }, 9000)
           }else if(QuienSelec ==="" ||  AdjectivoRespuesta !== Queselec){
             base = "Incorrecto"
    setTimeout(() => { siguiente(window.id) }, 9000)
           }
         }
         
         setopcionRes(base);
       
         switch (base) {
           case "Correcto":
             setMomento("Respuesta");
             return(<><img src={buentrajo} width="100" alt="buen trabajo"/></>);
           case "Incorrecto":
             setMomento("Respuesta");
               return(<><img src={malTrabajo} width="100" alt='mal trabajo'/></>);
           case "Nada":
           return(<></>)
           default:
             break;
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
        <Col className='mt-2' lg="4" sm="12" md="12" >
                {
                  momento === "inicial" && <Preguntasecction id={id} window={window} FuncRamdon={FuncRamdon} Pregu={Pregu} videoAMostrar={videoAMostrar} setvideoAMostrar={setvideoAMostrar} />
                }
                {
                 momento ==="Respuesta" && <Respuestasecction id={id} window={window} FuncRamdon={FuncRamdon} Pregu={Pregu} videoAMostrar={videoAMostrar} setvideoAMostrar={setvideoAMostrar}/>
                }
              </Col>
              <Col lg="8">
                  <Row lg="12" className='align-items-center'>
                  <div style={{ width: "95px", height: "120px" }}>
                    <img alt='sujeto' src={Quien} width="75" />
                  </div>
                  <div style={{ width: "175px", marginLeft: "" }} onClick={onhandleClickPrimero}>
                    <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileSujetoImagen} width="170" alt='opcion1' />
                  </div>
                  <div style={{ width: "175px", }} onClick={onhandleClickSegundo}>
                    <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileSujetoImagen} width="170" alt='opcion2' />
                  </div>
                  <div style={{ width: "175px", }} onClick={onhandleClickTercero}>
                    <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileSujetoImagen} width="170" alt='opcion3' />
                  </div>
                </Row>
                {
                  oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio
                  && (
                    <Row lg="12" className='align-items-center'>
                      <div style={{ width: "150px", height: "120px" }}>
                        <img alt='sujeto' src={Cantidad} width="100" />
                      </div>
                      <div style={{ width: "150px", height: "100px" }} onClick={onhandleClickAdvePrimero}>
                        <span>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio}</span>
                      </div>
                      <div style={{ width: "150px", height: "100px" }} onClick={onhandleClickAdveSegundo} >
                        <span>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.Adverbio}</span>
                      </div>
                      <div style={{ width: "150px", height: "100px" }} onClick={onhandleClickAdveTercero} >
                        <span>{oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.Adverbio}</span>
                      </div>
                    </Row>)
                }
                <Row lg="12" className='align-items-center'>
                  <div style={{ width: "95px" }}>
                    <img alt='que' src={Que} width="75" />
                  </div>
                  <div style={{ width: "175px" }} onClick={onhandleClickQuePrimero}>
                    <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.FileAdjetivoImagen} width="170" alt='opcion1' />
                  </div>
                  <div style={{ width: "175px" }} onClick={onhandleClickQueSegundo}>
                    <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion2.FileAdjetivoImagen} width="170" alt='opcion2' />
                  </div>
                  <div style={{ width: "175px" }} onClick={onhandleClickQueTercero}>
                    <img src={oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion3.FileAdjetivoImagen} width="170" alt='opcion3' />
                  </div>
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
                    <SeleccionQuien />
                  </div>
                  <div style={{ width: "95px" }} className="mx-auto">
                    <VerboRespuesta />
                  </div>
                  {
                    oraciondata[`Juego${id}`].Partida[`Juego` + window.id].Oraciones.Oracion1.Adverbio
                    && (
                      <div style={{ width: "95px" }} className="mx-auto">
                        <SeleccionCantidad />
                      </div>
                    )
                  }
                  <div style={{ width: "95px" }} className="mx-auto">
                    <SeleccionQue />
                  </div>
                </Row>
                </Col>
                <Col  lg="3" ><RespuestaImagen oraciondata={oraciondata}/></Col>
    </>
  )
}

export default TODOSSeccion