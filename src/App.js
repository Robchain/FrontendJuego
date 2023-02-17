import React from 'react';
import { JuegoProvider } from './context/Juego/JuegoProvider';
import { AllRoutes } from './Routes/AllRoutes';


const App =() =>{

  return(
    <JuegoProvider>
        <AllRoutes/>
        </JuegoProvider>
  )
}
export default App;

