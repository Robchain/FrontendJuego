import React from 'react';
import { JuegoProvider } from './context/Juego/JuegoProvider';
import { AllRoutes } from './Routes/AllRoutes';
import { Juegos } from './Routes/Juegos';


const App =() =>{

  return(
    <JuegoProvider>
        <AllRoutes/>
        
        </JuegoProvider>
  )
}
export default App;

