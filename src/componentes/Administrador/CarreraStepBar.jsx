import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
export const CarreraStepBar = ({ steps }) => {
  return (
    <ProgressBar
      percent={(steps) * 25}
      filledBackground="#60269e"
    >
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : ""}`}>
            <div style={{backgroundColor:'grey'}}></div>
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : ""}`}>
          <div style={{backgroundColor:'grey'}}></div>
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : ""}`}>
          <div style={{backgroundColor:'grey'}}></div>
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : ""}`}>
          <div style={{backgroundColor:'grey'}}></div>
          </div>
        )}
      </Step>
    </ProgressBar>
  );
}
