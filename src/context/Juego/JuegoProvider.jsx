import React, { useReducer, useState } from "react";
import {
  llamadaInicialDelosEquiposSinAsignar,
  llamadoIncialDePosiciondelUsuario,
} from "../../service/Multijugador";
import { JuecoContext } from "./JuecoContext";
import { llamadaPartidaOracion } from "../../service/Juego/Oracion";
import { llamadaRompecabezaGet } from "../../service/Juego/Vocabulario";

export const JuegoProvider = ({ children }) => {
  const [piezaJuegoIndi, setPiezaJuegoIndi] = useState(0);
  const [cardEquipo, setCardEquipo] = useState([]);
  const [piezaAvanzadas, setpiezaAvanzadas] = useState(0);
  const [dataJuegoInicialVocabulario, setDataJuegoInicialVocabulario] = useState([]);
  const [dataJuegoVocabulario, setdataJuegoVocabulario] = useState(null)
  const [dataRompecabeza, setDataRompecabeza] = useState(null);
  const [quienlist, setQuienlist] = useState([])
  const [dataOracionJuego, setDataOracionJuego] = useState(null);
  const [prevAvance, setprevAvance] = useState([])
  const [oraciondata, setOraciondata] = useState(null);
  const [rangoState, setRangoState] = useState(0)
  const [InfoEstudiaSituacion, setInfoEstudiaSituacion] = useState(null);
const [idRompecabeza, setIdRompecabeza] = useState(null)

  const LLamadaIncial = async () => {
    try {
      let nombre = localStorage.getItem("Nombre");
      let apellido = localStorage.getItem("Apellido");
      let completo = `${nombre} ${apellido}`;
      let value = localStorage.getItem("Identificacion");
      
      if (completo.length !=0 && value.length !=0) {

        const data = await llamadoIncialDePosiciondelUsuario(completo, value);

        if (data === null) {

          disparodeAcciones({
            type: "cambio",
            field: "MultiJugador",
            value: true,
          });

        } else if (data !== null) {

          setInfoEstudiaSituacion(data);

        }
      }
    } catch (error) {
      disparodeAcciones({ type: "cambio", field: "MultiJugador", value: true });
    }
  };

  const llamadaDos = async (IdDeLaAsignacion) => {
    const data = await llamadaInicialDelosEquiposSinAsignar(IdDeLaAsignacion);
    setCardEquipo(data);
  };

  const [avance0, setavance] = useState([]);
  const EstadoDeLosBotones = {
    Vocabulario: false,
    Oraciones: false,
    MultiJugador: false,
  };

  const controladordelosBotones = (state, action) => {
    switch (action.type) {
      case "cambio":
        return { ...state, [action.field]: action.value };
      case "RESETEAR":
        return EstadoDeLosBotones;
      default:
        return state;
    }
  };

  const [{ Vocabulario, Oraciones, MultiJugador },disparodeAcciones,] = useReducer(controladordelosBotones, EstadoDeLosBotones);

  
  const initialState = [];

  const progresoOraciom = (state, action) => {
    switch (action.type) {
      case "PROGRESO":
        return [
          ...state,
          {
            PalabraAEvaluar: action.PalabraCorrecta,
            PalabraASeleccionada: action.selecionado,
            Resultado: action.Resul,
            OracionCorrecta:action.OracionCorrecta,
            Terminado: true,
          },
        ];
      case "RESETEAR":
        return initialState;
      default:
        return state;
    }
  };
  const initialStateMulti = [];
    
  const progresoMulti = (state, action) => {
    switch (action.type) {
      case "PROGRESOVOCABULARIO":
        return [
          ...state,
          {
            PalabraAEvaluar: action.PalabraCorrecta,
            PalabraASeleccionada: action.PalabraSeleccionada,
            Resultado: action.Resultado,
            Terminado: true,
          },
        ];
        case "PROGRESOORACION":
          return [
            ...state,
            {
              PalabraAEvaluar: action.PalabraCorrecta,
              PalabraASeleccionada: action.PalabraSeleccionada,
              Resultado: action.Resultado,
              OracionCorrecta:action.OracionCorrecta,
              Terminado: true,
            },
          ];
      case "RESETEAR":
        return initialStateMulti;
      default:
        return state;
    }
  };

  const progreso = ({palabraCorrecta,selecionado, Resul}) => {
    setavance([
      ...avance0,
      {
        PalabraAEvaluar: palabraCorrecta,
        PalabraASeleccionada: selecionado,
        Resultado: Resul,
        Terminado: true,
      },
    ]);
  };

  const datoVocabulario = async (id) => {
    try {
      const data = await llamadaRompecabezaGet({ id: id });
      if (data !== null) {
        setDataJuegoInicialVocabulario(data);
      } else if (data === null) {
        disparodeAcciones({
          type: "cambio",
          field: "Vocabulario",
          value: true,
        });
      }
    } catch (error) {
      disparodeAcciones({ type: "cambio", field: "Vocabulario", value: true });
    }
  };

  const dataOracion = async (id) => {
    try {

      const data = await llamadaPartidaOracion({id:id});
      console.log(data)

      if (data !== null) {

        setOraciondata(data);

      } else if (data === null) {

        disparodeAcciones({ type: "cambio", field: "Oraciones", value: true });

      }
    } catch (error) {

      disparodeAcciones({ type: "cambio", field: "Oraciones", value: true });

    }
  };


  const [Oracionprogreso, dispatchProgreso] = useReducer(
    progresoOraciom,
    initialState
  );
  const [MultiProgreso, dispatchMutli] = useReducer(
    progresoMulti,
    initialStateMulti
  );

  const [dataMultiJu, setDataMultiJu] = useState(null);
  return (
    <JuecoContext.Provider
      value={{
        dataMultiJu, setDataMultiJu,
        Vocabulario,
        Oraciones,
        MultiJugador,
        dataJuegoInicialVocabulario,
        InfoEstudiaSituacion,
        MultiProgreso,
        dispatchMutli,
        LLamadaIncial,
        setInfoEstudiaSituacion,
        cardEquipo,
        llamadaDos,
        setavance,
        dataOracion,
        initialState,
        progresoOraciom,
        Oracionprogreso,
        dispatchProgreso,
        setOraciondata,
        oraciondata,
        progreso,
        datoVocabulario,
        setdataJuegoVocabulario,
        dataJuegoVocabulario,
        dataOracionJuego, 
        setDataOracionJuego,
        avance0,
        setDataJuegoInicialVocabulario,
        piezaJuegoIndi, setPiezaJuegoIndi,idRompecabeza, setIdRompecabeza,
        dataRompecabeza, setDataRompecabeza,prevAvance, setprevAvance,
        quienlist, setQuienlist,
        piezaAvanzadas, setpiezaAvanzadas,rangoState, setRangoState
      }}
    >
      {children}
    </JuecoContext.Provider>
  );
};


