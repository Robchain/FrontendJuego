import React, { useContext, useEffect, useState, useMemo, useCallback, memo } from 'react'
import ReactPlayer from 'react-player'
import { Container, Row, Col } from 'reactstrap'
import Quien from '../../../assets/img/AssetsGame/ico_Que.png'
import Que from '../../../assets/img/AssetsGame/icon_Que.png'
import Verbo from "../../../assets/img/AssetsGame/ico_verbo.png";
import { DooroutButton } from '../../../componentes/JuegoComponent/JuegoGeneral/DooroutButton'
import { JuecoContext } from '../../../context/Juego/JuecoContext'
import Cantidad from '../../../assets/img/AssetsGame/ico_cantidad.png'

const Preguntasecction = ({ FuncRamdon, Pregu, setvideoAMostrar, videoAMostrar }) => {
  console.log("renderPreguntaSection")
  const { oraciondata } = useContext(JuecoContext);
  useEffect(() => {
    FuncRamdon()
  }, [])

  const preguntavideo = useMemo(() => {
    if (Pregu === 1) {
      if (oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.Respuesta === "CORRECTO") {
        return oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.FileVideoPreguntaQue
      } else if (oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.Respuesta === "CORRECTO") {
        return oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.FileVideoPreguntaQue
      } else if (oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.Respuesta === "CORRECTO") {
        return oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.FileVideoPreguntaQue
      }
    } else if (Pregu === 2) {
      if (oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.Respuesta === "CORRECTO") {
        return oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.FileVideoPreguntaQuien
      } else if (oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.Respuesta === "CORRECTO") {
        return oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.FileVideoPreguntaQuien
      } else if (oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.Respuesta === "CORRECTO") {
        return oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.FileVideoPreguntaQuien
      }
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

const OracionJ = () => {
  
  const [QueSelecion, setQueSelecion] = useState(0);
  const [QuienSeleccion, setQuienSeleccion] = useState(0);
  const [QueSeleccion, setQueSeleccion] = useState(0);
  const [Pregu, setPregu] = useState(0);
  const [videoAMostrar, setvideoAMostrar] = useState("")
  const [momento, setMomento] = useState("inicial");
  const { oraciondata, dataOracion } = useContext(JuecoContext);
  useEffect(() => {
    dataOracion(localStorage.getItem("Usuario"));
  }, [])
  const func = useCallback(
    () => {
      return Math.floor(Math.random() * (2 - 1 + 1) + 1)
    },
    [],
  )
  const FuncRamdon = () => {
    setPregu(func());
  }

  const VerboRespuesta = () => {
    let verbo = "";
    if (oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.Respuesta === "CORRECTO") {
      verbo = oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.Verbo
    } else if (oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.Respuesta === "CORRECTO") {
      verbo = oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.Verbo
    } else if (oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.Respuesta === "CORRECTO") {
      verbo = oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.Verbo
    }
    return (<h3>{verbo}</h3>)
  }

  const SeleccionQue = () => {
    let opc = QueSelecion;
    const result = useMemo(() => {
      if (opc === 1) { return (<img src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.FileAdjetivoImagen} width="170" alt='opcion1' />) }
      if (opc === 2) { return (<img src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.FileAdjetivoImagen} width="170" alt='opcion2' />) }
      if (opc === 3) { return (<img src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.FileAdjetivoImagen} width="170" alt='opcion3' />) }
      if (opc === 0) { return (<></>) }
    }, [QueSelecion])
    return result;
  }
  const SeleccionCantidad = () => {
    let opc = QueSeleccion;
    const result = useMemo(() => {
      if (opc === 1) { return (<img alt='opcion1' />) }
      if (opc === 2) { return (<img alt='opcion2' />) }
      if (opc === 3) { return (<img alt='opcion3' />) }
      if (opc === 0) { return (<></>) }
    }, [QueSeleccion])
    return result;
  }
  const SeleccionQuien = () => {
    let opc = QuienSeleccion;
    const result = useMemo(() => {
      if (opc === 1) { return (<img src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.FileSujetoImagen} width="170" alt='opcion1' />) }
      if (opc === 2) { return (<img src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.FileSujetoImagen} width="170" alt='opcion2' />) }
      if (opc === 3) { return (<img src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.FileSujetoImagen} width="170" alt='opcion3' />) }
      if (opc === 0) { return (<></>) }
    }, [QuienSeleccion])
    return result;
  }
  const onhandleClickPrimero = useCallback(
    () => {
      setQuienSeleccion(1)
    },
    [],
  )
  const onhandleClickSegundo = useCallback(
    () => {
      setQuienSeleccion(2)
    },
    [],
  )
  const onhandleClickTercero = useCallback(
    () => {
      setQuienSeleccion(3)
    },
    [],
  )
const RespuestaImagen =()=>{
  
  return(<>respuesta</>)



}
  return (
    <>{
      oraciondata !== null ? (
        <div className='window'>
          <Container style={{ zIndex: 1, position: "fixed", }} className="fluid">
            <Row className="d-flex justify-content-around">
              <Col className="d-flex justify-content-evenly" lg="12"  >
                <h1>Armar Oracion</h1>
              </Col>
              <Col className='mt-2' lg="4" sm="12" md="12" >
                {
                  momento === "inicial" && <Preguntasecction FuncRamdon={FuncRamdon} Pregu={Pregu} videoAMostrar={videoAMostrar} setvideoAMostrar={setvideoAMostrar} />
                }
              </Col>
              <Col lg="8">
                <Row lg="12" className='align-items-center'>
                  <div style={{ width: "95px", height: "120px" }}>
                    <img alt='sujeto' src={Quien} width="75" />
                  </div>
                  <div style={{ width: "175px", marginLeft: "" }} onClick={onhandleClickPrimero}>
                    <img src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.FileSujetoImagen} width="170" alt='opcion1' />
                  </div>
                  <div style={{ width: "175px", }} onClick={onhandleClickSegundo}>
                    <img src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.FileSujetoImagen} width="170" alt='opcion2' />
                  </div>
                  <div style={{ width: "175px", }} onClick={onhandleClickTercero}>
                    <img src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.FileSujetoImagen} width="170" alt='opcion3' />
                  </div>
                </Row>
                {
                  oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.Adverbio
                  && (
                    <Row lg="12" className='align-items-center'>
                      <div style={{ width: "150px", height: "120px" }}>
                        <img alt='sujeto' src={Cantidad} width="100" />
                      </div>
                      <div style={{ width: "150px", height: "100px" }} onClick={(e) => { e.preventDefault(); setQueSeleccion(1) }}>
                        <span>{oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.Adverbio}</span>
                      </div>
                      <div style={{ width: "150px", height: "100px" }} onClick={(e) => { e.preventDefault(); setQueSeleccion(2) }} >
                        <span>{oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.Adverbio}</span>
                      </div>
                      <div style={{ width: "150px", height: "100px" }} onClick={(e) => { e.preventDefault(); setQueSeleccion(3) }} >
                        <span>{oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.Adverbio}</span>
                      </div>
                    </Row>)
                }
                <Row lg="12" className='align-items-center'>
                  <div style={{ width: "95px" }}>
                    <img alt='que' src={Que} width="75" />
                  </div>
                  <div style={{ width: "175px" }} onClick={(e) => { e.preventDefault(); setQueSelecion(1) }}>
                    <img src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.FileAdjetivoImagen} width="170" alt='opcion1' />
                  </div>
                  <div style={{ width: "175px" }} onClick={(e) => { e.preventDefault(); setQueSelecion(2) }}>
                    <img src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion2.FileAdjetivoImagen} width="170" alt='opcion2' />
                  </div>
                  <div style={{ width: "175px" }} onClick={(e) => { e.preventDefault(); setQueSelecion(3) }}>
                    <img src={oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion3.FileAdjetivoImagen} width="170" alt='opcion3' />
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
                  {oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.Adverbio
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
                    oraciondata.Juego1.Partida.Juego1.Oraciones.Oracion1.Adverbio
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
                <Col  lg="4"><RespuestaImagen/></Col>
              <Col lg="12" className="d-flex justify-content-end">
                <DooroutButton Urlsalida={"/RompecabezaJO"} />
              </Col>
            </Row>
          </Container>
        </div>
      ) : <> <>Cargando...</></>
    }
    </>
  )
}

export default OracionJ