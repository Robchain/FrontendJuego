import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

export const Stepbar = () => {
    return (
      <ProgressBar
        percent={75}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      >
        <Step transition="scale">
          {({ accomplished }) => (
            <div className={`step ${accomplished ? "completed": ""}`}>
               1
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div className={`step ${accomplished ? "completed": ""}`}>
               2
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div className={`step ${accomplished ? "completed": ""}`}>
               3
            </div>
          )}
        </Step>
      </ProgressBar>
    );
  }
