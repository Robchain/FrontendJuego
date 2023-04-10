import React, { useReducer, useState } from "react";
import {
  llamadaInicialDelosEquiposSinAsignar,
  llamadoIncialDePosiciondelUsuario,
} from "../../service/Multijugador";
import { JuecoContext } from "./JuecoContext";
import { llamadaPartidaOracion } from "../../service/Juego/Oracion";
import { llamadaRompecabezaGet } from "../../service/Juego/Vocabulario";

export const JuegoProvider = ({ children }) => {
  const [respuesta, setRespuesta] = useState([]);
  const [cardEquipo, setCardEquipo] = useState([]);
  const [dataJuegoInicialVocabulario, setDataJuegoInicialVocabulario] = useState([]);
  const [dataJuegoVocabulario, setdataJuegoVocabulario] = useState(null)
  const [dataOracionJuego, setDataOracionJuego] = useState(null);
  const [oraciondata, setOraciondata] = useState(null);
  const [InfoEstudiaSituacion, setInfoEstudiaSituacion] = useState(null);

  const LLamadaIncial = async () => {
    try {
      let nombre = localStorage.getItem("Nombre");
      let apellido = localStorage.getItem("Apellido");
      let completo = `${nombre} ${apellido}`;
      let value = localStorage.getItem("Id");
      if (completo.length > 5 && value.length > 3) {
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

  const [
    { Vocabulario, Oraciones, MultiJugador },
    disparodeAcciones,
  ] = useReducer(controladordelosBotones, EstadoDeLosBotones);

  const initialState = [];

  const progresoOraciom = (state, action) => {
    switch (action.type) {
      case "PROGRESO":
        return [
          ...state,
          {
            PalabraAEvaluar: "",
            PalabraASeleccionada: action.selecionado,
            Resultado: action.Resul,
            Terminado: false,
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
      case "PROGRESO":
        return [
          ...state,
          {
            PalabraCorrecta: action.PalabraCorrecta,
            PalabraSeleccionada: action.PalabraSeleccionada,
            Resultado: action.Resultado,
            Terminado: true,
          },
        ];
      case "RESETEAR":
        return initialStateMulti;
      default:
        return state;
    }
  };

  const progreso = (palabraCorrecta,selecionado, Resul) => {
    setavance([
      ...avance0,
      {
        PalabraAEvaluar: palabraCorrecta,
        PalabraASeleccionada: selecionado,
        Resultado: Resul,
        Terminado: false,
      },
    ]);
  };

  const datoVocabulario = async (user) => {
    try {
      const data = await llamadaRompecabezaGet({ user: user });
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

  const dataOracion = async (user) => {
    try {
      const data = await llamadaPartidaOracion({ Usuario: user });
      if (data !== null) {
        setOraciondata(data);
      } else if (data === null) {
        disparodeAcciones({ type: "cambio", field: "Oraciones", value: true });
      }
    } catch (error) {
      disparodeAcciones({ type: "cambio", field: "Oraciones", value: true });
    }
  };

  const resultados = (palabra = "", respuestas = "") => {
    setRespuesta([
      ...respuesta,
      {
        palabra: palabra,
        respuestar: respuestas,
      },
    ]);
  };

  const [Oracionprogreso, dispatchProgreso] = useReducer(
    progresoOraciom,
    initialState
  );
  const [MultiProgreso, dispatchMutli] = useReducer(
    progresoMulti,
    initialStateMulti
  );

  return (
    <JuecoContext.Provider
      value={{
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
        resultados,
        setdataJuegoVocabulario,
        dataJuegoVocabulario,
        dataOracionJuego, 
        setDataOracionJuego,
        avance0,
        setDataJuegoInicialVocabulario,
      }}
    >
      {children}
    </JuecoContext.Provider>
  );
};
