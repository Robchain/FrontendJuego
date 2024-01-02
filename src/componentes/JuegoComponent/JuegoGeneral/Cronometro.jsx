import React, { useState, useEffect } from 'react';
import Alert from '../../../assets/img/Alert.png'
const Cronometro = ({ minutosInicio, segundosInicio, reiniciarCronometro }) => {
  const [tiempoRestante, setTiempoRestante] = useState({
    minutos: minutosInicio,
    segundos: segundosInicio,
  });
  const [color, setColor] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false); // Nuevo estado para controlar la alerta
  let intervalo; // Declarar intervalo fuera del bloque if

  useEffect(() => {
    const reiniciar = () => {
      setTiempoRestante({ minutos: minutosInicio, segundos: segundosInicio });
      setColor('');
      setMostrarAlerta(false); // Reiniciar el estado de mostrarAlerta
    };

    if (reiniciarCronometro === 'inicial') {
      reiniciar();
    } else if (reiniciarCronometro === 'pregunta') {
      intervalo = setInterval(() => {
        setTiempoRestante((prevTiempo) => {
          if (prevTiempo.minutos === 0 && prevTiempo.segundos === 20) {
            // Mostrar alerta cuando llega a 0:20
            setMostrarAlerta(true);
          }

          if (prevTiempo.segundos > 0) {
            return { ...prevTiempo, segundos: prevTiempo.segundos - 1 };
          } else if (prevTiempo.minutos > 0) {
            return { minutos: prevTiempo.minutos - 1, segundos: 59 };
          } else {
            setColor('rojo');
            clearInterval(intervalo);
            return prevTiempo;
          }
        });
      }, 1000);

      return () => clearInterval(intervalo);
    } else if (reiniciarCronometro === 'respuesta') {
      // Detener el tiempo
      clearInterval(intervalo);
    }
  }, [minutosInicio, segundosInicio, reiniciarCronometro]);

  return (
    <div className='cuadro-cronometro'>
      <div className={`cronometro ${color}`}>
        <span>{tiempoRestante.minutos < 10 ? `0${tiempoRestante.minutos}` : tiempoRestante.minutos}</span>:
        <span>{tiempoRestante.segundos < 10 ? `0${tiempoRestante.segundos}` : tiempoRestante.segundos}</span>
      </div>
      {mostrarAlerta && <img src={Alert}  alt='alerta' className='imagen-alerta'/>}
    </div>
  );
};

export default Cronometro;

// import React, { useState, useEffect } from 'react';

// const Cronometro = ({ minutosInicio, segundosInicio, reiniciarCronometro }) => {
//   const [tiempoRestante, setTiempoRestante] = useState({
//     minutos: minutosInicio,
//     segundos: segundosInicio,
//   });
//   const [color, setColor] = useState('');
//   let intervalo;
//   useEffect(() => {
//     const reiniciar = () => {
//       setTiempoRestante({ minutos: minutosInicio, segundos: segundosInicio });
//       setColor('');
//     };

//     if (reiniciarCronometro === 'inicial') {
//       reiniciar();
//     } else if (reiniciarCronometro === 'pregunta') {
//       const intervalo = setInterval(() => {
//         setTiempoRestante((prevTiempo) => {
//           if (prevTiempo.segundos > 0) {
//             return { ...prevTiempo, segundos: prevTiempo.segundos - 1 };
//           } else if (prevTiempo.minutos > 0) {
//             return { minutos: prevTiempo.minutos - 1, segundos: 59 };
//           } else {
//             setColor('rojo');
//             clearInterval(intervalo);
//             return prevTiempo;
//           }
//         });
//       }, 1000);

//       return () => clearInterval(intervalo);
//     } else if (reiniciarCronometro === 'respuesta') {
//       // Detener el tiempo
//       clearInterval(intervalo);
//     }
//   }, [minutosInicio, segundosInicio, reiniciarCronometro]);

//   return (
//     <div className={`cronometro ${color}`}>
//       <span>{tiempoRestante.minutos < 10 ? `0${tiempoRestante.minutos}` : tiempoRestante.minutos}</span>:
//       <span>{tiempoRestante.segundos < 10 ? `0${tiempoRestante.segundos}` : tiempoRestante.segundos}</span>
//     </div>
//   );
// };

// export default Cronometro;



