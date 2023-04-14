import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
export const CarreraStepBar = ({ steps,InfoEstudiaSituacion }) => {
  return (
    <ProgressBar
      percent={(steps *100 )/ InfoEstudiaSituacion.Integrantes.length}
      filledBackground="#60269e"
    >
    {
      InfoEstudiaSituacion.Integrantes.map((i,a)=>(
        <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : ""}`}>
              {
                a===InfoEstudiaSituacion.Posicion && <span>Tú</span>
              }
          </div>
        )}
      </Step>
      ))
    }
    </ProgressBar>
  );
}
