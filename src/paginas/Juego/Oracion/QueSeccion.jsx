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
const VerVerboRespuesta = ({ data, window, ...opc}) => {
  const [palabra, setPalabra] = useState("");
  useEffect(() => {
    if (data[`Juego` + window.id].Oraciones[0].Respuesta === "CORRECTO") {
      setPalabra(data[`Juego` + window.id].Oraciones[0].Verbo)
    } else if (data[`Juego` + window.id].Oraciones[1].Respuesta === "CORRECTO") {
      setPalabra(data[`Juego` + window.id].Oraciones[1].Verbo)
    } else if (data[`Juego` + window.id].Oraciones[2].Respuesta === "CORRECTO") {
      setPalabra(data[`Juego` + window.id].Oraciones[2].Verbo)
    }
  }, [data])

  return (<span style={{ fontWeight: 700, color: "#85858C" }} {...opc}>{palabra}</span>)
}
const isAdverbio = ( window, data) => {
  if (data[`Juego` + window.id].Oraciones[2].Adverbio || data[`Juego` + window.id].Oraciones[1].Adverbio ||data[`Juego` + window.id].Oraciones[0].Adverbio) {
    return true;
  } else {
    return false;
  }
}
const Preguntasecction = ({ data }) => {

  const [videoseleccionado, setVideoseleccionado] = useState("");
  useEffect(() => {
    let pregunta = ""; 
    for(let i=0; i<data.length; i++){
      if(data[i].Respuesta === 'CORRECTO'){
        pregunta = data[i].FileVideoPreguntaQue
        break; // para salir del bucle una vez que se encuentra la respuesta correcta
      }
    }
    setVideoseleccionado(pregunta);
  }, [data])
  return (
    <div >
      <ReactPlayer
        height={225}
        url={videoseleccionado}
        width={300}
        playing
        loop={true}
      />
    </div>
  )
};

const Respuestasecction = ({ data }) => {
  const [videoseleccionado2, setVideoseleccionado2] = useState("");
  useEffect(() => {
    let pregunta = ""; 
    for(let i=0; i<data.length; i++){
      if(data[i].Respuesta === 'CORRECTO'){
        pregunta = data[i].FileVideoMuestra
        break; // para salir del bucle una vez que se encuentra la respuesta correcta
      }
    }
    setVideoseleccionado2(pregunta);
  }, [data])

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
const VerSeleccionQuien = ({ data,  window , ...opc }) => {
  const [queselec, setQueselec] = useState("")
  useEffect(() => {
    if (data[`Juego` + window.id].Oraciones[0].Respuesta === "CORRECTO") {
      setQueselec(data[`Juego` + window.id].Oraciones[0].FileSujetoImagen)
    } else if (data[`Juego` + window.id].Oraciones[1].Respuesta === "CORRECTO") {
      setQueselec(data[`Juego` + window.id].Oraciones[1].FileSujetoImagen)
    } else if (data[`Juego` + window.id].Oraciones[2].Respuesta === "CORRECTO") {
      setQueselec(data[`Juego` + window.id].Oraciones[2].FileSujetoImagen)
    }
  }, [data])

  return (<>
    {
      queselec.length > 2 && (<img src={queselec} alt='opcion1' {...opc}  />)
    }
  </>)

}

const VerCantidad = ({ data,  window, ...props}) => {
  const [seleccion, setSeleccion] = useState("")
  useEffect(() => {
    if (data[`Juego` + window.id].Oraciones[0].Respuesta === "CORRECTO") {
      setSeleccion(data[`Juego` + window.id].Oraciones[0].Adverbio)
    } else if (data[`Juego` + window.id].Oraciones[1].Respuesta === "CORRECTO") {
      setSeleccion(data[`Juego` + window.id].Oraciones[1].Adverbio)
    } else if (data[`Juego` + window.id].Oraciones[2].Respuesta === "CORRECTO") {
      setSeleccion(data[`Juego` + window.id].Oraciones[2].Adverbio)
    }
  }, [data])

  return (<span style={{ fontWeight: 700, color: "#85858C" }} {...props}>{seleccion}</span>)
}
const SeleccionQue = ({ QueSelecion, data,  window, ...props}) => {
  const [seleccionPal, setSeleccionPal] = useState("");
  useEffect(() => {
    if (QueSelecion === 1) { setSeleccionPal(data[`Juego` + window.id].Oraciones[0].FileAdjetivoImagen) }
    if (QueSelecion === 2) { setSeleccionPal(data[`Juego` + window.id].Oraciones[1].FileAdjetivoImagen) }
    if (QueSelecion === 3) { setSeleccionPal(data[`Juego` + window.id].Oraciones[2].FileAdjetivoImagen) }
  }, [QueSelecion])

  return (<>{
    seleccionPal.length > 2 ? (
      <img src={seleccionPal} alt='opcion1'  {...props}/>
    ):<div></div>
  }
  </>)
}
const RespuestaImagen = ({ Queselec, data,  window, setMomento, momento }) => {
  const [imagense, setImagense] = useState("")
  let AdjectivoRespuesta = "";
  useEffect(() => {
    if (data[`Juego` + window.id].Oraciones[0].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego` + window.id].Oraciones[0].FileAdjetivoImagen;
    } else if (data[`Juego` + window.id].Oraciones[1].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego` + window.id].Oraciones[1].FileAdjetivoImagen;
    } else if (data[`Juego` + window.id].Oraciones[2].Respuesta === "CORRECTO") {
      AdjectivoRespuesta = data[`Juego` + window.id].Oraciones[2].FileAdjetivoImagen;
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

  return (<>{
    momento === "Respuesta" && (<img src={imagense} width="100" alt='imagen' />)}
    <></>
  </>)
}

const QueSeccion = ({  window, siguiente, dispatchProgreso, data }) => {
  const [momento, setMomento] = useState("inicial");
  const [Queselec, setQueselec] = useState("");
  const [QueSelecion, setQueSelecion] = useState(0);
  const [pointerEvent, setPointer] = useState("auto")
  const [opacity1, setOpacity1] = useState(1);
  const [opacity2, setOpacity2] = useState(1);
  const [opacity3, setOpacity3] = useState(1);
  /*useEffect(() => {
    if(QueSelecion ===0){
    setTimeout(() => { dispatchProgreso({ type: "PROGRESO",PalabraCorrecta:resultadoOracion({objeto1:data[`Juego` + window.id].Oraciones[0], objeto2:data[`Juego` + window.id].Oraciones[1], objeto3:data[`Juego` + window.id].Oraciones[2]}) , selecionado: `SE PASO EL TIEMPO-NO HAY RESPUESTA`, Resul: "INCORRECTO" }); siguiente(window.id) }, 90000)
  }
  }, [QueSelecion])*/
  const onhandleClickQuePrimero = () => {
    setQueSelecion(1);
    setQueselec(data[`Juego` + window.id].Oraciones[0].FileAdjetivoImagen);
    setPointer("none")
    setOpacity2(0.4);
    setOpacity3(0.4);
    dispatchProgreso({ type: "PROGRESO",PalabraCorrecta:resultadoOracion({objeto1:data[`Juego` + window.id].Oraciones[0], objeto2:data[`Juego` + window.id].Oraciones[1], objeto3:data[`Juego` + window.id].Oraciones[2]}) , selecionado: data[`Juego` + window.id].Oraciones[0].Oracion, Resul: data[`Juego` + window.id].Oraciones[0].Respuesta })
    setTimeout(() => { siguiente(window.id) }, 11000)
  }

  const onhandleClickQueSegundo = () => {
    setQueSelecion(2);
    setQueselec(data[`Juego` + window.id].Oraciones[1].FileAdjetivoImagen);
    setPointer("none")
    setOpacity3(0.4);
    setOpacity1(0.4);
    dispatchProgreso({ type: "PROGRESO",PalabraCorrecta:resultadoOracion({objeto1:data[`Juego` + window.id].Oraciones[0], objeto2:data[`Juego` + window.id].Oraciones[1], objeto3:data[`Juego` + window.id].Oraciones[2]}) , selecionado: data[`Juego` + window.id].Oraciones[1].Oracion, Resul: data[`Juego` + window.id].Oraciones[1].Respuesta })
    setTimeout(() => { siguiente(window.id) }, 11000)
  }
  const onhandleClickQueTercero = () => {
    setQueSelecion(3);
    setQueselec(data[`Juego` + window.id].Oraciones[2].FileAdjetivoImagen);
    setPointer("none")
    setOpacity1(0.4);
    setOpacity2(0.4);
    dispatchProgreso({ type: "PROGRESO",PalabraCorrecta:resultadoOracion({objeto1:data[`Juego` + window.id].Oraciones[0], objeto2:data[`Juego` + window.id].Oraciones[1], objeto3:data[`Juego` + window.id].Oraciones[2]}) , selecionado: data[`Juego` + window.id].Oraciones[2].Oracion, Resul: data[`Juego` + window.id].Oraciones[2].Respuesta })
    setTimeout(() => { siguiente(window.id) }, 11000)
  }




  return (
    <>
      <Col className='' lg="4" sm="12" md="12" >
        {
          momento === "inicial" && <Preguntasecction  data={data[`Juego` + window.id].Oraciones} />
        }
        {
          momento === "Respuesta" && <Respuestasecction data={data[`Juego` + window.id].Oraciones} />
        }
      </Col>
      <Col lg="8" className='align-self-center'>
        <Row >
          <Col style={{ width: "95px" }}>
            <img alt='que' src={Que} width="75" />
          </Col>
          <Col style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity1 }} onClick={onhandleClickQuePrimero}>
            <img src={data[`Juego` + window.id].Oraciones[0].FileAdjetivoImagen} width="150" alt='opcion1' />
          </Col>
          <Col style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity2 }} onClick={onhandleClickQueSegundo}>
            <img src={data[`Juego` + window.id].Oraciones[1].FileAdjetivoImagen} width="150" alt='opcion2' />
          </Col>
          <Col style={{ width: "175px", pointerEvents: pointerEvent, opacity: opacity3 }} onClick={onhandleClickQueTercero}>
            <img src={data[`Juego` + window.id].Oraciones[2].FileAdjetivoImagen} width="150" alt='opcion3' />
          </Col>
        </Row>
      </Col>
      <div className='zonainteractiva'>
      <div className='pruebaDise' style={{ borderRadius: "10px", border: "#F8F7FD solid", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.13)", backgroundColor: "#F8F7FD"}}>
        <div  className='opciones' >
        <div style={{padding:'0px'}}>
            <img alt='que' src={Quien} className='imagenOpc'  />
          </div>
          <div style={{padding:'0px'}}>
            <img src={Verbo} alt='opcion1' className='imagenOpc' />
          </div>
          {isAdverbio( window, data)
            &&
            (
              <div style={{padding:'0px'}}>
                <img src={Cantidad} alt='opcion1'className='imagenOpc' />
              </div>)
          }
         <div style={{padding:'0px'}}>
            <img alt='que' src={Que} className='imagenOpc'  />
          </div>
        </div>
        {/* parte de seleccion */}
        <div className='seleccion'  >
        <div style={{padding:'0px'}}>
            <VerSeleccionQuien  data={data} window={window} className='opcionesSelec' />
          </div>
          <div style={{padding:'0px'}}>
            <VerVerboRespuesta  data={data} window={window} className='opcionesSelec' />
          </div>
          {
            isAdverbio( window, data)
            && (
              <div style={{padding:'0px'}}>
                <VerCantidad  data={data} window={window} className='opcionesSelec' />
              </div>
            )
          }
         <div style={{padding:'0px'}}>
            <SeleccionQue QueSelecion={QueSelecion}  data={data} window={window} className='opcionesSelec' />
          </div>
        </div>
      </div>
      <div ><RespuestaImagen momento={momento} setMomento={setMomento} Queselec={Queselec} data={data}  window={window} /></div>
      </div>
    </>
  )
}
export default QueSeccion