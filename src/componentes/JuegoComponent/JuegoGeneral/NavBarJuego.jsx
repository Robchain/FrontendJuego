import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { PiDoorOpen } from 'react-icons/pi';
import LogoBlipBlaPalabra from '../../iconosCom/LogoBlipBlaPalabra'
import { MdOutlineArrowBackIos } from 'react-icons/md'

export const NavBarJuego = ({ urlBack, Seccion }) => {
  const [Email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("")
  const navegar = useNavigate();
  const [Identificacion, setIdentificacion] = useState("");
  const [imagenPefil, setPerfilImagen] = useState("");
  useEffect(() => {
    if (localStorage.getItem("Email") === null && localStorage.getItem("Identificacion") === null && localStorage.getItem("Usuario") === null) {
      navegar("/");
    }
    setEmail(localStorage.getItem("Email"));
    setIdentificacion(localStorage.getItem("Identificacion"));
    setUsuario(localStorage.getItem("Usuario"));
    setPerfilImagen(localStorage.getItem("FotoPerfil"));
  }, [])
  return (
    <div className='nav-superior-nombre'>
      <div className='barra-superior'>
        <div className='menu-icono-div'>
          <NavLink to={urlBack} className='menu-div'>
            <MdOutlineArrowBackIos className='menu-icono' />
          </NavLink>
          <div className='logo-blipbla-div'>
            <LogoBlipBlaPalabra className="logo-blipbla" />
          </div>
        </div>
        <div className='info-foto-salida-div'>
          <div className='informacion-div'>
            <p><span>{`${Email}`}</span><br /><span> {`${usuario}`}</span> <br /><span>{`${Identificacion}`}</span></p>
          </div>
          <div className='circulo-usuario-div'>
            {imagenPefil && imagenPefil !== 'null' ? <>
              <div className="new-icon">
                <img src={imagenPefil} alt="Descripción de la imagen" />
              </div>
            </> :
              <>
                <div className="mt-2 position-relative" style={{ background: "#777777", width: "40px", borderRadius: "100px", height: "40px" }}>
                  <div className="position-absolute bottom-0 end-0" style={{ background: "#4BAD4B", width: "15px", borderRadius: "100px", height: "15px" }}></div>
                </div>
              </>
            }
          </div>
          <div className='puerta-icono-div'>
            <NavLink to={"/"}>
              <PiDoorOpen className='puerta-icono' />
            </NavLink>
          </div>
        </div>
      </div>
      {/*---------------NOMBRE DE LA SECCION--------------*/}
      {Seccion.length > 2 && (
        <div className='titulo-nav' style={{ color: "#9696D3" }}>
          <h2 >{Seccion}</h2>
        </div>)}
    </div>
  )
}
