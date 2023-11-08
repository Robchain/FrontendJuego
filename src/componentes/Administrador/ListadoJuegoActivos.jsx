import React, { useEffect, useState } from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, Table, UncontrolledDropdown } from 'reactstrap'
import { DesibilitarHabilitarJuego, HabilitarHabilitarJuego, MostrarHabilitarJuego } from '../../service/Adminstrador/Vocabulario';
import {LuMoreVertical} from 'react-icons/lu'
import {AiOutlineCheck} from 'react-icons/ai'
import {BsTrash} from 'react-icons/bs'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
export const ListadoJuegoActivos = () => {

  const [data, setData] = useState([]);
  const MySwal = withReactContent(Swal)
  const llamadoServicio = async () => {
    const input = await MostrarHabilitarJuego();
    setData(input);
  }

  useEffect(() => {
    llamadoServicio()
  }, []);

  const desactivarPersonaFunc = async (objeto) => {
    try {
      const data = await DesibilitarHabilitarJuego({ _id: objeto._id });
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
      if (data.titulo) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }

    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: "Falto un campo",
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
    }
  }
  const habilitarPersonaFunc = async (objeto) => {
    try {
      const data = await HabilitarHabilitarJuego({ _id: objeto._id });
      MySwal.fire({
        title: `${data.titulo}`,
        text: `${data.respuesta}`,
        icon: `${data.type}`,
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
      if (data.titulo) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      MySwal.fire({
        title: 'Error!',
        text: "Falto un campo",
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
    }
  }
  return (
    <>
      <h3 style={{ color: "#9696D3" }}>Listado de juego activos</h3>
      <Table striped>
        <thead style={{ backgroundColor: "#E6DFF0", color: "#62269E", textAlign: "initial" }}>
          <tr>
            <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>CURSO</th>
            <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>PARALELO</th>
            <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>ESTADO</th>
            <th style={{ borderBottomColor: "#f8f8f8", fontSize: 14 }}>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {data.filter(e => e.Juego === "VOCABULARIO").map((i) => (<tr className='m-4'>
            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{i.Curso}</span> </td>
            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{i.Paralelo} </span></td>
            <td style={{ fontWeight: 700 }}><span style={{ color: "#85858C" }}>{i.Estado} </span></td>
            <td style={{ borderBottomColor: "#f8f8f8" }}>
              <UncontrolledDropdown>
                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' >
                  <LuMoreVertical size={15} />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href='#' onClick={e => { e.preventDefault(); i.Estado === "ACTIVO" ? desactivarPersonaFunc(i) : habilitarPersonaFunc(i); }}>
                    {i.Estado === "ACTIVO" ? <><BsTrash className='me-50' size={15} /><span className='align-middle'>Desactivar</span></> : <><AiOutlineCheck className='me-50' size={15} /><span className='align-middle'>Activar</span></>}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td>
          </tr>))}
        </tbody>
      </Table>
    </>
  )
}
