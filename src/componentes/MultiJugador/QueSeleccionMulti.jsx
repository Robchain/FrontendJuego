import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'
import buentrajo from '../../assets/img/AssetsGame/GOOD JOD.png'
import malTrabajo from '../../assets/img/AssetsGame/Bad Jood.png'
import Quien from '../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../assets/img/AssetsGame/ico_verbo.png";
import Cantidad from '../../assets/img/AssetsGame/ico_cantidad.png'
import ReactPlayer from 'react-player';
const VerVerboRespuesta = ({data, window, id })=>{
    const [palabra, setPalabra] = useState("");
    useEffect(() => {
      if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
        setPalabra(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Verbo)
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
        setPalabra(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Verbo)
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
        setPalabra(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Verbo)
      }
    }, [data])
    
    return (<h3 className='my-4' style={{ fontWeight: 700, color: "#85858C" }}>{palabra}</h3>)
   }
  const isAdverbio = (id, window, data) => {
    if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Adverbio || data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Adverbio) {
      return true;
    } else {
      return false;
    }
  }
  const Preguntasecction = ({id, window, data}) => {
  
    const [videoseleccionado, setVideoseleccionado] = useState("");
    useEffect(() => {
      setVideoseleccionado(preguntavideo);
    }, [])
    
    const preguntavideo =()=>{
      let selec = ""
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
  
  const Respuestasecction = ({data,id, window}) => {
    const [videoseleccionado2, setVideoseleccionado2] = useState("");
    useEffect(() => {
      setVideoseleccionado2(preguntavideo);
    }, [])
    
     const preguntavideo = ()=>{
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
          url={videoseleccionado2}
          height={225}
        width={300}
          playing
          loop={true}
        />
      </div>
    )
  };
  const VerSeleccionQuien = ({data, id, window })=>{
    const [queselec, setQueselec] = useState("")
    useEffect(() => {
      if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
        setQueselec(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileSujetoImagen)
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
        setQueselec(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileSujetoImagen)
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
        setQueselec(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileSujetoImagen)
      }
    }, [data])
  
    return (<>
      {
        queselec.length > 2 && (<img src={queselec} width="150" alt='opcion1' />) 
    }
    </>)
    
       }
         
     const VerCantidad = ({data, id, window})=>{
     const [seleccion, setSeleccion] = useState("")
     useEffect(() => {
      if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
        setSeleccion(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Adverbio)
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
        setSeleccion(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Adverbio)
      } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
        setSeleccion(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Adverbio)
      }
     }, [data])
     
      return (<h3>{seleccion}</h3>)
         }
         const SeleccionQue = ({QueSelecion,data, id, window }) => {
          const [seleccionPal, setSeleccionPal] = useState("");
          useEffect(() => {
            if (QueSelecion === 1) { setSeleccionPal(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileAdjetivoImagen) }
            if (QueSelecion === 2) { setSeleccionPal(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileAdjetivoImagen) }
            if (QueSelecion === 3) { setSeleccionPal(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileAdjetivoImagen) }
          }, [QueSelecion])
          
          return(<>{
            seleccionPal.length > 2 && (
              <img src={seleccionPal} width="150" alt='opcion1' />
            )
          }
          </>)
      }
      const RespuestaImagen =({Queselec, data, id , window, setMomento, momento })=>{
        const [imagense, setImagense] = useState("")
        let  AdjectivoRespuesta = "";
       useEffect(() => {
        if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta === "CORRECTO") {
         AdjectivoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileAdjetivoImagen;
        } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta === "CORRECTO") {
         AdjectivoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileAdjetivoImagen;
        } else if (data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta === "CORRECTO") {
         AdjectivoRespuesta = data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileAdjetivoImagen;
        }
       
        if(Queselec.length >2 ){
          if(AdjectivoRespuesta === Queselec) {
            setMomento("Respuesta");
            setImagense(buentrajo);
          
          }else if(AdjectivoRespuesta !== Queselec){
            setMomento("Respuesta");
            setImagense(malTrabajo);
          }
        }else{
          setImagense("");
        }
        }, [Queselec])
     
        return(<>{
          momento === "Respuesta" &&(<img src={imagense} width="100" alt='imagen'/>)}
          <></>
        </>)
      }
export const QueSeleccionMulti = ({id, window, siguiente, data, Progreso}) => {
    const [momento, setMomento] = useState("inicial");
    const [Queselec, setQueselec] = useState("");
    const [QueSelecion, setQueSelecion] = useState(0);
    const [pointerEvent, setPointer] = useState("auto")
    const [opacity1, setOpacity1] = useState(1);
    const [opacity2, setOpacity2] = useState(1);
    const [opacity3, setOpacity3] = useState(1);
    const onhandleClickQuePrimero = ()=>{
      setQueSelecion(1);
      setQueselec(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileAdjetivoImagen);
      setPointer("none")
      setOpacity2(0.4);
      setOpacity3(0.4);
      Progreso({type:"PROGRESO", PalabraCorrecta:"",PalabraSeleccionada:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Oracion, Resultado:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.Respuesta});
      setTimeout(() => { siguiente(window.id) },  9000)
    }
  
    const onhandleClickQueSegundo =()=>{
      setQueSelecion(2);
      setQueselec(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileAdjetivoImagen);
      setPointer("none")
      setOpacity3(0.4);
      setOpacity1(0.4);
      Progreso({type:"PROGRESO", PalabraCorrecta:"",PalabraSeleccionada:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Oracion, Resultado:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.Respuesta});
      setTimeout(() => { siguiente(window.id) }, 9000)
    }
    const onhandleClickQueTercero = ()=>{
      setQueSelecion(3);
      setQueselec(data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileAdjetivoImagen);
      setPointer("none")
      setOpacity1(0.4);
      setOpacity2(0.4);
      Progreso({type:"PROGRESO", PalabraCorrecta:"",PalabraSeleccionada:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Oracion, Resultado:data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.Respuesta});
      setTimeout(() => { siguiente(window.id) }, 9000)
    }
   
  return (
    <>
        <Col className='mt-2' lg="4" sm="12" md="12" >
      {
                  momento === "inicial" && <Preguntasecction id={id}  window={window} data={data}/>
      }
      {
              momento ==="Respuesta" && <Respuestasecction data={data} id={id} window={window} />
      }
              </Col>
              <Col  lg="8" className='align-self-center'>
<Row >
    <Col style={{ width: "95px" }}>
      <img alt='que' src={Que} width="75" />
    </Col>
    <Col  style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity1 }}  onClick={onhandleClickQuePrimero}>
      <img src={data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion1.FileAdjetivoImagen} width="150" alt='opcion1' />
    </Col>
    <Col  style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity2 }} onClick={onhandleClickQueSegundo}>
      <img src={data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion2.FileAdjetivoImagen} width="150" alt='opcion2' />
    </Col>
    <Col  style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity3 }} onClick={onhandleClickQueTercero}>
      <img src={data.Juegos[id][`Juego${window.id}`].Oraciones.Oracion3.FileAdjetivoImagen} width="150" alt='opcion3' />
    </Col>
  </Row>
</Col>
<Col lg="8" style={{ borderRadius: "10px", border: "#F8F7FD solid", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.13)", backgroundColor: "#F8F7FD", padding: " 0px 15px" }}>
<Row lg="8" >
    <div style={{ width: "200px" }} >
      <img alt='que' src={Quien} width="75"  style={{ margin: "0px 35px" }}/>
    </div>
    <div style={{ width: "120px" }} >
      <img src={Verbo} alt='opcion1' width="75" />
    </div>
    {  isAdverbio( id, window, data)
      &&
      (
        <div style={{ width: "100px" }} >
          <img src={Cantidad} alt='opcion1' width="75" />
        </div>)
    }
    <div style={{ width: "200px" }} >
      <img alt='que' src={Que} width="75"  style={{ margin: "0px 35px" }}/>
    </div>
  </Row>
  <Row lg="8" >
   <div style={{ width: "200px" }} >
      <VerSeleccionQuien id={id} data={data} window={window}/>
    </div>
    <div style={{width: "120px" }} >
      <VerVerboRespuesta  id={id} data={data} window={window}  />
    </div>
    {
      isAdverbio( id, window, data)
      && (
        <div style={{ width: "100px" }} >
          <VerCantidad id={id} data={data} window={window} />
        </div>
      )
    }
    <div style={{ width: "200px" }} >
      <SeleccionQue  QueSelecion={QueSelecion} id={id} data={data} window={window} />
    </div>
  </Row>
</Col>
<Col  lg="3" ><RespuestaImagen momento={momento} setMomento={setMomento} Queselec={Queselec} data={data}  id={id} window={window}/></Col>
    </>
  )
}
