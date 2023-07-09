import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Progress } from 'reactstrap'
import { NavBarJuego } from '../../../componentes/JuegoComponent/JuegoGeneral/NavBarJuego'
import { OracionMulti } from '../../../componentes/MultiJugador/OracionMulti';
import { VerProgresoYaTerminado } from '../../../componentes/MultiJugador/VerProgresoYaTerminado';
import { VocabularioMulti } from '../../../componentes/MultiJugador/VocabularioMulti';
import { JuecoContext } from '../../../context/Juego/JuecoContext';
import cargando from '../../../assets/img/AssetsGame/paperplane.gif'
export const PantallaParteDos = () => {
  const { InfoEstudiaSituacion,LLamadaIncial,setInfoEstudiaSituacion, dispatchMutli,dataMultiJu} = useContext(JuecoContext);
  useEffect(() => {
    LLamadaIncial();
    return () =>{
      setInfoEstudiaSituacion(null);
    }
  }, [])
  
  const [windows, setWindows] = useState([
    { id: 1, show: false },
    { id: 2, show: false },
    { id: 3, show: false },
    { id: 4, show: false },
    { id: 5, show: false },
  ]);
  const [listos, setListos] = useState("espera");
  const navegar = useNavigate();
  const toggleWindow = (id) => {
    // Crear una copia del arreglo de ventanas
    let newWindows = [...windows];
    // Encontrar la ventana con el id especificado
    let window = newWindows.find(w => w.id === id);
    // Invertir el valor de show
    window.show = !window.show;
    // Actualizar el arreglo de ventanas
    setWindows(newWindows);
  }
  const { id } = useParams();
  useEffect(() => {
    setTimeout(() => {
      setListos("Ya");
    }, 4500);
    toggleWindow(1);
  }, [])

  const siguiente = (num) => {
    toggleWindow(num);
    if (num === 5) {
      navegar(`/FinalJuegoMulti/Jugador/${id}`);
    } else {
      toggleWindow(num + 1);
    }
  }
  
  return (
    <Container>
      <NavBarJuego Seccion={"Colaborativo"} urlBack={"/MenuJuego"}/>
{ (InfoEstudiaSituacion !== null && dataMultiJu !==null) ? (
<>
{
  listos === "espera" && <VerProgresoYaTerminado/>
}
{  listos === "Ya" && windows.map(window => (
          <div key={window.id}>
            {window.show && (
                <>
                <Progress animated  value={(window.id-1)*20} />
                {dataMultiJu[`Juego${window.id}`].Palabras && <VocabularioMulti  siguiente={siguiente} window={window} dataMultiJu={dataMultiJu} dispatchMutli={dispatchMutli} />}

                {dataMultiJu[`Juego${window.id}`].Oraciones && <OracionMulti siguiente={siguiente} window={window} dataMultiJu={dataMultiJu} dispatchMutli={dispatchMutli} />}
                </>
            )}
          </div>
        ))
        }
</>
    ):( <div className="loading-overlay">
        <img src={cargando} alt='cargando'/>
      </div>)
         }
    </Container>
  )
}
