import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { FileText, User, Calendar, CheckCircle } from 'react-feather'
export const Stepbar = ({ steps }) => {
  return (
    <ProgressBar
      percent={(steps) * 25}
      filledBackground="#60269e"
    >
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : ""}`}>
            <FileText size={18} />
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : ""}`}>
            <User size={18} />
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : ""}`}>
            <Calendar size={18} />
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div className={`step ${accomplished ? "completed" : ""}`}>
            <CheckCircle size={18} />
          </div>
        )}
      </Step>
    </ProgressBar>
  );
}
