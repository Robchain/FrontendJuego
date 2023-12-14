// import React, { useState, useEffect } from 'react';


// const Cronometro = ({ minutosInicio, reiniciarCronometro }) => {
//   const [tiempoRestante, setTiempoRestante] = useState({
//     minutos: minutosInicio,
//     segundos: 0,
//   });
//   const [color, setColor] = useState('');

//   useEffect(() => {
//     const reiniciar = () => {
//       setTiempoRestante({ minutos: minutosInicio, segundos: 0 });
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
//     }
//   }, [minutosInicio, reiniciarCronometro]);

//   return (
//     <div className={`cronometro ${color}`}>
//       <span>{tiempoRestante.minutos < 10 ? `0${tiempoRestante.minutos}` : tiempoRestante.minutos}</span>:
//       <span>{tiempoRestante.segundos < 10 ? `0${tiempoRestante.segundos}` : tiempoRestante.segundos}</span>
//     </div>
//   );
// };

// export default Cronometro;


import React, { useState, useEffect } from 'react';

const Cronometro = ({ minutosInicio, segundosInicio, reiniciarCronometro }) => {
  const [tiempoRestante, setTiempoRestante] = useState({
    minutos: minutosInicio,
    segundos: segundosInicio,
  });
  const [color, setColor] = useState('');

  useEffect(() => {
    const reiniciar = () => {
      setTiempoRestante({ minutos: minutosInicio, segundos: segundosInicio });
      setColor('');
    };

    if (reiniciarCronometro === 'inicial') {
      reiniciar();
    } else if (reiniciarCronometro === 'pregunta') {
      const intervalo = setInterval(() => {
        setTiempoRestante((prevTiempo) => {
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
    }
  }, [minutosInicio, segundosInicio, reiniciarCronometro]);

  return (
    <div className={`cronometro ${color}`}>
      <span>{tiempoRestante.minutos < 10 ? `0${tiempoRestante.minutos}` : tiempoRestante.minutos}</span>:
      <span>{tiempoRestante.segundos < 10 ? `0${tiempoRestante.segundos}` : tiempoRestante.segundos}</span>
    </div>
  );
};

export default Cronometro;
