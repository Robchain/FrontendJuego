import React, { useContext, useEffect, useState } from "react"
import { Row, Col, Container, Button } from "reactstrap"
import { NavLink, useNavigate } from "react-router-dom"
import{PiDoorOpen} from 'react-icons/pi';
import { JuecoContext } from "../../context/Juego/JuecoContext"
import LogoBlipBlaPalabra from "../../componentes/iconosCom/LogoBlipBlaPalabra"
import VocabularioIcon from "../../componentes/iconosCom/VocabularioIcon"
import OracionIcon from "../../componentes/iconosCom/OracionIcon"
import MultiJugadorIcon from "../../componentes/iconosCom/MultiJugadorIcon"
import TrofeoIcon from "../../componentes/iconosCom/TrofeoIcon"

const MenuJuego = () => {
  const { datoVocabulario, dataOracion, dispatchMutli, LLamadaIncial, Vocabulario, Oraciones, MultiJugador } = useContext(JuecoContext);
  const [usuario, setUsuario] = useState("");
  const [idState, setIdState] = useState("");
  const [Email, setEmail] = useState("");
  const [Identificacion, setIdentificacion] = useState(0);
  const navegar = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("Email") === null && localStorage.getItem("Identificacion") === null && localStorage.getItem("Usuario") === null) {
      navegar("/");
    }
    setEmail(localStorage.getItem("Email"));
    setIdentificacion(localStorage.getItem("Identificacion"));
    setUsuario(localStorage.getItem("Usuario"))
    setIdState(localStorage.getItem("Id"))
    dispatchMutli({ type: "RESETEAR" })
    dataOracion(localStorage.getItem("Id"));
    datoVocabulario(localStorage.getItem("Id"));
    LLamadaIncial()
  }, [])

  return (

    <Container className="fondoImagen vh-100" fluid  >
      <div className='nav-superior-nombre'>
        <div  className='barra-superior'>
          <div className='menu-icono-div'>
          <div className='logo-blipbla-div'>
              <LogoBlipBlaPalabra className="logo-blipbla" />
            </div>
          </div>
            
            <div className='info-foto-salida-div'>
                <div className="informacion-div">
                  <p><span>{`${Email}`}</span><br /><span> {`${usuario}`}</span> <br /><span>{`${Identificacion}`}</span></p>
                </div>
                <div className="circulo-usuario-div">
                  <div className="mt-2 position-relative" style={{ background: "#777777", width: "40px", borderRadius: "100px", height: "40px" }}>
                    <div className="position-absolute bottom-0 end-0" style={{ background: "#4BAD4B", width: "15px", borderRadius: "100px", height: "15px" }}></div>
                  </div>
                </div>
                <div className='puerta-icono-div'>
                  <NavLink to={"/"}>
                  <PiDoorOpen className='puerta-icono'/>
                  </NavLink>
                </div>
            </div>
          
        </div>
        {  /*---------------NOMBRE DE LA SECCION--------------*/}
        <Col sm="11" lg="11" md="11" xs="11" className="mt-3" style={{ color: "#8B8B8C" }}>
          <h2 >Categoría</h2>
        </Col>
      </div>
      {/*----------------------OPCIONES------------------------------- */}
      <div className="Cate-menu-alto" >
        <div className="Cate-cuadro-voca">
          <Button disabled={Vocabulario} outline  style={{  border: 'none', width:'100%' }} >
             <NavLink to={'/RompecabezaJV'} onClick={() => datoVocabulario(idState)} style={{ color: "#fff", textDecoration: "none", textAlign: "center" }}> 
             <div style={{background: "#BFBFD9", borderRadius: "10px", boxShadow: "5px 5px rgba(0, 0, 0, 0.13)"}} className="py-5 px-2">
              <VocabularioIcon />
             <h4 >VOCABULARIO</h4>
             </div>
             </NavLink>
          </Button>
          </div>
          <div className="Cate-cuadro-ora">
          <Button disabled={Oraciones} outline style={{width: '100%', border: 'none' }}>
          <NavLink to={'/RompecabezaJO'} style={{ color: "#fff", textDecoration: "none", textAlign: "center" }}>
            <div style={{background: "#EDCD90", boxShadow: "5px 5px rgba(0, 0, 0, 0.13)",borderRadius: "10px"}} className="py-5 px-2  ">
               <OracionIcon />
            <h4>ORACIÓN</h4> 
            </div>
          </NavLink>
        </Button>    
          </div>
      </div>
      <div className="Cate-menu-bajo">
        <div className="Cate-cuadro-multi" >
          <Button disabled={MultiJugador} outline style={{ border: 'none', width: '100%' }} >
            <NavLink to={`/SeleccionDeEquipo`} style={{ color: "#fff", textDecoration: "none", textAlign: "center" }} >
              <div style={{ background: "#C3D7CA", borderRadius: "10px", boxShadow: "5px 5px rgba(0, 0, 0, 0.13)" }} className="py-5 px-2">
                <MultiJugadorIcon /> 
              <h4>CARRERA</h4>
              </div>
            </NavLink>
          </Button>
        </div>
        <div className="Cate-cuadro-tro">
          <Button disabled={false} outline style={{ border: 'none',width:'100%' }} >
            <NavLink to={`/Trofeo`} style={{ color: "#fff", textDecoration: "none", textAlign: "center" }}>
                <div style={{background: "#E5BDB1", borderRadius: "10px", boxShadow: "5px 5px  rgba(0, 0, 0, 0.13)" }} className="py-5 px-2">
                  <TrofeoIcon />
                   <h4 className="">TROFEOS</h4></div>
            </NavLink>
          </Button></div>
        {/*--------------------FIN--------------------------------- */}
      </div>

    </Container>

  )
}

export default MenuJuego